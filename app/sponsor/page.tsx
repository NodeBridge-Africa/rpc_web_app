import { Suspense } from "react";
import SponsorHero from "./sections/SponsorHero";
import SponsorBenefits from "./sections/SponsorBenefits";

import Loading from "@/components/ui/Loading";
export default function SponsorPage() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <SponsorHero />
        <SponsorBenefits />
        {/* <SponsorPackages />
        <SponsorTestimonials />
        <SponsorContact /> */}
      </Suspense>
    </>
  );
}
