/**
 * Map tab: the qualifying sites of the current results on a US map drawn here
 * (US Census outlines via us-atlas; no map service, so no location leaves the page).
 * Zoom with the buttons, pinch or Ctrl/Cmd-scroll; drag to pan. Sites split
 * apart and gain name labels as you zoom in.
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import {geoAlbersUsa, geoCircle, geoPath, type GeoPermissibleObjects} from 'd3-geo';
import {feature, mesh} from 'topojson-client';
import type {Origin, StudyHit} from '@site/src/lib/clinical-trials/filter';
import type {IndexSite} from '@site/src/lib/clinical-trials/types';
import {MinusIcon, PlusIcon, RefreshIcon} from './Icons';
import styles from './styles.module.css';

const W = 960;
const H = 600;
const MILES_PER_DEGREE = 69.09;
const MIN_W = 8;

/* eslint-disable @typescript-eslint/no-explicit-any */
let topoPromise: Promise<any> | null = null;
function loadTopo(): Promise<any> {
  topoPromise ??= fetch('/trial-finder/us-states-10m.json').then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  }).catch(err => {
    topoPromise = null;
    throw err;
  });
  return topoPromise;
}

type View = [number, number, number, number];

interface Place {
  key: string;
  x: number;
  y: number;
  sites: {site: IndexSite; distance?: number; studies: {id: string; label: string}[]}[];
  studyCount: number;
  nearest?: number;
}

interface Props {
  hits: StudyHit[];
  origin?: Origin;
  radius?: number;
  selectedNct?: string | null;
  onOpenStudy: (nct: string) => void;
}

function clampView(v: View): View {
  const w = Math.min(Math.max(v[2], MIN_W), W * 1.3);
  const h = w * (H / W);
  const x = Math.min(Math.max(v[0], -W * 0.3), W * 1.3 - w);
  const y = Math.min(Math.max(v[1], -H * 0.3), H * 1.3 - h);
  return [x, y, w, h];
}

