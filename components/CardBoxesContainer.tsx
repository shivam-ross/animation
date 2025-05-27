'use client';

import { motion, MotionValue } from "framer-motion";

interface CardBoxTransform {
  y: string | number | MotionValue<number> | MotionValue<string> | undefined;
  x: string | number | MotionValue<number> | MotionValue<string> | undefined;
  name: string;
}

interface CardBoxesContainerProps {
  boxTransforms: CardBoxTransform[];
  cardBoxRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  scrollYProgressValue: number;
  boxesScale: MotionValue<number> | number;
}

const CardBoxesContainer = ({ boxTransforms, boxesScale, cardBoxRefs, scrollYProgressValue }:CardBoxesContainerProps) => {
  return (
    <section className={`cards-cont ${scrollYProgressValue === 1 ? "done" : ""}`}>
      {boxTransforms.map((item, index) => (
        <motion.div
          key={item.name}
          ref={el => {
            if (cardBoxRefs && cardBoxRefs.current) {
              cardBoxRefs.current[index] = el;
            }
          }}
          style={{ x: item.x, y: item.y, scale: boxesScale }}
        >
          {item.name}
        </motion.div>
      ))}
    </section>
  );
};

export default CardBoxesContainer;