"""Regression checks for false audit-completion records."""
import copy
import hashlib
import importlib.util
import tempfile
import unittest
import sys
from pathlib import Path
sys.dont_write_bytecode = True

spec = importlib.util.spec_from_file_location("audit_checker", Path(__file__).with_name("check-audit-batch.py"))
checker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checker)


class BatchChecks(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root / "docs").mkdir()
        (self.root / "reports").mkdir()
        (self.root / "docs/test.mdx").write_text("Useful teaching\n")
        (self.root / "reports/review.md").write_text("Actual review record\n")
        self.batch = {
            "batchId": "test", "reviewedAt": "2026-09-20", "model": "gpt-5.6-sol", "reasoningEffort": "high",
            "sources": [{"id": "s1", "url": "https://example.org/ifu", "version": "v1", "access": "manufacturer-document", "readScope": "Instructions sections 1-4"}],
            "pages": [{"file": "docs/test.mdx", "sourceSha256": hashlib.sha256((self.root / "docs/test.mdx").read_bytes()).hexdigest(),
                       "status": "checked", "fullTextRead": True, "readScope": "Full current MDX", "clinicalVerificationComplete": False,
                       "auditDisposition": "partial", "coverage": {k: "Mapped; see report" for k in checker.COVERAGE},
                       "claimChecks": [{"claim": "Device assembly", "sourceIds": ["s1"], "locator": "IFU section 2", "verdict": "supported", "note": "Model matches"}],
                       "unresolvedClaims": ["Compatibility appendix unavailable"], "preservationReview": "No removed content", "reviewCheck": "pending", "reviewRecord": "reports/review.md"}]
        }

    def errors(self):
        return checker.validate(self.batch, self.root)

    def test_honest_partial_manufacturer_record_is_allowed(self):
        self.assertEqual(self.errors(), [])

    def test_stale_page_cannot_receive_current_credit(self):
        (self.root / "docs/test.mdx").write_text("Changed teaching\n")
        self.assertTrue(any("stale" in e for e in self.errors()))
        self.assertEqual(checker.validate(self.batch, self.root, require_current=False), [])

    def test_unresolved_source_blocks_completion(self):
        self.batch["pages"][0]["auditDisposition"] = "complete"
        self.assertTrue(any("prevent closure" in e for e in self.errors()))

    def test_missing_locator_or_source_is_rejected(self):
        claim = self.batch["pages"][0]["claimChecks"][0]
        claim["locator"] = ""
        claim["sourceIds"] = ["unknown"]
        self.assertTrue(any("locator" in e for e in self.errors()))
        self.assertTrue(any("unknown source" in e for e in self.errors()))

    def test_partial_record_cannot_claim_clinical_clearance(self):
        self.batch["pages"][0]["clinicalVerificationComplete"] = True
        self.assertTrue(any("cannot claim" in e for e in self.errors()))

    def test_complete_record_requires_read_coverage_and_review(self):
        page = self.batch["pages"][0]
        page.update(auditDisposition="complete", clinicalVerificationComplete=True, unresolvedClaims=[], reviewCheck="passed")
        self.assertEqual(self.errors(), [])
        good = copy.deepcopy(page)
        page["fullTextRead"] = False
        self.assertTrue(any("full current-page" in e for e in self.errors()))
        page.update(good)
        page["coverage"]["currency"] = "pending"
        self.assertTrue(any("unfinished coverage" in e for e in self.errors()))

    def test_complete_disposition_must_agree_with_clinical_flag(self):
        self.batch["pages"][0].update(auditDisposition="complete", unresolvedClaims=[], reviewCheck="passed")
        self.assertTrue(any("must agree" in e for e in self.errors()))

    def test_abstract_only_source_cannot_close_clinical_audit(self):
        self.batch["pages"][0].update(auditDisposition="complete", clinicalVerificationComplete=True, unresolvedClaims=[], reviewCheck="passed")
        self.batch["sources"][0]["access"] = "abstract-only"
        self.assertTrue(any("cannot close" in e for e in self.errors()))


if __name__ == "__main__":
    unittest.main()
