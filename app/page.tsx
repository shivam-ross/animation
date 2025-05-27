
'use client';
import { motion, useAnimation, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useState, useRef, useLayoutEffect } from "react";
import debounce from "lodash/debounce";

import { useWindowSize } from "../hooks/useWindowSize"; 
import MiddleBox from "../components/MiddleBox";
import CardBoxesContainer from "../components/CardBoxesContainer";
import ViewportLines from "../components/Viewport";

const SCROLL_DEBOUNCE_MS = 10;
const NUM_CARD_BOXES = 8;

export default function Home() {
  const { width: currentWindowWidth, height: currentWindowHeight } = useWindowSize();
  const [currentPhase, setCurrentPhase] = useState(1);
  const [opacity, setOpacity] = useState <1|0>(1);
  const middleBoxBorder = useAnimation();

  const [middleBoxProps, setMiddleBoxProps] = useState({
    bg: "#fff",
    colour: "#0061fe",
    transitionDuration: "0.8s",
    width: `calc(-2px + min(760px, -64px + min(1000px, 760px)))`
  });


  useEffect(() => {
    const animateInitialBorder = async () => {

      if(!middleBoxRect) {
        return
      }
      await middleBoxBorder.start({
        scaleX: 0,
        scaleY: 0,
        transition: { duration: 0 },
      });

      await middleBoxBorder.start({
        scaleX: 0.9,
        scaleY: 0.9,
        transition: { duration: 1.5, ease: 'easeInOut' },
      });

      await middleBoxBorder.start({
        scaleX: 1,
        scaleY: 1,
        backgroundColor: "#bfdbfe",
        transition: { duration: 1, ease: 'easeInOut' },
      });
    };

    animateInitialBorder(); 

  }, [middleBoxBorder]);

  useEffect(() => {
    if ((currentWindowWidth ?? 0) > 0 && (currentWindowHeight ?? 0) > 0) {
        const newWidth = `calc(-2px + min(760px, -64px + min(${currentWindowWidth}px, ${currentWindowHeight}px)))`;
        if (currentPhase === 1) {
             setMiddleBoxProps(prev => ({ ...prev, width: newWidth }));
        }
    }
  }, [currentWindowWidth, currentWindowHeight, currentPhase]);


  const { scrollYProgress } = useScroll();
  const viewportWidth = currentWindowWidth;
  const viewportHeight = currentWindowHeight;

  const middleBoxRef = useRef<HTMLDivElement>(null);
  const [middleBoxRect, setMiddleBoxRect] = useState({ top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 });

  const updateMiddleBoxLinePosition = useCallback(() => {
    if (middleBoxRef.current) {
      const rect = middleBoxRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setMiddleBoxRect(prevRect => {
            if (prevRect.top !== rect.top || prevRect.left !== rect.left || prevRect.width !== rect.width || prevRect.height !== rect.height) {
                return { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, width: rect.width, height: rect.height };
            }
            return prevRect;
        });
      } else {
        
        setMiddleBoxRect({ top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 });
      }
    }
  }, []); 

  useLayoutEffect(() => {
    updateMiddleBoxLinePosition();
  }, [middleBoxProps.width, viewportWidth, viewportHeight, currentPhase, updateMiddleBoxLinePosition]);

  const cardBoxRefs = useRef(Array(NUM_CARD_BOXES).fill(null));
  const [cardBoxRects, setCardBoxRects] = useState(
    Array(NUM_CARD_BOXES).fill({ top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 })
  );

  const [currentScrollYForCalculations, setCurrentScrollYForCalculations] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setCurrentScrollYForCalculations(latest);
  });

  const updateCardBoxLinePositions = useCallback(() => {
    const newRects = cardBoxRefs.current.map(el => {
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) return {top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, width: rect.width, height: rect.height};
      }
      return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
    });
    setCardBoxRects(prevRects => {
        if (JSON.stringify(newRects) !== JSON.stringify(prevRects)) { 
            return newRects;
        }
        return prevRects;
    });
  }, []);

  useLayoutEffect(() => {
    updateCardBoxLinePositions();
  }, [currentScrollYForCalculations, viewportWidth, viewportHeight, updateCardBoxLinePositions]);

  useEffect(() => {
    if (history.scrollRestoration) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  const phase3StartWidth = Math.max(1, Math.min(500, Math.min(currentWindowHeight || 760, currentWindowWidth || 1000) - 64));
  const phase3EndWidth = Math.max(1, (currentWindowWidth || 1000) > 991 ? 89 : 80);
  const middleBoxPhase3WidthMotionValue = useTransform(scrollYProgress, [0.5, 1], [phase3StartWidth, phase3EndWidth]);

  const [currentMiddleBoxPhase3Width, setCurrentMiddleBoxPhase3Width] = useState(phase3StartWidth);
   useMotionValueEvent(middleBoxPhase3WidthMotionValue, "change", (latest) => {
    setCurrentMiddleBoxPhase3Width(latest);
  });

  const boxTransforms = [
    { x: useTransform(scrollYProgress, [0, 1], [-2000, 0]), y: useTransform(scrollYProgress, [0, 1], [-2000, 0]), name: "Framework" },
    { x: useTransform(scrollYProgress, [0, 1], [-190, 0]), y: useTransform(scrollYProgress, [0, 1], [-1200, 0]), name: "Voice & Tone" },
    { x: useTransform(scrollYProgress, [0, 1], [1200, 0]), y: useTransform(scrollYProgress, [0, 1], [97, 0]), name: "Logo" },
    { x: useTransform(scrollYProgress, [0, 1], [2000, 0]), y: useTransform(scrollYProgress, [0, 1], [-2000, 0]), name: "Typography" },
    { x: useTransform(scrollYProgress, [0, 1], [-2000, 0]), y: useTransform(scrollYProgress, [0, 1], [2000, 0]), name: "Iconography" },
    { x: useTransform(scrollYProgress, [0, 1], [-1200, 0]), y: useTransform(scrollYProgress, [0, 1], [-97, 0]), name: "Colour" },
    { x: useTransform(scrollYProgress, [0, 1], [190, 0]), y: useTransform(scrollYProgress, [0, 1], [1200, 0]), name: "Imagery" },
    { x: useTransform(scrollYProgress, [0, 1], [2000, 0]), y: useTransform(scrollYProgress, [0, 1], [2000, 0]), name: "Motion" },
  ];
  const boxesScale = useTransform(scrollYProgress, [0, 1], [2, 1]);

  const handleScrollChange = useCallback(
    debounce((latestScrollYProgress) => {
      const w = currentWindowWidth;
      const h = currentWindowHeight;
      if (!w || !h) return;

      if (latestScrollYProgress <= 0.12) {
        setMiddleBoxProps({ bg: "#fff", colour: "#0061fe", transitionDuration: "0.4s", width: `calc(-2px + min(760px, -64px + min(${w}px, ${h}px)))` });
        setCurrentPhase(1);
      } else if (latestScrollYProgress <= 0.5) {
        setMiddleBoxProps({ bg: "#0061fe", colour: "#fff", transitionDuration: "0.4s", width: `min(500px, min(${w}px, ${h}px) - 64px)` });
        setCurrentPhase(2);
      } else {
        setMiddleBoxProps({ bg: "#0061fe", colour: "#fff", transitionDuration: "0s", width: `${currentMiddleBoxPhase3Width}px` });
        setCurrentPhase(3);
      }
    }, SCROLL_DEBOUNCE_MS),
    [currentWindowWidth, currentWindowHeight, currentMiddleBoxPhase3Width]
  );

  useMotionValueEvent(scrollYProgress, "change", handleScrollChange);


  useEffect(() => {
    let animationFrameId: number;
    if (middleBoxRef.current && parseFloat(middleBoxProps.transitionDuration) > 0) {
        const durationMs = parseFloat(middleBoxProps.transitionDuration) * 1000;
        let startTime: number | undefined;

        const animateStep = (timestamp: number | undefined) => {
            if (startTime === undefined) {
                startTime = timestamp;
            }
            const elapsed = (timestamp ?? 0) - (startTime ?? 0);

            updateMiddleBoxLinePosition(); 

            if (elapsed < durationMs) {
                animationFrameId = requestAnimationFrame(animateStep);
            } else {
                updateMiddleBoxLinePosition(); 
            }
        };
        animationFrameId = requestAnimationFrame(animateStep);
    }
    return () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    };
}, [middleBoxProps.width, middleBoxProps.transitionDuration, updateMiddleBoxLinePosition]);

  const opacityForTextOne = currentScrollYForCalculations >= 0.5 ? 0 : currentScrollYForCalculations <= 0.12 ? 1 : 0;
  const opacityForTextTwo = currentScrollYForCalculations <= 0.5 && currentScrollYForCalculations >= 0.12 ? 1 : 0;

  useEffect(()=> {
    if(currentScrollYForCalculations > 0.97){
      setOpacity(0);
    } else if (currentScrollYForCalculations <0.97) {
      setOpacity(1);
    }
  },[currentScrollYForCalculations])


  useEffect(()=> {
    const animate = async() => {
      await middleBoxBorder.start({
        opacity: opacity,
        transition: {duration: 0}
      })
    }
    animate();
  },[opacity, currentScrollYForCalculations])


  return (
    <div className="relative"> 
      <main className="main font-sans relative z-20">
        <MiddleBox
          ref={middleBoxRef}
          middleBoxProps={middleBoxProps}
          currentPhase={currentPhase}
          opacityForTextOne={opacityForTextOne}
          opacityForTextTwo={opacityForTextTwo}
        />
        <CardBoxesContainer
          boxTransforms={boxTransforms}
          boxesScale={boxesScale}
          cardBoxRefs={cardBoxRefs}
          scrollYProgressValue={currentScrollYForCalculations}
        />
      </main>

      <motion.div
       key={`top-line`}
       className="viewport-line"
       style={{
        position: 'fixed',
        width: `${viewportWidth}px`,
        height: `1px`,
        top: `${middleBoxRect.top - 1}px`,
        left: `0px`,
        backgroundColor: "#2563eb",
        zIndex: 10,
        transformOrigin: "left",
       }}
       animate={middleBoxBorder}
      />
      <motion.div
       key={`bottom-line`}
       className="viewport-line"
       style={{
        position: 'fixed',
        width: `${viewportWidth}px`,
        height: `1px`,
        top: `${middleBoxRect.bottom}px`,
        left: `0px`,
        backgroundColor: "#2563eb",
        zIndex: 10,
        transformOrigin: "left",
       }}
       animate={middleBoxBorder}
      />
      <motion.div
       key={`left-line`}
       className="viewport-line"
       style={{
        position: 'fixed',
        width: `1px`,
        height: `${viewportHeight}px`,
        top: `0px`,
        left: `${middleBoxRect.left - 1}px`,
        backgroundColor: "#2563eb",
        zIndex: 10,
        transformOrigin: "top",
       }}
       animate={middleBoxBorder}
      />
      <motion.div
       key={`right-line`}
       className="viewport-line"
       style={{
        position: 'fixed',
        width: `1px`,
        height: `${viewportHeight}px`,
        top: `0px`,
        left: `${middleBoxRect.right}px`,
        backgroundColor: "#2563eb",
        zIndex: 10,
        transformOrigin: "top",
       }}
      animate={middleBoxBorder}
      />

      {cardBoxRects.map((rect, index) => (
        <ViewportLines
          opacity={opacity}
          scrollValue={currentScrollYForCalculations}
          key={`card-box-line-${index}`}
          rect={rect}
          viewportWidth={viewportWidth ?? 0}
          viewportHeight={viewportHeight ?? 0}
          keyPrefix={`card-box-${index}`}
          initialProps={{opacity: 0}}
          animateProps1={{}}
          animateProps2={{
            opacity: 1,
            transition: { delay: 1.5, duration: 1, ease: 'easeInOut' },
          }}
        />
      ))}
    </div>
  );
}