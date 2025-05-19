import { Suspense } from "react";
import AboutContent from "./sections/AboutContent";
import Loading from "@/components/ui/Loading";
export default function AboutPage() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <AboutContent />
      </Suspense>
    </>
  );
}
