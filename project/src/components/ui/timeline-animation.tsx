import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TimelineContentProps {
  as?: keyof JSX.IntrinsicElements;
  animationNum: number;
  timelineRef: React.RefObject<HTMLDivElement | null>;
  customVariants?: Record<string, unknown>;
  className?: string;
  children?: React.ReactNode;
}

export function TimelineContent({
  as = "div",
  animationNum,
  timelineRef,
  customVariants,
  className,
  children,
}: TimelineContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rootEl = timelineRef?.current ?? undefined;
  const isInView = useInView(ref, { root: rootEl ? ({ current: rootEl } as React.RefObject<Element | null>) : undefined, once: true, margin: "-10% 0px -10% 0px" });

  const defaultVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 20,
      opacity: 0,
    },
  };

  const variants = (customVariants || defaultVariants) as Record<string, unknown>;

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum / 2}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      variants={variants as any}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
