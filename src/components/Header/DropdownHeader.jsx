import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import S from "./header.module.css";

export default function DropdownHeader({ icon, modalContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const iconRef = useRef(null);

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

  // Função para quando clicar fora o Dropdown sumir
  useEffect(() => {
    function handleClickOutside(event) {
      if (iconRef.current && iconRef.current.contains(event.target)) {
        return;
      }

      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, iconRef]);

  return (
    <div className={S.iconContainer}>
      <div
        ref={iconRef}
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
      >
        {icon}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={modalRef}
            className={S.dropdown}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
          >
            {modalContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
