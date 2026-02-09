import { useState } from "react";
import { motion } from "framer-motion";
import { Sun } from "lucide-react";
import MoodButton from "@/components/MoodButton";
import QuickActionCard from "@/components/QuickActionCard";
import BottomNav from "@/components/BottomNav";

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😣", label: "Stressed" },
  { emoji: "😟", label: "Anxious" },
  { emoji: "😔", label: "Lonely" },
  { emoji: "😠", label: "Angry" },
  { emoji: "😵‍💫", label: "Overwhelmed" },
];

const quickActions = [
  { emoji: "🌬️", title: "30-sec Breathing", bg: "bg-calm-sky", path: "/breathing" },
  { emoji: "📝", title: "Write in Journal", bg: "bg-soft-peach", path: "/journal" },
  { emoji: "🧑‍🤝‍🧑", title: "Talk to Mentor", bg: "bg-soft-lavender", path: "/profile" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Dashboard = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-6 pt-8 pb-4">
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="flex items-center gap-3 mb-1"
        >
          <Sun className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-extrabold text-foreground">
            Good Morning, Student
          </h1>
        </motion.div>
        <motion.p
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="text-muted-foreground text-base pl-11"
        >
          How are you feeling today?
        </motion.p>
      </header>

      {/* Mood Selection */}
      <section className="px-6 py-6">
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {moods.map((mood, i) => (
            <motion.div
              key={mood.label}
              initial="hidden"
              animate="visible"
              custom={2 + i}
              variants={fadeUp}
            >
              <MoodButton
                emoji={mood.emoji}
                label={mood.label}
                isSelected={selectedMood === mood.label}
                onClick={() => setSelectedMood(mood.label)}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-6 py-4">
        <motion.h2
          initial="hidden"
          animate="visible"
          custom={8}
          variants={fadeUp}
          className="text-lg font-bold text-foreground mb-4"
        >
          Quick Actions
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.title}
              initial="hidden"
              animate="visible"
              custom={9 + i}
              variants={fadeUp}
            >
              <QuickActionCard {...action} />
            </motion.div>
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
