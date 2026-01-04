import fs from 'fs'
import path from 'path'

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  coverImage?: string
  html: string
}

export type BlogPostMeta = Omit<BlogPost, 'html'>

type IndexEntry = {
  slug: string
  title: string
  excerpt: string
  coverImage?: string
  file: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
const INDEX_PATH = path.join(BLOG_DIR, 'index.json')

let cachedIndex: IndexEntry[] | null = null
let cachedBySlug: Map<string, IndexEntry> | null = null

const readIndex = (): IndexEntry[] => {
  if (cachedIndex) return cachedIndex

  if (!fs.existsSync(INDEX_PATH)) {
    cachedIndex = []
    cachedBySlug = new Map()
    return cachedIndex
  }

  const raw = fs.readFileSync(INDEX_PATH, 'utf8')
  const parsed = JSON.parse(raw) as IndexEntry[]
  cachedIndex = Array.isArray(parsed) ? parsed : []
  cachedBySlug = new Map(cachedIndex.map((p) => [p.slug, p]))
  return cachedIndex
}

export const getAllPosts = (): BlogPostMeta[] => {
  const idx = readIndex()
  return idx.map(({ file: _file, ...meta }) => meta)
}

export const getPostBySlug = (slug: string): BlogPost | null => {
  const idx = readIndex()
  if (!cachedBySlug) cachedBySlug = new Map(idx.map((p) => [p.slug, p]))
  const meta = cachedBySlug.get(slug)
  if (!meta) return null
  const filePath = path.join(BLOG_DIR, meta.file)
  if (!fs.existsSync(filePath)) return null
  const html = fs.readFileSync(filePath, 'utf8')
  return { slug: meta.slug, title: meta.title, excerpt: meta.excerpt, coverImage: meta.coverImage, html }
}
