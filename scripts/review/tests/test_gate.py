#!/usr/bin/env python3
"""Regression tests for the claim gate (schema 2) and orchestrator output validation.

Each test reproduces a weakness found in the October 6, 2026 review of the schema 1 gate.
Run: python3 scripts/review/tests/test_gate.py
"""
import json, os, sys, tempfile, unittest, shutil

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import claims as C  # noqa: E402
import gate as G  # noqa: E402
import apply as A  # noqa: E402

PAGE = "docs/03-clinical-conditions/fixture.mdx"
REFS = """
## References

---

<a id="ref1"></a>1. Smith A, et al. "Trial one." *J Urol.* 2020;1:1. doi:[10.1000/aaa](https://doi.org/10.1000/aaa)
<a id="ref2"></a>2. Jones B, et al. "Trial two." *J Urol.* 2021;2:2. doi:[10.1000/bbb](https://doi.org/10.1000/bbb)
"""


class Fixture(unittest.TestCase):
    def setUp(self):
        self.root = tempfile.mkdtemp()
        os.makedirs(os.path.join(self.root, "docs/03-clinical-conditions"))
        os.makedirs(os.path.join(self.root, "reports/audit-v2"))
        self.saved = (G.ROOT, C.ROOT, G.LEDGER, G.EXCEPTIONS, G.BASELINE)
        G.ROOT = C.ROOT = self.root
        G.LEDGER = os.path.join(self.root, "reports/audit-v2/claims-ledger.json")
        G.EXCEPTIONS = os.path.join(self.root, "reports/audit-v2/claim-exceptions.json")
        G.BASELINE = os.path.join(self.root, "reports/audit-v2/claims-baseline.json")

    def tearDown(self):
        G.ROOT, C.ROOT, G.LEDGER, G.EXCEPTIONS, G.BASELINE = self.saved
        shutil.rmtree(self.root)

    def page(self, body, refs=REFS):
        open(os.path.join(self.root, PAGE), "w").write("---\ntitle: T\n---\n\n# T\n\n" + body + "\n" + refs)
        return G.units_of(PAGE)

    def ledger(self, d):
        json.dump(d, open(G.LEDGER, "w"))

    def failing(self):
        return G.unverified([PAGE])

    def work(self, claims, status=(), findings=(), verdicts=(), applied=None):
        w = os.path.join(self.root, "reports/audit-v2/sources-local/run1")
        for sub in ("batches", "status", "findings", "verdicts"):
            os.makedirs(os.path.join(w, sub), exist_ok=True)
        for j, c in enumerate(claims):
            c["id"] = f"b#{j + 1}"
        json.dump({"page": PAGE, "claims": claims}, open(os.path.join(w, "batches/b.json"), "w"))
        for name, rows in (("status/b.status.jsonl", status), ("findings/b.jsonl", findings), ("verdicts/v1.jsonl", verdicts)):
            open(os.path.join(w, name), "w").write("".join(json.dumps(r) + "\n" for r in rows))
        if applied is not None:
            json.dump(applied, open(os.path.join(w, "applied.json"), "w"))
        return w


