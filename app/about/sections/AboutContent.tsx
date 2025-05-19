"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { community_link, support_link } from "@/constant";
export default function AboutContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] w-full flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80 z-0" />
        {/* Background image */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2100&auto=format&fit=crop')] bg-cover bg-center" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-sm font-medium mb-4">
              About Nodebridge Africa
            </div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#10B981] to-[#059669]"
              variants={itemVariants}
            >
              Empowering Africa through{" "}
              <span className="text-[#10B981]">Blockchain</span> & Community
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Making blockchain technology accessible, educational, and
              impactful for all African communities. Join us on our mission to
              bridge the gap between innovation and opportunity.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <Link
                href={community_link}
                target="_blank"
                className="bg-[#10B981] hover:bg-[#059669] text-black font-semibold px-6 py-3 rounded shadow flex items-center gap-2 transition-colors"
              >
                Join the Community
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main About Content */}
      <section className="py-24 bg-gradient-to-b from-background to-background/90">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#10B981] to-[#059669]">
              About Nodebridge Africa
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Empowering Africa through accessible blockchain technology,
              education, and community.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="bg-[#10B981]/10 border-l-4 border-[#10B981] p-6 rounded-lg shadow mb-6">
              <h2 className="text-2xl font-semibold mb-2 text-[#10B981]">
                Our Mission
              </h2>
              <p className="text-muted-foreground">
                At Nodebridge Africa, we are dedicated to making blockchain
                technology accessible to everyone and empowering African
                communities to participate in its growth. Our mission is to
                simplify the complexities of node operation and blockchain
                education, bridging the gap between intricate technology and
                everyday users.
              </p>
            </div>
          </motion.div>

          {/* Who We Are Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="bg-white/5 border border-border/20 p-6 rounded-lg shadow mb-6">
              <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
              <p className="text-muted-foreground">
                Nodebridge Africa is a passionate team of blockchain
                enthusiasts, educators, and technology experts committed to
                fostering a vibrant and inclusive blockchain ecosystem across
                Africa. We believe in the transformative potential of blockchain
                technology and strive to make it accessible to individuals and
                communities throughout the continent.
              </p>
            </div>
          </motion.div>

          {/* What We Do Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto mb-12 grid md:grid-cols-3 gap-6"
          >
            <div className="bg-[#10B981]/10 border border-[#10B981]/20 p-6 rounded-lg shadow flex flex-col items-center">
              <span className="text-3xl mb-2">🔗</span>
              <h3 className="font-semibold text-lg mb-2">
                Simplifying Node Operation
              </h3>
              <p className="text-muted-foreground text-sm">
                We provide clear, step-by-step guides and resources to help
                users from all backgrounds set up, manage, and optimize their
                nodes with confidence.
              </p>
            </div>
            <div className="bg-[#10B981]/10 border border-[#10B981]/20 p-6 rounded-lg shadow flex flex-col items-center">
              <span className="text-3xl mb-2">📚</span>
              <h3 className="font-semibold text-lg mb-2">
                Promoting Blockchain Education
              </h3>
              <p className="text-muted-foreground text-sm">
                We offer a range of educational materials, from introductory
                concepts to advanced topics, designed to help users at every
                level understand and leverage blockchain technology.
              </p>
            </div>
            <div className="bg-[#10B981]/10 border border-[#10B981]/20 p-6 rounded-lg shadow flex flex-col items-center">
              <span className="text-3xl mb-2">🤝</span>
              <h3 className="font-semibold text-lg mb-2">
                Building a Supportive Community
              </h3>
              <p className="text-muted-foreground text-sm">
                We foster a collaborative environment where blockchain
                enthusiasts, developers, and learners can connect, share
                knowledge, and collaborate on projects.
              </p>
            </div>
          </motion.div>

          {/* Why Choose Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="bg-white/5 border border-border/20 p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">Why Choose Us?</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  <strong>Expertise and Experience:</strong> Our team brings a
                  wealth of experience in blockchain technology and education,
                  ensuring you receive reliable and up-to-date information.
                </li>
                <li>
                  <strong>Comprehensive Resources:</strong> From beginner guides
                  to advanced tutorials, our resources cover all aspects of
                  blockchain nodes and technology.
                </li>
                <li>
                  <strong>Community Focused:</strong> We are committed to
                  building a strong and inclusive community where everyone has
                  the opportunity to learn, contribute, and grow.
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Join Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="bg-[#10B981]/10 border border-[#10B981]/20 p-8 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4 text-[#10B981]">
                Join Us on Our Journey
              </h2>
              <p className="text-muted-foreground mb-6">
                We invite you to explore our resources, engage with our
                community, and embark on your blockchain journey with us.
                Whether you&apos;re new to blockchain or an experienced
                professional, Nodebridge Africa is here to support you every
                step of the way.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/workshops"
                  className="bg-[#10B981] hover:bg-[#059669] text-black font-semibold px-6 py-3 rounded shadow transition-colors"
                >
                  Explore Workshops
                </Link>
                <Link
                  href={community_link}
                  target="_blank"
                  className="bg-white/10 border border-[#10B981] text-[#10B981] font-semibold px-6 py-3 rounded shadow transition-colors"
                >
                  Join the Community
                </Link>
                <Link
                  href={support_link}
                  className="bg-white/10 border border-[#10B981] text-[#10B981] font-semibold px-6 py-3 rounded shadow transition-colors"
                >
                  Support Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
