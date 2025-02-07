'use client';

import { motion, MotionValue } from "framer-motion";
import { AnimatedHeading } from "@/components/ui/text/AnimatedHeading";
import { MailingListForm } from "@/components/ui/mailing/MailingListForm";

interface WaitlistSectionProps {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}

export function WaitlistSection({ opacity, y }: WaitlistSectionProps) {
  return (
    <motion.div
      style={{ opacity, y }}
      className="flex flex-col min-h-screen items-center justify-center gap-8"
    >
      <AnimatedHeading 
        text="Join the Waitlist"
        size="lg"
        className="mb-4"
      />
      <MailingListForm className="w-full max-w-md" />
    </motion.div>
  );
} 