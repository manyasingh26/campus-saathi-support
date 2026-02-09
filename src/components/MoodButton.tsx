import { motion } from "framer-motion";

interface MoodButtonProps {
  emoji: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const MoodButton = ({ emoji, label, isSelected, onClick }: MoodButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 w-full ${
      isSelected
        ? "bg-primary/10 shadow-card ring-2 ring-primary"
        : "bg-card shadow-soft hover:shadow-card"
    }`}
  >
    <span className="text-4xl">{emoji}</span>
    <span
      className={`text-sm font-semibold ${
        isSelected ? "text-primary" : "text-muted-foreground"
      }`}
    >
      {label}
    </span>
  </motion.button>
);

export default MoodButton;
