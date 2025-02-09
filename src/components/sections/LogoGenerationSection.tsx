'use client';

import { motion, MotionValue } from "framer-motion";
import { useState } from 'react';
import { Wand2 } from 'lucide-react';

interface LogoGenerationSectionProps {
  opacity?: MotionValue<number>;
  y?: MotionValue<number>;
}

interface GenerationStep {
  question: string;
  placeholder: string;
  parameter: keyof GenerationParams;
}

interface GenerationParams {
  businessName: string;
  industry: string;
  style: string;
  colorPreference: string;
}

const GENERATION_STEPS: GenerationStep[] = [
  {
    question: "What's your business name?",
    placeholder: "e.g., Suiko Design",
    parameter: "businessName"
  },
  {
    question: "What industry are you in?",
    placeholder: "e.g., Technology, Fashion, Food",
    parameter: "industry"
  },
  {
    question: "What style would you prefer?",
    placeholder: "e.g., Minimal, Modern, Playful",
    parameter: "style"
  },
  {
    question: "Any color preferences?",
    placeholder: "e.g., Blue tones, Earth colors",
    parameter: "colorPreference"
  }
];

export function LogoGenerationSection({ opacity, y }: LogoGenerationSectionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [params, setParams] = useState<GenerationParams>({
    businessName: '',
    industry: '',
    style: '',
    colorPreference: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (value: string) => {
    const currentParam = GENERATION_STEPS[currentStep].parameter;
    setParams(prev => ({ ...prev, [currentParam]: value }));
  };

  const handleNext = () => {
    if (currentStep < GENERATION_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsGenerating(true);
      // Here you would trigger your AI generation
      setTimeout(() => setIsGenerating(false), 3000);
    }
  };

  return (
    <motion.section
      style={{ opacity, y }}
      className="w-screen min-h-[70vh] flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-[95vw] max-w-2xl"
      >
        <div className="relative w-full bg-[#0A192F]/30 rounded-xl p-8 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2942] via-[#0A192F] to-[#0d2347] rounded-xl opacity-20" />
          
          <div className="relative z-10">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl text-[#ffd1fa] font-medium">
                {GENERATION_STEPS[currentStep].question}
              </h2>
              
              <input
                type="text"
                value={params[GENERATION_STEPS[currentStep].parameter]}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={GENERATION_STEPS[currentStep].placeholder}
                className="w-full bg-[#1a2942]/50 border border-[#ffd1fa]/20 rounded-lg px-4 py-3 text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#ffd1fa]/50 transition-colors"
              />

              <button
                onClick={handleNext}
                disabled={!params[GENERATION_STEPS[currentStep].parameter]}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#fff7ad] to-[#ffa9f9] hover:from-[#ffd1fa] hover:to-[#fff7ad] text-[#1a2942] py-3 px-6 rounded-lg transition-all duration-200 font-medium text-lg shadow-lg disabled:opacity-50"
              >
                {isGenerating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Wand2 className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    <span>{currentStep === GENERATION_STEPS.length - 1 ? 'Generate Logo' : 'Next'}</span>
                    <Wand2 className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
} 