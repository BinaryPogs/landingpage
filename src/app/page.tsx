'use client';
  
import { MailingListForm } from "@/components/ui/mailing/MailingListForm";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollIndicator } from "@/components/ui/scroll/ScrollIndicator";
import { AnimatedHeading } from "@/components/ui/text/AnimatedHeading";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.6], [100, 0]);

  return (
    <div ref={containerRef} className="relative">
      {/* First Section - Hero */}
      <motion.div 
        style={{ opacity }}
        className="flex flex-col min-h-screen items-center justify-center relative"
      >
        <AnimatedHeading 
          text="Join the inner circle"
          className="font-normal text-[42px] leading-[42px] tracking-[-2.2px] text-white/90"
        />
        <ScrollIndicator />
      </motion.div>

      {/* Second Section - Sign Up Form */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="flex flex-col min-h-screen items-center justify-center gap-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-8"
        >
          <h2 className="font-normal text-[42px] leading-[42px] h-[42px] tracking-[-2.2px] text-white">
            Ready to join?
          </h2>
          <MailingListForm className="w-full max-w-md" />
        </motion.div>
      </motion.div>
    </div>
  );
}