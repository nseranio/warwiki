# Task: identify the surgeon(s) in each surgical video

You are given `input.jsonl` in this folder: one YouTube video per line with `id`, `title`, `channel` (the uploader), `description` (truncated) and `tags`. The videos are urology, urogynecology and urologic-oncology operative videos and lectures.

For EVERY line, decide which named people are the operating surgeon(s) or the presenter/lecturer of the video, so that a reader who types a surgeon's name into a video library search finds the video.

Write `output.jsonl` in this folder: one line per input line, same order, exactly this shape:

{"id": "<id>", "people": [{"name": "<Full Name>", "role": "surgeon|presenter|author", "basis": "title|description|channel|tags"}]}

Rules:
1. Only use names that literally appear in the title, description, channel or tags. Never add a name from your own knowledge, never guess who a channel belongs to unless the channel name itself is a person's name. If nobody is named, write "people": [].
2. Write each name as the fullest form that appears in that video's text (e.g. "Dr. Brian Flynn" -> "Brian Flynn"; "C. Vaessen" stays "C. Vaessen" unless the full first name appears in the same text). Drop titles and degrees (Dr., Prof., MD, FACS, FRCS, DNP...). Keep accents. Use normal capitalization ("DR. ASHISH PARDESHI" -> "Ashish Pardeshi"). Write names in First Last order (convert "Heo JE" style to "J.E. Heo" only if no fuller form appears).
3. role: "surgeon" = performs or demonstrates the operation; "presenter" = gives the lecture/talk/webinar or narrates; "author" = listed only as an author of a video article or abstract (journal video with an author list). For an author list, include every listed author (role "author"), but if the text says who performed the surgery, mark that person "surgeon".
4. channel: if the channel name is a single individual's name (e.g. "Lee C. Zhao MD", "Dr. Pankaj Joshi - Reconstructive Urologist", "SeanElliottMD", "Tariq Hakki", "Peter Rosenblatt") and the title/description do not name a different operating surgeon, include that person with basis "channel" and role "surgeon" (or "presenter" for a lecture). Split joined names ("SeanElliottMD" -> "Sean Elliott"). Do NOT treat institutions, hospitals, societies, journals, foundations, programs or nicknames ("urokotov", "clavelluro", "surgeryinmotion", "Urogynecology for Beginners") as people. Hospital channels named after a person (e.g. "Fondazione Vincenzo Pansadoro") are institutions, not the surgeon.
5. Exclude: moderators listed only as moderators, patients, sponsors, company names, people only thanked or cited, historical eponyms in a procedure name ("Martius flap", "Studer pouch", "Mitrofanoff", "Burch"), and people only mentioned in links to other videos or social handles unless they are clearly the surgeon.
6. If the description names a panel of several speakers in a session video, include each speaker as "presenter".
7. Non-Latin script names (Korean, Russian, Chinese...): include them as written, and add a separate entry with the Latin transliteration only if a Latin form appears in the same text.

Process every line; do not skip any. When done, check that output.jsonl has the same number of lines as input.jsonl and each line is valid JSON.
