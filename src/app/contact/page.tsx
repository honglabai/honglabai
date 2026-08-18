import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "프로젝트 문의",
  description: "AI, 웹, 앱 프로젝트에 대해 HongLabAI와 상담하세요.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-paper text-zinc-950">
      <Navbar />
      <main id="main-content" className="pt-16">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
