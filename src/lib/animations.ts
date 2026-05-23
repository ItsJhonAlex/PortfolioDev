import { type Variants, useReducedMotion } from "framer-motion";

type FadeAxis = "x" | "y";

type FadeOptions = {
  axis?: FadeAxis;
  offset?: number;
};

export function useFadeVariants({
  axis = "y",
  offset = 12,
}: FadeOptions = {}): Variants {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  }

  return {
    hidden: { opacity: 0, [axis]: offset },
    visible: { opacity: 1, [axis]: 0 },
  };
}
