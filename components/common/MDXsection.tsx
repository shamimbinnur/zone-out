import { metaType } from '@/types/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import React, { FC } from 'react'

interface MDXsectionProps {
  content: string
  meta?: metaType
}

const MDXsection:FC<MDXsectionProps> = ({
  content
}) => {
  return (
    <section
      className="
      mx-auto max-w-5xl px-4 pt-16 sm:pt-32 pb-16 prose
      prose-headings:text-gray-800
      prose-h1:text-5xl prose-h1:font-semibold prose-h1:tracking-tighter prose-h1:leading-tight prose-h1:mb-16
      prose-h2:text-4xl prose-h2:font-semibold prose-h2:tracking-tighter prose-h2:leading-tight
      prose-p:text-xl prose-p:font-normal prose-p:tracking-tighter prose-p:leading-normal prose-p:my-8
      prose-ol:text-xl prose-ol:font-normal prose-ol:tracking-tighter prose-ol:leading-normal prose-ol:my-8
      prose-li:text-xl prose-li:font-normal prose-li:tracking-tighter prose-li:leading-normal prose-li:my-8
      ">
      <MDXRemote source={content} />
    </section>
  )
}

export default MDXsection