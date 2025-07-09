import React, { useState, useRef, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import S from "./header.module.css";
import ContributorsCardView from "../ContributorsCardView/ContributorsCardView";
import { useForm } from "react-hook-form";

export default function DropdownContributors({ isOpen = false, setIsOpen }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [type, setType] = useState("view"); // view ou add
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  const contributors = [
    { id: 1, name: "Nicollas Reias", email: "goias@exemplo.com" },
    { id: 2, name: "Jose Marguarido", email: "jose@exemplo.com" },
    { id: 3, name: "Alice da Silva", email: "alice@exemplo.com" },
    { id: 3, name: "Alice da Silva", email: "alice@exemplo.com" },
    { id: 3, name: "Alice da Silva", email: "alice@exemplo.com" },
    { id: 3, name: "Alice da Silva", email: "alice@exemplo.com" },
    { id: 1, name: "Nicollas Reias", email: "goias@exemplo.com" },
    { id: 2, name: "Jose Marguarido", email: "jose@exemplo.com" },
    { id: 3, name: "Alice da Silva", email: "alice@exemplo.com" },
    { id: 3, name: "Alice da Silva", email: "alice@exemplo.com" },
    { id: 3, name: "Alice da Silva", email: "alice@exemplo.com" },
    { id: 3, name: "Alice da Silva", email: "alice@exemplo.com" },
  ];

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
    setType("view");
  };

  // Função para quando clicar fora o Dropdown sumir
  useEffect(() => {
    function handleClickOutside(event) {
      // Se clicou no botão de fechar, não fazer nada (deixar o onClick do botão funcionar)
      if (
        closeButtonRef.current &&
        closeButtonRef.current.contains(event.target)
      ) {
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
              <>
                <div className={S.viewContributors}>
                  {contributors.map((contributor) => (
                    <ContributorsCardView
                      key={contributor.id}
                      id={contributor.id}
                      name={contributor.name}
                      email={contributor.email}
                    />
                  ))}
                </div>
                <div className={S.addButtonContainer}>
                  <button
                    className={S.addButton}
                    onClick={() => setType("add")}
                    id="btn-go-add-contributor"
                    type="button"
                  >
                    Adicionar
                  </button>
                </div>
              </>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={S.addContributorForm}
              >
                <input
                  className={S.input}
                  id="input-name"
                  type="text"
                  placeholder="Nome"
                  {...register("name", { required: true })}
                />
                <input
                  className={S.input}
                  id="input-email"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true, maxLength: 50 })}
                />
                <input
                  className={S.input}
                  id="input-password"
                  type="password"
                  placeholder="Senha"
                  {...register("password", { maxLength: 25 })}
                />
                <input
                  className={S.input}
                  id="input-confirm-password"
                  type="password"
                  placeholder="Confirmar Senha"
                  {...register("confirmPassword", { maxLength: 25 })}
                />
                <div className={S.divider02}></div>
                <div className={S.checkboxsContainer}>
                  <h1 className={S.checkboxTitle}>
                    Perdições do contribuintes
                  </h1>
                  <div className={S.blockRow}>
                    <div className={S.blockWrapper}>
                      <input type="checkbox" className={S.switch} />
                      <span className={S.blockLabel}>Estoque</span>
                    </div>
                    <div className={S.blockWrapper}>
                      <input type="checkbox" className={S.switch} />
                      <span className={S.blockLabel}>Fluxo de caixa</span>
                    </div>
                  </div>
                  <div className={S.blockRow}>
                    <div className={S.blockWrapper}>
                      <input type="checkbox" className={S.switch} />
                      <span className={S.blockLabel}>Agenda</span>
                    </div>
                    <div className={S.blockWrapper}>
                      <input type="checkbox" className={S.switch} />
                      <span className={S.blockLabel}>Organizador</span>
                    </div>
                  </div>
                </div>
                <div className={S.actionsButtons}>
                  <button
                    className={S.cancelBtn}
                    id="btn-cancel-add-contributor"
                    onClick={() => setType("view")}
                    type="button"
                  >
                    Cancelar
                  </button>
                  <input className={S.addBtn} type="submit" id="btn-add-contributor" />
                </div>
              </form>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
