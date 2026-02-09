import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { TrendingUp } from "lucide-react";

const weekData = [
  { day: "Mon", emoji: "😣", value: 3, color: "bg-soft-peach" },
  { day: "Tue", emoji: "😊", value: 5, color: "bg-soft-green" },
  { day: "Wed", emoji: "😟", value: 2, color: "bg-soft-lavender" },
  { day: "Thu", emoji: "😊", value: 4, color: "bg-soft-green" },
  { day: "Fri", emoji: "😣", value: 3, color: "bg-soft-peach" },
  { day: "Sat", emoji: "😊", value: 5, color: "bg-soft-green" },
  { day: "Sun", emoji: "😔", value: 2, color: "bg-soft-pink" },
];

const maxValue = 5;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Insights = () => {
  const bestDay = weekData.reduce((a, b) => (a.value > b.value ? a : b));

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-6 pt-8 pb-2">
        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="text-2xl font-extrabold text-foreground"
        >
          Your Week at a Glance
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="text-muted-foreground mt-1"
        >
          See how you've been feeling
        </motion.p>
      </header>

      {/* Bar Chart */}
      <section className="px-6 py-6">
        <motion.div
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
          className="bg-card rounded-2xl shadow-card p-6"
        >
          <div className="flex items-end justify-between gap-3 h-48">
            {weekData.map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xl">{d.emoji}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.value / maxValue) * 100}%` }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                  className={`${d.color} w-full rounded-xl min-h-[8px]`}
                />
                <span className="text-xs font-semibold text-muted-foreground">
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Best day */}
        <motion.p
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeUp}
          className="text-center text-foreground font-semibold mt-4"
        >
          You felt best on {bestDay.day === "Tue" ? "Tuesday" : bestDay.day} 🌟
        </motion.p>
      </section>

      {/* Insight Card */}
      <section className="px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          custom={4}
          variants={fadeUp}
          className="bg-soft-lavender rounded-2xl p-5 shadow-soft"
        >
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 text-accent-foreground mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-foreground text-sm mb-1">
                Pattern Detected: You feel stressed before Mondays
              </p>
              <p className="text-muted-foreground text-sm">
                Suggestion: Try a Sunday evening wind-down routine 🌙
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Track mood button */}
      <section className="px-6 py-8 flex justify-center">
        <motion.button
          initial="hidden"
          animate="visible"
          custom={5}
          variants={fadeUp}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="bg-primary text-primary-foreground font-bold px-8 py-3 rounded-2xl shadow-card hover:shadow-hover transition-shadow"
          onClick={() => window.location.href = "/dashboard"}
        >
          Track Today's Mood
        </motion.button>
      </section>

      <BottomNav />
    </div>
  );
};

export default Insights;
