import type { CollectionEntry } from 'astro:content'

// Reading time interface
export interface ReadingTime {
  text: string
  minutes: number
  time: number
  words: number
}

// TOC item interface
export interface TOCItem {
  level: number
  text: string
  id: string
  index: number
}

// PostList component props interface
export interface PostListProps {
  posts: CollectionEntry<'posts'>[]
}

// Post data interface (for better type safety)
export interface PostData {
  title: string
  pubDate: Date
  image?: string
  tags?: string[]
}

// Extended post entry with explicit tags type
export type PostEntry = CollectionEntry<'posts'> & { data: PostData }