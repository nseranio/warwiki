# Fortieth continuation release — September 19, 2026

## Foldès evidence recovery

The Foldès page now separates the 2,938-person cohort from its 29% one-year follow-up, treats its outcomes as observational, and makes the very-low-certainty systematic-review conclusion explicit. It no longer presents a fixed procedure, universal selection rule, or combined-program result as Foldès-specific. The [recovery review](foldes-recovery-review.md) records the source scope.

Ledger: 690 full current MDX reads and 662 scoped updates of 1,186 files. This remains a whole-site audit, not clinical clearance.

## Validation

`npm run lint`, `npm run typecheck`, `npm test`, and `npm run test:maintenance` pass (32 unit and 52 maintenance tests). Production build, rendered-link, size, whitespace, and ledger-JSON checks pass. Build output is 130.64 MB with 1,191 HTML pages, 96,956 local links/assets, and 722 data literals.
