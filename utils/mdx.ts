import { metaType } from "@/types/mdx"
import matter from "gray-matter";

type PageContent = {
  content: string,
  meta: metaType
}

const getPageContent = (file: string): PageContent => {
  const { content, data } = matter.read(`${process.cwd()}/contents/pages/${file}`)
  const plainContent = content.toString()

  return {
    content: plainContent,
    meta: data as PageContent['meta']
  }
}

export { getPageContent }