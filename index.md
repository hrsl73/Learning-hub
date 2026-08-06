---
layout: home

hero:
  name: "Learning Hub"
  text: "My Personal Knowledge Base"
  tagline: "A structured study platform of concepts, system designs, and technical notes."
  actions:
    - theme: brand
      text: Explore Study Hub 📚
      link: /notes/
    - theme: alt
      text: View Profile 👤
      link: /profile

features:
  - icon: 🗄️
    title: Databases & Storage
    details: Deep dive into PostgreSQL internals, indexing strategies, MVCC, transaction isolation, and query optimization.
    link: /notes/databases/postgresql-notes
  - icon: 🔔
    title: Mobile & Push Systems
    details: Architecture of FCM vs APNs, OS background daemons, device tokens, and Android fullScreenIntent vs iOS CallKit.
    link: /notes/mobile/push-notifications-notes
  - icon: ⚡
    title: Networking & Realtime
    details: WebSockets vs Polling, HTTP 101 upgrade handshake, Socket.IO room architecture, and horizontal scaling.
    link: /notes/networking/socket
  - icon: ⚙️
    title: Operating Systems & Runtime
    details: Process virtual address space, PCB/TCB context switches, TLB flushes, IPC, and language runtime concurrency models.
    link: /notes/operating-systems/thread-and-process-notes
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
}
</style>
