"use client";

import { motion } from "framer-motion";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Zap, Server, GraduationCap } from "lucide-react";

const features = [
  {
    title: "Blazing Fast RPCs",
    description:
      "Access free and enterprise-grade RPC endpoints across multiple chains. Low latency, high availability.",
    icon: <Zap className="h-8 w-8 text-[#10B981]" />,
  },
  {
    title: "Managed Node Hosting",
    description:
      "Deploy and manage dedicated or shared nodes effortlessly. Focus on building, we handle the infrastructure.",
    icon: <Server className="h-8 w-8 text-[#10B981]" />,
  },
  {
    title: "Expert Workshops & Training",
    description:
      "Upskill your team with hands-on bootcamps (like our Ethereum Node Operation Bootcamp) and developer resources.",
    icon: <GraduationCap className="h-8 w-8 text-[#10B981]" />,
  },
];

export default function CoreFeatures() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            African-Built Blockchain Infrastructure
          </h2>
          <p className="text-lg text-muted-foreground">
            Our comprehensive suite of tools and services makes it easy to build,
            deploy, and scale your blockchain applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}