// components/ViewportLines.js
'use client';
import { AnimationDefinition, motion, TargetAndTransition, useAnimation, VariantLabels } from 'framer-motion';
import { useEffect } from 'react';

const LINE_THICKNESS = 1;
const LINE_COLOR = '#bfdbfe';
interface Rect {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

interface ViewportLinesProps {
  rect: Rect;
  viewportWidth: number;
  viewportHeight: number;
  keyPrefix: string;
  animateProps1: AnimationDefinition; 
  animateProps2: AnimationDefinition;
  initialProps: VariantLabels | TargetAndTransition | undefined;
  opacity: 1|0; 
  scrollValue ?: number;
}

const ViewportLines= ({ rect, viewportWidth, viewportHeight, keyPrefix, animateProps1, animateProps2, initialProps, opacity, scrollValue }: ViewportLinesProps) => {
 

  const borderControls = useAnimation();

  useEffect(()=>{
    const animate = async() => {
      await borderControls.start({
        opacity: opacity,
        transition: {
          duration: 0
        }
      })
    }
    animate();
  },[opacity, scrollValue])

  useEffect(() => {
      const animate = async () => {
        await borderControls.start(animateProps1);
        await borderControls.start(animateProps2);
      };
  
      animate();
    }, [borderControls]);

  return (
    <>
      <motion.div
        key={`${keyPrefix}-top`}
        className="viewport-line" 
        style={{
          position: 'fixed',
          width: `${viewportWidth}px`,
          height: `${LINE_THICKNESS}px`,
          top: `${rect.top - 1}px`,
          left: `0px`,
          backgroundColor: LINE_COLOR,
          zIndex: 10,
          transformOrigin: "left",
        }}
        initial={initialProps}
        animate={borderControls} /><motion.div
          key={`${keyPrefix}-bottom`}
          className="viewport-line"
          style={{
            position: 'fixed',
            width: `${viewportWidth}px`,
            height: `${LINE_THICKNESS}px`,
            top: `${rect.bottom - LINE_THICKNESS + 1}px`,
            left: `0px`,
            backgroundColor: LINE_COLOR,
            zIndex: 10,
          }}
          initial={initialProps}
          animate={borderControls} /><motion.div
          key={`${keyPrefix}-left`}
          className="viewport-line"
          style={{
            position: 'fixed',
            width: `${LINE_THICKNESS}px`,
            height: `${viewportHeight}px`,
            top: `0px`,
            left: `${rect.left - 1}px`,
            backgroundColor: LINE_COLOR,
            zIndex: 10,
          }}
          initial={initialProps}
          animate={borderControls} /><motion.div
          key={`${keyPrefix}-right`}
          className="viewport-line"
          style={{
            position: 'fixed',
            width: `${LINE_THICKNESS}px`,
            height: `${viewportHeight}px`,
            top: `0px`,
            left: `${rect.right - LINE_THICKNESS + 1}px`,
            backgroundColor: LINE_COLOR,
            zIndex: 10,
          }}
          initial={initialProps}
          animate={borderControls} />
    </>
  );
};

export default ViewportLines;