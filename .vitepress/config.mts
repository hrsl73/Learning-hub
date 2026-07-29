import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Helper to format string into title case
function toTitleCase(str: string) {
  return str
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Helper to extract first # Header from Markdown file
function getFileTitle(filePath: string, defaultName: string) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const match = content.match(/^#\s+(.+)$/m)
    if (match && match[1]) {
      // Strip emojis if you want clean text, or leave them. Let's keep them!
      return match[1].trim()
    }
  } catch (e) {
    // Ignore error and fallback to default name
  }
  return toTitleCase(defaultName.replace('-notes', '').replace('notes', ''))
}

function getSidebar() {
  const notesDir = path.resolve(__dirname, '../notes')
  if (!fs.existsSync(notesDir)) {
    return []
  }

  const sidebar: any[] = []
  const items = fs.readdirSync(notesDir, { withFileTypes: true })

  // 1. Handle subdirectories first (these will be sidebar categories)
  const subdirs = items.filter(item => item.isDirectory())
  for (const subdir of subdirs) {
    const dirPath = path.join(notesDir, subdir.name)
    const files = fs.readdirSync(dirPath)
      .filter(file => file.endsWith('.md') && file.toLowerCase() !== 'index.md')
      .map(file => {
        const nameWithoutExt = path.basename(file, '.md')
        const fullPath = path.join(dirPath, file)
        return {
          text: getFileTitle(fullPath, nameWithoutExt),
          link: `/notes/${subdir.name}/${nameWithoutExt}`
        }
      })

    if (files.length > 0) {
      sidebar.push({
        text: toTitleCase(subdir.name),
        items: files,
        collapsed: false
      })
    }
  }

  // 2. Handle files directly in notes/
  const directFiles = items
    .filter(item => item.isFile() && item.name.endsWith('.md') && item.name.toLowerCase() !== 'index.md')
    .map(item => {
      const nameWithoutExt = path.basename(item.name, '.md')
      const fullPath = path.join(notesDir, item.name)
      return {
        text: getFileTitle(fullPath, nameWithoutExt),
        link: `/notes/${nameWithoutExt}`
      }
    })

  if (directFiles.length > 0) {
    sidebar.push({
      text: 'General Notes',
      items: directFiles,
      collapsed: false
    })
  }

  return sidebar
}

export default withMermaid(defineConfig({
  title: "Harshil's Learning Hub",
  description: "Personal Knowledge Base & Notes",
  
  // Set srcDir to root so it compiles index.md at root
  srcDir: '.',
  
  // Exclude development, scripting and config folders from building
  srcExclude: [
    '**/README.md',
    'scripts/**',
    'templates/**',
    'node_modules/**'
  ],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Profile', link: '/profile' },
      { text: 'VitePress Notes', link: '/notes/vitepress-notes' },
      { text: 'PostgreSQL Notes', link: '/notes/postgresql-notes' },
      { text: 'Socket.IO Notes', link: '/notes/socket' }
    ],
    
    sidebar: getSidebar(),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hrsl73/Learning-hub' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Compiled automatically with VitePress.',
      copyright: `Copyright © ${new Date().getFullYear()} Harshil Mayani`
    }
  }
}))
