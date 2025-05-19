"use client";

import { motion } from "framer-motion";
import {
  code_of_conduct_link,
  disclaimer_link,
  support_link,
} from "@/constant";

export default function TermsContent() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Terms of Service
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            These Terms of Service govern your use of Nodebridge Africa&apos;s
            services. By accessing or using our platform, you agree to these
            terms. Please read them carefully. For more information, see our{" "}
            <a href="/privacy" className="text-[#10B981] underline">
              Privacy Policy
            </a>
            ,{" "}
            <a
              href={code_of_conduct_link}
              target="_blank"
              className="text-[#10B981] underline"
            >
              Community Code of Conduct
            </a>
            , and{" "}
            <a
              href={disclaimer_link}
              target="_blank"
              className="text-[#10B981] underline"
            >
              Disclaimer
            </a>
            .
          </p>
        </motion.div>
        <div className="max-w-3xl mx-auto text-left space-y-8 text-muted-foreground">
          <div>
            <h3 className="font-semibold text-xl mb-2">
              1. General Information
            </h3>
            <p>
              The information provided on Nodebridge Africa is for educational
              and informational purposes only. We strive for accuracy but do not
              guarantee completeness or reliability. See our{" "}
              <a
                href={disclaimer_link}
                target="_blank"
                className="text-[#10B981] underline"
              >
                Disclaimer
              </a>{" "}
              for more details.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">
              2. No Financial or Investment Advice
            </h3>
            <p>
              The content on this website is not intended to be, and should not
              be construed as, financial or investment advice. Nodebridge Africa
              does not endorse or recommend any specific cryptocurrency,
              blockchain project, or investment strategy. Any decisions
              regarding investments or financial matters should be made with
              careful consideration and consultation with a qualified financial
              advisor.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">
              3. Use of Information
            </h3>
            <p>
              While we make every effort to ensure the accuracy of the
              information, Nodebridge Africa is not responsible for any errors
              or omissions, or for any actions taken based on the information
              provided. Users are encouraged to conduct their own research and
              seek professional advice before making decisions based on our
              content.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">4. No Warranties</h3>
            <p>
              The Nodebridge Africa website and its content are provided
              &quot;as is&quot; and &quot;as available&quot; without any
              warranties of any kind, either express or implied. We do not
              warrant that the website will be uninterrupted, error-free, or
              free from viruses or other harmful components.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">
              5. Limitation of Liability
            </h3>
            <p>
              In no event shall Nodebridge Africa, its affiliates, partners, or
              contributors be liable for any direct, indirect, incidental,
              special, or consequential damages arising out of or in any way
              connected with the use of or inability to use the website or its
              content. This includes, but is not limited to, damages for loss of
              profits, data, or other intangible losses.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">6. External Links</h3>
            <p>
              Our website may contain links to external websites or third-party
              content. Nodebridge Africa is not responsible for the content,
              accuracy, or practices of these external sites. Links are provided
              for convenience and do not imply endorsement or affiliation.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">
              7. Community Code of Conduct
            </h3>
            <p>
              Participation in our community is subject to our{" "}
              <a
                href={code_of_conduct_link}
                target="_blank"
                className="text-[#10B981] underline"
              >
                Community Code of Conduct
              </a>
              . We expect respectful, inclusive, and constructive engagement
              from all members.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">
              8. Support and Contact
            </h3>
            <p>
              We are committed to transparency and community support. For
              questions about terms, donations, volunteering, or sponsorship,
              please contact us at support@nodebridge.africa. See our{" "}
              <a href={support_link} className="text-[#10B981] underline">
                Support Nodebridge Africa
              </a>{" "}
              page for more ways to get involved.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">9. Changes to Terms</h3>
            <p>
              We may update these Terms of Service at any time. Continued use of
              our services constitutes acceptance of the updated terms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
