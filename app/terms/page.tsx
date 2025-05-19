import { Suspense } from "react";
import TermsContent from "./sections/TermsContent";
import Loading from "@/components/ui/Loading";
export default function TermsPage() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <TermsContent />
      </Suspense>
    </>
  );
}
