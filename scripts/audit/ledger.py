#!/usr/bin/env python3
"""Rebuild the audit-v2 open-claim ledger from status.json.

Usage: python3 scripts/audit/ledger.py [--stats]

Reads reports/audit-v2/status.json, extracts every open claim from the page
notes, and closes only claims with an explicit verdict in verdicts.json. Local
source text can suggest a candidate match but cannot close a claim. Assigns
severity (S1-S5) and disposition, and writes reports/audit-v2/ledger.md.
Prints only counts.

Verdicts are keyed by the first 16 hex characters of SHA-1 over the full page
path from status.json, a newline, and claim text normalized by stripping outer
whitespace, collapsing inner whitespace to one space, and casefolding. Each
verdict record has page, claim, verdict (supported/corrected/unsupported/removed),
source, locator, date (YYYY-MM-DD), and by fields. A valid verdict plus nonempty
source and locator closes the claim; a candidate source match does not.
"""
import collections, hashlib, json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parents[2]
AUD = ROOT / "reports/audit-v2"
LOCAL = AUD / "sources-local"
VERDICTS = {"supported", "corrected", "unsupported", "removed"}

MARK = re.compile(
    r"\b(?:Not checkable|Not checked|Unverified|Not verified|Not confirmed|Unconfirmed)\b[^:.]{0,40}:", re.I)
SENT_OPEN = re.compile(
    r"(?:not checkable|not checked|unverified|abstracts? only|abstract-only|not verified|not confirmed|unconfirmed)", re.I)
END = re.compile(r"\.(?:\s+(?=[A-Z])|$)")


def split_top(s):
    """Split on commas/semicolons outside parentheses."""
    out, depth, cur = [], 0, []
    for ch in s:
        if ch in "([":
            depth += 1
        elif ch in ")]":
            depth = max(0, depth - 1)
        if ch in ",;" and depth == 0:
            out.append("".join(cur)); cur = []
        else:
            cur.append(ch)
    out.append("".join(cur))
    return [x.strip(" .") for x in out if len(x.strip(" .")) > 3]


def sentence_end(s, start):
    depth = 0
    for i in range(start, len(s)):
        ch = s[i]
        if ch in "([":
            depth += 1
        elif ch in ")]":
            depth = max(0, depth - 1)
        elif ch == "." and depth == 0 and (i + 1 == len(s) or (s[i + 1] == " " and i + 2 < len(s) and s[i + 2].isupper())):
            return i
    return len(s)


def extract(note):
    claims, covered = [], []
    for m in MARK.finditer(note):
        end = sentence_end(note, m.end())
        seg = note[m.end():end]
        covered.append((m.start(), end))
        for c in split_top(seg):
            c = re.sub(r"^(?:and|or)\s+", "", c)
            if len(c) > 3 and not re.match(r"(?:voice pass|pass 1)", c, re.I):
                claims.append(c)
    # sentences with open wording outside the marker segments (abstract only, etc.)
    pos = 0
    for sm in SENT_OPEN.finditer(note):
        if any(a <= sm.start() <= b for a, b in covered):
            continue
        st = max(note.rfind(". ", 0, sm.start()) + 2, 0)
        en = sentence_end(note, sm.end())
        sent = note[st:en]
        # keep only the clause holding the trigger
        for cl in split_top(sent):
            if SENT_OPEN.search(cl) and cl not in claims:
                claims.append(cl)
    return claims


# ---- severity ----
S1 = re.compile(r"\b(dos(?:e|es|ing|age)|mg|mcg|contraindicat\w*|boxed|black.box|warning|toxicity|LAST\b|allerg\w*|interaction|anticoag\w*|retinal|pregnan\w*|lactat\w*|overdose|antidote|hemorrhage risk|dose)\b", re.I)
S5 = re.compile(r"\b(histor\w*|eponym\w*|origin|first described|attribut\w*|biograph\w*|named (?:after|for)|lineage|priority|dates? of|birth|obituar\w*|coined|inventor|invented)\b", re.I)
S2 = re.compile(r"\b(guideline|grade|recommendation|strength|statement|consensus|position|level of evidence|LE\b|EAU|AUA|ACOG|ASCRS|NICE|AUGS|IUGA|SUFU|WPATH|ASRA|IDSA|ADA\b|wording|strong|weak|conditional)\b", re.I)
S3 = re.compile(r"\b(technique|IFU|manual|catheter|Fr\b|French|cm\b|mm\b|size|step|device|operating room|catalog\w*|specification\w*|textbook|dimension\w*|anatomy|instrument|suture|needle|stent|balloon|flap|graft|incision|port|dissect\w*|placement|tunnel\w*)\b", re.I)
S4 = re.compile(r"\b(abstract\w*|rate|\d+\s?%|trial|cohort|series|meta-analysis|full text|RCT|figure|outcome\w*|patients|n\s?=)\b", re.I)


