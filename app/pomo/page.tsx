import Background from '@/components/pomo/Background'
import Timer from '@/components/pomo/Timer'
import { getPageContent } from '@/utils/mdx';
import MDXsection from '@/components/common/MDXsection';


const Page = () => {
  const { content, meta } = getPageContent('pomodoro.mdx');

  return (
    <main>
      <Background>
        <Timer />
      </Background>
      <MDXsection meta={meta} content={content} />
    </main>
  )
}

export default Page