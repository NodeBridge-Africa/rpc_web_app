"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SponsorContact() {
  return (
    <section className="py-24 bg-black/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Interested in becoming a sponsor? Reach out to discuss how we can collaborate.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>Sponsorship Inquiry</CardTitle>
              <CardDescription>
                Complete the form below and our team will get back to you within 48 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Your organization" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" placeholder="Your role" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="package">Interested Package</Label>
                  <Select>
                    <SelectTrigger id="package">
                      <SelectValue placeholder="Select a package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="community">Community ($5,000)</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure ($15,000)</SelectItem>
                      <SelectItem value="ecosystem">Ecosystem ($30,000)</SelectItem>
                      <SelectItem value="custom">Custom Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us about your goals and how you'd like to partner with us" rows={5} />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-[#10B981] hover:bg-[#059669] text-black">
                Submit Inquiry
              </Button>
            </CardFooter>
          </Card>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground">
            Prefer to discuss directly? Email us at{" "}
            <a href="mailto:sponsors@nodebridge.africa" className="text-[#10B981] hover:underline">
              sponsors@nodebridge.africa
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}