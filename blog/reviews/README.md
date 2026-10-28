# Per-article evidence records

Optional `reviews/<exact-filename-stem>.json` sidecars are read at build time. A record is not automatically verified. The default for articles without a record is `legacy-source-review-pending`; this keeps historical prose and bylines available with explicit limits.

Copy `docs/editorial/review-template.json` outside this directory, fill it with actual evidence, then place it here under the exact stem. A `documented` record needs source URLs, reporting cutoff, a claim ledger and the SHA-256 body hash printed by `npm run quality`. It still does not assert a human reviewer, independence of repeated reports, or absolute truth. Do not add a `reviewed: true` badge.

Corrections are dated records of actual changes and evidence, never a declaration that this engineering upgrade verified a claim. Parent can add priority audit records here. The October 28 correction pass adds ten body-hashed, limited documentary records. Each records the AI-assisted process, actual stored-source excerpts and text hashes, claim dispositions and unresolved limits. None certifies an entire article or claims human review. The withdrawn record documents missing evidence and deliberately has no supporting source URL.
