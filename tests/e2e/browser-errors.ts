import type {Page} from '@playwright/test';

/**
 * Hotlinked third-party images (surgeon portraits, e.g. Mayo Clinic) load in
 * real browsers but some hosts' bot protection blocks headless Chromium.
 * Their availability is outside the site's control and is covered by the
 * external-link check, so failed cross-origin image loads are not counted.
 * Every console error, page exception and first-party failure still is.
 */
function isThirdPartyImage(page: Page, url: string, resourceType?: string): boolean {
  if (resourceType && resourceType !== 'image') return false;
  try {
    return new URL(url).origin !== new URL(page.url()).origin
      && (resourceType === 'image' || /\.(?:jpe?g|png|gif|webp|avif|svg)(?:\?|$)/i.test(url));
  } catch {
    return false;
  }
}

export function collectBrowserErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', message => {
    if (message.type() !== 'error') return;
    const {url, lineNumber, columnNumber} = message.location();
    if (/^Failed to load resource/.test(message.text()) && url && isThirdPartyImage(page, url)) return;
    errors.push(`Console: ${message.text()} (${url || page.url()}:${lineNumber + 1}:${columnNumber + 1})`);
  });
  page.on('pageerror', error => {
    errors.push(`Uncaught exception on ${page.url()}: ${error.stack ?? error.message}`);
  });
  page.on('response', response => {
    if (response.status() >= 400 && !isThirdPartyImage(page, response.url(), response.request().resourceType())) {
      errors.push(`HTTP ${response.status()} [${response.request().resourceType()}] ${response.url()}`);
    }
  });
  page.on('requestfailed', request => {
    if (isThirdPartyImage(page, request.url(), request.resourceType())) return;
    errors.push(`Request failed: ${request.url()} (${request.failure()?.errorText ?? 'unknown error'})`);
  });
  return errors;
}
