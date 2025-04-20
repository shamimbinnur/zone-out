import { Suspense } from "react";
import MDXsection from "@/components/common/MDXsection";
import Background from "@/components/pomo/Background";
import Menu from "@/components/pomo/Menu";
import MenuBottom from "@/components/pomo/MenuBottom";
import ScrollToTop from "@/components/pomo/ScrollToTop";
import Timer from "@/components/pomo/Timer";
import { getPageContent } from "@/utils/mdx";
import { preloadSounds } from "@/utils/audio";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function PomodoroPage() {
  // Get MDX content for the information section
  const { content, meta } = getPageContent("pomodoro.mdx");

  // Preload sounds on the client side
  if (typeof window !== "undefined") {
    preloadSounds();
  }

  return (
    <ThemeProvider>
      <main>
        {/* Timer Application Section */}
        <Background>
          {/* Top Navigation */}
          <Menu />

          {/* Main Timer Interface */}
          <Timer />

          {/* Bottom Navigation with Audio Controls and Quotes */}
          <Suspense fallback={<div className="h-[60px]"></div>}>
            <MenuBottom />
          </Suspense>

          {/* Floating Button to Return to Top */}
          <ScrollToTop />
        </Background>

        {/* Information Section with Pomodoro Technique Description */}
        <Suspense fallback={<div className="h-[200px] bg-stone-50"></div>}>
          <MDXsection meta={meta} content={content} />
        </Suspense>
      </main>
    </ThemeProvider>
  );
}
