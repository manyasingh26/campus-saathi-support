import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ChevronDown } from "lucide-react";
import BottomNav from "@/components/BottomNav";

interface JournalEntry {
  id: number;
  date: string;
  preview: string;
  full: string;
}

const sampleEntries: JournalEntry[] = [
  {
    id: 1,
    date: "Feb 8, 2026",
    preview: "Feeling anxious about tomorrow's exam...",
    full: "Feeling anxious about tomorrow's exam. I've been studying all week but I still feel like it's not enough. Talked to my roommate and she felt the same way. We decided to take a break and grab coffee together. It helped a little.",
  },
  {
    id: 2,
    date: "Feb 6, 2026",
    preview: "Had a good day, talked to a friend...",
    full: "Had a good day, talked to a friend I hadn't seen in a while. We reminisced about old times and it made me feel warm. Sometimes it's the small connections that matter most.",
  },
  {
    id: 3,
    date: "Feb 4, 2026",
    preview: "Missing home today...",
    full: "Missing home today. Called mom and she told me about the garden she's been growing. I wish I could be there to see the flowers. But hearing her voice made me feel a little closer to home.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Journal = () => {
  const [text, setText] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!text.trim()) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setText("");
  };

  return (
    <div className="min-h-screen pb-24" style={{ background: "linear-gradient(180deg, hsl(35 40% 96%) 0%, hsl(30 30% 94%) 100%)" }}>
      {/* Header */}
      <header className="px-6 pt-8 pb-4">
        <motion.h1
          initial="hidden" animate="visible" custom={0} variants={fadeUp}
          className="text-2xl font-extrabold text-foreground"
        >
          My Private Space 📝
        </motion.h1>
        <motion.div
          initial="hidden" animate="visible" custom={1} variants={fadeUp}
          className="flex items-center gap-1.5 mt-2"
        >
          <Lock className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-medium">Your entries are private</span>
        </motion.div>
      </header>

      {/* Text area */}
      <section className="px-6 py-2">
        <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind today?"
            className="w-full h-40 bg-card rounded-2xl shadow-soft p-5 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow font-medium"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          />
        </motion.div>

        <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp} className="flex justify-end mt-3 gap-3 items-center">
          <AnimatePresence>
            {saved && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-soft-green font-semibold"
                style={{ color: "hsl(150 40% 45%)" }}
              >
                ✓ Saved!
              </motion.span>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            className="bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-xl shadow-card hover:shadow-hover transition-shadow"
          >
            Save Entry
          </motion.button>
        </motion.div>
      </section>

      {/* Past entries */}
      <section className="px-6 py-4">
        <motion.h2 initial="hidden" animate="visible" custom={4} variants={fadeUp} className="text-lg font-bold text-foreground mb-3">
          Past Entries
        </motion.h2>

        <div className="space-y-3">
          {sampleEntries.map((entry, i) => {
            const isOpen = expandedId === entry.id;
            return (
              <motion.div
                key={entry.id}
                initial="hidden" animate="visible" custom={5 + i} variants={fadeUp}
              >
                <button
                  onClick={() => setExpandedId(isOpen ? null : entry.id)}
                  className="w-full bg-card rounded-2xl shadow-soft p-4 text-left hover:shadow-card transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold mb-1">{entry.date}</p>
                      <p className="text-sm text-foreground font-medium">
                        {isOpen ? entry.full : entry.preview}
                      </p>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground shrink-0 ml-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default Journal;