class GateTests(Fixture):
    def test_source_needed_high_risk_claim_fails_and_legacy_passes(self):
        u, = self.page("Give 100 mg of drug X.<sup>[[1]](#ref1)</sup>")
        self.assertTrue(u["high_risk"])
        self.ledger({u["key"]: {"s": "source-needed"}})
        self.assertEqual(len(self.failing()), 1)
        self.ledger({u["key"]: {"s": "legacy-source-needed"}})
        self.assertEqual(self.failing(), [])

    def test_membership_alone_never_passes(self):
        u, = self.page("Success was 80% at 5 years.<sup>[[1]](#ref1)</sup>")
        for s in ("flagged", "corrected-unconfirmed", "whatever"):
            self.ledger({u["key"]: {"s": s}})
            self.assertEqual(len(self.failing()), 1, s)

    def test_citation_swap_invalidates_but_renumbering_and_formatting_do_not(self):
        u, = self.page("Success was 80% at 5 years.<sup>[[1]](#ref1)</sup>")
        self.ledger({u["key"]: {"s": "verified-supported", "checks": [{"s": "ok", "run": "r"}]}})
        self.assertEqual(self.failing(), [])
        self.page("Success was 80% at 5 years.<sup>[[2]](#ref2)</sup>")  # same words, different paper
        self.assertEqual(len(self.failing()), 1)
        swapped = REFS.replace("ref1\"></a>1. Smith", "refX").replace("ref2\"></a>2. Jones", "ref1\"></a>1. Jones").replace("refX", "ref2\"></a>2. Smith")
        self.page("Success was **80%**  at 5 years.<sup>[[2]](#ref2)</sup>", swapped)  # renumbered + bold + spacing
        self.assertEqual(self.failing(), [])

    def test_table_header_change_invalidates(self):
        t = "| Outcome | Rate |\n|---|---|\n| Patency | 85%<sup>[[1]](#ref1)</sup> |"
        u, = self.page(t)
        self.ledger({u["key"]: {"s": "verified-supported", "checks": [{"s": "ok", "run": "r"}]}})
        self.assertEqual(self.failing(), [])
        self.page(t.replace("| Outcome | Rate |", "| Outcome | Rate at 1 year |"))
        self.assertEqual(len(self.failing()), 1)

    def test_high_risk_needs_two_independent_checks(self):
        u, = self.page("Give 100 mg of drug X.<sup>[[1]](#ref1)</sup>")
        self.ledger({u["key"]: {"s": "verified-supported", "checks": [{"s": "ok", "run": "a"}, {"s": "ok", "run": "a"}]}})
        self.assertEqual(len(self.failing()), 1)
        self.ledger({u["key"]: {"s": "verified-supported", "checks": [{"s": "ok", "run": "a"}, {"s": "ok", "run": "b"}]}})
        self.assertEqual(self.failing(), [])

    def test_owner_exception_needs_owner_and_unexpired_date(self):
        u, = self.page("Give 100 mg of drug X.<sup>[[1]](#ref1)</sup>")
        json.dump({u["key"]: {"owner": "N", "decision": "x", "expires": "2000-01-01"}}, open(G.EXCEPTIONS, "w"))
        self.assertEqual(len(self.failing()), 1)
        json.dump({u["key"]: {"owner": "N", "decision": "x", "expires": "2999-01-01"}}, open(G.EXCEPTIONS, "w"))
        self.assertEqual(self.failing(), [])

    def test_ok_without_opened_source_is_not_support(self):
        u, = self.page("Success was 80% at 5 years.<sup>[[1]](#ref1)</sup>")
        w = self.work([dict(u)], status=[{"claim_id": "b#1", "status": "ok", "source_opened": "none"}])
        G.record(w)
        self.assertEqual(len(self.failing()), 1)
        w = self.work([dict(u)], status=[{"claim_id": "b#1", "status": "ok", "source_opened": "PMID 1", "access": "abstract", "quote": "80% at five years"}])
        G.record(w)
        self.assertEqual(self.failing(), [])

    def test_check_of_since_changed_claim_is_stale(self):
        u, = self.page("Success was 80% at 5 years.<sup>[[1]](#ref1)</sup>")
        self.page("Success was 70% at 5 years.<sup>[[1]](#ref1)</sup>")
        w = self.work([dict(u)], status=[{"claim_id": "b#1", "status": "ok", "source_opened": "PMID 1", "quote": "q"}])
        n, _ = G.record(w)
        self.assertEqual(n["stale"], 1)
        self.assertEqual(len(self.failing()), 1)

    def test_rejected_correction_is_not_support_for_the_original(self):
        u, = self.page("Success was 80% at 5 years.<sup>[[1]](#ref1)</sup>")
        f = {"page": PAGE, "claim_id": "b#1", "severity": "high", "finding": "wrong endpoint", "edit": None}
        w = self.work([dict(u)], status=[{"claim_id": "b#1", "status": "error", "source_opened": "PMID 1"}],
                      findings=[f], verdicts=[{"page": PAGE, "finding": "wrong endpoint", "verdict": "reject", "reason": "fine"}])
        G.record(w)
        self.assertEqual(len(self.failing()), 1)
        w = self.work([dict(u)], status=[{"claim_id": "b#1", "status": "error", "source_opened": "PMID 1"}], findings=[f],
                      verdicts=[{"page": PAGE, "finding": "wrong endpoint", "verdict": "reject", "original_supported": True,
                                 "source_opened": "PMID 1", "quote": "80% at five years"}])
        G.record(w)
        self.assertEqual(self.failing(), [])

    def test_style_cannot_close_a_dose(self):
        u, = self.page("Give 100 mg of drug X.<sup>[[1]](#ref1)</sup>")
        G.record(self.work([dict(u)], status=[{"claim_id": "b#1", "status": "style", "source_opened": "none"}]))
        self.assertEqual(len(self.failing()), 1)

    def test_applied_edit_needs_final_text_check_and_no_fuzzy_closure(self):
        old = "Success was 80% at 5 years.<sup>[[1]](#ref1)</sup>"
        u, = self.page(old)
        new = "Success was 70% at 5 years.<sup>[[1]](#ref1)</sup>"
        v = {"page": PAGE, "finding": "wrong value", "verdict": "agree", "edit": {"old": old, "new": new}}
        self.page(new + " Patency was 90% at 1 year.<sup>[[1]](#ref1)</sup>")  # second sentence only resembles the edit
        w = self.work([dict(u)], verdicts=[v], applied={A.fid(v): {"status": "applied"}})
        n, _ = G.record(w)
        self.assertEqual(n["corrected-unconfirmed"], 1)
        bad = self.failing()
        self.assertEqual(len(bad), 2)
        self.assertEqual(G.load(G.LEDGER, {})[bad[0][1]["key"]]["s"], "corrected-unconfirmed")
        fixed = G.units_of(PAGE)[0]
        G.record(self.work([dict(fixed)], status=[{"claim_id": "b#1", "status": "ok", "source_opened": "PMID 1", "quote": "70%"}]))
        self.assertEqual(G.load(G.LEDGER, {})[fixed["key"]]["s"], "verified-corrected")

    def test_new_unsourced_claim_fails_and_style_cannot_close_a_number(self):
        u, = self.page("Success was 80% at 5 years.<sup>[[1]](#ref1)</sup>")
        G.record(self.work([dict(u)], status=[{"claim_id": "b#1", "status": "unverifiable", "source_opened": "none"}]))
        self.assertEqual(len(self.failing()), 1)
        G.record(self.work([dict(u)], status=[{"claim_id": "b#1", "status": "style", "source_opened": "none"}]))
        self.assertEqual(len(self.failing()), 1)
        self.ledger({u["key"]: {"s": "verified-supported"}})  # status without a supporting check on record
        self.assertEqual(len(self.failing()), 1)

    def test_confirmed_finding_flags_a_previously_supported_claim(self):
        u, = self.page("Success was 80% at 5 years.<sup>[[1]](#ref1)</sup>")
        f = {"page": PAGE, "claim_id": "b#1", "severity": "high", "finding": "wrong endpoint", "edit": None}
        args = dict(status=[{"claim_id": "b#1", "status": "error", "source_opened": "PMID 1", "quote": "q"}], findings=[f],
                    verdicts=[{"page": PAGE, "finding": "wrong endpoint", "verdict": "no_edit", "reason": "real"}])
        self.ledger({u["key"]: {"s": "verified-supported", "checks": [{"s": "ok", "run": "r"}]}})
        G.record(self.work([dict(u)], **args))
        self.assertEqual(len(self.failing()), 1)
        # unchanged legacy teaching stays published but is recorded as disputed, never as supported
        self.ledger({u["key"]: {"s": "legacy-supported"}})
        G.record(self.work([dict(u)], **args))
        self.assertEqual(G.load(G.LEDGER, {})[u["key"]]["s"], "legacy-disputed")
        # a supported claim whose only problem is citation placement is not flagged
        self.ledger({u["key"]: {"s": "verified-supported", "checks": [{"s": "ok", "run": "r"}]}})
        G.record(self.work([dict(u)], **dict(args, findings=[dict(f, category="attribution", supported=True)])))
        self.assertEqual(self.failing(), [])

    def test_header_spacing_is_formatting_but_section_and_link_are_meaning(self):
        row = "| Patency | 85%<sup>[[1]](#ref1)</sup> |"
        a, = self.page("| Outcome | Rate |\n|---|---|\n" + row)
        b, = self.page("|Outcome|Rate|\n|---|---|\n|Patency|85%<sup>[[1]](#ref1)</sup>|")
        self.assertEqual(a["key"], b["key"])
        x, y = self.page("## Cystitis\n\nGive 100 mg daily.<sup>[[1]](#ref1)</sup>\n\n## Pyelonephritis\n\nGive 100 mg daily.<sup>[[1]](#ref1)</sup>")
        self.assertNotEqual(x["key"], y["key"])
        p, = self.page("Per the [guideline](https://a.org/v1), give 100 mg daily.")
        q, = self.page("Per the [guideline](https://a.org/v2), give 100 mg daily.")
        self.assertNotEqual(p["key"], q["key"])

    def test_exception_needs_a_decision(self):
        u, = self.page("Give 100 mg of drug X.<sup>[[1]](#ref1)</sup>")
        json.dump({u["key"]: {"owner": "N", "expires": "2999-01-01"}}, open(G.EXCEPTIONS, "w"))
        self.assertEqual(len(self.failing()), 1)

    def test_incomplete_batch_records_nothing_and_duplicate_ids_refuse(self):
        u, v = self.page("Success was 80% at 5 years.<sup>[[1]](#ref1)</sup> Patency was 90% at 1 year.<sup>[[1]](#ref1)</sup>")
        n, _ = G.record(self.work([dict(u), dict(v)], status=[{"claim_id": "b#1", "status": "ok", "source_opened": "PMID 1", "quote": "q"}]))
        self.assertEqual(n["ok"], 0)
        self.assertEqual(len(self.failing()), 2)
        w = self.work([dict(u)])
        json.dump({"page": PAGE, "claims": [dict(u, id="b#1")]}, open(os.path.join(w, "batches/c.json"), "w"))
        with self.assertRaises(SystemExit):
            G.record(w)

    def test_baseline_command_refuses(self):
        sys.argv = ["gate.py", "baseline"]
        with self.assertRaises(SystemExit) as e:
            G.main()
        self.assertIn("no bulk baseline", str(e.exception))


