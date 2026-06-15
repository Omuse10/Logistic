import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2400;
    const steps = 80;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setProgress(Math.min(Math.round((current / steps) * 100), 100));
      if (current >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] bg-navy flex flex-col items-center justify-center"
    >
      {/* Animated background rings */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/5"
            style={{
              width: `${300 + i * 200}px`,
              height: `${300 + i * 200}px`,
              top: '50%',
              left: '50%',
              x: `-50%`,
              y: `-50%`,
            }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-white rounded-2xl px-10 py-5 mb-8 border border-navy/10 shadow-[0_8px_40px_rgba(0,0,0,0.32)]"
        >
          <img
            src="/intelwise-logistics.png"
            alt="IntelWise Logistics"
            className="h-24 w-auto object-contain"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/50 text-sm tracking-[0.25em] uppercase mb-10"
        >
          Initializing global routes...
        </motion.p>

        {/* Progress bar container */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-orange via-orange-300 to-accent-blue rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear', duration: 0.1 }}
          />
        </div>

        {/* Progress text */}
        <motion.span
          className="text-white/30 text-xs font-mono"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {progress}%
        </motion.span>

        {/* Floating dots */}
        <div className="flex items-center gap-2 mt-10">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-orange/60 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
