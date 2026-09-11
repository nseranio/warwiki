import type {Page} from '@playwright/test';

export function collectBrowserErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', message => {
    if (message.type() !== 'error') return;
    const {url, lineNumber, columnNumber} = message.location();
    errors.push(`Console: ${message.text()} (${url || page.url()}:${lineNumber + 1}:${columnNumber + 1})`);
  });
  page.on('pageerror', error => {
    errors.push(`Uncaught exception on ${page.url()}: ${error.stack ?? error.message}`);
  });
  page.on('response', response => {
    if (response.status() >= 400) {
      errors.push(`HTTP ${response.status()} [${response.request().resourceType()}] ${response.url()}`);
    }
  });
  page.on('requestfailed', request => {
    errors.push(`Request failed: ${request.url()} (${request.failure()?.errorText ?? 'unknown error'})`);
  });
  return errors;
}
