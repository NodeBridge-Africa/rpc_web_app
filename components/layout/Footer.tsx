import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Twitter, Github, Youtube, MessagesSquare } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/30 border-t border-border/20 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo className="h-8 w-auto" />
              <span className="font-semibold text-lg">Nodebridge Africa</span>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6">
              Powering the next generation of decentralized applications across
              Africa with reliable blockchain infrastructure.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://x.com/nodebridge_africa"
                target="_blank"
                className="text-muted-foreground hover:text-[#10B981] transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://github.com/nodebridge-africa"
                target="_blank"
                className="text-muted-foreground hover:text-[#10B981] transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.youtube.com/@nodebridgeafrica"
                target="_blank"
                className="text-muted-foreground hover:text-[#10B981] transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link
                href="https://t.me/nodebridege/1"
                target="_blank"
                className="text-muted-foreground hover:text-[#10B981] transition-colors"
              >
                <MessagesSquare className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </Link>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Product</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/auth/login"
                  className="hover:text-[#10B981] transition-colors"
                >
                  RPC Endpoints
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#10B981] transition-colors"
                >
                  Node Hosting
                </Link>
              </li>
              {/* <li>
                <Link
                  href="#"
                  className="hover:text-[#10B981] transition-colors"
                >
                  Pricing
                </Link>
              </li> */}
              <li>
                <Link
                  href="#networks"
                  className="hover:text-[#10B981] transition-colors"
                >
                  Status
                </Link>
              </li>
              <li>
                <Link
                  href="https://nodebridge-africa.gitbook.io/nodebridge-africa/node-operator-vs.-validator-understanding-the-differences"
                  target="_blank"
                  className="hover:text-[#10B981] transition-colors"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#10B981] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="blog"
                  className="hover:text-[#10B981] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="https://t.me/nodebridege/1"
                  target="_blank"
                  className="hover:text-[#10B981] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/sponsor"
                  className="hover:text-[#10B981] transition-colors"
                >
                  Sponsor
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/workshops"
                  className="hover:text-[#10B981] transition-colors"
                >
                  Workshops
                </Link>
              </li>
              <li>
                <Link
                  href="https://nodebridge-africa.gitbook.io/nodebridge-africa"
                  target="_blank"
                  className="hover:text-[#10B981] transition-colors"
                >
                  Gitbook Guides
                </Link>
              </li>
              <li>
                <Link
                  href="https://t.me/nodebridege/1"
                  target="_blank"
                  className="hover:text-[#10B981] transition-colors"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="https://nodedathon.vercel.app/"
                  target="_blank"
                  className="hover:text-[#10B981] transition-colors"
                >
                  Nodedathon
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0 text-center sm:text-left">
            © {currentYear} Nodebridge Africa. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 text-sm text-muted-foreground">
            <Link
              href="/privacy"
              className="hover:text-[#10B981] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#10B981] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