LABEL = re.compile(r"(?<!strength )(?<!grade )(?<!reference )(?<!statement \d\d )(?<!statement \d )\blabel\b(?! (?:added|updated|now))", re.I)


def severity(c):
    if S1.search(c) or (LABEL.search(c) and not re.search(r"strength|grade|statement \d+ label", c, re.I)): return "S1"
    if S5.search(c): return "S5"
    if S2.search(c): return "S2"
    if S3.search(c): return "S3"
    return "S4"


# ---- local sources ----
def norm(t):
    return re.sub(r"\s+", " ", t.lower())

FILES = {}
for f in LOCAL.rglob("*.txt"):
    FILES[f.name.lower()] = f
_cache = {}
def text(fname):
    if fname not in _cache:
        _cache[fname] = norm(FILES[fname].read_text(errors="ignore"))
    return _cache[fname]

# (name, claim regex, filename substrings)
SUPPLIED = [
    ("EAU Urological Infections 2026", r"EAU.{0,25}(?:infection)|urological infections", ["urological-infections", "eau-urological-infections"]),
    ("EAU Urethral Strictures 2026", r"EAU.{0,25}strictur", ["eau-urethral-strictures"]),
    ("EAU Neuro-Urology 2026", r"EAU.{0,25}neuro", ["eau-neuro-urology"]),
    ("EAU Non-Neurogenic Female LUTS 2026", r"EAU.{0,25}female LUTS", ["eau-non-neurogenic-female"]),
    ("EAU Male LUTS 2026", r"EAU.{0,25}male LUTS", ["non-neurogenic-male-luts"]),
    ("EAU Chronic Pelvic Pain 2026", r"EAU.{0,25}pelvic pain", ["chronic-pelvic-pain"]),
    ("EAU MIBC 2026", r"EAU.{0,25}(?:MIBC|bladder cancer|muscle)", ["muscle-invasive"]),
    ("EAU Urological Trauma 2026", r"EAU.{0,25}trauma", ["urological-trauma"]),
    ("EAU Paediatric 2026", r"EAU.{0,25}paediatric", ["paediatric-urology"]),
    ("EAU Sexual and Reproductive Health 2026", r"EAU.{0,25}(?:sexual|reproductive|priapism|peyronie)", ["sexual-and-reproductive"]),
    ("AUA IPT 2024", r"\bIPT\b|incontinence.{0,10}prostatectomy", ["aua-ipt"]),
    ("AUA OAB 2024", r"AUA.{0,20}OAB|OAB guideline", ["aua-oab"]),
    ("AUA SUI 2023", r"AUA.{0,20}SUI|SUI guideline", ["aua-sui"]),
    ("AUA Urethral Stricture 2023", r"AUA.{0,20}strictur", ["aua-urethral-stricture", "aua-stricture"]),
    ("AUA rUTI 2025", r"AUA.{0,20}(?:rUTI|UTI)|rUTI guideline", ["aua-rutI"]),
    ("AUA BPH 2026", r"AUA.{0,20}BPH", ["aua-bph"]),
    ("AUA ED 2018", r"AUA.{0,20}\bED\b|erectile dysfunction guideline", ["aua-ed"]),
    ("AUA Testosterone 2018", r"AUA.{0,20}testosterone", ["aua-testosterone"]),
    ("AUA Peyronie's 2015", r"AUA.{0,20}peyronie", ["peyronies-disease"]),
    ("AUA IC/BPS 2022", r"IC/BPS|interstitial cystitis", ["icbps_guideline", "aua-ic-bps"]),
    ("AUA NLUTD 2021", r"NLUTD|neurogenic lower", ["aua-sufu-nlutd"]),
    ("AUA Microhematuria", r"microhematuria", ["mh_unabridged"]),
    ("AUA/ASRM Infertility", r"infertility", ["male_infertility"]),
    ("AUA/ASCO/SUO MIBC 2024", r"AUA.{0,25}MIBC|MIBC.{0,15}(?:2024|guideline)", ["mibc_unabridged"]),
    ("AUA antimicrobial prophylaxis 2019", r"antimicrobial prophylaxis|Lightner", ["lightner", "aua-bps"]),
    ("AUA/SUFU/AUGS GSM 2025", r"\bGSM\b|genitourinary syndrome", ["aua-sufu-augs-gsm", "genitourinary_guidelines"]),
    ("AUA VUR", r"\bVUR\b|vesicoureteral", ["vesicoureteral"]),
    ("NICE NG123", r"NG123", ["nice-ng123"]),
    ("NICE NG112/NG239", r"NG112|NG239", ["urinary-tract-infection-recurrent"]),
    ("NICE B12 (NG239)", r"NICE.{0,20}B12|B12 deficiency", ["vitamin-b12-deficiency"]),
    ("ADA Standards 2026", r"\bADA\b.{0,20}(?:hospital|2026|standards)", ["dc26s016"]),
    ("AHA/ACC 2024 perioperative", r"AHA/ACC|perioperative cardiovascular", ["thompson-et-al"]),
    ("ESE/Endocrine Society 2024 glucocorticoid", r"\bESE\b|glucocorticoid", ["dgae250"]),
    ("Endocrine Society 2017/2018", r"Endocrine Society", ["jc.2017", "jc.2018"]),
    ("WPATH SOC 8", r"WPATH", ["standards_of_care"]),
    ("ASRM MAC2021", r"\bASRM\b|MAC2021", ["mac2021"]),
    ("WHO FGM 2025", r"\bWHO\b.{0,20}(?:FGM|female genital)|female genital mutilation", ["9789240107281"]),
    ("IDSA ABU 2019", r"IDSA.{0,25}(?:bacteriuria|ABU)|asymptomatic bacteriuria", ["ciy1121"]),
    ("RCOG GTG 29", r"RCOG|GTG.?29", ["gtg-29"]),
    ("ASRA 5th edition 2025", r"\bASRA\b(?!.{0,15}LAST)", ["rapm-2024-105766"]),
    ("ASRA LAST checklist", r"\bLAST\b|local anesthetic systemic", ["local-anesthetic-systemic-toxicity"]),
    ("Axonics manuals", r"Axonics", ["axonics", "implant_manual"]),
    ("Optilume IFUs", r"Optilume", ["optilume", "urethral-dcb"]),
    ("AMS 800 IFU/ORM", r"AMS.?800", ["ams_800", "ams800", "ams_800_orm"]),
    ("AMS 700/Tactra IFU/ORM", r"AMS.?700|Tactra|Tenacio", ["ams700", "ams-700", "tactra", "ams700"]),
    ("Rezum IFU", r"Rezum", ["rezum"]),
    ("TRAVERSE (NEJM 2023)", r"TRAVERSE", ["nejmoa2215025"]),
    ("MASTER 24-month abstract", r"(?-i:\bMASTER\b).{0,40}24", ["the_24-mo"]),
    ("Erickson LSE 2020", r"Erickson|LSE (?:classification|staging)", ["erickson"]),
    ("Larson 2013 (Michigan four-wall)", r"Larson", ["nihms-521158"]),
    ("Haylen 2011 IUGA/ICS", r"Haylen|IUGA.{0,5}ICS.{0,20}(?:terminology|complication)", ["s00192-021-04742-w"]),
    ("IUGA-ICS fistula consensus", r"fistula.{0,30}consensus|IUGA-ICS", ["obstetric_urinary_pelvic_floor_fistula"]),
    ("Mid-urethral sling position statements", r"mid-?urethral sling.{0,20}(?:position|statement)", ["position_statement_on_mid", "augs-sufu-pos", "ugsa-ranzcog"]),
    ("PTNS documents (Urgent PC IFU, K132561, UCSD)", r"\bPTNS\b|Urgent PC|K132561|NURO", ["intl4288", "k132561", "sp086"]),
    ("Revi patient therapy guide", r"\bRevi\b", ["revi-patient"]),
    ("InterStim MRI checklist (UK)", r"InterStim", ["intertstim-mri"]),
    ("ACS GU injury 2025", r"\bACS\b.{0,20}(?:injury|trauma|GU)", ["genitourinary_guidelines"]),
    ("Cochrane cranberries 2023", r"cranberr", ["cochrane-cd001321"]),
    ("WikiGuidelines UTI 2024 (Nelson)", r"Nelson|WikiGuideline", ["nelson-2024"]),
    ("ASHP 2013 prophylaxis", r"\bASHP\b", ["ashp-antimicrobial"]),
    ("ASCRS diverticular chapter", r"diverticul", ["colonic_diverticular"]),
    ("Frazier 2024 AUS review", r"Frazier", ["11780", "3040163"]),
]
SUPPLIED = [(n, re.compile(rx, re.I), subs) for n, rx, subs in SUPPLIED]

