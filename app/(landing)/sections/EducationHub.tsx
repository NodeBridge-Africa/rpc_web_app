"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, BookOpen, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function EducationHub() {
  return (
    <section
      id="education"
      className="py-24 bg-gradient-to-b from-background/90 to-background"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Learn, Build, and Connect
          </h2>
          <p className="text-lg text-muted-foreground">
            Join our growing community of Web3 builders, node operators, and
            blockchain enthusiasts across Africa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="h-full border-border/50 bg-background/80 hover:shadow-lg hover:border-[#10B981]/30 transition-all duration-300">
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-[#10B981]" />
                </div>
                <CardTitle className="text-2xl">
                  Node Operator Bootcamps
                </CardTitle>
                <CardDescription className="text-muted-foreground text-base mt-2">
                  Intensive, practical training (remote & in-person options)
                  covering node setup, maintenance, staking (including DVT with
                  tools like Charon), and troubleshooting.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                    <span>Ethereum validator setup & management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                    <span>Distributed validator technology (DVT)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                    <span>Consensus & execution client configuration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                    <span>Security best practices & troubleshooting</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full group" variant="outline">
                  View Upcoming Workshops
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="h-full border-border/50 bg-background/80 hover:shadow-lg hover:border-[#10B981]/30 transition-all duration-300">
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#10B981]" />
                </div>
                <CardTitle className="text-2xl">Guides & Community</CardTitle>
                <CardDescription className="text-muted-foreground text-base mt-2">
                  Explore our Gitbook documentation, join community challenges
                  like the Nodedathon, and connect on Discord/Twitter Spaces.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                    <span>Comprehensive documentation & tutorials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                    <span>Weekly community calls & workshops</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                    <span>Nodedathon hackathons with prizes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                    <span>Discord server with expert support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full group" variant="outline">
                  Explore Resources
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
