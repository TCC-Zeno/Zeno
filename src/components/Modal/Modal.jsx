import React, { useEffect, useCallback } from "react";
import S from "./modal.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { stock } from "../../redux/Route/slice";

export default function Modal({ isOpen, onClose, children, guide = false, stock = false }) {
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
          <div className={S.modalBackdrop} />

          <motion.div
            variants={dropdownVariants}
            className={S.modalContainer}
            style={
              guide
                ? {
                    width: "50vw",
                    maxWidth: "100%",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    padding: 0,
                    overflowY: "auto",
                  }
                : stock
                ? {
                  width: "auto",
                  maxWidth: "100%"
                }
                : undefined

            }
          >
            <button
              className={S.modalCloseButton}
              onClick={onClose}
              style={
                guide
                  ? {
                      color: "white",
                    }
                  : undefined
              }
              aria-label="Close modal"
            >
              ✕
            </button>

            <div
              className={S.modalContent}
              style={
                guide
                  ? {
                      width: "50vw",
                    }
                  : stock 
                  ? {
                  width: "auto",
                }
                : undefined
              }
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
