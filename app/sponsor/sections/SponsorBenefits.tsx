"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Users,
  Lightbulb,
  Building,
  Flag,
  Sparkles,
} from "lucide-react";

const benefits = [
  {
    title: "Pan-African Reach",
    description:
      "Connect with developers, node operators, and Web3 enthusiasts across multiple African countries.",
    icon: <Globe className="h-8 w-8 text-[#10B981]" />,
  },
  {
    title: "Community Engagement",
    description:
      "Direct access to our growing community through workshops, events, and our digital platforms.",
    icon: <Users className="h-8 w-8 text-[#10B981]" />,
  },
  {
    title: "Innovation Support",
    description:
      "Fund cutting-edge blockchain infrastructure that addresses Africa's unique challenges.",
    icon: <Lightbulb className="h-8 w-8 text-[#10B981]" />,
  },
  {
    title: "Brand Recognition",
    description:
      "Position your brand as a leader in supporting Africa's digital future and Web3 innovation.",
    icon: <Building className="h-8 w-8 text-[#10B981]" />,
  },
  {
    title: "Market Entry",
    description:
      "Ideal for organizations looking to establish presence in African blockchain markets.",
    icon: <Flag className="h-8 w-8 text-[#10B981]" />,
  },
  {
    title: "Talent Pipeline",
    description:
      "Connect with skilled African blockchain developers, engineers, and entrepreneurs.",
    icon: <Sparkles className="h-8 w-8 text-[#10B981]" />,
  },
];

export default function SponsorBenefits() {
  return (
    <section className="py-24 bg-gradient-to-b from-black/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Sponsor Nodebridge Africa?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join leading organizations in supporting Africa&apos;s growing
            blockchain ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-background/50 border border-border/30 p-6 rounded-lg hover:shadow-lg hover:border-[#10B981]/20 transition-all duration-300"
            >
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[#10B981]/10 mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
