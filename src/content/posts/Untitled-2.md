---
title: 'Example Post with Tags'
pubDate: '2025-08-09'
tags: ['tech', 'javascript', 'tutorial', 'webdev']
---

This is an example post that demonstrates the new tag functionality.

## Features

- **Tag Filtering**: Click on any tag in the homepage to filter posts
- **URL State**: Tag filters are preserved in the URL for easy sharing
- **Post Tags**: Each post displays its tags at the bottom
- **Responsive Design**: Works great on both desktop and mobile

## Usage

To add tags to your posts, simply include them in the frontmatter:

```yaml
---
title: 'Your Post Title'
pubDate: '2025-08-09'
tags: ['tag1', 'tag2', 'tag3']
---
```

## Creating Posts with Tags

You can use the enhanced new-post script:

```bash
# Create a post with tags
pnpm new "My New Post" --tags "tech,javascript,tutorial"

# Create a draft post with tags
pnpm new "_Draft Post" --tags "draft,work-in-progress"
```

Enjoy the new tagging system! 🏷️