# ---- waiting on source (not supplied) ----
WAIT_SRC = [
    ("Laor 1995 (Fournier severity index)", r"Laor|FGSI|Fournier.{0,30}(?:score|index|sodium|bicarb)"),
    ("Biardeau 2016 ICS AUS consensus", r"Biardeau|ICS.{0,20}AUS"),
    ("AMS 800 operating room manual 92116967", r"92116967|AMS.?800.{0,30}(?:fill|tandem|ORM|operating room)"),
    ("Coloplast Titan/Titan Touch/Genesis IFUs", r"Coloplast|(?-i:\bTitan\b|\bGenesis\b)"),
    ("ACOG documents (CO 694, PB 214, 155, 213, 210, 198, 218, CO 795, 823)", r"\bACOG\b"),
    ("ASCRS 2020 left-sided diverticulitis guideline", r"ASCRS.{0,30}diverticulitis|left-sided diverticulitis"),
    ("Revi surgical technique guide", r"Revi.{0,30}(?:technique|surgical)"),
    ("ProACT IFU", r"ProACT"),
    ("2025 AUGS-IUGA complications update", r"AUGS-IUGA.{0,30}complication"),
    ("Full ASRA LAST advisory (Neal 2018)", r"Neal.{0,20}2018|LAST advisory|30.minute"),
    ("US InterStim/Revi/eCoin MRI manuals", r"MRI (?:manual|guideline|condition)"),
    ("FDA SSEDs (Optilume, ProACT, Altaviva)", r"SSED|Altaviva"),
    ("MASTER 12-month paper (Eur Urol 2021, open access)", r"(?-i:\bMASTER\b)"),
    ("EVA trial", r"(?-i:\bEVA\b)"),
    ("ASPIRe / OPTIMAL / E-OPTIMAL", r"(?-i:ASPIRe|OPTIMAL)"),
    ("AUS series (Cotte 2023, Phe 2017, Peyronnet 2019)", r"Cotte|Ph[eé]\b|Peyronnet"),
    ("Original urethroplasty technique papers", r"Jordan 2007|Morey 2001|Wee and Joseph|Yii|Niranjan|Blandy 1968|Asopa|Kulkarni 2009|Sa/Xu"),
    ("Trimix efficacy series", r"trimix"),
    ("Paywalled batch (NEJM 2021/2024/2012/2019, Lancet 2017)", r"Wu NEJM|Davis NEJM|Le Cleach|Goodman NEJM|Diamond Lancet"),
    ("Drug labels (openFDA sweep)", r"\b(?:label|package insert|prescribing information|Botox|onabotulinum|desmopressin|Nocdurna|Xiaflex|collagenase|vaginal estrogen|Vagifem|Imvexxy|estradiol|sildenafil|tadalafil|vardenafil|mirabegron|vibegron|alprostadil|bupivacaine|Elmiron|pentosan)\b"),
]
WAIT_SRC = [(n, re.compile(rx, re.I)) for n, rx in WAIT_SRC]

