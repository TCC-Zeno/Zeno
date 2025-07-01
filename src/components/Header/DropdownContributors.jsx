import React, { useState, useRef, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import S from "./header.module.css";

export default function DropdownContributors({ isOpen = false, setIsOpen }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [type, setType] = useState("view"); // "view" ou "add"

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

  // Função para fechar o dropdown
  const handleClose = () => {
    setIsOpen(false);
  };

  // Função para quando clicar fora o Dropdown sumir
  useEffect(() => {
    function handleClickOutside(event) {
      // Se clicou no botão de fechar, não fazer nada (deixar o onClick do botão funcionar)
      if (closeButtonRef.current && closeButtonRef.current.contains(event.target)) {
        return;
      }
      
      // Se clicou fora do modal, fechar
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          className={S.dropdownContributors}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={dropdownVariants}
        >
          <div className={S.contributorsContainer}>
            <div className={S.headerContributors}>
              <button
                ref={closeButtonRef}
                className={S.closeButton}
                onClick={handleClose}
                type="button"
              >
                <span className={S.closeIcon}>
                  <FaArrowLeft size={20} />
                </span>
              </button>
              <h1 className={S.title}>Contribuintes</h1>
            </div>
            {type === "view" ? (
              <div className={S.viewContributors}>
                <h1>Contribuintes</h1>
                <p>Lista de contribuintes...</p>
              </div>
            ) : (
              <h1>Adicionar Contribuintes</h1>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}