class OrchestratorTests(Fixture):
    def setUp(self):
        super().setUp()
        import orchestrate as O
        self.O = O
        self.saved_o = (O.WORK, O.CLAIMS)
        O.WORK, O.CLAIMS = os.path.join(self.root, "work"), True
        os.makedirs(os.path.join(O.WORK, "batches"))
        os.makedirs(os.path.join(O.WORK, "findings"))
        json.dump({"page": PAGE, "claims": [{"id": "u#1"}, {"id": "u#2"}]}, open(os.path.join(O.WORK, "batches/u.json"), "w"))
        self.job = os.path.join(self.root, "job")
        os.makedirs(self.job)

    def tearDown(self):
        self.O.WORK, self.O.CLAIMS = self.saved_o
        super().tearDown()

    def out(self, findings, status):
        open(os.path.join(self.job, "u.jsonl"), "w").write(findings)
        if status is not None:
            open(os.path.join(self.job, "u.status.jsonl"), "w").write(status)
        return self.O.review_problem(self.job, "claims/u")

    def test_empty_truncated_partial_or_duplicate_output_is_not_done(self):
        ok1 = '{"claim_id": "u#1", "status": "ok", "source_opened": "PMID 1"}\n'
        ok2 = '{"claim_id": "u#2", "status": "unverifiable", "source_opened": "none"}\n'
        self.assertIsNotNone(self.out("", None))
        self.assertIsNotNone(self.out("", ""))
        self.assertIsNotNone(self.out("", ok1))
        self.assertIsNotNone(self.out("", ok1 + ok1))
        self.assertIsNotNone(self.out("", ok1 + '{"claim_id": "u#2", "stat'))
        self.assertIsNotNone(self.out("", ok1 + '{"claim_id": "u#2", "status": "error", "source_opened": "PMID 2"}\n'))
        self.assertIsNone(self.out("", ok1 + ok2))

    def test_verify_needs_a_verdict_for_every_consequential_finding(self):
        open(os.path.join(self.O.WORK, "findings/u.jsonl"), "w").write(
            json.dumps({"page": PAGE, "finding": "a", "severity": "high"}) + "\n" + json.dumps({"page": PAGE, "finding": "b", "severity": "medium"}) + "\n")
        open(os.path.join(self.job, "verdicts.jsonl"), "w").write(json.dumps({"page": PAGE, "finding": "a", "verdict": "agree"}) + "\n")
        self.assertIsNotNone(self.O.verify_problem(self.job, ["claims/u"]))
        open(os.path.join(self.job, "verdicts.jsonl"), "a").write(json.dumps({"page": PAGE, "finding": "b", "verdict": "reject"}) + "\n")
        self.assertIsNone(self.O.verify_problem(self.job, ["claims/u"]))


if __name__ == "__main__":
    unittest.main()
