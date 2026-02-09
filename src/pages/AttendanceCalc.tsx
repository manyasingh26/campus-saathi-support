import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Wind, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const AttendanceCalc = () => {
  const navigate = useNavigate();
  const [totalClasses, setTotalClasses] = useState("");
  const [attended, setAttended] = useState("");
  const [calculated, setCalculated] = useState(false);

  const total = parseInt(totalClasses) || 0;
  const att = parseInt(attended) || 0;
  const percentage = total > 0 ? (att / total) * 100 : 0;

  const getStatus = () => {
    if (percentage >= 75) return { label: "You're Safe! ✅", color: "text-green-600", bg: "bg-soft-green", ring: "stroke-green-500" };
    if (percentage >= 70) return { label: "Close Call ⚠️", color: "text-yellow-600", bg: "bg-celebration-yellow/30", ring: "stroke-yellow-500" };
    return { label: "Action Needed 🚨", color: "text-destructive", bg: "bg-soft-pink", ring: "stroke-destructive" };
  };

  const classesNeededFor75 = () => {
    if (percentage >= 75) return 0;
    // Solve: (att + x) / (total + x) >= 0.75
    const needed = Math.ceil((0.75 * total - att) / 0.25);
    return Math.max(0, needed);
  };

  const canSkip = () => {
    if (percentage < 75) return 0;
    // Solve: att / (total + x) >= 0.75
    const skippable = Math.floor((att - 0.75 * total) / 0.75);
    return Math.max(0, skippable);
  };

  const status = getStatus();
  const circumference = 2 * Math.PI * 60;
  const dashOffset = circumference - (Math.min(percentage, 100) / 100) * circumference;

  const getAdvice = () => {
    if (percentage >= 75) return { icon: "✅", text: `Great! Keep attending. You can afford ${canSkip()} leaves for emergencies.` };
    if (percentage >= 70) return { icon: "⚠️", text: `Attend the next ${classesNeededFor75()} classes straight. No compromise.` };
    return { icon: "🚨", text: `Talk to your professor about medical/official leave documentation. Attend next ${classesNeededFor75()} classes.` };
  };

  // Timeline: next 10 classes simulation
  const timeline = Array.from({ length: 10 }, (_, i) => {
    const newTotal = total + i + 1;
    const newAtt = att + i + 1; // assuming attend all
    return { class: i + 1, pctIfAttend: (newAtt / newTotal) * 100 };
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-6 pt-8 pb-4">
        <motion.h1 initial="hidden" animate="visible" custom={0} variants={fadeUp}
          className="text-2xl font-extrabold text-foreground">Attendance Stress Relief 📊</motion.h1>
        <motion.p initial="hidden" animate="visible" custom={1} variants={fadeUp}
          className="text-muted-foreground mt-1">Know exactly where you stand. No more guessing.</motion.p>
      </header>

      {/* Input Section */}
      <motion.section initial="hidden" animate="visible" custom={2} variants={fadeUp} className="px-6 mb-6">
        <div className="p-5 rounded-2xl bg-card border border-border shadow-soft space-y-4">
          <div>
            <label className="text-sm font-semibold text-foreground">Total Classes Held So Far</label>
            <Input type="number" min="0" placeholder="e.g. 50" value={totalClasses}
              onChange={(e) => { setTotalClasses(e.target.value); setCalculated(false); }}
              className="rounded-xl mt-1" />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground">Classes You Attended</label>
            <Input type="number" min="0" placeholder="e.g. 38" value={attended}
              onChange={(e) => { setAttended(e.target.value); setCalculated(false); }}
              className="rounded-xl mt-1" />
          </div>
          <Button onClick={() => setCalculated(true)} className="w-full rounded-xl font-bold h-12"
            disabled={!totalClasses || !attended || att > total}>
            <Calculator className="mr-2 h-4 w-4" /> Calculate
          </Button>
        </div>
      </motion.section>

      {/* Results */}
      {calculated && total > 0 && (
        <>
          {/* Percentage Circle */}
          <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}
            className="flex flex-col items-center mb-6">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="60" fill="none" strokeWidth="10"
                  className="stroke-muted" />
                <motion.circle cx="70" cy="70" r="60" fill="none" strokeWidth="10"
                  strokeLinecap="round" className={status.ring}
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: dashOffset }}
                  transition={{ duration: 1.5, ease: "easeOut" }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-foreground">{percentage.toFixed(1)}%</span>
              </div>
            </div>
            <p className={`mt-3 font-bold text-lg ${status.color}`}>{status.label}</p>
          </motion.div>

          {/* Breakdown */}
          <motion.section initial="hidden" animate="visible" custom={4} variants={fadeUp} className="px-6 mb-6">
            <div className={`p-5 rounded-2xl ${status.bg} border border-border space-y-2`}>
              <p className="text-sm"><strong>Current Attendance:</strong> {percentage.toFixed(1)}%</p>
              {percentage < 75 ? (
                <p className="text-sm"><strong>Attend next {classesNeededFor75()} classes</strong> without fail to reach 75%</p>
              ) : (
                <p className="text-sm">You can skip <strong>{canSkip()} more classes</strong> and stay safe</p>
              )}
            </div>
          </motion.section>

          {/* Timeline */}
          <motion.section initial="hidden" animate="visible" custom={5} variants={fadeUp} className="px-6 mb-6">
            <h3 className="font-bold text-foreground mb-3">Next 10 Classes Forecast</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {timeline.map((t) => (
                <div key={t.class}
                  className={`flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center text-xs font-bold border ${
                    t.pctIfAttend >= 75 ? "bg-soft-green border-green-300 text-green-700" :
                    t.pctIfAttend >= 70 ? "bg-celebration-yellow/30 border-yellow-300 text-yellow-700" :
                    "bg-soft-pink border-red-200 text-destructive"
                  }`}>
                  <span>+{t.class}</span>
                  <span className="text-[10px]">{t.pctIfAttend.toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Advice */}
          <motion.section initial="hidden" animate="visible" custom={6} variants={fadeUp} className="px-6 mb-6">
            <div className="p-5 rounded-2xl bg-card border border-border shadow-soft">
              <h3 className="font-bold text-foreground mb-2">💡 Smart Suggestion</h3>
              <p className="text-sm text-muted-foreground">{getAdvice().text}</p>
            </div>
          </motion.section>

          {/* Stress Reliever */}
          <motion.section initial="hidden" animate="visible" custom={7} variants={fadeUp} className="px-6 mb-6">
            <div className="p-5 rounded-2xl bg-calm-sky border border-border">
              <h3 className="font-bold text-foreground mb-1">Feeling Anxious? Quick Calm</h3>
              <p className="text-sm text-muted-foreground mb-3">Remember: Attendance is fixable. One class at a time. It's going to be okay. 💙</p>
              <Button variant="outline" onClick={() => navigate("/breathing")} className="rounded-xl">
                <Wind className="mr-2 h-4 w-4" /> Try Breathing Exercise
              </Button>
            </div>
          </motion.section>
        </>
      )}

      <BottomNav />
    </div>
  );
};

export default AttendanceCalc;
