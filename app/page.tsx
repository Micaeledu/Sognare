import { getSiteMedia } from "@/lib/media";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CredibilityBar } from "@/components/CredibilityBar";
import { Gallery } from "@/components/Gallery";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  const media = getSiteMedia();

  return (
    <>
      <Navbar />
      <main>
        <Hero image={media.heroImage} featuredVideo={media.videos[0] ?? null} />
        <CredibilityBar />
        <Gallery images={media.gallery} />
        <Services />
        <Process />
        <About portrait={media.founderPhoto} videos={media.videos} />
        <Testimonials avaliacoes={media.avaliacoes} />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
