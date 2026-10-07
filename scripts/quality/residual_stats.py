#!/usr/bin/env python3
"""Residual-sample statistics from a classification file (reproducible).

  python3 scripts/quality/residual_stats.py reports/quality/residual-sample-4-classification.json

Per page counts -> mean errors/page with a t interval using the finite-population correction, and the proportion of
affected pages with an exact Clopper-Pearson interval (FPC factor reported).
"""
import json, math, sys
from statistics import mean, stdev

def t975(df):  # two-sided 95% t quantile (df >= 1), Cornish-Fisher style approximation, adequate for df >= 20
    z = 1.959964
    return z + (z**3 + z) / (4 * df) + (5 * z**5 + 16 * z**3 + 3 * z) / (96 * df**2)

def binom_cdf(k, n, p):
    return sum(math.comb(n, i) * p**i * (1 - p)**(n - i) for i in range(0, k + 1))

def clopper_pearson(k, n, alpha=0.05):
    """Exact interval by bisection on the binomial tail probabilities."""
    def solve(f):
        lo, hi = 0.0, 1.0
        for _ in range(200):
            mid = (lo + hi) / 2
            if f(mid): lo = mid
            else: hi = mid
        return (lo + hi) / 2
    lower = 0.0 if k == 0 else solve(lambda p: 1 - binom_cdf(k - 1, n, p) < alpha / 2)
    upper = 1.0 if k == n else solve(lambda p: binom_cdf(k, n, p) > alpha / 2)
    return lower, upper

c = json.load(open(sys.argv[1]))
N, pages = c["frame_size"], c["pages"]
n = len(pages)
counts = [len(c["serious_by_page"].get(p, [])) for p in pages]
om = [len(c["omissions_by_page"].get(p, [])) for p in pages]
fpc = math.sqrt(1 - n / N)
def ci(xs):
    m, s = mean(xs), stdev(xs)
    h = t975(n - 1) * s / math.sqrt(n) * fpc
    return m, max(0.0, m - h), m + h
k = sum(1 for x in counts if x)
lo, hi = clopper_pearson(k, n)
out = {"n": n, "frame": N, "fpc": round(fpc, 4),
       "serious_per_page": [round(v, 2) for v in ci(counts)], "serious_total": sum(counts),
       "affected_pages": k, "affected_prop": round(k / n, 3), "affected_ci_exact": [round(lo, 3), round(hi, 3)],
       "omissions_per_page": [round(v, 2) for v in ci(om)], "omissions_total": sum(om),
       "combined_per_page": [round(v, 2) for v in ci([a + b for a, b in zip(counts, om)])]}
print(json.dumps(out, indent=1))
