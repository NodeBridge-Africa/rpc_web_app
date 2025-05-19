import { Suspense } from "react";
import SponsorHero from "./sections/SponsorHero";
import SponsorBenefits from "./sections/SponsorBenefits";
import SponsorPackages from "./sections/SponsorPackages";
import SponsorTestimonials from "./sections/SponsorTestimonials";
import SponsorContact from "./sections/SponsorContact";
import Loading from "@/components/ui/Loading";
export default function SponsorPage() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <SponsorHero />
        <SponsorBenefits />
        <SponsorPackages />
        <SponsorTestimonials />
        <SponsorContact />
      </Suspense>
    </>
  );
}
