import { getSiteMedia } from "@/lib/media";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CredibilityBar } from "@/components/CredibilityBar";
import { Gallery } from "@/components/Gallery";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { InstagramSection } from "@/components/InstagramSection";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  const media = getSiteMedia();

  return (
    <>
      <Navbar />
      <main>
        <Hero
          image={media.heroImage}
          heroVideo={media.heroVideo}
          narratedVideos={media.videos}
        />
        <CredibilityBar />
        <Gallery images={media.gallery} />
        <Services images={media.gallery} />
        <Process />
        <About portrait={media.founderPhoto} videos={media.videos} />
        <Testimonials serviceImage={media.serviceImage} />
        <InstagramSection />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
