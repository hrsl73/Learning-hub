import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const outputPath = path.resolve(__dirname, '../profile.md')

function generateProfileMarkdown() {
  return `---
title: Developer Profile
aside: false
---

<div class="profile-container">

<div class="profile-hero">
  <img src="https://github.com/hrsl73.png" alt="Harshil Mayani" class="profile-avatar" />
  <div class="profile-info">
    <h1 class="profile-name">Harshil Mayani 👋</h1>
    <div class="profile-bio">
      Software engineer passionate about building high-performance backend systems, real-time networking, mobile applications, and automation tools.
    </div>
    <div class="profile-pills">
      <span class="profile-pill">🌱 Deep-diving into DBs, WebSockets & Architecture</span>
      <span class="profile-pill">💬 Ask me about TS, Node.js, Python, & Flutter</span>
      <span class="profile-pill">📍 Open to Learning & Collaboration</span>
    </div>
  </div>
</div>

<div class="profile-section-heading">🛠️ Tech Stack & Core Competencies</div>

<div class="profile-skills-grid">

  <div class="profile-skill-card">
    <div class="profile-skill-cat">Languages</div>
    <div class="profile-tech-tags">
      <span class="profile-tech-tag">🟨 JavaScript</span>
      <span class="profile-tech-tag">🟦 TypeScript</span>
      <span class="profile-tech-tag">🐍 Python</span>
      <span class="profile-tech-tag">🎯 Dart</span>
    </div>
  </div>

  <div class="profile-skill-card">
    <div class="profile-skill-cat">Frontend & Mobile</div>
    <div class="profile-tech-tags">
      <span class="profile-tech-tag">⚛️ React</span>
      <span class="profile-tech-tag">💙 Flutter</span>
      <span class="profile-tech-tag">🌐 HTML5 / CSS3</span>
      <span class="profile-tech-tag">⚡ VitePress</span>
    </div>
  </div>

  <div class="profile-skill-card">
    <div class="profile-skill-cat">Backend & Databases</div>
    <div class="profile-tech-tags">
      <span class="profile-tech-tag">🟢 Node.js</span>
      <span class="profile-tech-tag">⚙️ Express.js</span>
      <span class="profile-tech-tag">🐘 PostgreSQL</span>
      <span class="profile-tech-tag">🔌 Socket.IO</span>
    </div>
  </div>

  <div class="profile-skill-card">
    <div class="profile-skill-cat">Tools & Infrastructure</div>
    <div class="profile-tech-tags">
      <span class="profile-tech-tag">🐙 Git & GitHub</span>
      <span class="profile-tech-tag">💻 VS Code</span>
      <span class="profile-tech-tag">▲ Vercel</span>
      <span class="profile-tech-tag">🔔 FCM & APNs</span>
    </div>
  </div>

</div>

<div class="profile-section-heading">🚀 Highlighted Projects</div>

<div class="profile-projects-grid">

  <a href="https://github.com/hrsl73/terminal-sound" target="_blank" rel="noopener" class="profile-project-card">
    <div>
      <div class="profile-project-title">🔊 terminal-sound</div>
      <div class="profile-project-desc">
        A VS Code extension that plays custom audio chimes and success/failure sound notifications when integrated terminal commands finish executing.
      </div>
    </div>
    <div class="profile-tech-tags">
      <span class="profile-tech-tag">TypeScript</span>
      <span class="profile-tech-tag">VS Code API</span>
    </div>
  </a>

  <a href="https://github.com/hrsl73/Learning-hub" target="_blank" rel="noopener" class="profile-project-card">
    <div>
      <div class="profile-project-title">📚 Learning Hub</div>
      <div class="profile-project-desc">
        Personal structured knowledge base and VitePress documentation platform compiling deep-dive technical notes on system architecture, databases, and networking.
      </div>
    </div>
    <div class="profile-tech-tags">
      <span class="profile-tech-tag">VitePress</span>
      <span class="profile-tech-tag">System Design</span>
    </div>
  </a>

</div>

<div class="profile-section-heading">📈 GitHub Analytics & Activity</div>

<div class="profile-stats-container">
  <div class="profile-stat-box">
    <img src="https://github-readme-stats-seven-psi-34.vercel.app/api?username=hrsl73&show_icons=true&theme=tokyonight&count_private=true&include_all_commits=true&cache_seconds=86400" alt="Harshil's GitHub Stats" />
  </div>
  <div class="profile-stat-box">
    <img src="https://github-readme-stats-seven-psi-34.vercel.app/api/top-langs/?username=hrsl73&layout=compact&theme=tokyonight&count_private=true&cache_seconds=86400" alt="Top Languages" />
  </div>
</div>

</div>
`
}

function fetchProfile() {
  console.log('Generating Developer Profile page...')
  try {
    const formattedMarkdown = generateProfileMarkdown()
    fs.writeFileSync(outputPath, formattedMarkdown, 'utf-8')
    console.log('Successfully updated profile.md!')
  } catch (error) {
    console.error('Error writing profile:', error.message)
  }
}

fetchProfile()
