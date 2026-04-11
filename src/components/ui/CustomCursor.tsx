import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isOverText, setIsOverText] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isInteractive = !!target.closest('a, button, [data-cursor="hover"]');
      const isText = !!target.closest('p, span, h1, h2, h3, h4, h5, h6, li, label');
      
      setIsHovered(isInteractive);
      setIsOverText(isText);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: cursorX,
        y: cursorY,
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        translateX: '-50%',
        translateY: '-50%',
        mixBlendMode: 'difference',
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
    >
      <motion.div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid white',
          position: 'absolute',
          backgroundColor: 'transparent',
        }}
        animate={{
          backgroundColor: isOverText ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
          scale: isOverText ? 1.5 : (isHovered ? 1.3 : 1),
          borderWidth: isOverText ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      />

      <motion.div
        style={{
          width: 6,
          height: 6,
          backgroundColor: 'white',
          borderRadius: '50%',
        }}
        animate={{
          opacity: isOverText ? 0 : 1,
        }}
      />
    </motion.div>
  );
}