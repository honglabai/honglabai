import Contact from "@/components/Contact";
import Features from "@/components/Features";
import FeaturedApps from "@/components/FeaturedApps";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { getPublishedApps } from "@/server/apps";

export const revalidate = 60;

export default async function HomePage() {
  const featuredApps = await getPublishedApps({ featured: true, limit: 3 });

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <main>
        <Hero featuredApp={featuredApps[0] ?? null} />
        <FeaturedApps apps={featuredApps} />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
