import Link from "next/link";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import FeaturedApps from "@/components/FeaturedApps";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import { getPublishedApps } from "@/server/apps";

export const revalidate = 60;

export default async function HomePage() {
  const portfolioApps = await getPublishedApps({ limit: 6 });

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <ScrollReveal />
      <main id="main-content">
        <ScrollVideoHero
          src="/media/hero-scroll.mp4"
          poster="/media/hero-poster.jpg"
          eyebrow="AI Software & Consulting"
          headline={
            <>
              아이디어를
              <br />
              작동하는 <span className="text-primary-light">제품</span>으로.
            </>
          }
          description="기획부터 설계, 개발, 배포까지 직접 만듭니다. 지금까지 만든 앱들이 실제로 운영되고 있습니다."
        >
          <Link
            href="/apps"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary-dark active:scale-[0.98] sm:text-lg"
          >
            만든 앱 둘러보기
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 active:scale-[0.98] sm:text-lg"
          >
            프로젝트 문의하기
          </Link>
        </ScrollVideoHero>

        <FeaturedApps apps={portfolioApps} />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
