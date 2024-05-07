import Background from '@/components/pomo/Background'
import Timer from '@/components/pomo/Timer'
import { getPageContent } from '@/utils/mdx';
import MDXsection from '@/components/common/MDXsection';
import Menu from '@/components/pomo/Menu';


const Page = () => {
  const { content, meta } = getPageContent('pomodoro.mdx');

  return (
    <main>
      <Background>
        <Menu />
        <Timer />
      </Background>
      <MDXsection meta={meta} content={content} />
    </main>
  )
}

export default Page