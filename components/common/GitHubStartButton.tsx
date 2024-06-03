"use client"
import GitHubButton from 'react-github-btn'

const GitHubStartButton = () => {
  return (
    <div className="opacity-70 hover:opacity-100 transform transition-all">
      <GitHubButton
        href="https://github.com/shamimbinnur/zone-out"
        data-color-scheme="no-preference: light; light: light; dark: dark;"
        data-icon="octicon-star"
        data-show-count="true"
        aria-label="Star shamimbinnur/zone-out on GitHub">
          Star
      </GitHubButton>
    </div>
  )
}

export default GitHubStartButton