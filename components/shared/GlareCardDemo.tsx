import { GlareCard } from "../ui/glare-card";

interface FeatureCardProps {
  title: string;
  points: string[];
}

export function GlareCardDemo({title,points}:FeatureCardProps) {
  return (
    <GlareCard className="flex flex-col items-center justify-center ">
      <div className="px-6">
            <h3 className="h4-medium font-semibold text-white mb-6 text-center">{title}</h3>
            <ul className="text-white/80">
              {points.map((point, index) => (
                <li key={index} className="mb-2">{point}</li>
              ))}
            </ul>
          </div>
    </GlareCard>
  );
}
