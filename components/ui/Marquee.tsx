"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export function Marquee({
  children,
  direction = "left",
  speed = 40,
  className = "",
}: MarqueeProps) {
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && containerRef.current) {
      setContentWidth(contentRef.current.scrollWidth);
      setContainerWidth(containerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (contentRef.current && containerRef.current) {
        setContentWidth(contentRef.current.scrollWidth);
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [children]);

  const duration = Math.max(contentWidth / speed, 5);
  const distance = contentWidth;

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      <motion.div
        ref={contentRef}
        className="inline-flex"
        animate={{
          x: direction === "left" ? -distance : distance,
        }}
        transition={{
          ease: "linear",
          duration,
          repeat: Infinity,
        }}
        style={{
          x: direction === "left" ? 0 : -distance,
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}