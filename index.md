---
layout: home

hero:
  name: "Learning Hub"
  text: "My Personal Knowledge Base"
  tagline: "A collection of concepts, technologies, and system designs I have learned."
  actions:
    - theme: brand
      text: Browse PostgreSQL Notes
      link: /notes/postgresql-notes
    - theme: alt
      text: Browse Socket.IO Notes
      link: /notes/socket

features:
  - icon: 📘
    title: PostgreSQL Deep Dive
    details: Covers internal architecture, query planning, indexing, MVCC, transaction isolation, and production scaling.
    link: /notes/postgresql-notes
  - icon: 🔌
    title: WebSockets & Socket.IO
    details: Real-time event-driven communication, polling fallbacks, room management, and vertical/horizontal scaling techniques.
    link: /notes/socket
  - icon: 🛠️
    title: Automation Scripts
    details: Python workflows, repository scanners, and utilities located in the scripts folder of the repo.
    link: https://github.com/hrsl73/Learning-hub/tree/main/scripts
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(135deg, #646cff 30%, #56b2f7);
}
</style>
