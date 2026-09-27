#!/usr/bin/env python3
"""Pull current FDA labels from openFDA into reports/audit-v2/sources-local/openfda/ (gitignored text).
Usage: python3 scripts/audit/openfda.py            # default drug list
       python3 scripts/audit/openfda.py "name" ... # brand or generic names
"""
import json, sys, pathlib, urllib.request, urllib.parse, re, time
OUT = pathlib.Path(__file__).resolve().parents[2] / "reports/audit-v2/sources-local/openfda"
DEFAULT = ["Botox", "Botox Cosmetic", "Dysport", "Noctiva", "Nocdurna", "desmopressin acetate", "Xiaflex", "Vagifem", "Imvexxy", "Estring",
           "Premarin vaginal cream", "sildenafil", "tadalafil", "vardenafil", "avanafil", "Myrbetriq", "Gemtesa", "Vesicare", "Detrol", "oxybutynin",
           "Caverject", "Edex", "MUSE alprostadil", "Exparel", "bupivacaine", "ropivacaine", "Osphena", "Hiprex", "Elmiron", "imipramine",
           "tranexamic acid", "heparin sodium", "enoxaparin", "Xarelto", "Eliquis", "Provayblue", "fluorescein", "Addyi", "Entereg", "Elidel",
           "Kenalog", "Jelmyto", "Aquasol A", "cidofovir", "Intrarosa", "testosterone undecanoate", "finasteride", "dutasteride", "tamsulosin", "Cialis"]

def fetch(name):
    q = f'openfda.brand_name:"{name}"+openfda.generic_name:"{name}"'
    url = "https://api.fda.gov/drug/label.json?search=" + q.replace(" ", "+").replace('"', "%22") + "&limit=3"
    for i in range(3):
        try:
            return json.load(urllib.request.urlopen(url, timeout=30))["results"]
        except Exception as e:
            err = e; time.sleep(2)
    return []

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    names = sys.argv[1:] or DEFAULT
    for n in names:
        res = fetch(n)
        if not res:
            print("none:", n); continue
        # newest first
        res.sort(key=lambda r: r.get("effective_time", ""), reverse=True)
        lines = []
        for r in res[:2]:
            of = r.get("openfda", {})
            lines.append(f"=== {', '.join(of.get('brand_name', ['?']))} | {', '.join(of.get('generic_name', ['?']))} | effective {r.get('effective_time')} | version {r.get('version')}")
            for k in ("boxed_warning", "indications_and_usage", "dosage_and_administration", "contraindications", "warnings_and_cautions", "warnings", "drug_interactions", "use_in_specific_populations"):
                if k in r:
                    lines.append(f"--- {k}\n" + " ".join(r[k]))
        (OUT / (re.sub(r"[^a-z0-9]+", "-", n.lower()).strip("-") + ".txt")).write_text("\n".join(lines))
        print("ok:", n, res[0].get("effective_time"))
main()
