"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/Marquee";

const partners = [
  { name: "Gnosis", logo: "Gnosis" },
  { name: "Obol", logo: "Obol" },
  { name: "Lido", logo: "Lido" },
  { name: "Ethereum Foundation", logo: "Ethereum Foundation" },
  { name: "BuidlGuidl", logo: "BuidlGuidl" },
  { name: "BlockOps", logo: "BlockOps" },
  { name: "Web3Afrika", logo: "Web3Afrika" },
];

export default function PartnersMarquee() {
  return (
    <section className="py-16 bg-background/50 border-y border-border/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-8"
        >
          <h3 className="text-lg font-medium text-muted-foreground">
            Supported By
          </h3>
        </motion.div>

        <Marquee className="py-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="mx-8 flex items-center justify-center h-12"
            >
              <div className="bg-[#10B981]/5 border border-[#10B981]/10 rounded-lg py-2 px-6 text-muted-foreground font-medium hover:text-white transition-colors">
                {partner.logo}
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
