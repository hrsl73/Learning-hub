---
title: Engineering Guides Hub
sidebar: true
---

<div class="hub-container">

<div class="hub-hero">
  <div class="hub-hero-title">🚀 Practical Engineering Guides</div>
  <div class="hub-hero-subtitle">
    In-depth production engineering breakdowns, visual system architecture, and real-world outage post-mortems.
  </div>
  <div class="hub-stats">
    <div class="hub-stat-item">📚 <span>10 Practical Guides</span></div>
    <div class="hub-stat-item">📡 <span>Distributed Systems</span></div>
    <div class="hub-stat-item">🗄️ <span>Database Internals</span></div>
  </div>
</div>

<div class="hub-section-title">📡 Distributed Systems & Event Streams</div>

<div class="hub-grid">
  <a href="/notes/distributed-systems/kafka-notes" class="hub-card">
    <div>
      <div class="hub-card-header">
        <span class="hub-card-icon">📡</span>
        <span class="hub-badge badge-dist">Distributed Systems</span>
      </div>
      <div class="hub-card-title">Apache Kafka: Architecture & Production Engineering</div>
      <div class="hub-card-desc">
        High-throughput event streaming commit logs, partition key hashing, consumer group rebalancing, At-Least-Once delivery, and solving 45s outage rebalance storms.
      </div>
    </div>
    <div class="hub-card-footer">
      <span>Read Full Guide</span>
      <span>→</span>
    </div>
  </a>
</div>

<div class="hub-section-title">🔀 Git Workflows & Team Engineering</div>

<div class="hub-grid">
  <a href="/notes/tooling/git-pr-pipeline-workflow" class="hub-card">
    <div>
      <div class="hub-card-header">
        <span class="hub-card-icon">🔀</span>
        <span class="hub-badge badge-tooling">Git & DevOps</span>
      </div>
      <div class="hub-card-title">Industry Git Workflow: PRs & CI/CD Pipelines</div>
      <div class="hub-card-desc">
        Master production team engineering: feature branching, Conventional Commits, interactive rebasing, automated GitHub Actions CI pipelines, and branch protection rules.
      </div>
    </div>
    <div class="hub-card-footer">
      <span>Read Full Guide</span>
      <span>→</span>
    </div>
  </a>
</div>

<div class="hub-section-title">🗄️ Databases & Storage Internals</div>

<div class="hub-grid">
  <a href="/notes/databases/postgresql-notes" class="hub-card">
    <div>
      <div class="hub-card-header">
        <span class="hub-card-icon">🐘</span>
        <span class="hub-badge badge-db">Database</span>
      </div>
      <div class="hub-card-title">PostgreSQL Architecture & Internals</div>
      <div class="hub-card-desc">
        Deep dive into Postgres process model, query planner (EXPLAIN ANALYZE), B-Tree indexes, MVCC concurrency, WAL logs, and production scaling strategies.
      </div>
    </div>
    <div class="hub-card-footer">
      <span>Read Full Guide</span>
      <span>→</span>
    </div>
  </a>
</div>

<div class="hub-section-title">⚡ Web & Realtime Systems</div>

<div class="hub-grid">
  <a href="/notes/networking/socket" class="hub-card">
    <div>
      <div class="hub-card-header">
        <span class="hub-card-icon">🔌</span>
        <span class="hub-badge badge-network">Networking</span>
      </div>
      <div class="hub-card-title">WebSockets & Socket.IO Architecture</div>
      <div class="hub-card-desc">
        Full-duplex real-time protocol mechanics, HTTP 101 handshake, polling fallbacks, room broadcasting, and Redis adapter scaling.
      </div>
    </div>
    <div class="hub-card-footer">
      <span>Read Full Guide</span>
      <span>→</span>
    </div>
  </a>

  <a href="/notes/networking/progressive-web-apps" class="hub-card">
    <div>
      <div class="hub-card-header">
        <span class="hub-card-icon">🌐</span>
        <span class="hub-badge badge-network">Networking</span>
      </div>
      <div class="hub-card-title">Progressive Web Apps (PWAs)</div>
      <div class="hub-card-desc">
        Service Worker lifecycle, caching strategies, Web Push Protocol, Background Sync, Workbox, and shipping resilient offline web apps.
      </div>
    </div>
    <div class="hub-card-footer">
      <span>Read Full Guide</span>
      <span>→</span>
    </div>
  </a>

  <a href="/notes/networking/service-worker-notes" class="hub-card">
    <div>
      <div class="hub-card-header">
        <span class="hub-card-icon">⚙️</span>
        <span class="hub-badge badge-network">Networking</span>
      </div>
      <div class="hub-card-title">Service Worker Architecture & Offline Proxying</div>
      <div class="hub-card-desc">
        Programmable network proxy thread, event-driven lifecycle, CacheStorage vs IndexedDB, Workbox caching strategies, and preventing stale lockouts.
      </div>
    </div>
    <div class="hub-card-footer">
      <span>Read Full Guide</span>
      <span>→</span>
    </div>
  </a>