# ---- accepted limitation (plan's dropped list) ----
ACCEPT = [
    ("instrument catalogs / manufacturer sell sheets", r"catalog|catalogue|sell.?sheet|Sklar|Teleflex|Aesculap|Aspen|CooperSurgical|KLS|STERIS|B\. Braun|product page|manufacturer (?:web|site)"),
    ("Intuitive manuals not obtainable", r"Intuitive|da Vinci manual|Xi manual|SP manual"),
    ("history primary sources not obtainable", r"biograph|obituar|eponym|first described|historical|originally (?:described|reported)|lineage|attribut"),
    ("NCCN not obtainable", r"\bNCCN\b"),
    ("ATOMS/Argus/Remeex IFUs not obtainable", r"ATOMS|Argus|Remeex|Virtue"),
    ("web page/StatPearls content, not a primary source", r"StatPearls|web page|website|webpage|Iowa protocol|WOCN|Wikipedia|UpToDate"),
]
ACCEPT = [(n, re.compile(rx, re.I)) for n, rx in ACCEPT]

# ---- waiting on decision (needed-from-user.md numbers) ----
DECIDE = [
    (32, r"abuse assessment|forensic|genital.{0,15}trauma.{0,30}(?:abuse|exam under)"),
    (29, r"steroids?\.mdx|Table 8|glucocorticoid.{0,20}(?:intensity|default)"),
    (33, r"pentosan|Elmiron"),
    (34, r"GreenLight"),
    (30, r"female urethrectomy"),
    (28, r"Spectra|TUBE"),
    (31, r"Mainz.{0,10}II|mainz-pouch-ii"),
    ("A(a)", r"PTNS.{0,30}(?:label|US|fecal)|Urgent PC.{0,30}fecal"),
    ("A(b)", r"undated|no year.{0,30}diverticular"),
    (35, r"US Axonics|Axonics.{0,20}(?:US|Canadian)"),
    ("A(e)", r"(?-i:\bMASTER\b).{0,40}(?:SAE|serious adverse)"),
    (27, r"evidenceNote"),
]
DECIDE = [(n, re.compile(rx, re.I)) for n, rx in DECIDE]

