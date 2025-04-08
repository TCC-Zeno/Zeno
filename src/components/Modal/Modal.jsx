import React, { useEffect } from "react";
import S from "./modal.module.css";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={dropdownVariants}
          className={S.modalOverlay}
        >
          <div className={S.modalBackdrop} onClick={onClose}></div>
          
          <div className={S.modalContainer}>
            <button className={S.modalCloseButton} onClick={onClose}>
              ✕
            </button>
            
            <div className={S.modalContent}>{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}