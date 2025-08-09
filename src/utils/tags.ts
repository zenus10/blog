import type { CollectionEntry } from 'astro:content'

export interface TagInfo {
    name: string
    count: number
    posts: CollectionEntry<'posts'>[]
}

/**
 * 从文章集合中提取所有标签信息
 */
export function extractTags(posts: CollectionEntry<'posts'>[]): Map<string, TagInfo> {
    const tagMap = new Map<string, TagInfo>()

    posts.forEach(post => {
        const tags = post.data.tags || []

        tags.forEach(tag => {
            if (!tagMap.has(tag)) {
                tagMap.set(tag, {
                    name: tag,
                    count: 0,
                    posts: []
                })
            }

            const tagInfo = tagMap.get(tag)!
            tagInfo.count++
            tagInfo.posts.push(post)
        })
    })

    return tagMap
}

/**
 * 获取按文章数量排序的标签列表
 */
export function getSortedTags(posts: CollectionEntry<'posts'>[]): TagInfo[] {
    const tagMap = extractTags(posts)

    return Array.from(tagMap.values())
        .sort((a, b) => b.count - a.count)
}

/**
 * 根据标签筛选文章
 */
export function getPostsByTag(
    posts: CollectionEntry<'posts'>[],
    tag: string
): CollectionEntry<'posts'>[] {
    if (tag === 'all' || !tag) {
        return posts
    }

    return posts.filter(post =>
        post.data.tags && post.data.tags.includes(tag)
    )
}

/**
 * 获取文章的所有标签
 */
export function getPostTags(post: CollectionEntry<'posts'>): string[] {
    return post.data.tags || []
}

/**
 * 检查文章是否包含指定标签
 */
export function hasTag(post: CollectionEntry<'posts'>, tag: string): boolean {
    const tags = post.data.tags || []
    return tags.includes(tag)
}

/**
 * 获取最受欢迎的标签（按文章数量）
 */
export function getPopularTags(posts: CollectionEntry<'posts'>[], limit = 10): TagInfo[] {
    return getSortedTags(posts).slice(0, limit)
}

/**
 * 获取所有唯一标签
 */
export function getAllTags(posts: CollectionEntry<'posts'>[]): string[] {
    const tagSet = new Set<string>()

    posts.forEach(post => {
        const tags = post.data.tags || []
        tags.forEach(tag => tagSet.add(tag))
    })

    return Array.from(tagSet).sort()
}