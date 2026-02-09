import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Phone, ShieldAlert, Heart } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const helplines = [
  { label: "College Counselor", contact: "Contact your campus office", icon: Heart },
  { label: "Crisis Helpline", contact: "1800-599-0019", icon: Phone },
  { label: "Women Helpline", contact: "1090", icon: Phone },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Emergency = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-6 pt-8 pb-4">
        <motion.div
          initial="hidden" animate="visible" custom={0} variants={fadeUp}
          className="flex items-center gap-2"
        >
          <ShieldAlert className="h-7 w-7 text-destructive" />
          <h1 className="text-2xl font-extrabold text-destructive">
            Need Immediate Help?
          </h1>
        </motion.div>
        <motion.p
          initial="hidden" animate="visible" custom={1} variants={fadeUp}
          className="text-muted-foreground mt-2"
        >
          You're not alone. Reach out to any of these resources.
        </motion.p>
      </header>

      <section className="px-6 py-4 space-y-4">
        {helplines.map((h, i) => (
          <motion.div
            key={h.label}
            initial="hidden" animate="visible" custom={2 + i} variants={fadeUp}
            className="bg-card rounded-2xl shadow-card p-5 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
              <h.icon className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="font-bold text-foreground">{h.label}</p>
              <p className="text-muted-foreground text-sm font-medium">{h.contact}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="px-6 py-8 flex justify-center">
        <motion.button
          initial="hidden" animate="visible" custom={5} variants={fadeUp}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/dashboard")}
          className="bg-soft-green text-foreground font-bold px-8 py-3.5 rounded-2xl shadow-card hover:shadow-hover transition-shadow text-lg"
        >
          I Feel Fine Now 💚
        </motion.button>
      </section>

      <BottomNav />
    </div>
  );
};

export default Emergency;
