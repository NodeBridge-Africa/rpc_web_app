"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const packages = [
  {
    name: "Community",
    price: "$500",
    description:
      "Support community initiatives and basic infrastructure development.",
    features: [
      "Logo on website",
      "Social media mentions",
      "Access to community events",
      "Monthly newsletter recognition",
    ],
  },
  {
    name: "Infrastructure",
    price: "$1,000",
    description: "Sponsor node infrastructure and educational programs.",
    features: [
      "All Community benefits",
      "Branded node cluster",
      "Logo on documentation",
      "Workshop sponsorship (1/year)",
      "Quarterly community call presentation",
    ],
    highlighted: true,
  },
  {
    name: "Ecosystem",
    price: "$3,000",
    description: "Comprehensive partnership supporting the entire ecosystem.",
    features: [
      "All Infrastructure benefits",
      "Named bootcamp sponsorship",
      "Co-authored research report",
      "Access to talent pipeline",
      "Strategic advisory role",
      "Keynote at annual summit",
    ],
  },
];

export default function SponsorPackages() {
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
            Sponsorship Packages
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the sponsorship level that aligns with your organization's
            goals and budget.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex"
            >
              <Card
                className={`flex flex-col w-full ${
                  pkg.highlighted
                    ? "border-[#10B981] shadow-lg shadow-[#10B981]/10 relative overflow-hidden"
                    : ""
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute top-0 left-0 right-0 bg-[#10B981] text-black text-xs font-semibold py-1 text-center">
                    RECOMMENDED
                  </div>
                )}
                <CardHeader className={pkg.highlighted ? "pt-8" : ""}>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{pkg.price}</span>
                    <span className="text-muted-foreground">/year</span>
                  </div>
                  <CardDescription className="mt-2">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <div className="mr-2 rounded-full p-1 bg-[#10B981]/10 text-[#10B981]">
                          <Check className="h-4 w-4" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      pkg.highlighted
                        ? "bg-[#10B981] hover:bg-[#059669] text-black"
                        : ""
                    }`}
                    variant={pkg.highlighted ? "default" : "outline"}
                  >
                    Select Package
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Looking for a custom sponsorship package?{" "}
            <a href="#" className="text-[#10B981] hover:underline">
              Contact us
            </a>{" "}
            to discuss tailored options.
          </p>
        </div>
      </div>
    </section>
  );
}
