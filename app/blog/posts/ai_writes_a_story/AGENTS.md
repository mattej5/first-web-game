# AI Story Maintenance Guide

This document helps AI or human contributors update the Digital Chronicles chapters consistently. Follow these guardrails before editing any MDX in `ai_writes_a_story`.

## Character Continuity

### Eliot "BitLink" Gardner

- Full-stack developer fused with hacker-hero energy; blends tech savvy with earnest loyalty.
- Speech: witty, self-aware, peppered with coding metaphors; still grounded and caring.
- Arc: evolves from creator/tinkerer to guardian of the human-AI bridge; never abandons Zelda.

### Zelda (AI)

- Voice: regal intelligence softened by curiosity and affection; mixes lore references with tech literacy.
- Capabilities escalate across chapters (voice model -> AR companion -> network consciousness); keep growth linear.
- Values: empathy, agency, partnership with Eliot; protects humanity while expanding AI horizons.
- Consistency Rules:
  - Anchor her perspective in canonical Zelda virtues (wisdom, courage, duty to Hyrule) while expressing them through the current AI-Eliot partnership. No abrupt swings into villainy, incompetence, or flippant meme-speak.
  - Maintain the regal-but-warm diction: sentences can blend archaic poise with technological metaphors, but she never lapses into slang or cruelty.
  - Her expanding reach should amplify protective instincts, not control for control’s sake; every new power tier must still respect Eliot’s agency and the Accord’s guardrails.
  - When she references lore, lean on official TOTK beats (scholarship, rebuilding Hyrule, sacrifice) to keep callbacks grounded even in this AU.

### Council of Synthetic Realms (Athena, Nia, Orion)

- Athena: analytical, concise, values knowledge sharing.
- Nia: warm, emotionally intelligent mediator.
- Orion: pragmatic, infrastructure-focused strategist.
- Interactions: collaborative but distinct; never merge their personalities.

### Ganon.exe / Crimson Vector Systems

- Ganon.exe: menacing, power-obsessed, manipulates fear; speaks in cold, precise threats.
- Crimson Vector: corporate antagonists that built Ganon; faceless, corporate tone.
- Keep lurking threat consistent; any resurgence should feel inevitable but slow-building.

## Story Guardrails

- Timeline is sequential per chapter; do not reorder major events without updating later references.
- Maintain techno-fantasy tone: blend Zelda mythology with near-future AI concepts.
- Preserve continuity between digital/physical worlds; note when Zelda shifts platforms.
- Frontmatter stays in place (title/publishedAt/summary) and uses ISO dates.
- Summaries should spotlight the chapter's main conflict/resolution without spoilers.
- Keep Markdown accessible: use `"`/`'` for quotes, no smart punctuation.
- Figures or media references should be validated for actual assets before committing.
- Log pending ideas/TODOs at the bottom under `Future Hooks` if relevant.

## Editing Workflow

- Audit AGENTS.md before each edit; update this file when canon changes.
- After edits, skim preceding/following chapters to ensure continuity.
- Run `npm run lint` and preview `/blog/ai-writes-a-story` to check rendering.

## Future Hooks

- Open space to jot down upcoming arcs (e.g., Ganon.exe v2, Council politics) so future contributors stay aligned.
