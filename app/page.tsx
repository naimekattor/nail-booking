import { Hero } from "@/components/hero";
import { Testimonials } from "@/components/testimonials";
import { Pricing } from "@/components/pricing";
import { ComparisonTable } from "@/components/comparison-table";
import { FAQ } from "@/components/faq";
import { CTASection } from "@/components/cta-section";
import { AppDownload } from "@/components/app-download";
import { Features } from "@/components/features";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <ComparisonTable />
        <AppDownload />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
