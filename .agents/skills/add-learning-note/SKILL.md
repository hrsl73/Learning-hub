---
name: add-learning-note
description: Add a new learning note or documentation to the Learning Hub repository. Triggered when the user wants to create notes, document a new topic, learn about something, or add to the knowledge base. Examples: "add notes on Redis", "create a note about Kafka", "document Docker networking", "I want to learn about OAuth 2.0".
---

# Learning Hub — Add Note Skill

## Repo Overview

This is **Harshil's Learning Hub** — a personal knowledge base built with **VitePress**, deployed on **Vercel**. Notes are written in Markdown and served as a searchable static site.

- **Repo root**: `/Users/harshilmayani/Desktop/Learning`
- **Notes folder**: `notes/` — all learning notes live here, grouped by category subdirectory
- **VitePress config**: `.vitepress/config.mts` — sidebar is **auto-built at compile time** from the `notes/` folder structure; no manual config changes needed when adding notes
- **Homepage**: `index.md` at root — VitePress hero layout with feature cards (must be updated for new categories)
- **Notes hub page**: `notes/index.md` — card-based landing page (must be updated for every new note)
- **Template**: `templates/notes-template-prompt.md` — 11-section format all notes follow
- **Deployed at**: Vercel (zero-config, pushes to main branch trigger deploys)

See `references/repo-context.md` for the full existing notes catalog, index.md card format, and badge conventions.

---

## Workflow — Adding a New Note

Follow these steps **in order** every time a new note is requested:

### Step 1 — Confirm the Category
Before writing anything, ask the user which category this note belongs to.
Present the existing categories and let the user pick or name a new one:

```
Existing categories:
- databases      → 🗄️ Databases & Storage
- networking     → ⚡ Networking & Realtime Systems
- mobile         → 📲 Mobile & OS Infrastructure
- tooling        → 🛠️ Tooling & Documentation

Which category does [TOPIC] belong to? Or should I create a new one?
```

If the user confirms a new category name, create the folder `notes/<new-category>/` and also add an entry to the `categoryEmojis` map in `.vitepress/config.mts`.

### Step 2 — Generate the Note File
Create the note at `notes/<category>/<topic-kebab-case>.md`.

**Always follow the 11-section structure** from `templates/notes-template-prompt.md`:
1. The Problem This Technology Solves
2. Core Definition
3. How It Actually Works Under the Hood
4. Core Properties / Characteristics
5. The Bare/Raw Version vs. The Popular Library/Framework Version
6. Core Components — Practical Breakdown
7. Alternatives — When to Use What
8. Pros & Cons
9. Scaling / Production Gotcha
10. Quick-Fire Interview Q&A
11. One-Paragraph Summary

**Formatting rules:**
- Use tables for all comparisons — never prose paragraphs for comparisons
- Every major section ends with a bolded **Interview one-liner**
- Use short code snippets only where they clarify a concept
- Use **Mermaid diagrams** whenever a flow, lifecycle, or architecture can be visualized — wrap them in ` ```mermaid ``` ` blocks (the site has `vitepress-plugin-mermaid` installed)
- Filename: kebab-case, e.g. `redis-pub-sub.md`, `oauth2-notes.md`
- First line must be a `# Title` heading — VitePress reads this for the sidebar label

### Step 3 — Update `notes/index.md`
Add a new card for the note inside the correct section grid. If it's a new category, add a new section heading + grid block.

Card HTML format to follow exactly (copy from `references/repo-context.md`).

### Step 4 — Update root `index.md` (only for new categories)
If a **new category** was created, add a new feature card to the `features:` list in the root `index.md` VitePress hero config.

### Step 5 — Update `notes/index.md` stat count
The hero stat at the top reads `📚 X Comprehensive Notes`. Increment this number by 1.

### Step 6 — Verify Vercel Readiness
Confirm the following before handing back to the user:
- [ ] Note file exists at the correct path with correct kebab-case filename
- [ ] Note starts with a `# Heading` (required for auto-sidebar)
- [ ] `notes/index.md` card added with correct href path (no `.md` extension in the link)
- [ ] Note count stat incremented
- [ ] If new category: `categoryEmojis` updated in `.vitepress/config.mts` and root `index.md` feature card added
- [ ] All Mermaid blocks use valid syntax (no HTML tags inside node labels, quote labels with special chars)

### Step 7 — Confirm & Push to Main Branch
Once the note and integrations are complete and verified, ask the user for explicit confirmation before pushing to production:

1. **Format Commit Message**: Use the topic title, e.g., `feat(notes): <Topic Name>` (e.g. `feat(notes): Service Worker Architecture & Offline Proxying`).
2. **Ask Confirmation**: Prompt the user with the proposed commit message and target branch (`main`).
3. **Execute Push Upon Confirmation**:
   ```bash
   git add .
   git commit -m "feat(notes): <Topic Name>"
   git push origin main
   ```
4. Confirm to the user that the commit has been successfully pushed and Vercel auto-deployment is triggered.

---

## Naming Conventions
- Filenames: lowercase, kebab-case, `.md` extension — e.g. `redis-pub-sub.md`
- Category folders: lowercase, kebab-case — e.g. `system-design/`
- Links in `index.md`: no `.md` suffix — e.g. `/notes/databases/postgresql-notes`

## Do NOT
- Modify existing notes without the user's explicit request
- Touch `.vitepress/config.mts` sidebar logic — it auto-builds from the folder
- Run `npm run build` or `npm run dev` unless the user explicitly asks
- Create files in the stale `recap/` directory

