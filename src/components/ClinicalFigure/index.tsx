import React, {useEffect, useId, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {ClinicalFigureRecord, figureSources} from '../../data/figures';
import styles from './styles.module.css';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {figure: ClinicalFigureRecord};

/** Phrasing elements keep Markdown's surrounding <p> valid during SSR/hydration. */
export default function ClinicalFigure({figure, alt, className, ...imageProps}: Props): React.ReactElement {
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [actualSize, setActualSize] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = `${id}-title`, detailsId = `${id}-details`, modalTitleId = `${id}-modal-title`;
  const altText = alt || figure.title;
  useEffect(() => {
    if (!open || !dialog.current) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current.showModal();
    dialog.current.querySelector<HTMLButtonElement>('button')?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open]);
  const close = () => {setOpen(false); setActualSize(false);};
  return (
    <span className={styles.figure} role="figure" aria-labelledby={titleId}>
      <button type="button" className={styles.imageButton} onClick={() => setOpen(true)} aria-label={`Enlarge ${figure.title}`}>
        <img decoding="async" loading="lazy" {...imageProps} alt={altText} className={[styles.image, className].filter(Boolean).join(' ')} />
        <span className={styles.enlargeHint} aria-hidden="true">Enlarge figure ↗</span>
      </button>
      <span className={styles.caption}>
        <span id={titleId} className={styles.title}>{figure.title}</span>
        <span className={styles.status}>Original schematic · v{figure.version} · Clinical review pending</span>
        <button type="button" className={styles.textButton} aria-expanded={expanded} aria-controls={detailsId} onClick={() => setExpanded(value => !value)}>
          {expanded ? 'Hide' : 'Read'} description, sources and limits
        </button>
      </span>
      <span id={detailsId} hidden={!expanded} className={styles.details}>
        <span className={styles.paragraph}>{figure.textEquivalent}</span>
        <span className={styles.paragraph}><strong>View:</strong> {figure.populationAndView}. <strong>Scale:</strong> {figure.scale}. <strong>Units:</strong> {figure.units}.</span>
        <span className={styles.paragraph}><strong>Limits:</strong> {figure.limitations}</span>
        <span className={styles.paragraph}><strong>Source check:</strong> {figure.editorialReview.date}. This is an editorial check with the access limits below. No named clinician has signed off.</span>
        {figure.sourceIds.map(sourceId => {
          const source = figureSources[sourceId];
          return <span className={styles.source} key={sourceId}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a> — {source.version}. Access: {source.access}. {source.checkScope}</span>;
        })}
        <span className={styles.paragraph}>{figure.author}. {figure.license}</span>
        <a href={imageProps.src} target="_blank" rel="noopener noreferrer">Open original SVG with embedded source record ↗</a>
      </span>
      {open && typeof document !== 'undefined' && createPortal(
        <dialog ref={dialog} className={styles.dialog} aria-labelledby={modalTitleId} onCancel={close} onClose={close} onClick={event => {if (event.target === event.currentTarget) close();}}>
          <div className={styles.modalBody}>
            <div className={styles.toolbar}>
              <strong id={modalTitleId}>{figure.title}</strong>
              <span className={styles.controls}>
                <button type="button" onClick={close} aria-label="Close enlarged figure">Close ✕</button>
                <button type="button" onClick={() => setActualSize(value => !value)} aria-pressed={actualSize}>{actualSize ? 'Fit to screen' : 'Full size'}</button>
                <a href={imageProps.src} target="_blank" rel="noopener noreferrer">Open SVG ↗</a>
              </span>
            </div>
            <div className={[styles.viewport, actualSize ? styles.actualSize : ''].join(' ')} tabIndex={0} aria-label="Figure viewport; scroll to inspect the full-size image">
              <img src={imageProps.src} alt={altText} decoding="async" />
            </div>
            <p className={styles.modalDescription}>{figure.textEquivalent}</p>
            <p className={styles.modalLimits}>{figure.scale} · Clinical review pending. {figure.limitations}</p>
          </div>
        </dialog>, document.body)}
    </span>
  );
}
