// components/MiddleBox.js
'use client';
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from 'react';

interface MiddleBoxProps {
  middleBoxProps: {
    bg: string;
    colour: string;
    transitionDuration: string;
    width: string;
  };
  currentPhase: number;
  opacityForTextOne: number;
  opacityForTextTwo: number;
}

const MiddleBox = React.forwardRef<HTMLDivElement, MiddleBoxProps>(({ middleBoxProps, currentPhase, opacityForTextOne, opacityForTextTwo }, ref) => {

  const centerControls = useAnimation();
  const logoControls = useAnimation();
  const middleLogoControls = useAnimation();
  const textOneOpacityControls = useAnimation();

  useEffect(() => {
      const animate = async () => {
        await centerControls.start({
          pathLength: 1,
          pathOffset: 0,
          transition: {
            duration: 1.5,
            ease: [1, 0.8, 0.9, 0.9],
          },
        });
        
        await centerControls.start({
            opacity: 0,
            transition: {
              duration: 0
            }
            });

        await logoControls.start({
          opacity: 1,
          transition: {duration:0}
        })
        await logoControls.start({
          scale:0.8,
          transition : {
            duration: 0.1,
          }
        })
        await logoControls.start({
          scale:0.3,
          fill: "#2563eb",
          transition : {
            duration: 0.5,
          }
        })
  
        await logoControls.start({
          scale:0.145,
          y: `calc(min(39vh, 39vw))`,
          x: `calc(min(39vh, 39vw)*-1)`,
          transition : {
            duration: 0.5,
          }
        })
        await logoControls.start({
      
          opacity: 0,
          transition: { duration: 0 }
        })

        await middleLogoControls.start({
          opacity: 1,
          transition: {duration : 0}
        })
       
      };
  
      animate();
    }, [centerControls, middleLogoControls]);

    useEffect(()=> {
      const animate = async () => {
      await textOneOpacityControls.start({
        opacity:opacityForTextOne,
        transition: { duration: 0, ease: "easeInOut" }
      });
    }
    animate();
    }, [opacityForTextOne]);

    useEffect(()=> {
      const animate = async () => {
      await textOneOpacityControls.start({
        opacity:0,
        transition: { duration: 1.5, ease: "easeInOut" }
      });
    }
      animate();
    },[textOneOpacityControls]);

    useEffect(()=> {
       textOneOpacityControls.start({
        opacity:1,
        transition: { delay: 1.5, duration: 0.3, ease: "easeInOut" }
      });
    },[textOneOpacityControls])


  return (
    <section className="middle-wrap">
      <motion.div
        ref={ref}
        className={`middle phase-${currentPhase}`}
        style={{
          background: middleBoxProps.bg,
          color: middleBoxProps.colour,
          transitionProperty: "background, color, width, height",
          transitionDuration: middleBoxProps.transitionDuration,
          height: middleBoxProps.width,
          width: middleBoxProps.width,
        }}
      >
        <div style={{
          height: middleBoxProps.width,
          width: middleBoxProps.width,
        }} className={`absolute flex items-center justify-center`}>
        
        <motion.svg
          viewBox="0 0 46 42"
          className="w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[360px]"
          fill="none"
          stroke="#2563eb"
          strokeWidth={0.15}
        >
          {[
            "M11.4995 2L0 9.31249L11.4995 16.625L23.001 9.31249L34.5005 16.625L46 9.31249L34.5005 2L23.001 9.31249L11.4995 2Z",
            "M11.4995 31.2501L0 23.9376L11.4995 16.625L23.001 23.9376L11.4995 31.2501Z",
            "M23.001 23.9376L34.5005 16.625L46 23.9376L34.5005 31.2501L23.001 23.9376Z",
            "M23.001 41L11.4995 33.6875L23.001 26.375L34.5005 33.6875L23.001 41Z",
          ].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              initial={{ pathLength: 0, pathOffset: 1, fill: 'none' }}
              animate={centerControls}
            />
          ))}
        </motion.svg>

        <motion.svg
        viewBox="120 120 1462 1462"
        className="w-[440px] h-[440px] sm:w-[600px] sm:h-[600px] md:w-[720px] md:h-[720px] absolute z-51 "
        fill = "none"
        stroke = "#2563eb"
        strokeWidth={2.8}
        initial={{opacity:0}} 
        animate={logoControls}>
        <motion.path
          d="M663.477 555.977L850.079 673.172L663.477 790.366L476.906 673.172L663.477 555.977ZM663.477 791.542L850.079 908.739L663.477 1025.93L476.906 908.739L663.477 791.542ZM851.951 908.739L1038.52 791.542L1225.09 908.739L1038.52 1025.93L851.951 908.739ZM1225.09 673.172L1038.52 790.366L851.951 673.172L1038.52 555.977L1225.09 673.172ZM1037.59 1065.78L851.015 1182.97L664.413 1065.78L851.015 948.585L1037.59 1065.78Z"
        />
      </motion.svg>
  
        </div>
        <div className="middle-text-cont">
          <motion.p
            className="middle-text-one"
            style={{
              opacity: opacityForTextOne,
              transitionProperty: "opacity",
              transitionDuration: "0.3s"
            }}
            initial={{ opacity: 0 }}
            animate={textOneOpacityControls}
          >
            At Dropbox, our Brand Guidelines help us infuse everything we make with identity.
          </motion.p>
          <motion.p
            className="middle-text-two"
            style={{
              opacity: opacityForTextTwo,
              transitionProperty: "opacity",
              transitionDuration: "0.3s"
            }}
          >
            From icons to illustration, logos to language, this collection is the foundation for how Dropbox looks, feels, and sounds like Dropbox.
          </motion.p>
          <div className="middle-logo">
            <motion.svg
              width="60px"
              height="60px"
              viewBox="0 -19 256 256"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
              initial={{ opacity: 0 }}
              animate={middleLogoControls}>
              <g fill={middleBoxProps.colour}>
                <polygon points="63.9945638 0 0 40.7712563 63.9945638 81.5425125 128 40.7712563"></polygon>
                <polygon points="192.000442 0 128 40.7750015 192.000442 81.5500031 256.000885 40.7750015"></polygon>
                <polygon points="0 122.321259 63.9945638 163.092516 128 122.321259 63.9945638 81.5500031"></polygon>
                <polygon points="192 81.5500031 128 122.324723 192 163.099442 256 122.324723"></polygon>
                <polygon points="64 176.771256 128.005436 217.542513 192 176.771256 128.005436 136"></polygon>
              </g>
            </motion.svg>
          </div>
        </div>
      </motion.div>
    </section>
  );
});

MiddleBox.displayName = 'MiddleBox';
export default MiddleBox;
