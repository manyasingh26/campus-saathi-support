import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Trophy, Flame, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNav from "@/components/BottomNav";
import confetti from "canvas-confetti";

type Category = "academic" | "social" | "personal" | "other";

interface Achievement {
  id: string;
  text: string;
  category: Category;
  date: Date;
}

const categoryConfig: Record<Category, { emoji: string; label: string; color: string }> = {
  academic: { emoji: "📚", label: "Academic", color: "bg-calm-sky" },
  social: { emoji: "👥", label: "Social", color: "bg-soft-lavender" },
  personal: { emoji: "💪", label: "Personal", color: "bg-soft-peach" },
  other: { emoji: "🎯", label: "Other", color: "bg-soft-green" },
};

const milestones = [
  { count: 10, label: "Getting Started 🌱", unlocked: false },
  { count: 25, label: "Momentum Builder 🚀", unlocked: false },
  { count: 50, label: "Self-Belief Champion 👑", unlocked: false },
  { count: 100, label: "Imposter Defeated 💪", unlocked: false },
];

const quotes = [
  "You're doing better than you think",
  "Progress, not perfection",
  "Your journey is valid",
  "Small wins lead to big victories",
  "Celebrate every step forward",
];

const sampleAchievements: Achievement[] = [
  { id: "1", text: "Completed my math assignment on time", category: "academic", date: new Date(2026, 1, 9) },
  { id: "2", text: "Made a new friend in class today", category: "social", date: new Date(2026, 1, 8) },
  { id: "3", text: "Woke up early and exercised", category: "personal", date: new Date(2026, 1, 8) },
  { id: "4", text: "Spoke up during group discussion", category: "social", date: new Date(2026, 1, 7) },
  { id: "5", text: "Finished reading a chapter ahead", category: "academic", date: new Date(2026, 1, 6) },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const AchievementJar = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(sampleAchievements);
  const [newText, setNewText] = useState("");
  const [newCategory, setNewCategory] = useState<Category>("academic");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setQuoteIndex((i) => (i + 1) % quotes.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const addAchievement = () => {
    if (!newText.trim()) return;
    const newAch: Achievement = {
      id: Date.now().toString(),
      text: newText.trim(),
      category: newCategory,
      date: new Date(),
    };
    setAchievements((prev) => [newAch, ...prev]);
    setNewText("");
    setNewCategory("academic");
    setDialogOpen(false);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  const deleteAchievement = (id: string) => {
    setAchievements((prev) => prev.filter((a) => a.id !== id));
  };

  const streak = 5; // Mock streak
  const thisMonth = achievements.length;
  const breakdown = {
    academic: achievements.filter((a) => a.category === "academic").length,
    social: achievements.filter((a) => a.category === "social").length,
    personal: achievements.filter((a) => a.category === "personal").length,
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-6 pt-8 pb-4">
        <motion.h1 initial="hidden" animate="visible" custom={0} variants={fadeUp}
          className="text-2xl font-extrabold text-foreground">Your Wins Matter 🏆</motion.h1>
        <motion.p initial="hidden" animate="visible" custom={1} variants={fadeUp}
          className="text-muted-foreground mt-1">Every small step counts. Celebrate yourself.</motion.p>
      </header>

      {/* Streak */}
      <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}
        className="mx-6 mb-4 p-4 rounded-2xl bg-soft-peach flex items-center gap-3">
        <Flame className="h-6 w-6 text-primary" />
        <span className="font-bold text-foreground">🔥 You've logged wins for {streak} days straight!</span>
      </motion.div>

      {/* Jar Visual */}
      <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}
        className="mx-6 mb-6 relative">
        <div className="relative mx-auto w-48 h-64 rounded-b-[3rem] rounded-t-xl overflow-hidden"
          style={{ background: "linear-gradient(180deg, hsl(45 95% 65%) 0%, hsl(25 95% 58%) 100%)" }}>
          {/* Jar neck */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 rounded-t-lg bg-foreground/10" />
          {/* Floating badges */}
          <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-2 p-6 pt-10">
            {achievements.slice(0, 8).map((a, i) => (
              <motion.span key={a.id}
                animate={{ y: [0, -6, 0], rotate: [0, i % 2 === 0 ? 5 : -5, 0] }}
                transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                className="text-2xl drop-shadow-md">
                {categoryConfig[a.category].emoji}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Add Button */}
      <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp} className="px-6 mb-6">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full h-14 text-lg font-bold rounded-2xl shadow-card">
              <Plus className="mr-2 h-5 w-5" /> Add Achievement
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle>What did you accomplish today? 🎉</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <Input placeholder="e.g. Submitted my assignment on time!"
                value={newText} onChange={(e) => setNewText(e.target.value)}
                className="rounded-xl" />
              <Select value={newCategory} onValueChange={(v) => setNewCategory(v as Category)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryConfig).map(([key, cfg]) => (
                    <SelectItem key={key} value={key}>{cfg.emoji} {cfg.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addAchievement} className="w-full rounded-xl font-bold">
                Add to Jar ✨
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Milestones */}
      <motion.section initial="hidden" animate="visible" custom={5} variants={fadeUp} className="px-6 mb-6">
        <h2 className="text-lg font-bold text-foreground mb-3">Achievement Milestones</h2>
        <div className="grid grid-cols-2 gap-3">
          {milestones.map((m) => {
            const unlocked = achievements.length >= m.count;
            return (
              <div key={m.count}
                className={`p-3 rounded-2xl border text-center transition-all ${unlocked ? "bg-soft-peach border-primary shadow-soft" : "bg-muted border-border opacity-60"}`}>
                <p className="text-sm font-bold">{m.label}</p>
                <p className="text-xs text-muted-foreground">{m.count} wins</p>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section initial="hidden" animate="visible" custom={6} variants={fadeUp} className="px-6 mb-6">
        <div className="p-5 rounded-2xl bg-card shadow-soft border border-border">
          <p className="font-bold text-foreground text-center mb-2">
            You've celebrated {thisMonth} wins this month! 🌟
          </p>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <span>{breakdown.academic} academic</span>
            <span>{breakdown.social} social</span>
            <span>{breakdown.personal} personal</span>
          </div>
        </div>
      </motion.section>

      {/* Recent Wins */}
      <motion.section initial="hidden" animate="visible" custom={7} variants={fadeUp} className="px-6 mb-6">
        <h2 className="text-lg font-bold text-foreground mb-3">Recent Wins</h2>
        <div className="space-y-3">
          <AnimatePresence>
            {achievements.slice(0, 5).map((a) => {
              const cfg = categoryConfig[a.category];
              return (
                <motion.div key={a.id}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -100 }}
                  className={`${cfg.color} p-4 rounded-2xl flex items-start gap-3 shadow-soft`}>
                  <span className="text-2xl">{cfg.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">{a.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {a.date.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                  <button onClick={() => deleteAchievement(a.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Weekly Reflection */}
      <motion.section initial="hidden" animate="visible" custom={8} variants={fadeUp} className="px-6 mb-6">
        <div className="p-5 rounded-2xl bg-soft-lavender border border-border">
          <h3 className="font-bold text-foreground mb-1">📅 Weekly Reflection</h3>
          <p className="text-sm text-muted-foreground">
            Look how far you came this week! You accomplished {breakdown.academic} things in academics,{" "}
            {breakdown.social} in social, and {breakdown.personal} personal wins.
          </p>
        </div>
      </motion.section>

      {/* Rotating Quote */}
      <motion.div initial="hidden" animate="visible" custom={9} variants={fadeUp}
        className="px-6 mb-6 text-center">
        <AnimatePresence mode="wait">
          <motion.p key={quoteIndex}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="text-muted-foreground italic text-sm">
            "{quotes[quoteIndex]}"
          </motion.p>
        </AnimatePresence>
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default AchievementJar;
