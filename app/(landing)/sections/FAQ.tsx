"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How do I get started with Nodebridge Africa's RPC endpoints?",
    answer: "Getting started is simple. Sign up for a free account, select your preferred networks, and you'll receive your API key instantly. You can then use our documentation to integrate with your dApp or wallet. Our free tier includes 25M requests per month with standard rate limiting.",
  },
  {
    question: "What blockchain networks do you currently support?",
    answer: "We currently support Ethereum (Mainnet, Sepolia, Holesky), Gnosis Chain, and Aztec testnet. We're actively expanding our network support based on community demand. If you need a specific chain that's not listed, please contact us.",
  },
  {
    question: "How does your node infrastructure ensure reliability in Africa?",
    answer: "Our infrastructure is strategically distributed across multiple data centers in Africa (Cape Town, Johannesburg, Lagos, Nairobi) with redundant systems in place. We maintain a 99.9% uptime SLA with automatic failover and 24/7 monitoring to ensure maximum reliability even in regions with occasional connectivity challenges.",
  },
  {
    question: "What are the differences between your free and paid RPC tiers?",
    answer: "Our free tier includes 25M requests per month with standard rate limiting and access to all supported networks. Paid tiers include higher request limits (100M-10B), prioritized access, reduced latency, advanced analytics, dedicated support, and optional dedicated nodes for enterprise customers.",
  },
  {
    question: "How can I participate in your Node Operator Bootcamp?",
    answer: "Our Node Operator Bootcamps run quarterly in major African tech hubs and virtually. You can register on our website, with options for both beginner and advanced tracks. The bootcamp includes hands-on training, networking opportunities, and post-bootcamp support through our community.",
  },
  {
    question: "Do you provide technical support for integration issues?",
    answer: "Yes. Free tier users have access to community support and documentation. Paid tier customers receive prioritized technical support via email and Discord, with enterprise customers getting dedicated support channels and SLAs. Our technical team is familiar with regional infrastructure challenges and can help optimize your integration.",
  },
];

export default function FAQ() {
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
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our infrastructure, services, and community.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <AccordionItem value={`item-${index}`} className="border-border/30">
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}