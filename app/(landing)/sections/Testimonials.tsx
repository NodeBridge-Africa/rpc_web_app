"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    quote:
      "Nodebridge Africa Node bootcamp was an eye opener for me, bridging the gap of 'to know' and 'to do' when it comes to node operations and validation on the Blockchain",
    name: "Amio",
  },
  {
    quote:
      "Honestly, I learnt a lot during the course of the bootcamp, because I know that if I hadn't joined the program I'm not quite sure I'd know what it feels like to run an Ethereum Node or even any blockchain's node in general",
    name: "Emmanuel",
  },
  {
    quote:
      "Switching to Nodebridge's local infrastructure reduced our latency by 80% and improved our user experience dramatically.",
    name: "Nathaniel",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            What Our Community Says
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-all duration-700 ease-in-out"
              initial={false}
              animate={{ x: `-${activeIndex * 100}%` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-8">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    {/* Quote icon */}
                    <div className="flex justify-center mb-8">
                      <div className="bg-[#10B981]/10 h-16 w-16 rounded-full flex items-center justify-center">
                        <Quote className="h-8 w-8 text-[#10B981]" />
                      </div>
                    </div>

                    {/* Quote text */}
                    <blockquote className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-muted-foreground mb-8 max-w-3xl mx-auto">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Name */}
                    <div className="text-lg font-semibold text-[#10B981]">
                      — {testimonial.name}
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center items-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 h-2 bg-[#10B981] rounded-full"
                    : "w-2 h-2 bg-gray-400 rounded-full hover:bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
