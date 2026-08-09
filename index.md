---
layout: home

hero:
  name: "DevEngine"
  text: "Master Practical Production Engineering"
  tagline: "Move beyond passive reading and theoretical DSA. Learn distributed systems, database internals, and real-world failure post-mortems through interactive visual guides."
  actions:
    - theme: brand
      text: Explore Guides 🚀
      link: /notes/
    - theme: alt
      text: Kafka Deep-Dive 📡
      link: /notes/distributed-systems/kafka-notes

features:
  - icon: 📡
    title: Distributed Systems & Event Streams
    details: Master high-throughput event streaming with Apache Kafka, consumer group rebalancing, partition key hashing, and handling production outage storms.
    link: /notes/distributed-systems/kafka-notes
  - icon: 🗄️
    title: Database Engineering & Internals
    details: Deep dive into PostgreSQL B-Tree vs BRIN indexes, query execution planner (EXPLAIN ANALYZE), MVCC, transaction isolation levels, and PgBouncer.
    link: /notes/databases/postgresql-notes
  - icon: ⚡
    title: Web & Browser Engineering
    details: Service Worker lifecycle, Workbox caching strategies, Web Worker multi-threading, PWA offline resilience, and HTTP/2 vs HTTP/3 QUIC protocol.
    link: /notes/networking/progressive-web-apps
  - icon: ⚙️
    title: OS & Process Internals
    details: Process vs Thread virtual address space, Linux I/O multiplexing (epoll vs select), kernel context switching, and Node.js event loop thread pool.
    link: /notes/operating-systems/thread-and-process-notes
  - icon: 🏗️
    title: System Design & Resiliency
    details: Distributed rate limiting (Token Bucket/Sliding Window), Circuit Breaker fault tolerance, gRPC vs REST vs WebSockets, and horizontal sharding.
    link: /notes/networking/socket
  - icon: 🧪
    title: Applied Micro-Challenges
    details: Test your real-world problem-solving skills with practical debugging scenarios, post-mortems, and system outage recovery exercises instead of DSA puzzles.
    link: /notes/
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
}

.dark {
  --vp-home-hero-name-background: linear-gradient(135deg, #60a5fa 0%, #c084fc 50%, #f472b6 100%);
}
</style>
