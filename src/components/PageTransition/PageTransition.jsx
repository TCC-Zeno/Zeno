import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './PageTransition.module.css';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnimationComplete = () => {
    setIsTransitioning(false);
  };

  useEffect(() => {
    setIsTransitioning(true);
  }, [location.pathname]);

  const transitionVariants = {
    initial: {
      clipPath: 'circle(0% at 100% 50%)',
      scale: 1.2
    },
    animate: {
      clipPath: 'circle(150% at 50% 50%)',
      scale: 1,
      transition: {
        clipPath: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        },
        scale: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    },
    exit: {
      clipPath: 'circle(0% at 0% 50%)',
      scale: 1.2,
      transition: {
        clipPath: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        },
        scale: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }
      }
    }
  };

  return (
    <div className={styles.pageTransition}>
      <div className={styles.pageContent}>
        {children}
      </div>
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key={location.pathname}
            className={styles.transitionLayer}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={transitionVariants}
            onAnimationComplete={handleAnimationComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;