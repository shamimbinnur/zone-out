import Background from '@/components/pomo/Background'
import Timer from '@/components/pomo/Timer'
import { getPageContent } from '@/utils/mdx';
import MDXsection from '@/components/common/MDXsection';
import Menu from '@/components/pomo/Menu';
import MenuBottom from '@/components/pomo/MenuBottom';
import ScrollToTop from '@/components/pomo/ScrollToTop';

const Page = () => {
  const { content, meta } = getPageContent('pomodoro.mdx');

  return (
    <main>
      <Background>
        <Menu />
        <Timer />
        <MenuBottom />
        <ScrollToTop />
      </Background>
      <MDXsection meta={meta} content={content} />
    </main>
  )
}

export default Page