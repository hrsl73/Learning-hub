# 📘 Notes Generator — Reusable Prompt Template

Keep this file in the root of your workspace. Whenever you're learning a new
tool/library/concept, copy the prompt block below, replace `[TOPIC]` with
whatever you're learning, and paste it to Claude (or any capable model) to
get notes in the same style as the WebSockets/Socket.IO notes.

---

## The Prompt to Reuse

```
I want detailed notes on [TOPIC] for two purposes: (1) genuinely understanding
it since it's new to me, and (2) being fully prepared if asked about it in a
technical interview.

Write it so that someone who has NEVER heard of [TOPIC] before could read it
and actually understand it — don't assume prior context.

Please structure it exactly like this:

1. **The Problem This Technology Solves** — what pain point existed before
   this existed, with a comparison table of older/alternative approaches and
   why they fall short. End with a one-line "interview-ready" summary
   sentence.

2. **Core Definition** — what the thing actually IS at a fundamental level
   (not just what it's used for), plus any commonly confused adjacent terms
   defined side-by-side (e.g. "socket" vs "WebSocket"). Include an
   interview one-liner.

3. **How It Actually Works Under the Hood** — the mechanics, step by step
   (e.g. a handshake, a lifecycle, a request flow). This is the section
   that trips people up in interviews, so go slow and be precise. Include
   an interview one-liner.

4. **Core Properties / Characteristics** — a table of the defining traits
   (e.g. stateful vs stateless, sync vs async, persistent vs one-shot)
   with a plain-English explanation of each.

5. **The Bare/Raw Version vs. The Popular Library/Framework Version** —
   compare the low-level primitive to the high-level tool most people
   actually use day to day. Table format: feature-by-feature, what the
   library adds that you'd otherwise build yourself. Call out any
   important nuance (e.g. compatibility gotchas, "it's not literally the
   same as the raw thing"). Include an interview one-liner.

6. **Core Components — Practical Breakdown** — go through each major
   building block one at a time, each with:
   - what it is
   - a short code snippet or concrete example
   - when/why you'd use it
   Include any "commonly mixed up" comparisons as their own callout
   (e.g. "X vs Y — common interview mix-up").

7. **Alternatives — When to Use What** — a comparison table of this
   technology vs. its real alternatives, covering direction/use
   case/when to avoid each. End with an interview one-liner on how to
   reason about the choice out loud.

8. **Pros & Cons** — split clearly: (a) pros/cons of the general
   underlying technology, (b) pros/cons of the specific popular
   library/framework version, if applicable.

9. **Scaling / Production Gotcha** — the thing that works fine in a demo
   but breaks or gets tricky at scale/in production, and the standard
   fix for it. This is very frequently an interview question — flag it
   as such.

10. **Quick-Fire Interview Q&A** — 8-10 realistic interview questions
    with concise, confident model answers (2-3 sentences each).

11. **One-Paragraph Summary** — everything above compressed into a
    single paragraph, written so that if I only remember this one
    paragraph, I could still hold my own in a conversation about it.

Formatting rules:
- Use tables wherever a comparison is being made — don't write comparisons
  as prose paragraphs.
- Every major section should end with a bolded "Interview one-liner" I can
  basically memorize verbatim.
- Use short code snippets only where they clarify a concept, not for
  completeness — this is a conceptual reference, not documentation.
- Assume I'm a working developer, not a total beginner to programming —
  but a total beginner to THIS specific topic.
- Save it as a downloadable .md file, don't just paste it inline in chat.
```

---

## How to Use This

1. Copy everything inside the ` ``` ` code block above.
2. Replace `[TOPIC]` with your subject — e.g. "Redis Pub/Sub", "GraphQL vs
   REST", "Docker networking", "OAuth 2.0", "Kafka", "Database indexing".
3. Paste it as a new message.
4. You'll get a `.md` file back in the same structure as your WebSockets
   notes — save it alongside this template so your notes folder stays
   consistent.

## Suggested Folder Structure

```
/workspace root
 ├── notes-template-prompt.md      ← this file
 └── notes/
      ├── websockets-and-socketio-notes.md
      ├── redis-pubsub-notes.md
      ├── oauth2-notes.md
      └── ...
```

## Tip

If a topic is large enough to have sub-parts you keep confusing (like short
polling vs. long polling did here), it's worth a quick 2-3 message back and
forth clarifying just that piece *before* generating the full notes file —
then ask Claude to fold the clarified explanation into the relevant section
before saving. That's usually faster than getting a full notes file and
then editing it after the fact.
