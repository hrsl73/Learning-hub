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
      return match[1].trim()
    }
  } catch (e) {
    // Ignore error and fallback to default name
  }
  return toTitleCase(defaultName.replace('-notes', '').replace('notes', ''))
}

const categoryEmojis: Record<string, string> = {
  databases: '🗄️',
  networking: '⚡',
  mobile: '📲',
  tooling: '🛠️'
}

function getCategoryTitle(folderName: string) {
  const emoji = categoryEmojis[folderName.toLowerCase()] || '📁'
  return `${emoji} ${toTitleCase(folderName)}`
}

function getSidebar() {
  const notesDir = path.resolve(__dirname, '../notes')
  if (!fs.existsSync(notesDir)) {
    return {}
  }

  const sidebarObj: Record<string, any[]> = {}
  const items = fs.readdirSync(notesDir, { withFileTypes: true })
  const subdirs = items.filter(item => item.isDirectory())
  const globalSidebar: any[] = []

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
      const title = getCategoryTitle(subdir.name)
      const section = {
        text: title,
        items: files,
        collapsed: false
      }

      // Scoped multi-sidebar per category folder
      sidebarObj[`/notes/${subdir.name}/`] = [section]
      globalSidebar.push(section)
    }
  }

  // Root /notes/ overview fallback
  sidebarObj['/notes/'] = globalSidebar

  return sidebarObj
}

export default withMermaid(defineConfig({
  title: "Harshil's Learning Hub",
  description: "Personal Knowledge Base & Notes",
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
  ],
  
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
      { text: 'Study Hub 📚', link: '/notes/' },
      { text: 'Profile 👤', link: '/profile' }
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
