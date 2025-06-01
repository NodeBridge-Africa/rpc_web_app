"use client";

import { motion } from "framer-motion";
import {
  code_of_conduct_link,
  community_link,
  disclaimer_link,
  support_link,
} from "@/constant";

export default function PrivacyContent() {
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
            Privacy Policy
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            This Privacy Policy explains how Nodebridge Africa collects, uses,
            and protects your information when you use our services. We are
            committed to safeguarding your privacy, supporting our community,
            and ensuring transparency about our data practices. Please also
            review our{" "}
            <a href="/terms" className="text-[#10B981] underline">
              Terms of Service
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
            </a>{" "}
            for more information.
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
              2. Information We Collect
            </h3>
            <p>
              We may collect information you provide directly (such as when you
              sign up, contact us, or participate in community activities), as
              well as technical data (such as IP address, browser type, and
              usage data) to improve our services and support our community.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">
              3. How We Use Your Information
            </h3>
            <p>
              Your information is used to provide and improve our services,
              communicate with you, support community initiatives, and ensure
              the security and integrity of our platform. We do not sell your
              personal data to third parties.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">4. Data Security</h3>
            <p>
              We implement industry-standard security measures to protect your
              data. However, no method of transmission over the internet is 100%
              secure.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">
              5. Community Code of Conduct
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
              6. Use of Information
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
            <h3 className="font-semibold text-xl mb-2">7. No Warranties</h3>
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
              8. Limitation of Liability
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
            <h3 className="font-semibold text-xl mb-2">9. External Links</h3>
            <p>
              Our website may contain links to external websites or third-party
              content. Nodebridge Africa is not responsible for the content,
              accuracy, or practices of these external sites. Links are provided
              for convenience and do not imply endorsement or affiliation.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">10. Your Rights</h3>
            <p>
              You have the right to access, correct, or delete your personal
              information. Contact us{" "}
              <a href={community_link} className="text-[#10B981] underline">
                via telegram{" "}
              </a>{" "}
              for any privacy-related requests.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">
              11. Support and Contact
            </h3>
            <p>
              We are committed to transparency and community support. For
              questions about privacy, donations, volunteering, or sponsorship,
              please contact us{" "}
              <a href={community_link} className="text-[#10B981] underline">
                via telegram{" "}
              </a>{" "}
              . See our{" "}
              <a href={support_link} className="text-[#10B981] underline">
                Support Nodebridge Africa
              </a>{" "}
              page for more ways to get involved.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">
              12. Changes to This Policy
            </h3>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify users of significant changes and update the effective date
              at the top of this page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
