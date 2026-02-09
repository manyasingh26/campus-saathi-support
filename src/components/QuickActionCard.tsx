import { motion } from "framer-motion";

interface QuickActionCardProps {
  emoji: string;
  title: string;
  bg: string;
}

const QuickActionCard = ({ emoji, title, bg }: QuickActionCardProps) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className={`${bg} w-full flex items-center gap-4 p-5 rounded-2xl shadow-soft hover:shadow-card transition-all duration-200 text-left`}
  >
    <span className="text-3xl">{emoji}</span>
    <span className="font-bold text-foreground">{title}</span>
  </motion.button>
);

export default QuickActionCard;
