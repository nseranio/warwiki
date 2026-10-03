"""Run with python3 scripts/audit/test_ledger.py or python3 -m pytest."""

import json
import re
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

try:
    from scripts.audit import ledger
except ModuleNotFoundError:
    import ledger


class VerdictClosureTests(unittest.TestCase):
    def test_token_match_needs_explicit_verdict_with_source_and_locator(self):
        page = "docs/example.mdx"
        claim = "42% catheter placement requires ultrasound guidance"
        with tempfile.TemporaryDirectory() as directory:
            audit_dir = Path(directory)
            (audit_dir / "status.json").write_text(json.dumps({
                page: {"note": f"Unverified: {claim}."}
            }))
            source = audit_dir / "sample-source.txt"
            source.write_text(claim)
            files = {source.name: source}
            supplied = [("sample", re.compile("catheter", re.I), ["sample-source"])]
            verdict_path = audit_dir / "verdicts.json"
            with (patch.object(ledger, "AUD", audit_dir),
                  patch.object(ledger, "FILES", files),
                  patch.object(ledger, "SUPPLIED", supplied),
                  patch.object(ledger, "_cache", {})):
                verdict_path.write_text("{}\n")
                rows, closed = ledger.build_rows()
                self.assertEqual((len(rows), len(closed)), (1, 0))
                self.assertEqual(rows[0]["candidate"], [source.name])
                ledger.write(rows, closed)
                self.assertIn(f"candidate source match: {source.name}",
                              (audit_dir / "ledger.md").read_text())

                record = {"page": page, "claim": claim, "verdict": "supported",
                          "source": source.name, "locator": "Table 2",
                          "date": "2026-10-03", "by": "reviewer"}
                claim_key = ledger.claim_id(page, claim)
                self.assertEqual(claim_key, ledger.claim_id(page, "  42%  CATHETER placement requires ultrasound guidance  "))
                verdict_path.write_text(json.dumps({claim_key: record}))
                rows, closed = ledger.build_rows()
                self.assertEqual((len(rows), len(closed)), (0, 1))

                record["locator"] = "  "
                verdict_path.write_text(json.dumps({claim_key: record}))
                rows, closed = ledger.build_rows()
                self.assertEqual((len(rows), len(closed)), (1, 0))
                self.assertEqual(rows[0]["candidate"], [source.name])


if __name__ == "__main__":
    unittest.main()
