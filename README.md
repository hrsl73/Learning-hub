# 🎓 Learning Hub

> A structured, searchable knowledge base compiling concepts, system designs, and workflows I have learned.

This repository serves as a personal wiki and notes center. It compiles detailed guides on database systems, networking, web architectures, and automation scripts.

Built using **[VitePress](https://vitepress.dev/)** for a high-performance, dark-mode-ready static site, and integrated with **[Mermaid](https://mermaid.js.org/)** for rendering interactive visual diagrams directly from markdown.

---

## 📂 Project Structure

```text
Learning-hub/
├── notes/                   # Category-grouped learning markdown notes
│   ├── databases/
│   │   └── postgresql-notes.md
│   └── networking/
│       └── socket.md
├── scripts/                 # Developer automation and helper scripts
│   └── git_commit_analyzer.py
├── templates/               # Reusable note formatting prompts & templates
├── .vitepress/              # VitePress configuration & assets
└── vercel.json              # Vercel deployment configuration
```

---

## ⚡ Key Features

* **Dynamic Navigation:** The sidebar is dynamically built at compile time. Whenever you add a new markdown file or category subdirectory inside `notes/`, the build script automatically parses the main title and adds it to the navigation layout.
* **Global Search:** Local search is enabled out of the box so you can search through your notes instantly.
* **Interactive Diagrams:** Full support for Mermaid diagrams embedded directly inside Markdown.
* **Vercel Deploy Ready:** Configuration files are pre-set for zero-config Vercel hosting.

---

## 💻 Local Development

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Dev Server
```bash
npm run dev
```
Starts the interactive server at `http://localhost:5173`. Any changes to notes will hot-reload in real-time.

### 3. Build & Preview static assets
To compile the site locally for deployment verification:
```bash
npm run build
npm run preview
```
