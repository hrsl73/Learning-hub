# 📋 Product Requirements & Platform Vision

> **Primary Directive:** Focus on actual skills and architectural patterns used in real-world production projects, rather than isolated academic theories or generic competitive programming.

---

## 🎯 1. Core Philosophy

* **Applied Engineering over Pure Theory:** Every concept guide must connect directly to real-world software engineering, production failure modes, performance optimizations, or system architecture.
* **Active & Explorable Learning:** Eliminate wall-of-text tutorials. Readers interact with visual state machines, run code snippets in-browser, and solve scenario-based debugging labs.
* **Context-Preserving UX:** Eliminate tab fragmentation. When readers encounter unfamiliar tooling or concepts (e.g., *Workbox*, *Epoll*, *Kafka Partitions*), instant inline tooltips and slide-over drawers provide context without breaking reading flow.

---

## 🚀 2. Key Pillars & Requirements

### 1. Real-World Engineering Topics
- **Web & Browser Internals:** Service Workers, Workbox, Web Workers, Event Loop, Cache API, Performance Profiling.
- **Backend & Distributed Systems:** Kafka Event Streaming, Message Queues, Microservices, Process vs Thread scheduling, Cron/Task Schedulers.
- **Database Engineering:** PostgreSQL Internals, Indexing strategies (B-Tree, BRIN, GIN), Query Planner visualization, Caching.
- **DevOps & Automation:** CI/CD pipelines, Git commit analysis, Docker containerization, Monitoring.

### 2. Interactive & Active Learning Features
- **Smart Context-Aware Glossary (`SmartTerm`):** Interactive hover/click tooltips for terms with slide-over deep-dive drawers.
- **Visual State Machines & Simulators:** Interactive visual widgets embedded directly in Markdown (e.g., Kafka producer/consumer rebalancer, Service Worker lifecycle runner).
- **In-Browser Code Execution (Wasm):** Client-side execution for JS/TS, Python, SQLite with zero server cost and instant response.
- **Scenario-Based Micro-Challenges:** Practical debugging labs (e.g., "Fix the race condition in this Node worker pool", "Optimize this slow SQL query").

### 3. User Experience & Architecture
- **Aesthetic:** Clean, modern, distraction-free dark/light design system with modern typography and high performance.
- **Markdown-First Content Pipeline:** Keep Markdown as the single source of truth for easy content creation, enhanced with rich custom components.
