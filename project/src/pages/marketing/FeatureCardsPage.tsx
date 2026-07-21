import { AnimatedFeatureCard } from '../../components/ui/animated-feature-card';

const features = [
  {
    index: "001",
    tag: "HEALTHIFY",
    title: "Eat better to boost your gut health by 30%.",
    imageSrc: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop",
    color: "orange" as const,
  },
  {
    index: "002",
    tag: "DETANE",
    title: "Avoid chemicals to have a longer lifespan.",
    imageSrc: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    color: "purple" as const,
  },
  {
    index: "003",
    tag: "MEDITATE",
    title: "Quick calm sessions that unlock your potential.",
    imageSrc: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop",
    color: "blue" as const,
  },
];

export default function FeatureCardsDemo() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="container mx-auto grid max-w-5xl grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <AnimatedFeatureCard
            key={feature.index}
            index={feature.index}
            tag={feature.tag}
            title={feature.title}
            imageSrc={feature.imageSrc}
            color={feature.color}
          />
        ))}
      </div>
    </div>
  );
}
