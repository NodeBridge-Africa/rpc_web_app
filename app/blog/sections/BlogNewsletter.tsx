"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setEmail("");
  };

  return (
    <section className="py-16">
      <motion.div
        className="max-w-2xl mx-auto bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl p-8 text-center shadow"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#10B981]">
          Stay Updated
        </h2>
        <p className="text-muted-foreground mb-6">
          Subscribe to our newsletter for the latest blog posts, workshops, and
          community updates from Nodebridge Africa.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="max-w-xs"
            disabled={submitted}
          />
          <Button
            type="submit"
            className="bg-[#10B981] hover:bg-[#059669] text-black font-semibold px-6 py-2 rounded shadow"
            disabled={submitted || !email}
          >
            {submitted ? "Subscribed!" : "Subscribe"}
          </Button>
        </form>
      </motion.div>
    </section>
  );
}
