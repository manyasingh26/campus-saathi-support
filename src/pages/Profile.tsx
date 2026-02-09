import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, ShieldAlert, BookOpen, Settings } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const menuItems = [
  { icon: BookOpen, label: "My Journal", path: "/journal" },
  { icon: Settings, label: "Settings", path: "/profile" },
  { icon: ShieldAlert, label: "Emergency Resources", path: "/emergency", accent: true },
];

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-6 pt-8 pb-6 flex flex-col items-center text-center">
        <motion.div
          initial="hidden" animate="visible" custom={0} variants={fadeUp}
          className="w-20 h-20 rounded-full bg-calm-sky flex items-center justify-center mb-4"
        >
          <User className="h-10 w-10 text-calm-blue" />
        </motion.div>
        <motion.h1
          initial="hidden" animate="visible" custom={1} variants={fadeUp}
          className="text-xl font-extrabold text-foreground"
        >
          Student
        </motion.h1>
        <motion.p
          initial="hidden" animate="visible" custom={2} variants={fadeUp}
          className="text-muted-foreground text-sm"
        >
          Taking care of your mind 💛
        </motion.p>
      </header>

      <section className="px-6 space-y-3">
        {menuItems.map((item, i) => (
          <motion.button
            key={item.label}
            initial="hidden" animate="visible" custom={3 + i} variants={fadeUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl shadow-soft hover:shadow-card transition-all text-left ${
              item.accent ? "bg-destructive/5" : "bg-card"
            }`}
          >
            <item.icon className={`h-5 w-5 ${item.accent ? "text-destructive" : "text-muted-foreground"}`} />
            <span className={`font-bold ${item.accent ? "text-destructive" : "text-foreground"}`}>
              {item.label}
            </span>
          </motion.button>
        ))}
      </section>

      <BottomNav />
    </div>
  );
};

export default Profile;
