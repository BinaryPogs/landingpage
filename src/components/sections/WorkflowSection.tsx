'use client';

import { motion, MotionValue } from "framer-motion";
import { Wand2, Palette, Download, Code2 } from "lucide-react";

interface WorkflowSectionProps {
  opacity?: MotionValue<number>;
  y?: MotionValue<number>;
}

const workflowSteps = [
  {
    icon: Wand2,
    title: "AI Generation",
    description: "Describe your brand and let AI create the perfect logo"
  },
  {
    icon: Palette,
    title: "Customization",
    description: "Fine-tune colors, shapes, and style to match your vision"
  },
  {
    icon: Code2,
    title: "SVG Code",
    description: "Get clean, optimized SVG code ready for your projects"
  },
  {
    icon: Download,
    title: "Export & Use",
    description: "Download your logo in multiple formats and start using it"
  }
];

export function WorkflowSection({ opacity, y }: WorkflowSectionProps) {
  return (
    <motion.section
      style={{ opacity, y }}
      className="w-screen min-h-[60vh] flex items-center justify-center py-20"
    >
      <div className="max-w-6xl w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#fff7ad] via-[#ffd1fa] to-[#ffa9f9] text-transparent bg-clip-text mb-4">
            How It Works
          </h2>
          <p className="text-[#94A3B8] text-lg">
            Create your perfect logo in four simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {index < workflowSteps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-full h-[2px] bg-gradient-to-r from-[#ffd1fa]/20 to-transparent" />
              )}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#fff7ad]/10 to-[#ffa9f9]/10 flex items-center justify-center mb-4 border border-[#ffd1fa]/20">
                  <step.icon className="w-8 h-8 text-[#ffd1fa]" />
                </div>
                <h3 className="text-[#ffd1fa] text-xl font-medium mb-2">
                  {step.title}
                </h3>
                <p className="text-[#94A3B8] text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
} 