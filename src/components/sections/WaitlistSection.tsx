'use client';

import { motion, MotionValue } from "framer-motion";
import { AnimatedHeading } from "@/components/ui/text/AnimatedHeading";
import { MailingListForm } from "@/components/ui/mailing/MailingListForm";
import { Sparkles } from "lucide-react";

interface WaitlistSectionProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}

export function WaitlistSection({ opacity, y }: WaitlistSectionProps) {
  return (
    <motion.div
      style={{ opacity, y }}
      className="flex flex-col min-h-screen items-center justify-center gap-8 px-4"
    >
      <div className="text-center max-w-2xl">
        <AnimatedHeading 
          text="Be First to Create"
          size="lg"
          className="mb-4 bg-gradient-to-r from-[#fff7ad] via-[#ffd1fa] to-[#ffa9f9] text-transparent bg-clip-text"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#94A3B8] text-lg mb-8"
        >
          Join our waitlist to get early access to AI-powered logo generation and exclusive launch benefits
        </motion.p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full max-w-md relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#fff7ad]/10 to-[#ffa9f9]/10 rounded-lg blur-xl" />
        <MailingListForm className="relative z-10 bg-[#0A192F]/30 backdrop-blur-sm rounded-lg border border-[#ffd1fa]/20 p-6" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center gap-2 text-[#ffd1fa]/60 text-sm mt-4"
      >
        <Sparkles className="w-4 h-4" />
        <span>Early access members get 5 free logo generations</span>
      </motion.div>
    </motion.div>
  );
} 