</div>

<div class="hub-section-title">⚙️ Operating Systems & Runtime</div>

<div class="hub-grid">
  <a href="/notes/operating-systems/thread-and-process-notes" class="hub-card">
    <div>
      <div class="hub-card-header">
        <span class="hub-card-icon">🧠</span>
        <span class="hub-badge badge-mobile">OS & Runtime</span>
      </div>
      <div class="hub-card-title">Thread vs Process Architecture</div>
      <div class="hub-card-desc">
        Virtual address space isolation, PCB/TCB structures, TLB cache flushes, context switching overhead, IPC, and language runtime concurrency models.
      </div>
    </div>
    <div class="hub-card-footer">
      <span>Read Full Guide</span>
      <span>→</span>
    </div>
  </a>

  <a href="/notes/operating-systems/cron-jobs-notes" class="hub-card">
    <div>
      <div class="hub-card-header">
        <span class="hub-card-icon">⏰</span>
        <span class="hub-badge badge-mobile">OS & Runtime</span>
      </div>
      <div class="hub-card-title">Cron Jobs & OS Task Scheduling</div>
      <div class="hub-card-desc">
        Under-the-hood crond daemon lifecycle, crontab syntax breakdown, process isolation via fork/execve, flock race condition prevention, and distributed schedulers.
      </div>
    </div>
    <div class="hub-card-footer">
      <span>Read Full Guide</span>
      <span>→</span>
    </div>
  </a>
</div>

<div class="hub-section-title">📲 Mobile Infrastructure</div>

<div class="hub-grid">
  <a href="/notes/mobile/push-notifications-notes" class="hub-card">
    <div>
      <div class="hub-card-header">
        <span class="hub-card-icon">🔔</span>
        <span class="hub-badge badge-mobile">Mobile & OS</span>
      </div>
      <div class="hub-card-title">Push Notifications, FCM & APNs</div>
      <div class="hub-card-desc">
        OS background daemons, APNs vs FCM protocols, silent background pushes, and Android fullScreenIntent vs iOS CallKit.
      </div>
    </div>
    <div class="hub-card-footer">
      <span>Read Full Guide</span>
      <span>→</span>
    </div>
  </a>

  <a href="/notes/mobile/flutter-webview" class="hub-card">
    <div>
      <div class="hub-card-header">
        <span class="hub-card-icon">📱</span>
        <span class="hub-badge badge-mobile">Mobile Frameworks</span>
      </div>
      <div class="hub-card-title">Flutter WebView Integration</div>
      <div class="hub-card-desc">
        Embedding web views in mobile apps, JavaScript bridge channels, SSL certificate pinning, cookie sync, and web-to-native communication.
      </div>
    </div>
    <div class="hub-card-footer">
      <span>Read Full Guide</span>
      <span>→</span>
    </div>
  </a>
</div>

<div class="hub-section-title">🛠️ Tooling & Documentation</div>

<div class="hub-grid">
  <a href="/notes/tooling/vitepress-notes" class="hub-card">
    <div>
      <div class="hub-card-header">
        <span class="hub-card-icon">⚡</span>
        <span class="hub-badge badge-tooling">Developer Tools</span>
      </div>
      <div class="hub-card-title">VitePress SSG & Customization</div>
      <div class="hub-card-desc">
        Modern documentation generator architecture, Vue components in Markdown, theme overrides, dynamic sidebars, and deployment setup.
      </div>
    </div>
    <div class="hub-card-footer">
      <span>Read Full Guide</span>
      <span>→</span>
    </div>
  </a>
</div>

</div>
