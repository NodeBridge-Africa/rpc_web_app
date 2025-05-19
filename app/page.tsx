import { Suspense } from "react";
import Hero from "@/app/(landing)/sections/Hero";
import PartnersMarquee from "@/app/(landing)/sections/PartnersMarquee";
import CoreFeatures from "@/app/(landing)/sections/CoreFeatures";
import SupportedNetworks from "@/app/(landing)/sections/SupportedNetworks";
import EducationHub from "@/app/(landing)/sections/EducationHub";
import Gallery from "@/app/(landing)/sections/Gallery";
import Testimonials from "@/app/(landing)/sections/Testimonials";
import FAQ from "@/app/(landing)/sections/FAQ";
import CtaBanner from "@/app/(landing)/sections/CtaBanner";
import Loading from "@/components/ui/Loading";

export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Hero />
        <PartnersMarquee />
        <CoreFeatures />
        <SupportedNetworks />
        <EducationHub />
        <Gallery />
        <Testimonials />
        <FAQ />
        <CtaBanner />
      </Suspense>
    </>
  );
}
