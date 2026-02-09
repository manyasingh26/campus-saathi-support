import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Wind, BookOpen, Users } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const tools = [
  { icon: Wind, emoji: "🌬️", title: "Breathing Exercise", description: "Calm your mind in 30 seconds", path: "/breathing", bg: "bg-calm-sky" },
  { icon: BookOpen, emoji: "📝", title: "Journal", description: "Write your thoughts privately", path: "/journal", bg: "bg-soft-peach" },
  { icon: Users, emoji: "🏆", title: "Achievement Jar", description: "Celebrate your wins", path: "/achievements", bg: "bg-soft-pink" },
  { icon: Users, emoji: "💡", title: "Peer Wisdom", description: "Advice from students like you", path: "/peer-wisdom", bg: "bg-soft-lavender" },
  { icon: Wind, emoji: "📊", title: "Attendance Calculator", description: "Know where you stand", path: "/attendance", bg: "bg-soft-green" },
  { icon: Users, emoji: "🤝", title: "Buddy Check-In", description: "Support each other", path: "/buddy", bg: "bg-calm-sky" },
];

const Tools = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-6 pt-8 pb-4">
        <motion.h1
          initial="hidden" animate="visible" custom={0} variants={fadeUp}
          className="text-2xl font-extrabold text-foreground"
        >
          Wellness Tools 🧰
        </motion.h1>
        <motion.p
          initial="hidden" animate="visible" custom={1} variants={fadeUp}
          className="text-muted-foreground mt-1"
        >
          Pick what helps you right now
        </motion.p>
      </header>

      <section className="px-6 py-4 space-y-4">
        {tools.map((tool, i) => (
          <motion.button
            key={tool.title}
            initial="hidden" animate="visible" custom={2 + i} variants={fadeUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(tool.path)}
            className={`${tool.bg} w-full flex items-center gap-4 p-5 rounded-2xl shadow-soft hover:shadow-card transition-all text-left`}
          >
            <span className="text-3xl">{tool.emoji}</span>
            <div>
              <p className="font-bold text-foreground">{tool.title}</p>
              <p className="text-muted-foreground text-sm">{tool.description}</p>
            </div>
          </motion.button>
        ))}
      </section>

      <BottomNav />
    </div>
  );
};

export default Tools;
