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
    title: "Understanding Blockchain Nodes in Africa",
    description:
      "A deep dive into the role of blockchain nodes and their impact on the African ecosystem.",
    link: "/blog/understanding-blockchain-nodes",
    type: "blog",
    tags: ["blockchain", "nodes", "africa"],
    date: "2024-06-01",
    coverImage: "/images/blog/blockchain-nodes.jpg",
    category: "Blockchain Education",
    author: {
      name: "Ada Nwosu",
    },
  },
  {
    id: "2",
    title: "Gamma Workshop: Building Your First Node",
    description:
      "Hands-on workshop using Gamma slides to guide you through setting up your first blockchain node.",
    link: "https://gamma.app/workshop/building-your-first-node",
    type: "workshop",
    tags: ["workshop", "gamma", "node"],
    date: "2024-05-20",
    coverImage: "/images/blog/gamma-workshop.jpg",
    category: "Workshops",
    author: {
      name: "Kwame Mensah",
    },
  },
  {
    id: "3",
    title: "Scaling Web3 in Africa: Challenges & Opportunities",
    description:
      "Exploring the unique challenges and opportunities for scaling Web3 projects across Africa.",
    link: "/blog/scaling-web3-africa",
    type: "blog",
    tags: ["web3", "africa", "scaling"],
    date: "2024-04-15",
    coverImage: "/images/blog/scaling-web3.jpg",
    category: "Web3 Insights",
    author: {
      name: "Fatima Bello",
    },
  },
  {
    id: "4",
    title: "Gamma Workshop: Secure Node Operations",
    description:
      "A Gamma-powered workshop on best practices for securing your blockchain node.",
    link: "https://gamma.app/workshop/secure-node-operations",
    type: "workshop",
    tags: ["workshop", "security", "gamma"],
    date: "2024-03-10",
    coverImage: "/images/blog/secure-node.jpg",
    category: "Workshops",
    author: {
      name: "Lebo Dlamini",
    },
  },
];
