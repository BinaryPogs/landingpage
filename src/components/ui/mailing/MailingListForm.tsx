'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface MailingListFormProps {
  className?: string;
}

export function MailingListForm({ className }: MailingListFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }
      
      setStatus('success');
      setMessage(data.message);
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <div className={cn("relative", className)}>
      <form 
        onSubmit={handleSubmit}
        className="relative flex max-w-md w-full gap-2"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white 
                   placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 
                   transition-all duration-200 hover:border-white/20"
          disabled={status === 'loading'}
          required
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          title="Please enter a valid email address"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-white/10 hover:bg-white/15 text-white px-6 rounded-lg
                   border border-white/10 transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:border-white/20"
        >
          {status === 'loading' ? 'Joining...' : 'Join'}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              "absolute -bottom-8 left-0 text-sm",
              status === 'success' ? "text-emerald-400" : "text-red-400"
            )}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}