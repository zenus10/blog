/**
 * Create a new post with frontmatter
 * Usage: pnpm new <title> [--tags tag1,tag2,tag3]
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'

// 解析命令行参数
const args = process.argv.slice(2)
let titleArgs: string[] = []
let tags: string[] = []

// 分离标题和标签
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--tags' && i + 1 < args.length) {
    // 解析标签，支持逗号分隔
    tags = args[i + 1].split(',').map(tag => tag.trim()).filter(Boolean)
    i++ // 跳过标签值
  } else {
    titleArgs.push(args[i])
  }
}

const rawTitle: string = titleArgs.length > 0 ? titleArgs.join(' ') : 'new-post'

// Check if title starts with underscore (draft post)
const isDraft: boolean = rawTitle.startsWith('_')
const displayTitle: string = isDraft ? rawTitle.slice(1) : rawTitle

const fileName: string = rawTitle
  .toLowerCase()
  .replace(/[^a-z0-9\s-_]/g, '') // Remove special characters but keep underscore and hyphen
  .replace(/\s+/g, '-') // Replace spaces with hyphens
  .replace(/-+/g, '-') // Replace multiple hyphens with single
  .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
const targetFile: string = `${fileName}.md`
const fullPath: string = join('src/content/posts', targetFile)

// Check if the target file already exists
if (existsSync(fullPath)) {
  console.error(`😇 File already exists: ${fullPath}`)
  process.exit(1)
}

// Ensure the directory structure exists
mkdirSync(dirname(fullPath), { recursive: true })

// Generate frontmatter with current date and optional tags
const tagsLine = tags.length > 0 ? `tags: [${tags.map(tag => `'${tag}'`).join(', ')}]\n` : ''

const content: string = `---
title: ${displayTitle}
pubDate: '${new Date().toISOString().split('T')[0]}'
${tagsLine}---

`

// Write the new post file
try {
  writeFileSync(fullPath, content)
  if (isDraft) {
    console.log(`📝 Draft created: ${fullPath}`)
  } else {
    console.log(`✅ Post created: ${fullPath}`)
  }

  if (tags.length > 0) {
    console.log(`🏷️  Tags: ${tags.join(', ')}`)
  }

  console.log(`\n💡 Usage examples:`)
  console.log(`   pnpm new "My New Post"`)
  console.log(`   pnpm new "My New Post" --tags "tech,javascript,tutorial"`)
  console.log(`   pnpm new "_Draft Post" --tags "draft,work-in-progress"`)
} catch (error) {
  console.error('⚠️ Failed to create post:', error)
  process.exit(1)
}