export default function SiteMap({hits, origin, radius, selectedNct, onOpenStudy}: Props) {
  const [topo, setTopo] = useState<any>(null);
  const [failed, setFailed] = useState(false);
  const [placeKey, setPlaceKey] = useState<string | null>(null);
  const [view, setView] = useState<View | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{x: number; y: number; view: View; moved: boolean} | null>(null);
  const suppressClick = useRef(false);

  useEffect(() => {
    let cancelled = false;
    loadTopo().then(t => !cancelled && setTopo(t)).catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const geo = useMemo(() => {
    if (!topo) return null;
    const nation = feature(topo, topo.objects.nation) as unknown as GeoPermissibleObjects;
    const projection = geoAlbersUsa().fitSize([W, H], nation as any);
    const path = geoPath(projection);
    const states = path(mesh(topo, topo.objects.states, (a: any, b: any) => a !== b) as any) ?? '';
    const outline = path(nation) ?? '';
    return {projection, path, states, outline};
  }, [topo]);

  const ring = useMemo(() => {
    if (!geo || !origin || !radius) return null;
    const circle = geoCircle().center([origin.lon, origin.lat]).radius(radius / MILES_PER_DEGREE)();
    return {d: geo.path(circle) ?? '', bounds: geo.path.bounds(circle), center: geo.projection([origin.lon, origin.lat])};
  }, [geo, origin, radius]);

  // Default view: the search radius when there is one, otherwise the whole country.
  const home: View = useMemo(() => {
    if (!ring?.d) return [0, 0, W, H];
    const [[x0, y0], [x1, y1]] = ring.bounds;
    const size = Math.max(x1 - x0, y1 - y0, 40) * 1.25;
    const w = size * (W / H);
    return clampView([(x0 + x1) / 2 - w / 2, (y0 + y1) / 2 - size / 2, w, size]);
  }, [ring]);
  useEffect(() => setView(null), [home]);
  const v = view ?? home;
  const scale = v[2] / W;

  // Group sites that sit within a few screen pixels of each other at the current zoom.
  const cell = 7 * scale;
  const {places, offMap} = useMemo(() => {
    const byKey = new Map<string, Place>();
    let off = 0;
    if (!geo) return {places: [] as Place[], offMap: 0};
    for (const h of hits) {
      const label = h.study.acr ?? h.study.id;
      for (const s of h.sites) {
        if (typeof s.site.la !== 'number' || typeof s.site.lo !== 'number' || s.site.g === 'bad') {
          off++;
          continue;
        }
        const p = geo.projection([s.site.lo, s.site.la]);
        if (!p) {
          off++;
          continue;
        }
        const key = `${Math.round(p[0] / cell)}:${Math.round(p[1] / cell)}`;
        let place = byKey.get(key);
        if (!place) {
          place = {key, x: p[0], y: p[1], sites: [], studyCount: 0};
          byKey.set(key, place);
        }
        let entry = place.sites.find(e => e.site.f === s.site.f && e.site.c === s.site.c);
        if (!entry) {
          entry = {site: s.site, distance: s.distance, studies: []};
          place.sites.push(entry);
        }
        if (!entry.studies.some(x => x.id === h.study.id)) entry.studies.push({id: h.study.id, label});
        place.studyCount = new Set(place.sites.flatMap(e => e.studies.map(x => x.id))).size;
        if (s.distance !== undefined) place.nearest = Math.min(place.nearest ?? Infinity, s.distance);
      }
    }
    return {places: [...byKey.values()], offMap: off};
  }, [hits, geo, cell]);

  // Ctrl/Cmd-scroll and trackpad pinch zoom around the pointer; plain scrolling still scrolls the page.
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      setView(prev => {
        const cur = prev ?? home;
        const fx = (e.clientX - rect.left) / rect.width;
        const fy = (e.clientY - rect.top) / rect.height;
        const k = Math.exp(Math.max(-1, Math.min(1, e.deltaY * 0.01)));
        const w = cur[2] * k;
        const h = cur[3] * k;
        return clampView([cur[0] + (cur[2] - w) * fx, cur[1] + (cur[3] - h) * fy, w, h]);
      });
    };
    el.addEventListener('wheel', onWheel, {passive: false});
    return () => el.removeEventListener('wheel', onWheel);
  }, [geo, home]);

  const zoomBy = (k: number) => setView(prev => {
    const cur = prev ?? home;
    const w = cur[2] * k;
    const h = cur[3] * k;
    return clampView([cur[0] + (cur[2] - w) / 2, cur[1] + (cur[3] - h) / 2, w, h]);
  });
  const zoomTo = (x: number, y: number) => setView(prev => {
    const cur = prev ?? home;
    const w = cur[2] / 2.5;
    const h = cur[3] / 2.5;
    return clampView([x - w / 2, y - h / 2, w, h]);
  });

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;
    drag.current = {x: e.clientX, y: e.clientY, view: v, moved: false};
  };
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    const el = svgRef.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) < 4) return;
    if (!d.moved) el.setPointerCapture(e.pointerId);
    d.moved = true;
    const rect = el.getBoundingClientRect();
    setView(clampView([d.view[0] - dx * (d.view[2] / rect.width), d.view[1] - dy * (d.view[3] / rect.height), d.view[2], d.view[3]]));
  };
  const onPointerUp = () => {
    suppressClick.current = !!drag.current?.moved;
    drag.current = null;
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 0);
  };

  const sorted = useMemo(() => [...places].sort((a, b) => (a.nearest ?? Infinity) - (b.nearest ?? Infinity) || b.studyCount - a.studyCount), [places]);
  const active = (placeKey && places.find(p => p.key === placeKey)) || null;
  // In view: the side list follows what the map shows.
  const inView = sorted.filter(p => p.x >= v[0] && p.x <= v[0] + v[2] && p.y >= v[1] && p.y <= v[1] + v[3]);
  const listed = active ? [active] : inView.slice(0, 15);
  const showLabels = scale < 0.12;

  if (failed) return <p className={styles.warn}>The map outline could not be loaded. The list view has every site.</p>;
  if (!geo) return <div className={styles.mapLoading} aria-hidden />;

  const pick = (p: Place) => {
    if (suppressClick.current) return;
    if (p.sites.length > 1 && scale > 0.04) zoomTo(p.x, p.y);
    setPlaceKey(k => (k === p.key ? null : p.key));
  };

  return (
    <div className={styles.mapFrame}>
      <div className={styles.mapCanvas}>
        <svg
          ref={svgRef}
          viewBox={v.join(' ')}
          className={clsx(styles.mapSvg, drag.current?.moved && styles.mapDragging)}
          role="img"
          aria-label={`Map of ${places.length} site locations for the current results`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onDoubleClick={e => {
            const rect = svgRef.current?.getBoundingClientRect();
            if (!rect) return;
            zoomTo(v[0] + ((e.clientX - rect.left) / rect.width) * v[2], v[1] + ((e.clientY - rect.top) / rect.height) * v[3]);
          }}
        >
          <path d={geo.outline} className={styles.mapLand} strokeWidth={0.8 * scale} />
          <path d={geo.states} className={styles.mapStates} strokeWidth={0.8 * scale} />
          {ring?.d ? <path d={ring.d} className={styles.mapRing} strokeWidth={1.6 * scale} strokeDasharray={`${5 * scale} ${4 * scale}`} /> : null}
          {places.map(p => {
            const on = p.key === placeKey || (!!selectedNct && p.sites.some(e => e.studies.some(s => s.id === selectedNct)));
            const r = Math.min(3 + Math.sqrt(p.studyCount) * 1.6, 11) * scale;
            const name = p.sites.length === 1 ? p.sites[0].site.f : `${p.sites.length} sites near ${p.sites[0].site.c ?? p.sites[0].site.f}`;
            return (
              <g key={p.key}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  className={clsx(styles.mapDot, on && styles.mapDotOn)}
                  strokeWidth={1.2 * scale}
                  tabIndex={0}
                  role="button"
                  aria-label={`${name}: ${p.studyCount} ${p.studyCount === 1 ? 'study' : 'studies'}`}
                  onClick={() => pick(p)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      pick(p);
                    }
                  }}
                >
                  <title>{`${name} · ${p.studyCount} ${p.studyCount === 1 ? 'study' : 'studies'}`}</title>
                </circle>
                {showLabels ? (
                  <text x={p.x + r + 3 * scale} y={p.y + 4 * scale} className={styles.mapLabel} fontSize={11 * scale} strokeWidth={3 * scale}>
                    {p.sites.length === 1 ? p.sites[0].site.f : `${p.sites[0].site.f} +${p.sites.length - 1}`}
                  </text>
                ) : null}
              </g>
            );
          })}
          {ring?.center ? <circle cx={ring.center[0]} cy={ring.center[1]} r={4 * scale} className={styles.mapOrigin} strokeWidth={2 * scale} /> : null}
        </svg>
        <div className={styles.mapZoom} role="group" aria-label="Map zoom">
          <button type="button" className={styles.iconButton} onClick={() => zoomBy(1 / 1.8)} aria-label="Zoom in"><PlusIcon /></button>
          <button type="button" className={styles.iconButton} onClick={() => zoomBy(1.8)} aria-label="Zoom out"><MinusIcon /></button>
          <button type="button" className={styles.iconButton} onClick={() => setView(view ? null : [0, 0, W, H])} aria-label={view ? 'Reset view' : 'Whole US'} title={view ? 'Reset view' : 'Whole US'}><RefreshIcon /></button>
        </div>
        <div className={styles.mapControls}>
          <span className={styles.small}>Drag to move; pinch, Ctrl/⌘-scroll, double-click or the buttons to zoom. {places.length} {places.length === 1 ? 'location' : 'locations'}{offMap ? ` · ${offMap} ${offMap === 1 ? 'site' : 'sites'} without map coordinates (Puerto Rico and territories, or unusable registry points) are in the list` : ''}</span>
        </div>
      </div>
      <div className={styles.mapSide}>
        <p className={styles.mapSideHead}>{active ? 'Selected location' : `In view (${inView.length})`}</p>
        {active ? <button type="button" className={styles.linkButton} onClick={() => setPlaceKey(null)}>Show all locations in view</button> : null}
        <ul className={styles.mapPlaces}>
          {listed.map(p => (
            <li key={p.key}>
              {p.sites.map(e => (
                <div key={`${e.site.f}|${e.site.c}`} className={styles.mapPlace}>
                  <span className={styles.siteName}>{e.site.f}</span>
                  <span className={styles.siteMeta}>{[e.site.c, e.site.s].filter(Boolean).join(', ')}{e.distance !== undefined ? ` · ${Math.round(e.distance)} mi` : ''}</span>
                  <span className={styles.mapStudies}>
                    {e.studies.map(s => (
                      <button key={s.id} type="button" className={clsx(styles.mapStudy, s.id === selectedNct && styles.mapStudyOn)} onClick={() => onOpenStudy(s.id)}>{s.label}</button>
                    ))}
                  </span>
                </div>
              ))}
            </li>
          ))}
        </ul>
        {!active && inView.length > listed.length ? <p className={styles.small}>Zoom in or select a dot to narrow the list.</p> : null}
        {!inView.length && !active ? <p className={styles.small}>No sites in this part of the map.</p> : null}
      </div>
    </div>
  );
}
