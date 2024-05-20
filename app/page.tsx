import Header from "@/components/landing-page/Header";
import Hero from "@/components/landing-page/Hero";
import Pomo from "@/components/landing-page/Pomo";

export default function Home() {  
  return (
    <main className="h-fit w-full px-8 bg-[#f5f5f5]">
      <Header />
      <Hero />
      <Pomo />
    </main>
  );
}
