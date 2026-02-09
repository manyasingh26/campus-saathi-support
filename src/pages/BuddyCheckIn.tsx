import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Mail, Send, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const BuddyCheckIn = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [buddySetup, setBuddySetup] = useState(false);
  const [buddyName] = useState("Priya");

  const handleSetup = () => {
    if (!email.trim() || !agreed) return;
    setBuddySetup(true);
    toast({ title: "Buddy paired! 🤝", description: "You'll support each other." });
  };

  const handleCheckIn = () => {
    toast({ title: "Check-in sent! 💛", description: `${buddyName} will know you're thinking of them.` });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-6 pt-8 pb-4">
        <motion.h1 initial="hidden" animate="visible" custom={0} variants={fadeUp}
          className="text-2xl font-extrabold text-foreground">Buddy Check-In 🤝</motion.h1>
        <motion.p initial="hidden" animate="visible" custom={1} variants={fadeUp}
          className="text-muted-foreground mt-1">Because nobody should go through it alone.</motion.p>
      </header>

      {!buddySetup ? (
        <motion.section initial="hidden" animate="visible" custom={2} variants={fadeUp} className="px-6">
          <div className="p-6 rounded-2xl bg-card border border-border shadow-soft space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-soft-lavender flex items-center justify-center">
                <Users className="h-6 w-6 text-foreground" />
              </div>
              <div>
                <h2 className="font-bold text-foreground">Pair with a Buddy</h2>
                <p className="text-xs text-muted-foreground">Support each other through tough days</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground">Enter your buddy's email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="email" placeholder="buddy@college.edu" value={email}
                  onChange={(e) => setEmail(e.target.value)} className="pl-10 rounded-xl" />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox id="agree" checked={agreed}
                onCheckedChange={(c) => setAgreed(c === true)} className="mt-0.5" />
              <label htmlFor="agree" className="text-sm text-muted-foreground cursor-pointer">
                I agree to support my buddy too. We'll check in on each other and be there when it matters.
              </label>
            </div>

            <Button onClick={handleSetup} disabled={!email.trim() || !agreed}
              className="w-full rounded-xl font-bold h-12">
              <Heart className="mr-2 h-4 w-4" /> Set Up Buddy Pair
            </Button>
          </div>
        </motion.section>
      ) : (
        <motion.section initial="hidden" animate="visible" custom={2} variants={fadeUp} className="px-6 space-y-4">
          <div className="p-6 rounded-2xl bg-soft-lavender border border-border text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">👋</span>
            </div>
            <h2 className="font-bold text-foreground text-lg">Your Buddy: {buddyName}</h2>
            <p className="text-sm text-muted-foreground mt-1">Paired since today</p>
          </div>

          <Button onClick={handleCheckIn} className="w-full rounded-2xl font-bold h-14 text-lg">
            <Send className="mr-2 h-5 w-5" /> Send Check-In Message
          </Button>

          <div className="p-4 rounded-2xl bg-soft-peach border border-border">
            <p className="text-sm text-muted-foreground text-center">
              💛 A simple "Hey, how are you?" can mean the world to someone having a tough day.
            </p>
          </div>
        </motion.section>
      )}

      <BottomNav />
    </div>
  );
};

export default BuddyCheckIn;
