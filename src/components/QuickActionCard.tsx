import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface QuickActionCardProps {
  emoji: string;
  title: string;
  bg: string;
  path?: string;
}

const QuickActionCard = ({ emoji, title, bg, path }: QuickActionCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => path && navigate(path)}
      className={`${bg} w-full flex items-center gap-4 p-5 rounded-2xl shadow-soft hover:shadow-card transition-all duration-200 text-left`}
    >
      <span className="text-3xl">{emoji}</span>
      <span className="font-bold text-foreground">{title}</span>
    </motion.button>
  );
};

export default QuickActionCard;
