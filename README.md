# Rachel's site

A small journaling site built with [Astro](https://astro.build).

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

## Updating content

Everything lives in plain text files, no code needed:

| What | File |
| --- | --- |
| Meditation days | `src/data/meditation.yaml` (add a date for each day) |
| Books | `src/data/books.yaml` |
| Goals (max 3 active) | `src/data/goals.yaml` |
| Travels | `src/data/travels.yaml` |
| Social feed | `src/data/feed.yaml` |
| Brain pages | a new `.md` file in `src/content/brain/` |

New Brain pages show up in the home page feed automatically.
