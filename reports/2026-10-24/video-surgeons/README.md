# Video Library surgeon search (October 24, 2026)

Both video libraries (WARWIKI `/video-library`, WHITWIKI `/video-library`) match a surgeon's or presenter's name in the search box, suggest names as you type, show the surgeon on each card (tap a name to see all of that person's videos; "profile" links to the site's surgeon page when one exists), and on WARWIKI show the original uploading channel instead of "WARWIKI".

Data: `src/data/video-surgeons.json` in each repo (`videos[<YouTube id>] = {channel?, people: [{name, role, profile?}]}`).

How the names were found:
1. `ids.py` collects every YouTube id on both sites; `fetch.mjs` pulls each video's title, uploading channel, description and tags from the YouTube API (`YT_API_KEY` in WARWIKI `.env`).
2. Eight Codex batches (`gpt-6-sol`, `brief.md`) listed the surgeon, presenter or authors each video names, using only the title, description, tags or a channel named after one person.
3. `merge.py` rejects any name whose surname does not appear in that video's own text, merges variants of one person (same first and last name), then applies `aliases.json` (hand-checked spelling variants, initials, and surname-only forms from the same channel).
4. `sites.py` links names to profile pages (WARWIKI `surgeons.ts` paths, WHITWIKI `genealogy/people.json`) and writes both JSON files.

Result: 1,430 of 1,897 videos name at least one person (1,139 names); 84 WARWIKI and 10 WHITWIKI profiles linked. Videos that name nobody stay searchable by title and channel.

Rerun after a video sync: copy these files into a scratch folder, run `python3 ids.py`, `node fetch.mjs`, `python3 batch.py` (starts eight Codex runs; wait for every `batch*/final.md`), then `python3 merge.py` and `python3 sites.py`. Videos added by a sync have no names until this is rerun.