CITE = re.compile(r"([A-Z][A-Za-z'\-]+(?: [A-Z][A-Za-z]+){0,2}(?: et al\.?)?,? \(?(?:19|20)\d\d)")
ORG = re.compile(r"\b(EAU|AUA|ASCRS|AUGS|IUGA|SUFU|NICE|WPATH|ISSM|SMSNA|ICS|ICI|FDA|CMS|CDC|WHO|ACS|ASCO|NCCN|ACOG|ASRA|ASPEN|SVS|ESPU|AAP|ESGE|EHS|WSES|ACC|AHA)\b")


def token_check(claim, files):
    toks = set(re.findall(r"\d+(?:\.\d+)?%?", claim)) | set(w.lower() for w in re.findall(r"[A-Za-z]{7,}", claim))
    toks = {t for t in toks if len(t) >= 2 and t not in ("checkable", "abstract", "verified", "guideline", "recommendation")}
    if len(toks) < 2:
        return False
    body = " ".join(text(f) for f in files)
    hit = sum(1 for t in toks if t in body)
    return hit / len(toks) >= 0.75


def files_for(subs):
    out = []
    for name in FILES:
        if any(s.lower() in name for s in subs):
            out.append(name)
    return out


def claim_id(page, claim):
    normalized = re.sub(r"\s+", " ", claim).strip().casefold()
    return hashlib.sha1(f"{page}\n{normalized}".encode("utf-8")).hexdigest()[:16]


def load_verdicts():
    path = AUD / "verdicts.json"
    verdicts = json.loads(path.read_text()) if path.exists() else {}
    if not isinstance(verdicts, dict):
        raise ValueError(f"{path} must contain a JSON object keyed by claim id")
    return verdicts


def is_closed(verdict):
    return (isinstance(verdict, dict)
            and isinstance(verdict.get("verdict"), str) and verdict["verdict"] in VERDICTS
            and isinstance(verdict.get("source"), str) and bool(verdict["source"].strip())
            and isinstance(verdict.get("locator"), str) and bool(verdict["locator"].strip()))


