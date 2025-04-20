import MDXsection from "@/components/common/MDXsection";
import Background from "@/components/pomo/Background";
import Menu from "@/components/pomo/Menu";
import MenuBottom from "@/components/pomo/MenuBottom";
import ScrollToTop from "@/components/pomo/ScrollToTop";
import Timer from "@/components/pomo/Timer";
import { getPageContent } from "@/utils/mdx";

export default function Home() {
  const { content, meta } = getPageContent("pomodoro.mdx");

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
  );
}
