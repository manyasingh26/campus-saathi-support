interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
  bg: string;
}

const FeatureCard = ({ emoji, title, description, bg }: FeatureCardProps) => (
  <div
    className={`${bg} rounded-2xl p-6 shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-1 cursor-default`}
  >
    <span className="text-4xl block mb-3">{emoji}</span>
    <h3 className="font-bold text-foreground text-lg mb-1">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

export default FeatureCard;
