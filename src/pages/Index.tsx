import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FeatureCard from "@/components/FeatureCard";
import { Sun, Heart } from "lucide-react";

const features = [
  {
    emoji: "😊",
    title: "Mood Tracking",
    description: "Track how you feel in 10 seconds",
    bg: "bg-soft-peach",
  },
  {
    emoji: "🧘",
    title: "Instant Calm",
    description: "Quick breathing exercises",
    bg: "bg-soft-lavender",
  },
  {
    emoji: "📝",
    title: "Private Journal",
    description: "Write your thoughts safely",
    bg: "bg-soft-green",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Index = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Nav */}
      <nav className="w-full max-w-5xl flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <Heart className="h-7 w-7 text-primary" fill="hsl(var(--primary))" />
          <span className="text-xl font-extrabold text-foreground tracking-tight">
            CampusSaathi
          </span>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          Sign In
        </button>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-3xl text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="mb-3"
        >
          <Sun className="h-12 w-12 text-primary mx-auto mb-4" />
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="text-5xl sm:text-6xl font-extrabold text-foreground leading-tight mb-4"
        >
          You're Not Alone
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
          className="text-lg sm:text-xl text-muted-foreground max-w-md mb-12"
        >
          Quick mental health support made for students
        </motion.p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full mb-14">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden"
              animate="visible"
              custom={3 + i}
              variants={fadeUp}
            >
              <FeatureCard {...f} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          initial="hidden"
          animate="visible"
          custom={6}
          variants={fadeUp}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/dashboard")}
          className="bg-primary text-primary-foreground font-bold text-lg px-10 py-4 rounded-2xl shadow-card hover:shadow-hover transition-shadow"
        >
          Get Started
        </motion.button>
      </main>

      {/* Footer */}
      <footer className="py-6 text-sm text-muted-foreground">
        Made with 💛 for students everywhere
      </footer>
    </div>
  );
};

export default Index;
