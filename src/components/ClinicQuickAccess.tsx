import React, {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import {clinicPathways, filterClinicPathways, clinicFavoritesKey, parseClinicFavorites} from '@site/src/data/clinic-pathways';
import styles from './ClinicQuickAccess.module.css';

export default function ClinicQuickAccess({compact = false}: {compact?: boolean}): React.ReactElement {
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  useEffect(() => {
    try { setFavorites(parseClinicFavorites(window.localStorage.getItem(clinicFavoritesKey))); }
    catch { setStorageAvailable(false); }
  }, []);
  function toggleFavorite(id: string) {
    const next = favorites.includes(id) ? favorites.filter(value => value !== id) : [...favorites, id];
    setFavorites(next);
    try { window.localStorage.setItem(clinicFavoritesKey, JSON.stringify(next)); }
    catch { setStorageAvailable(false); }
  }
  const visible = filterClinicPathways(query).filter(pathway => !onlyFavorites || favorites.includes(pathway.id));
  if (compact) return (
    <section className={styles.compact} aria-labelledby="clinic-shortcuts">
      <h2 id="clinic-shortcuts">Common clinical questions</h2>
      <div className={styles.shortcuts}>
        {clinicPathways.map(pathway => <Link key={pathway.id} to={`/clinic#${pathway.id}`}>{pathway.title}</Link>)}
      </div>
      <Link to="/clinic" className={styles.browse}>Browse clinic quick access →</Link>
    </section>
  );
  return <div>
    <div className={styles.controls}>
      <label className={styles.search}>Find a problem
        <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="For example: rUTI, prolapse, BPH" />
      </label>
      <label className={styles.checkbox}><input type="checkbox" checked={onlyFavorites} onChange={event => setOnlyFavorites(event.target.checked)} /> Saved topics</label>
    </div>
    <p className={styles.note}>{storageAvailable ? 'Saved topics stay in this browser.' : 'Browser storage is unavailable; saved topics will last for this visit.'}</p>
    <p className={styles.count} role="status">{visible.length} {visible.length === 1 ? 'topic' : 'topics'}</p>
    {visible.length === 0 && <p>No matching topics. Clear the search or turn off Saved topics.</p>}
    <div className={styles.grid}>
      {visible.map(pathway => <article key={pathway.id} id={pathway.id} className={styles.card}>
        <div className={styles.cardHeading}><h2>{pathway.title}</h2>
          <button type="button" aria-label={`Save ${pathway.title}`} aria-pressed={favorites.includes(pathway.id)} onClick={() => toggleFavorite(pathway.id)} className={styles.save}>{favorites.includes(pathway.id) ? 'Saved' : 'Save'}</button>
        </div>
        <p>{pathway.description}</p>
        <ul>
          <li><Link to={pathway.assessment}>Assessment, management &amp; follow-up</Link></li>
          <li><Link to={pathway.treatment}>Treatment options &amp; procedures</Link></li>
          {pathway.companion && <li><Link to={pathway.companion.href}>{pathway.companion.label}</Link></li>}
        </ul>
      </article>)}
    </div>
  </div>;
}
