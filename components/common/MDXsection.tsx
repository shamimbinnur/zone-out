import { metaType } from '@/types/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { FC } from 'react'

interface MDXsectionProps {
  content: string
  meta?: metaType
}

const MDXsection:FC<MDXsectionProps> = ({
  content
}) => {
  return (
    <div className="bg-stone-50 dark:bg-stone-950">
      <section
        className="
        text-stone-950 dark:text-stone-50
          mx-auto max-w-5xl px-4 pt-16 sm:pt-32 pb-14 prose
          prose-h1:text-4xl prose-h1:font-semibold prose-h1:tracking-normal prose-h1:leading-tight prose-h1:mb-16
          prose-h2:text-3xl prose-h2:font-semibold prose-h2:tracking-tight prose-h2:leading-tight
          prose-p:text-lg prose-p:font-normal prose-p:tracking-normal prose-p:leading-normal prose-p:my-6
          prose-li:text-lg prose-li:font-normal prose-li:tracking-tight prose-li:leading-normal prose-li:my-6
        ">
        <MDXRemote source={content} />
      </section>
    </div>
  )
}

export default MDXsection