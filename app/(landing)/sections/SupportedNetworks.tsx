"use client";

import { motion } from "framer-motion";
import { NetworkStatusCard } from "@/components/ui/NetworkStatusCard";

const networks = [
  {
    name: "Ethereum Mainnet",
    logo: "/images/gallery/ETH.png",
    status: "Live",
    statusColor: "green",
    chain: "Ethereum",
  },
  {
    name: "Sepolia",
    logo: "/images/gallery/ETH.png",
    status: "Live",
    statusColor: "green",
    chain: "Ethereum Testnet",
  },
  {
    name: "Holesky",
    logo: "/images/gallery/ETH.png",
    status: "Live",
    statusColor: "green",
    chain: "Ethereum Testnet",
  },
  {
    name: "Gnosis Chain",
    logo: "/images/gallery/GNO.png",
    status: "Beta",
    statusColor: "blue",
    chain: "Gnosis",
  },
  {
    name: "Aztec",
    logo: "/images/gallery/Aztec.png",
    status: "Testnet",
    statusColor: "yellow",
    chain: "ZK-Rollup",
  },
];

export default function SupportedNetworks() {

  return (
    <section id="networks" className="py-24 bg-black/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Explore Our Growing Network Fleet
          </h2>
          <p className="text-lg text-muted-foreground">
            Connect to our high-performance nodes across multiple chains with
            99.9% uptime SLA, strategically distributed across African data
            centers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {networks.map((network, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <NetworkStatusCard
                name={network.name}
                logo={network.logo}
                status={network.status}
                statusColor={network.statusColor}
                chain={network.chain}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 p-6 border border-border/30 rounded-lg bg-background/50 max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-semibold mb-4">
            Enterprise-Grade Infrastructure
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
              <span>99.9% Uptime SLA</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
              <span>Geographic Distribution</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
              <span>MEV Protection</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
              <span>Real-time Monitoring</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
