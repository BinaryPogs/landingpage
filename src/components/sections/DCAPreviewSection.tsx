'use client';

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Shell, ArrowRight } from 'lucide-react';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { MotionValue } from 'framer-motion';

interface DCAPreviewSectionProps {
  opacity?: MotionValue<number>;
  y?: MotionValue<number>;
}

interface DataPoint {
  month: string;
  price: number;
  dcaValue: number;
}

export function DCAPreviewSection({ opacity, y }: DCAPreviewSectionProps = {}) {
  const [data, setData] = useState<DataPoint[]>([]);
  
  useEffect(() => {
    const historicalData = [
      { month: 'May 23', price: 1.50, dcaValue: 1000 },
      { month: 'Jun 23', price: 0.65, dcaValue: 2350 },
      { month: 'Jul 23', price: 0.85, dcaValue: 2800 },
      { month: 'Aug 23', price: 0.55, dcaValue: 3600 },
      { month: 'Sep 23', price: 0.45, dcaValue: 4200 },
      { month: 'Oct 23', price: 0.38, dcaValue: 4900 },
      { month: 'Nov 23', price: 0.45, dcaValue: 5500 },
      { month: 'Dec 23', price: 0.95, dcaValue: 7200 },
      { month: 'Jan 24', price: 1.25, dcaValue: 8900 },
      { month: 'Feb 24', price: 1.60, dcaValue: 11500 }
    ];

    setData(historicalData);
  }, []);

  const totalInvested = 1000 + (100 * (data.length - 1));
  const currentValue = data.length > 0 ? data[data.length - 1].dcaValue : 0;
  const totalReturn = ((currentValue - totalInvested) / totalInvested * 100).toFixed(1);

  const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0A192F]/90 rounded-lg p-4 shadow-lg border border-[#1a2942]/50 backdrop-blur-sm">
          <p className="text-[#FFD700] font-medium">{payload[0].payload.month}</p>
          <p className="text-[#94A3B8] font-medium">Portfolio: ${payload[0].value}</p>
          <p className="text-[#94A3B8]/80">SUI Price: ${payload[0].payload.price}</p>
        </div>
      );
    }
    return null;
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
        className="w-[95vw]"
      >
        <div className="relative w-full bg-[#0A192F]/30 rounded-xl p-4 md:p-6 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2942] via-[#0A192F] to-[#0d2347] rounded-xl opacity-20" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FF7F50]/10 rounded-lg border border-[#FF7F50]/30">
                  <Shell className="w-5 h-5 text-[#FFD700]" />
                </div>
                <div>
                  <h3 className="text-xl text-[#FFD700] font-medium">Ride the Wave</h3>
                  <p className="text-[#94A3B8]">May 2023 - Feb 2024</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className={`text-2xl font-medium ${Number(totalReturn) >= 0 ? 'text-[#FFD700]' : 'text-red-400'}`}>
                  {totalReturn}%
                </div>
                <div className="text-sm text-[#94A3B8]">Total Return</div>
              </div>
            </div>

            <div className="h-[450px] -mx-2 md:-mx-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={data}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="oceanGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF7F50" stopOpacity={0.2}/>
                      <stop offset="100%" stopColor="#FF7F50" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="month" 
                    stroke="#94A3B8"
                    tick={{ fill: '#94A3B8' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#BA8759"
                    tick={{ fill: '#BA8759' }}
                    axisLine={false}
                    tickLine={false}
                    width={40}
                  />
                  <Tooltip content={CustomTooltip} />
                  <Line 
                    type="monotone" 
                    dataKey="dcaValue" 
                    stroke="#FFD700"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-[#0A192F]/30 rounded-lg border border-[#1a2942]/50 backdrop-blur-sm">
                <div className="text-sm text-[#94A3B8]">Total Invested</div>
                <div className="text-lg text-[#FFD700] font-medium">${totalInvested}</div>
              </div>
              <div className="p-4 bg-[#0A192F]/30 rounded-lg border border-[#1a2942]/50 backdrop-blur-sm">
                <div className="text-sm text-[#94A3B8]">Current Value</div>
                <div className="text-lg text-[#FFD700] font-medium">${currentValue}</div>
              </div>
              <div className="p-4 bg-[#0A192F]/30 rounded-lg border border-[#1a2942]/50 backdrop-blur-sm">
                <div className="text-sm text-[#94A3B8]">Monthly DCA</div>
                <div className="text-lg text-[#FFD700] font-medium">$100</div>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FFD700] to-[#FFC000] hover:from-[#FFE55C] hover:to-[#FFD700] text-[#1a2942] py-3 px-6 rounded-lg transition-all duration-200 font-medium text-lg shadow-lg">
              <span>Start Your Wave</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
} 