import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rawUrl = 'https://raw.githubusercontent.com/hrsl73/hrsl73/main/README.md'
const outputPath = path.resolve(__dirname, '../profile.md')

async function fetchProfile() {
  console.log('Fetching GitHub profile README...')
  try {
    const res = await fetch(rawUrl)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    let content = await res.text()
    
    // Remove the HTML comments and activity sections if they exist in the raw markdown, 
    // or keep them. The activity feed is perfect for GitHub but might look empty if not built.
    // Let's prepend VitePress frontmatter
    const frontmatter = `---
title: Developer Profile
aside: false
---

`
    fs.writeFileSync(outputPath, frontmatter + content, 'utf-8')
    console.log('Successfully updated profile.md!')
  } catch (error) {
    console.error('Error fetching profile from GitHub:', error.message)
    // Fallback page if file doesn't exist
    if (!fs.existsSync(outputPath)) {
      const fallback = `---
title: Developer Profile
aside: false
---

# Harshil Mayani

Software developer specializing in TypeScript, Python, and WebSockets.

[View GitHub Profile](https://github.com/hrsl73)
`
      fs.writeFileSync(outputPath, fallback, 'utf-8')
    }
  }
}

fetchProfile()
