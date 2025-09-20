export interface Friend {
    name: string
    url: string
    description: string
    avatar?: string
    category?: string
}

export interface FriendsConfig {
    title: string
    description: string
    friends: Friend[]
}

export const friendsConfig: FriendsConfig = {
    title: "友链",
    description: "uu们的博客",
    friends: [
        {
            name: "NonMirror",
            url: "https://nonmirror.icu",
            description: "",
            category: "朋友"
        },
        {
            name: "B3dman",
            url: "https://b3dman.top",
            description: "",
            category: "朋友"
        },
        {
            name: "Psych",
            url: "https://psych.green",
            description: "",
            category: "朋友"
        },
    ]
}

// 按类别分组友链
export function getFriendsByCategory(): Map<string, Friend[]> {
    const categorized = new Map<string, Friend[]>()

    friendsConfig.friends.forEach(friend => {
        const category = friend.category || '其他'
        if (!categorized.has(category)) {
            categorized.set(category, [])
        }
        categorized.get(category)!.push(friend)
    })

    return categorized
}

// 获取随机友链
export function getRandomFriends(count: number = 4): Friend[] {
    const shuffled = [...friendsConfig.friends].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
}