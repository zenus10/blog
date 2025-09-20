// Configuration types
export * from './config.types'

// Content types
export * from './content.types'

// Component types
export * from './component.types'

// Friends types
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

export interface FriendsProps {
    showAll?: boolean
    maxDisplay?: number
    showCategories?: boolean
}