"use client";

import { motion } from "framer-motion";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "Nodebridge Africa has transformed our Web3 development workflow. Their reliable RPC endpoints and stellar support team have made a world of difference in our African-focused DeFi application.",
    name: "Sarah Kimani",
    title: "CTO, AfroDeFi",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
  },
  {
    quote: "The node operator bootcamp was incredibly comprehensive. It took me from zero knowledge to confidently running my own Ethereum validator. Their team clearly understands the challenges unique to African infrastructure.",
    name: "David Okonjo",
    title: "Blockchain Developer, TechHub Nairobi",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&auto=format&fit=crop",
  },
  {
    quote: "As a blockchain startup building in Lagos, we faced constant reliability issues with our previous RPC provider. Switching to Nodebridge's local infrastructure reduced our latency by 80% and improved our user experience dramatically.",
    name: "Amina Yusuf",
    title: "Founder, NairaBlock",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=256&auto=format&fit=crop",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-black/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What the Community Says
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from developers, node operators, and companies building with Nodebridge Africa.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-all duration-500 ease-in-out"
              initial={false}
              animate={{ x: `-${activeIndex * 100}%` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard
                    quote={testimonial.quote}
                    name={testimonial.name}
                    title={testimonial.title}
                    avatar={testimonial.avatar}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full h-10 w-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === activeIndex ? "bg-[#00C2FF]" : "bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full h-10 w-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}