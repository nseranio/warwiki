import { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

/**
 * CitationTooltips — shows the full reference text on hover over an inline
 * <sup>[N]</sup> citation. Client-only; no UI unless hovering.
 *
 * Works with the WARWIKI citation pattern:
 *   <sup>[[1]](#ref1)</sup>   →   <sup><a href="#ref1">[1]</a></sup>
 *   <a id="ref1"></a>1. Author et al. "Title." Journal. 2024;…
 */

const TOOLTIP_CLASS = 'warwiki-cite-tooltip';

export default function CitationTooltips(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Create a single shared tooltip element (or reuse an existing one)
    let tooltip = document.querySelector<HTMLDivElement>(`.${TOOLTIP_CLASS}`);
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = `${TOOLTIP_CLASS} ${styles.tooltip}`;
      tooltip.setAttribute('role', 'tooltip');
      tooltip.setAttribute('aria-hidden', 'true');
      document.body.appendChild(tooltip);
    }

    // Extract the reference text for #refN by walking the #refN anchor's
    // surrounding paragraph / list-item text. Anchor itself is empty.
    const getReferenceText = (href: string): string | null => {
      if (!href.startsWith('#')) return null;
      let refEl: HTMLElement | null = null;
      try {
        refEl = document.querySelector<HTMLElement>(href);
      } catch {
        return null;
      }
      if (!refEl) return null;
      const container = refEl.closest('li, p, div') as HTMLElement | null;
      if (!container) return null;
      const clone = container.cloneNode(true) as HTMLElement;
      // Remove any nav/button/code/hash-link artifacts from the reference
      clone.querySelectorAll('button, .hash-link').forEach((n) => n.remove());
      const text = (clone.textContent || '').replace(/\s+/g, ' ').trim();
      return text || null;
    };

    const positionTooltip = (trigger: HTMLElement) => {
      const rect = trigger.getBoundingClientRect();
      const gap = 8;

      // Default: show below
      let top = rect.bottom + window.scrollY + gap;
      let left = rect.left + window.scrollX;

      // First render the tooltip to measure it
      tooltip!.classList.add(styles.visible);
      tooltip!.style.visibility = 'hidden';
      tooltip!.style.top = `${top}px`;
      tooltip!.style.left = `${left}px`;

      const tipRect = tooltip!.getBoundingClientRect();
      const viewportRight = window.innerWidth - 16;
      const viewportBottom = window.innerHeight - 16;

      // Horizontal clamp
      if (tipRect.right > viewportRight) {
        left = window.scrollX + viewportRight - tipRect.width;
      }
      if (left < window.scrollX + 8) {
        left = window.scrollX + 8;
      }

      // Vertical flip: show above if no room below
      if (tipRect.bottom > viewportBottom) {
        top = rect.top + window.scrollY - tipRect.height - gap;
        tooltip!.classList.add(styles.above);
      } else {
        tooltip!.classList.remove(styles.above);
      }

      tooltip!.style.top = `${top}px`;
      tooltip!.style.left = `${left}px`;
      tooltip!.style.visibility = 'visible';
    };

    const show = (event: Event) => {
      const trigger = event.currentTarget as HTMLElement;
      const href = trigger.getAttribute('href') || '';
      const refText = getReferenceText(href);
      if (!refText) return;
      tooltip!.textContent = refText;
      tooltip!.setAttribute('aria-hidden', 'false');
      positionTooltip(trigger);
    };

    const hide = () => {
      tooltip!.classList.remove(styles.visible);
      tooltip!.setAttribute('aria-hidden', 'true');
    };

    // Citations on WARWIKI: <sup><a href="#refN">[N]</a></sup>
    const citations = document.querySelectorAll<HTMLAnchorElement>(
      'article .markdown sup > a[href^="#ref"]',
    );

    citations.forEach((a) => {
      a.addEventListener('mouseenter', show);
      a.addEventListener('mouseleave', hide);
      a.addEventListener('focus', show);
      a.addEventListener('blur', hide);
    });

    return () => {
      citations.forEach((a) => {
        a.removeEventListener('mouseenter', show);
        a.removeEventListener('mouseleave', hide);
        a.removeEventListener('focus', show);
        a.removeEventListener('blur', hide);
      });
      hide();
    };
    // Re-scan on path change so SPA navigation attaches handlers to the new
    // article's citations. Intentionally depend on pathname only.
  }, [pathname]);

  return null;
}
