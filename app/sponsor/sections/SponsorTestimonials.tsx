"use client";

import { motion } from "framer-motion";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

const testimonials = [
  {
    quote: "Partnering with Nodebridge Africa has given us unprecedented access to the continent's growing Web3 ecosystem. Their ability to connect technical talent with opportunities has been invaluable for our expansion strategy.",
    name: "Michael Chen",
    title: "Head of Ecosystem, Polygon Africa",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop",
  },
  {
    quote: "As an early sponsor, we've seen firsthand how Nodebridge is building critical infrastructure that addresses Africa's unique challenges. Their node operator bootcamps are creating a skilled workforce essential for blockchain adoption.",
    name: "Rachel Ndungu",
    title: "Director of Innovation, Lagos Blockchain Foundation",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&auto=format&fit=crop",
  },
];

export default function SponsorTestimonials() {
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
            What Our Sponsors Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from organizations that have already joined our mission.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <TestimonialCard
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
                avatar={testimonial.avatar}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}