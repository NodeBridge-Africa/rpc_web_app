import { Suspense } from "react";
import PrivacyContent from "./sections/PrivacyContent";
import Loading from "@/components/ui/Loading";

export default function PrivacyPage() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <PrivacyContent />
      </Suspense>
    </>
  );
}
