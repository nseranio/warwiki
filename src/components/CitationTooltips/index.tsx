import { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

/**
 * CitationTooltips — previews the full reference on hover or focus over an
 * inline <sup>[N]</sup> citation, with its DOI link and a jump link.
 * Client-only; no UI unless hovering.
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

    // Build the preview from the reference entry itself, keeping its links
    // and italics. The #refN anchor is empty; its paragraph / list item holds
    // the reference, which starts with "N. ".
    const buildPreview = (href: string): DocumentFragment | null => {
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
      clone.querySelectorAll('button, .hash-link, a[id]:empty').forEach((n) => n.remove());
      const firstText = document.createTreeWalker(clone, NodeFilter.SHOW_TEXT).nextNode();
      const numberMatch = firstText?.textContent?.match(/^\s*(\d+)\.\s*/);
      if (firstText && numberMatch) firstText.textContent = firstText.textContent!.slice(numberMatch[0].length);
      if (!(clone.textContent || '').trim()) return null;

      const fragment = document.createDocumentFragment();
      const label = document.createElement('span');
      label.className = styles.label;
      label.textContent = `[${numberMatch?.[1] ?? href.replace(/\D/g, '')}]`;
      const body = document.createElement('div');
      body.className = styles.body;
      body.append(...Array.from(clone.childNodes));
      body.querySelectorAll('a[href^="http"]').forEach((a) => {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      });
      const jump = document.createElement('a');
      jump.className = styles.jump;
      jump.href = href;
      jump.textContent = 'Jump to reference ↓';
      jump.addEventListener('click', () => hide());
      fragment.append(label, body, jump);
      return fragment;
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

    // The preview stays open while the pointer moves from the citation into
    // it, so its DOI link and jump link can be clicked.
    let hideTimer: number | undefined;
    const cancelHide = () => window.clearTimeout(hideTimer);
    const scheduleHide = () => {
      cancelHide();
      hideTimer = window.setTimeout(hide, 180);
    };

    const show = (event: Event) => {
      cancelHide();
      const trigger = event.currentTarget as HTMLElement;
      const href = trigger.getAttribute('href') || '';
      const preview = buildPreview(href);
      if (!preview) return;
      tooltip!.replaceChildren(preview);
      tooltip!.setAttribute('aria-hidden', 'false');
      positionTooltip(trigger);
    };

    function hide() {
      cancelHide();
      tooltip!.classList.remove(styles.visible);
      tooltip!.setAttribute('aria-hidden', 'true');
      tooltip!.style.visibility = '';
    }

    tooltip.addEventListener('mouseenter', cancelHide);
    tooltip.addEventListener('mouseleave', scheduleHide);

    // Citations on WARWIKI: <sup><a href="#refN">[N]</a></sup>
    const citations = document.querySelectorAll<HTMLAnchorElement>(
      'article .markdown sup > a[href^="#ref"]',
    );

    citations.forEach((a) => {
      a.addEventListener('mouseenter', show);
      a.addEventListener('mouseleave', scheduleHide);
      a.addEventListener('focus', show);
      a.addEventListener('blur', scheduleHide);
    });

    // A preview's document coordinates become stale when the viewport changes.
    window.addEventListener('resize', hide);

    return () => {
      window.removeEventListener('resize', hide);
      citations.forEach((a) => {
        a.removeEventListener('mouseenter', show);
        a.removeEventListener('mouseleave', scheduleHide);
        a.removeEventListener('focus', show);
        a.removeEventListener('blur', scheduleHide);
      });
      tooltip!.removeEventListener('mouseenter', cancelHide);
      tooltip!.removeEventListener('mouseleave', scheduleHide);
      hide();
    };
    // Re-scan on path change so SPA navigation attaches handlers to the new
    // article's citations. Intentionally depend on pathname only.
  }, [pathname]);

  return null;
}
