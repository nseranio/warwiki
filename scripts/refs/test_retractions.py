#!/usr/bin/env python3
"""Offline tests for the retraction and correction checker."""
import contextlib
from datetime import datetime, timezone
import io
import json
import pathlib
import sys
import tempfile
import unittest
from unittest.mock import patch
import urllib.parse

sys.dont_write_bytecode = True
import retractions


DOI = "10.1234/example"
PAGE = "docs/example.mdx"


def response(items, total=None, cursor=None):
    message = {"items": items}
    if total is not None:
        message["total-results"] = total
    if cursor is not None:
        message["next-cursor"] = cursor
    return {"message": message}


def notice(number, doi=DOI):
    return {
        "DOI": f"10.5678/notice-{number}", "title": [f"Notice {number}"],
        "update-to": [{"DOI": doi, "type": "correction", "label": "Correction",
                       "source": "publisher", "updated": {"date-parts": [[2026, 10, 6]]}}],
    }


class RetractionsTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        base = pathlib.Path(self.temp.name)
        self.cache = base / "cache.json"
        self.output = base / "retractions.json"
        for name, value in (("CACHE", self.cache), ("OUT", self.output), ("time.sleep", None)):
            if name == "time.sleep":
                patcher = patch.object(retractions.time, "sleep", return_value=None)
            else:
                patcher = patch.object(retractions, name, value)
            patcher.start()
            self.addCleanup(patcher.stop)

    def run_checker(self, dois=None, no_doi=None, argv=None):
        dois = dois if dois is not None else {DOI: {PAGE}}
        with patch.object(retractions, "cited", return_value=(dois, no_doi or {})):
            with contextlib.redirect_stdout(io.StringIO()) as stdout, contextlib.redirect_stderr(io.StringIO()) as stderr:
                code = retractions.main(argv or [])
        return code, json.loads(self.cache.read_text()), json.loads(self.output.read_text()), stdout.getvalue(), stderr.getvalue()

    def test_old_format_cache_is_stale(self):
        self.cache.write_text(json.dumps({DOI: []}))
        with patch.object(retractions, "fetch_page", return_value=response([notice(1)], total=1)) as fetch:
            code, cache, output, _, _ = self.run_checker()
        self.assertEqual(code, 0)
        fetch.assert_called_once()
        self.assertIsNotNone(cache[DOI]["checked"])
        self.assertEqual(len(cache[DOI]["notices"]), 1)
        self.assertEqual(output[0]["checked"], cache[DOI]["checked"])
        self.assertEqual(output[0]["notices"][0]["notice"], "10.5678/notice-1")

    def test_fresh_doi_is_skipped_and_age_limit_is_applied(self):
        checked = datetime.now(timezone.utc).isoformat()
        self.cache.write_text(json.dumps({DOI: {"checked": checked, "notices": []}}))
        with patch.object(retractions, "fetch_page", side_effect=AssertionError("network called")):
            code, cache, output, _, _ = self.run_checker()
        self.assertEqual(code, 0)
        self.assertEqual(cache[DOI]["checked"], checked)
        self.assertEqual(output[0]["checked"], checked)

        with patch.object(retractions, "fetch_page", return_value=response([], total=0)) as fetch:
            code, _, _, _, _ = self.run_checker(argv=["--max-age-days", "0"])
        self.assertEqual(code, 0)
        fetch.assert_called_once()

    def test_refresh_rechecks_fresh_doi(self):
        checked = datetime.now(timezone.utc).isoformat()
        self.cache.write_text(json.dumps({DOI: {"checked": checked, "notices": []}}))
        with patch.object(retractions, "fetch_page", return_value=response([notice(2)], total=1)) as fetch:
            code, cache, output, _, _ = self.run_checker(argv=["--refresh"])
        self.assertEqual(code, 0)
        fetch.assert_called_once()
        self.assertEqual(cache[DOI]["notices"][0]["notice"], "10.5678/notice-2")
        self.assertEqual(output[0]["pages"], [PAGE])

    def test_timestamp_older_than_max_age_is_rechecked(self):
        self.cache.write_text(json.dumps({DOI: {"checked": "2026-01-01T00:00:00Z", "notices": []}}))
        with patch.object(retractions, "fetch_page", return_value=response([], total=0)) as fetch:
            code, cache, _, _, _ = self.run_checker(argv=["--max-age-days", "30"])
        self.assertEqual(code, 0)
        fetch.assert_called_once()
        self.assertNotEqual(cache[DOI]["checked"], "2026-01-01T00:00:00Z")

    def test_pagination_collects_beyond_1000_items(self):
        def fetch(url):
            params = urllib.parse.parse_qs(urllib.parse.urlsplit(url).query)
            self.assertEqual(params["rows"], ["1000"])
            self.assertEqual(params["mailto"], [retractions.MAILTO])
            if params["cursor"] == ["*"]:
                return response([notice(i) for i in range(1000)], total=1001, cursor="page-2")
            self.assertEqual(params["cursor"], ["page-2"])
            return response([notice(1000)], total=1001, cursor="page-3")

        with patch.object(retractions, "fetch_page", side_effect=fetch) as mocked:
            code, cache, output, _, _ = self.run_checker()
        self.assertEqual(code, 0)
        self.assertEqual(mocked.call_count, 2)
        self.assertEqual(len(cache[DOI]["notices"]), 1001)
        self.assertEqual(len(output[0]["notices"]), 1001)

    def test_failed_request_does_not_check_batch_and_exits_nonzero(self):
        good = "10.1234/good"
        bad = "10.1234/bad"
        old = "2000-01-01T00:00:00Z"
        self.cache.write_text(json.dumps({bad: {"checked": old, "notices": []}}))

        def fetch(url):
            filters = urllib.parse.parse_qs(urllib.parse.urlsplit(url).query)["filter"][0]
            if f"updates:{bad}" in filters:
                raise OSError("Crossref unavailable")
            return response([notice(1, good)], total=1)

        with patch.object(retractions, "BATCH", 1), patch.object(retractions, "fetch_page", side_effect=fetch):
            code, cache, output, _, stderr = self.run_checker(dois={bad: {PAGE}, good: {PAGE}})
        self.assertEqual(code, 1)
        self.assertEqual(cache[bad]["checked"], old)
        self.assertIsNotNone(cache[good]["checked"])
        by_doi = {row["doi"]: row for row in output}
        self.assertTrue(by_doi[bad]["failed"])
        self.assertFalse(by_doi[good]["failed"])
        self.assertIn(bad, stderr)

    def test_incomplete_second_page_leaves_doi_unchecked(self):
        def fetch(url):
            cursor = urllib.parse.parse_qs(urllib.parse.urlsplit(url).query)["cursor"][0]
            if cursor == "*":
                return response([notice(1)], total=2, cursor="page-2")
            raise OSError("second page failed")

        with patch.object(retractions, "fetch_page", side_effect=fetch):
            code, cache, output, _, _ = self.run_checker()
        self.assertEqual(code, 1)
        self.assertNotIn(DOI, cache)
        self.assertIsNone(output[0]["checked"])
        self.assertEqual(output[0]["notices"], [])

    def test_no_doi_counts_only_references_and_checks_continuation(self):
        root = pathlib.Path(self.temp.name)
        docs = root / "docs"
        docs.mkdir()
        (docs / "example.mdx").write_text(
            "## Steps\n1. A numbered procedure step\n\n## References\n"
            "<a id=\"ref1\"></a>1. A source without a DOI.\n\n"
            "<a id=\"ref2\"></a>2. Another source without a DOI.\n\n"
            "<a id=\"ref3\"></a>3. A source with a DOI on the next line.\n"
            "doi:[10.1234/example](https://doi.org/10.1234/example)\n\n"
            "## Later section\n1. Another numbered procedure step\n"
        )
        (docs / "other.mdx").write_text("## References\n1. Another DOI-free reference.\n")
        with patch.object(retractions, "ROOT", root):
            pages, no_doi = retractions.cited()
        self.assertEqual(pages[DOI], {PAGE})
        self.assertEqual(no_doi, {PAGE: 2, "docs/other.mdx": 1})
        with patch.object(retractions, "fetch_page", return_value=response([], total=0)):
            code, _, output, _, _ = self.run_checker(dois=pages, no_doi=no_doi)
        self.assertEqual(code, 0)
        counts = {row["pages"][0]: row["no_doi"] for row in output if row["doi"] is None}
        self.assertEqual(counts, no_doi)


if __name__ == "__main__":
    unittest.main()
