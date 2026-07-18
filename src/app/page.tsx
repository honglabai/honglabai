import Contact from "@/components/Contact";
import Features from "@/components/Features";
import FeaturedApps from "@/components/FeaturedApps";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export const revalidate = 60;

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <main>
        <Hero />
        <FeaturedApps />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
