import type { Metadata } from "next";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Timeline from "@/components/Timeline";
import InstallGrid from "@/components/InstallGrid";
import Results from "@/components/Results";
import Guarantee from "@/components/Guarantee";
import TrainingSupport from "@/components/TrainingSupport";
import FinalCta from "@/components/FinalCta";
import { hasLogoRevealVideo } from "@/lib/media";
import { site, guarantee } from "@/data/site";

export const metadata: Metadata = {
  title: "Train & Scale — Done-For-You Client Acquisition",
  description: guarantee.headline + " " + site.mission,
};

export default function Home() {
  const hasVideo = hasLogoRevealVideo();

  return (
    <>
      <Preloader hasVideo={hasVideo} />
      <Hero />
      <Mission />
      <Timeline />
      <InstallGrid />
      <Results />
      <Guarantee />
      <TrainingSupport />
      <FinalCta />
    </>
  );
}