def build_rows():
    d = json.loads((AUD / "status.json").read_text())
    verdicts = load_verdicts()
    rows, closed = [], []
    for page, v in d.items():
        note = v.get("note", "") if isinstance(v, dict) else ""
        for c in extract(note):
            short = page.replace("docs/", "")
            if is_closed(verdicts.get(claim_id(page, c))):
                closed.append((short, c))
                continue
            candidate = []
            for _, rx, subs in SUPPLIED:
                if rx.search(c):
                    fs = files_for(subs)
                    if fs and token_check(c, fs):
                        candidate = fs
                        break
            sev = severity(c)
            src, disp = None, None
            for n in ACCEPT:
                if n[1].search(c):
                    src, disp = n[0], "accepted-limitation"; break
            if not disp:
                for num, rx in DECIDE:
                    if rx.search(c):
                        src, disp = f"decision {num}", "waiting-on-decision"; break
            if not disp:
                for n in WAIT_SRC:
                    if n[1].search(c):
                        src, disp = n[0], "waiting-on-source"; break
            if not disp:
                m = CITE.search(c)
                if m:
                    src = m.group(1).replace(",", "")
                else:
                    o = ORG.search(c)
                    src = f"{o.group(1)} document (unnamed)" if o else "unnamed: primary paper, textbook or page-level detail"
                if sev == "S5":
                    disp = "accepted-limitation"; src = src if not src.startswith("unnamed") else "history / eponym detail, low priority"
                else:
                    disp = "waiting-on-source"
            rows.append(dict(sev=sev, disp=disp, src=src, page=short, claim=c, candidate=candidate))
    return rows, closed


def main():
    rows, closed = build_rows()
    write(rows, closed)
    cnt = collections.Counter(r["sev"] for r in rows)
    dc = collections.Counter(r["disp"] for r in rows)
    print("open", len(rows), dict(sorted(cnt.items())), dict(dc),
          "candidate-match", sum(bool(r["candidate"]) for r in rows),
          "closed-by-verdict", len(closed))
    print("S1 waiting-on-source or decision:", sum(1 for r in rows if r["sev"] == "S1" and r["disp"] != "accepted-limitation"))


def write(rows, closed):
    cnt = collections.Counter(r["sev"] for r in rows)
    dc = collections.Counter(r["disp"] for r in rows)
    pages = {r["page"] for r in rows}
    L = ["# Audit v2 ledger (open claims)", "",
         "Generated by `python3 scripts/audit/ledger.py` from `status.json` (September 26, 2026). Regenerate after each batch; do not edit by hand.", "",
         f"**{len(rows)} open claims on {len(pages)} pages.** {sum(bool(r['candidate']) for r in rows)} open with a candidate source match; {len(closed)} closed by explicit verdict.", "",
         "| Severity | Meaning | Open claims |", "|---|---|---|"]
    meaning = {"S1": "dose, contraindication, safety", "S2": "guideline grade or wording", "S3": "technique, IFU, device detail", "S4": "abstract-only or number", "S5": "history, eponym"}
    for s in ("S1", "S2", "S3", "S4", "S5"):
        L.append(f"| {s} | {meaning[s]} | {cnt.get(s, 0)} |")
    L += ["", "| Disposition | Claims |", "|---|---|"]
    for k in ("waiting-on-source", "waiting-on-decision", "accepted-limitation"):
        L.append(f"| {k} | {dc.get(k, 0)} |")
    L += ["", "Severity is keyword-assigned (S1 checked first, then S5, S2, S3, S4); treat it as a triage order, not a clinical judgment. "
           "Decision numbers refer to `needed-from-user.md` (section A) and `NEXT-PHASE-PLAN.md`.", ""]
    for sev in ("S1", "S2", "S3", "S4", "S5"):
        sub = [r for r in rows if r["sev"] == sev]
        L += [f"## {sev}: {meaning[sev]} ({len(sub)})", ""]
        by = collections.defaultdict(list)
        for r in sub:
            by[(r["disp"], r["src"])].append(r)
        order = {"waiting-on-decision": 0, "waiting-on-source": 1, "accepted-limitation": 2}
        for (disp, src), rs in sorted(by.items(), key=lambda kv: (order[kv[0][0]], -len(kv[1]), kv[0][1])):
            pg = collections.defaultdict(list)
            for r in rs:
                pg[r["page"]].append(r)
            L.append(f"### {src} — {disp} ({len(rs)} claims, {len(pg)} pages)")
            for p, cl in sorted(pg.items()):
                shown = cl[:3] + [r for r in cl[3:] if r["candidate"]]
                txt = "; ".join(
                    r["claim"][:110] + (f" (candidate source match: {', '.join(r['candidate'])})" if r["candidate"] else "")
                    for r in shown)
                hidden = len(cl) - len(shown)
                txt += f" (+{hidden} more)" if hidden else ""
                L.append(f"- `{p}`: {txt}")
            L.append("")
    (AUD / "ledger.md").write_text("\n".join(x.rstrip() for x in L).rstrip() + "\n")


if __name__ == "__main__":
    main()
