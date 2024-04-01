import Head from "next/head"
import { FC } from "react"

interface DocTitleProps {
  documentTitle: string
}

const DocTitle: FC<DocTitleProps> = ({
  documentTitle
}) => {
  return (
    <Head>{documentTitle}</Head>
  )
}

export default DocTitle