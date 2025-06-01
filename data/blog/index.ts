export type BlogType = "blog" | "workshop";

export interface BlogEntry {
  id: string;
  title: string;
  description: string;
  link: string;
  type: BlogType;
  tags: string[];
  date: string;
  coverImage?: string;
  category: string;
  author: {
    name: string;
  };
}

export const blogEntries: BlogEntry[] = [
  {
    id: "1",
    title: "Node Operation 101: Fundamentals of Running a Node",
    description:
      "Welcome to the first session of 'Node Operation 101: Fundamentals of Running a Node.' This six-week program will build your foundation in blockchain technology.",
    link: "https://gamma.app/docs/Course-outline-Nodebrigde-q21g2zusguq9qcu",
    type: "workshop",
    tags: ["fundamentals", "blockchain-basics"],
    date: "2025-03-1",
    coverImage:
      "/images/blog/node-Operation-101-fundamentals-of-running-a-node.png",
    category: "Education & Training",
    author: {
      name: "NodeBridge Team",
    },
  },
  {
    id: "2",
    title: "Introduction to Blockchain and Decentralization",
    description:
      "Welcome to the first session of 'Node Operation 101: Fundamentals of Running a Node.' This six-week program will build your foundation in blockchain technology.",
    link: "https://gamma.app/docs/Nodebridge-Week-1-Day-1-erd4c7cjgv5nn7x",
    type: "workshop",
    tags: ["blockchain", "decentralization", "fundamentals"],
    date: "2025-03-5",
    coverImage:
      "/images/blog/introduction-to-blockchain-and-decentralization.png",
    category: "Blockchain Fundamentals",
    author: {
      name: "NodeBridge Team",
    },
  },
  {
    id: "3",
    title: "Ethereum: The World Computer",
    description: "Day 2: Understanding Ethereum's Core Concepts",
    link: "https://gamma.app/docs/Nodebridge-Day-2-Ethereum-6f3q8n0d5qzu75p",
    type: "workshop",
    tags: ["ethereum"],
    date: "2025-03-15",
    coverImage: "/images/blog/ethereum-the-world-computer.png",
    category: "Ethereum Fundamentals",
    author: {
      name: "NodeBridge Team",
    },
  },
  {
    id: "4",
    title: "Ethereum Clients: Definition and Roles",
    description:
      "Ethereum clients are software applications that allow users to interact with the Ethereum network. They implement the Ethereum protocol, enabling nodes to read blockchain data, process transactions, and participate in the network.",
    link: "https://gamma.app/docs/Nodebridge-Week-2-Day-1-slide-2-Ethereum-Clients-9xyeamt56pes26c",
    type: "workshop",
    tags: ["ethereum-clients", "network-interaction"],
    date: "2025-03-28",
    coverImage: "/images/blog/ethereum-clients-definition-and-roles.png",
    category: "Technical Infrastructure",
    author: {
      name: "NodeBridge Team",
    },
  },
  {
    id: "5",
    title: "Introduction to Ethereum Node Setup",
    description:
      "Welcome to Week 2, Day 1 of our Node Operation 101 course. Today we'll be covering hardware and software requirements, basic node setup, and Ethereum clients.",
    link: "https://gamma.app/docs/Nodebrideg-Week-2-Day-1-Node-Setup--57jryadxqn15m5o",
    type: "workshop",
    tags: ["hardware", "node-setup", "software-requirements", "ethereum"],
    date: "2025-04-2",
    coverImage: "/images/blog/introduction-to-ethereum-node-setup.png",
    category: "Node Operations",
    author: {
      name: "NodeBridge Team",
    },
  },
  {
    id: "6",
    title: "Fundamentals of Running a Node - Consensus Deep Dive",
    description:
      "Proof of Work vs. Proof of Stake: Understanding Ethereum's Evolution",
    link: "https://gamma.app/docs/Node-Operation-101-Fundamentals-of-Running-a-Node-Consensus-Dee-vturcue2d4zpydw",
    type: "workshop",
    tags: [
      "consensus",
      "proof-of-work",
      "proof-of-stake",
      "ethereum-evolution",
    ],
    date: "2025-04-15",
    coverImage:
      "/images/blog/fundamentals-of-running-a-node-consensus-deep-dive.png",
    category: "Consensus Mechanisms",
    author: {
      name: "NodeBridge Team",
    },
  },
];
