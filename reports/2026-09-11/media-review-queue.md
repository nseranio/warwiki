# Media review queue

Source-only media review queue. Static metadata is parsed without evaluating source code. URLs identify provider pages; HTTP reachability and provider metadata do not verify clinical content or playable media. No site registry, article, clinical claim, or curated flag is changed.

As of 2026-09-11. Published baseline: 1546 videos (metadata collected 2026-06-23T21:37:19.909Z), 42 curated podcast episodes.

Compared playlist collection from 2026-09-11T13:48:56.732Z: 1553 unique videos in 143 playlists (0 days old).

15 video metadata changes need review; 1 published videos are absent from the collected playlists. Absence is not proof of deletion.

## Video decisions

- [Deleted video](https://www.youtube.com/watch?v=_Tihw255Bdk) — provider marks unavailable; provider date 2026-04-23T23:56:58Z. Pending placement/quality review.
- [Martius Flap](https://www.youtube.com/watch?v=6aRMnNBoeaI) — new to published registry; provider date 2020-04-20T15:32:44Z. Pending placement/quality review.
- [Laparoscopic harvest of omentum flap & transdiaphragmatic placement for chronic post lung resection](https://www.youtube.com/watch?v=gG-VdsPqGOs) — new to published registry; provider date 2017-07-04T01:51:32Z. Pending placement/quality review.
- [Martius flap](https://www.youtube.com/watch?v=kgIqUmsaExs) — new to published registry; provider date 2016-11-30T03:21:07Z. Pending placement/quality review.
- [Adding to the Omental Repertoire: Minimally Invasive Omental Flap Harvest for Extremity Lymph No...](https://www.youtube.com/watch?v=kR6EKnjWIuY) — new to published registry; provider date 2025-06-27T16:32:39Z. Pending placement/quality review.
- [Laparoscopic Mobilization of an Omental Flap](https://www.youtube.com/watch?v=KVDmgtuKmxs) — new to published registry; provider date 2011-06-27T09:01:00Z. Pending placement/quality review.
- [Deleted video](https://www.youtube.com/watch?v=LcVV9zbXHHQ) — provider marks unavailable; provider date 2026-04-23T23:57:02Z. Pending placement/quality review.
- [Deleted video](https://www.youtube.com/watch?v=lUPKKH4-LmI) — provider marks unavailable; provider date 2026-04-23T23:58:38Z. Pending placement/quality review.
- [Private video](https://www.youtube.com/watch?v=NznAqawnNVw) — provider marks unavailable; provider date 2026-04-23T23:53:50Z. Pending placement/quality review.
- [Kidney Obstruction Repair | The Complete Pyeloplasty Procedure](https://www.youtube.com/watch?v=OJT7gKU7jjU) — title changed; provider date 2014-06-03T17:57:05Z. Pending placement/quality review.
- [Alberto Breda - Pieloplastica robot-assistita dopo RAPN](https://www.youtube.com/watch?v=P3TNxh0iOfc) — title changed; provider date 2022-11-26T16:55:04Z. Pending placement/quality review.
- [Labial fat pad transposition/martius flap technique and utilization](https://www.youtube.com/watch?v=Pqj4DLhl2sU) — new to published registry; provider date 2023-11-02T17:12:49Z. Pending placement/quality review.
- [Martius flap-- The labial fat cover for Vesicivaginal fistula/ urethrovaginal fistula](https://www.youtube.com/watch?v=VitJttVEG6k) — new to published registry; provider date 2021-09-21T06:57:51Z. Pending placement/quality review.
- [Bartholin's Gland Excision | Surgical Demonstration | Tips & Tricks](https://www.youtube.com/watch?v=XceqoM9ZjjA) — title changed; provider date 2024-06-15T12:22:49Z. Pending placement/quality review.
- [Robotic Radical Cystectomy and Total Intracorporeal Ileal Conduit | AINU Surgical Videos](https://www.youtube.com/watch?v=XLPsslB77rY) — new to published registry; provider date 2026-07-02T11:18:43Z. Pending placement/quality review.

## Podcast source review

Publication dates are not consistently stored in the curated episode baseline. Each feed remains an editorial review task, regardless of HTTP availability.

- [BackTable Urology](https://www.backtable.com/shows/urology) — 26 existing episodes; URL reachable (HTTP 200) at 2026-09-11T13:49:26.902Z; episode selection and placement pending.
- [BackTable OBGYN](https://www.backtable.com/shows/obgyn) — 5 existing episodes; URL reachable (HTTP 200) at 2026-09-11T13:49:26.916Z; episode selection and placement pending.
- [SUFU Podcast](https://sufuorg.com/education/podcasts.aspx) — 2 existing episodes; URL check failed; manual check needed at 2026-09-11T13:49:30.177Z; episode selection and placement pending.
- [AUAUniversity Podcast](https://auau.auanet.org/podcast) — 5 existing episodes; URL check failed; manual check needed at 2026-09-11T13:49:30.179Z; episode selection and placement pending.
- [AUANews Inside Tract](https://www.auanet.org/meetings-and-education/podcast) — 0 existing episodes; URL review response (HTTP 307) at 2026-09-11T13:49:38.181Z; episode selection and placement pending.
- [Urology Times Pearls & Perspectives](https://audioboom.com/channels/5027208) — 3 existing episodes; URL reachable (HTTP 200) at 2026-09-11T13:49:38.181Z; episode selection and placement pending.
- [Urology Care Podcast](https://www.urologyhealth.org/healthy-living/urology-care-podcast) — 1 existing episodes; URL review response (HTTP 307) at 2026-09-11T13:49:41.348Z; episode selection and placement pending.
- [Urology Audio Guidelines](https://podcasts.apple.com/us/podcast/urology-audio-guidelines/id1565672358) — 0 existing episodes; URL reachable (HTTP 200) at 2026-09-11T13:49:41.349Z; episode selection and placement pending.

Complete comparison and per-item decision fields are in the companion JSON. Existing collector: `npm run videos:fetch -- --out reports/YYYY-MM-DD/youtube-review-source.json`. Create a queue with `npm run media:review -- --date YYYY-MM-DD --collection reports/YYYY-MM-DD/youtube-review-source.json --verify-feeds --out reports/YYYY-MM-DD/media-review-queue.json --markdown reports/YYYY-MM-DD/media-review-queue.md`. Do not run `videos:build` or `videos:sync` for an unattended review queue.
