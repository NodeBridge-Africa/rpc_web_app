"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Zap,
  Server,
  GraduationCap,
  Globe,
  BarChart,
  Book,
  Users,
  Menu,
  X,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  {
    title: "Products",
    href: "#",
    items: [
      {
        title: "RPC Endpoints",
        href: "#",
        description: "Connect to our high-performance blockchain endpoints",
        icon: <Zap className="h-5 w-5 text-emerald-400" />,
      },
      {
        title: "Node Hosting",
        href: "#networks",
        description: "Managed node infrastructure with high availability",
        icon: <Server className="h-5 w-5 text-emerald-400" />,
      },
      {
        title: "Network Explorer",
        href: "#networks",
        description: "Analyze and inspect blockchain data in real-time",
        icon: <Globe className="h-5 w-5 text-emerald-400" />,
      },
      {
        title: "Infrastructure Analytics",
        href: "#networks",
        description: "Monitor your node performance and uptime",
        icon: <BarChart className="h-5 w-5 text-emerald-400" />,
      },
    ],
  },
  {
    title: "Docs",
    href: "https://nodebridge-africa.gitbook.io/nodebridge-africa/node-operator-vs.-validator-understanding-the-differences",
    target: "_blank",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Workshops",
    href: "/blog",
  },
  {
    title: "Community",
    href: "#",
    items: [
      {
        title: "Discord",
        href: "https://t.me/nodebridege/1",
        description: "Join our community of builders and node operators",
        icon: <Users className="h-5 w-5 text-emerald-400" />,
      },
      {
        title: "Resources",
        href: "#education",
        description: "Guides, tutorials, and documentation",
        icon: <Book className="h-5 w-5 text-emerald-400" />,
      },
      {
        title: "Workshops",
        href: "/workshops",
        description: "Interactive learning experiences for all skill levels",
        icon: <GraduationCap className="h-5 w-5 text-emerald-400" />,
      },
    ],
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const MobileNavItem = ({ item }: { item: any }) => {
    if (item.items) {
      return (
        <div className="space-y-3">
          <div className="font-medium text-lg">{item.title}</div>
          <div className="pl-4 space-y-2">
            {item.items.map((subItem: any, index: number) => (
              <Link
                key={index}
                href={subItem.href}
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-background">
                  {subItem.icon}
                </div>
                <span>{subItem.title}</span>
              </Link>
            ))}
          </div>
        </div>
      );
    }

    return (
      <Link
        href={item.href}
        className="block font-medium text-lg hover:text-primary transition-colors"
      >
        {item.title}
      </Link>
    );
  };

  return (
    <AnimatePresence>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-4 transition-colors duration-300 ease-in-out",
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border/50"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-auto" />
            <span className="font-semibold text-lg">
              Nodebridge <span className="hidden xl:inline-block">Africa</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) =>
                  item.items ? (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuTrigger>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                          {item.items.map((subItem) => (
                            <li key={subItem.title} className="row-span-1">
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.href}
                                  className="flex p-3 space-x-4 rounded-md hover:bg-accent transition-colors duration-300 ease-in-out"
                                >
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-background">
                                    {subItem.icon}
                                  </div>
                                  <div className="space-y-1">
                                    <h3 className="text-sm font-medium">
                                      {subItem.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                      {subItem.description}
                                    </p>
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.title}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink className="font-medium px-4 py-2 transition-colors duration-300 ease-in-out hover:text-primary">
                          {item.title}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="hidden xl:inline-block"
              asChild
            >
              <Link href="/auth/register">Request RPC</Link>
            </Button>
            <Button
              className="bg-[#10B981] hover:bg-[#059669] text-black hidden sm:inline-flex"
              asChild
            >
              <Link href="/auth/login">Launch App</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] p-6">
                <div className="space-y-6">
                  {navItems.map((item, index) => (
                    <MobileNavItem key={index} item={item} />
                  ))}
                  <div className="pt-6 space-y-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/auth/login">Request RPC</Link>
                    </Button>
                    <Button
                      className="w-full bg-[#10B981] hover:bg-[#059669] text-black"
                      asChild
                    >
                      <Link href="/auth/register">Launch App</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
}
