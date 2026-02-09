import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const INHALE_DURATION = 4000;
const EXHALE_DURATION = 6000;
const TOTAL_BREATHS = 5;

const Breathing = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"inhale" | "exhale">("inhale");
  const [breathCount, setBreathCount] = useState(1);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);

  const runCycle = useCallback(() => {
    setPhase("inhale");
    const inhaleTimer = setTimeout(() => {
      setPhase("exhale");
      const exhaleTimer = setTimeout(() => {
        setBreathCount((prev) => {
          if (prev >= TOTAL_BREATHS) {
            setFinished(true);
            return prev;
          }
          return prev + 1;
        });
      }, EXHALE_DURATION);
      return () => clearTimeout(exhaleTimer);
    }, INHALE_DURATION);
    return () => clearTimeout(inhaleTimer);
  }, []);

  useEffect(() => {
    if (!started || finished) return;
    setPhase("inhale");
    const inhaleTimer = setTimeout(() => {
      setPhase("exhale");
      const exhaleTimer = setTimeout(() => {
        setBreathCount((prev) => {
          if (prev >= TOTAL_BREATHS) {
            setFinished(true);
            return prev;
          }
          return prev + 1;
        });
      }, EXHALE_DURATION);
      return () => clearTimeout(exhaleTimer);
    }, INHALE_DURATION);
    return () => clearTimeout(inhaleTimer);
  }, [breathCount, started, finished]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(200 70% 85%) 0%, hsl(210 60% 70%) 50%, hsl(220 50% 60%) 100%)",
      }}
    >
      {/* Ambient circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-32 right-10 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6 text-center"
            >
              <span className="text-6xl">✨</span>
              <h1 className="text-3xl font-extrabold text-white">
                Great job! You did it
              </h1>
              <p className="text-white/70 text-lg">
                Take a moment to notice how you feel
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="mt-6 bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-3 rounded-2xl hover:bg-white/30 transition-colors"
              >
                Back to Home
              </button>
            </motion.div>
          ) : !started ? (
            <motion.div
              key="start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-8 text-center"
            >
              <h1 className="text-3xl font-extrabold text-white">
                30-Second Breathing
              </h1>
              <p className="text-white/70 text-lg max-w-xs">
                Find a comfortable position. We'll guide you through 5 breaths.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStarted(true)}
                className="bg-white/20 backdrop-blur-sm text-white font-bold text-lg px-10 py-4 rounded-full hover:bg-white/30 transition-colors"
              >
                Begin
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="breathing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Instruction text */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={phase}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-2xl font-bold text-white tracking-wide"
                >
                  {phase === "inhale" ? "Breathe In..." : "Breathe Out..."}
                </motion.p>
              </AnimatePresence>

              {/* Breathing circle */}
              <div className="relative flex items-center justify-center w-56 h-56">
                {/* Glow ring */}
                <motion.div
                  animate={{
                    scale: phase === "inhale" ? 1.3 : 0.85,
                    opacity: phase === "inhale" ? 0.3 : 0.1,
                  }}
                  transition={{
                    duration: phase === "inhale" ? INHALE_DURATION / 1000 : EXHALE_DURATION / 1000,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="absolute w-56 h-56 rounded-full bg-white/20 blur-xl"
                />
                {/* Main circle */}
                <motion.div
                  animate={{
                    scale: phase === "inhale" ? 1.25 : 0.75,
                  }}
                  transition={{
                    duration: phase === "inhale" ? INHALE_DURATION / 1000 : EXHALE_DURATION / 1000,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="w-44 h-44 rounded-full border-4 border-white/40 bg-white/10 backdrop-blur-sm"
                  style={{
                    boxShadow: "0 0 60px rgba(255,255,255,0.15), inset 0 0 30px rgba(255,255,255,0.05)",
                  }}
                />
              </div>

              {/* Counter */}
              <p className="text-white/60 text-base font-medium">
                Breath {breathCount} of {TOTAL_BREATHS}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Back button */}
      {!finished && (
        <button
          onClick={() => navigate("/dashboard")}
          className="absolute top-6 left-6 text-white/60 hover:text-white transition-colors z-20"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Breathing;
