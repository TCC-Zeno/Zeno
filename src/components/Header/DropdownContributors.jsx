import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import S from "./header.module.css";
import ContributorsCardView from "../ContributorsCardView/ContributorsCardView";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import Modal from "../Modal/Modal";

export default function DropdownContributors({ isOpen = false, setIsOpen }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [type, setType] = useState("view");
  const profileinfo = useSelector((state) => state.userReducer.userData);
  const [contributors, setContributors] = useState([]);
  const [editData, setEditData] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [contributorToDelete, setContributorToDelete] = useState(null);

  const [features, setFeatures] = useState({
    service: editData?.features?.service ?? false,
    stock: editData?.features?.stock ?? false,
    finance: editData?.features?.finance ?? false,
    calendar: editData?.features?.calendar ?? false,
    task: editData?.features?.task ?? false,
  });

  const handleFeatureChange = async (e) => {
    const { name, checked } = e.target;
    setFeatures((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  const { register, handleSubmit, reset: addReset } = useForm();
  const {
    register: editRegister,
    handleSubmit: editHandleSubmit,
    reset: editReset,
  } = useForm();

  const editSubmit = async (data) => {
    try {
      const resposta = await axios.post(
        `${import.meta.env.VITE_API_URL}/employee/edit`,
        {
          id: editData.id,
          name: data.name,
          email: data.email,
          password: data.password,
          features: features,
        }
      );
      if (resposta.status === 200) {
        fetchContributors();
        setType("view");
        setEditData(null);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao excluir evento");
      console.error(err);
    }
  };

  const onSubmit = async (data) => {
    try {
      const resposta = await axios.post(
        `${import.meta.env.VITE_API_URL}/employee/signup`,
        {
          owner_uuid: profileinfo.uuid,
          cnpj: profileinfo.cnpj,
          company_name: profileinfo.company_name,
          name: data.name,
          color: profileinfo.color,
          email: data.email,
          password: data.password,
          features: features,
          logo: profileinfo.logo,
        }
      );

      if (resposta.status === 201) {
        fetchContributors();
        setType("view");
        addReset({ name: "", email: "", password: "", confirmPassword: "" });
      }
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao excluir evento");
      console.error(err);
    }
  };

  const fetchContributors = useCallback(async () => {
    try {
      const resposta = await axios.post(
        `${import.meta.env.VITE_API_URL}/employee/fetchContributors`,
        {
          cnpj: profileinfo.cnpj,
        }
      );
      setContributors(resposta.data);
    } catch (error) {
      console.error("Erro ao listar funcionários:", error);
      return [];
    }
  }, [profileinfo.cnpj]);

  useEffect(() => {
    fetchContributors();
  }, [fetchContributors, isOpen]);
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
    resetFeaturesToDefault();
    setIsOpen(false);
    setEditData(null);
    if (typeof editReset === "function")
      editReset({ name: "", email: "", password: "" });
    if (typeof addReset === "function")
      addReset({ name: "", email: "", password: "", confirmPassword: "" });
    setType("view");
  };

  const resetFeaturesToDefault = () => {
    setFeatures({
      service: false,
      stock: false,
      finance: false,
      calendar: false,
      task: false,
    });
  };

  // Função para quando clicar fora o Dropdown sumir
  useEffect(() => {
    function handleClickOutside(event) {
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

  function handleEditContributor(data) {
    // ensure the react-hook-form edit form is populated immediately
    if (typeof editReset === "function") {
      editReset({
        name: data.name || "",
        email: data.email || "",
        password: "",
      });
    }
    setEditData(data);
    setFeatures(data.features || {});
    setType("edit");
  }

  // Quando editData mudar, popular os campos do form de edição
  useEffect(() => {
    if (typeof editReset === "function") {
      editReset({
        name: editData?.name || "",
        email: editData?.email || "",
        password: "",
      });
    }
  }, [editData, editReset]);

  const openDeleteModal = (contributorId) => {
    setContributorToDelete(contributorId);
    setModalDelete(true);
  };

  const deleteContributor = async () => {
    try {
      const resposta = await axios.post(
        `${import.meta.env.VITE_API_URL}/employee/delete`,
        {
          id: contributorToDelete,
        }
      );
      if (resposta.status === 200) {
        fetchContributors();
        setModalDelete(false);
        setContributorToDelete(null);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao excluir contribuidor");
      console.error(err);
    }
  };

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
              <h1 className={S.title}>Contribuinte</h1>
            </div>

            {type === "view" ? (
              <>
                <div className={S.viewContributors}>
                  {contributors.map((c) => (
                    <ContributorsCardView
                      key={c.id}
                      id={c.id}
                      name={c.name}
                      email={c.email}
                      features={c.features}
                      onEdit={handleEditContributor}
                      onDelete={() => openDeleteModal(c.id)}
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
            ) : type === "add" ? (
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
                    Permissões do contribuinte
                  </h1>
                  <div className={S.blockRow}>
                    <div className={S.blockWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        name="stock"
                        checked={features.stock}
                        onChange={handleFeatureChange}
                      />
                      <span className={S.blockLabel}>Estoque</span>
                    </div>
                    <div className={S.blockWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        name="finance"
                        checked={features.finance}
                        onChange={handleFeatureChange}
                      />
                      <span className={S.blockLabel}>Fluxo de caixa</span>
                    </div>
                  </div>
                  <div className={S.blockRow}>
                    <div className={S.blockWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        name="calendar"
                        checked={features.calendar}
                        onChange={handleFeatureChange}
                      />
                      <span className={S.blockLabel}>Agenda</span>
                    </div>
                    <div className={S.blockWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        name="task"
                        checked={features.task}
                        onChange={handleFeatureChange}
                      />
                      <span className={S.blockLabel}>Organizador</span>
                    </div>
                    <div className={S.blockWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        name="service"
                        checked={features.service}
                        onChange={handleFeatureChange}
                      />
                      <span className={S.blockLabel}>Serviços</span>
                    </div>
                  </div>
                </div>
                <div className={S.actionsButtons}>
                  <button
                    className={S.cancelBtn}
                    id="btn-cancel-add-contributor"
                    onClick={() => {
                      resetFeaturesToDefault();
                      setEditData(null);
                      if (typeof editReset === "function")
                        editReset({ name: "", email: "", password: "" });
                      setType("view");
                    }}
                    type="button"
                  >
                    Cancelar
                  </button>
                  <input
                    className={S.addBtn}
                    type="submit"
                    id="btn-add-contributor"
                  />
                </div>
              </form>
            ) : (
              <form
                onSubmit={editHandleSubmit(editSubmit)}
                className={S.addContributorForm}
              >
                <input
                  className={S.input}
                  id="input-name"
                  type="text"
                  placeholder="Nome"
                  {...editRegister("name", { required: true })}
                  defaultValue={editData?.name || ""}
                />
                <input
                  className={S.input}
                  id="input-email"
                  type="email"
                  placeholder="Email"
                  {...editRegister("email", { required: true, maxLength: 50 })}
                  defaultValue={editData?.email || ""}
                />
                <input
                  className={S.input}
                  id="input-password"
                  type="password"
                  placeholder="Senha"
                  {...editRegister("password", { maxLength: 25 })}
                  defaultValue={editData?.password || ""}
                />
                <div className={S.divider02}></div>
                <div className={S.checkboxsContainer}>
                  <h1 className={S.checkboxTitle}>
                    Permissões do contribuinte
                  </h1>
                  <div className={S.blockRow}>
                    <div className={S.blockWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        name="stock"
                        checked={features.stock}
                        onChange={handleFeatureChange}
                      />
                      <span className={S.blockLabel}>Estoque</span>
                    </div>
                    <div className={S.blockWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        name="finance"
                        checked={features.finance}
                        onChange={handleFeatureChange}
                      />
                      <span className={S.blockLabel}>Fluxo de caixa</span>
                    </div>
                  </div>
                  <div className={S.blockRow}>
                    <div className={S.blockWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        name="calendar"
                        checked={features.calendar}
                        onChange={handleFeatureChange}
                      />
                      <span className={S.blockLabel}>Agenda</span>
                    </div>
                    <div className={S.blockWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        name="task"
                        checked={features.task}
                        onChange={handleFeatureChange}
                      />
                      <span className={S.blockLabel}>Organizador</span>
                    </div>
                    <div className={S.blockWrapper}>
                      <input
                        type="checkbox"
                        className={S.switch}
                        name="service"
                        checked={features.service}
                        onChange={handleFeatureChange}
                      />
                      <span className={S.blockLabel}>Serviços</span>
                    </div>
                  </div>
                </div>
                <div className={S.actionsButtons}>
                  <button
                    className={S.cancelBtn}
                    id="btn-cancel-add-contributor"
                    onClick={() => {
                      resetFeaturesToDefault();
                      setType("view");
                    }}
                    type="button"
                  >
                    Cancelar
                  </button>
                  <input
                    className={S.addBtn}
                    type="submit"
                    id="btn-add-contributor"
                  />
                </div>
              </form>
            )}
          </div>
        </motion.div>
      )}
      <Modal isOpen={modalDelete} onClose={() => setModalDelete(false)}>
        <div className={S.modalDelete}>
          <h1>Tem certeza que deseja excluir o colaborador?</h1>
          <div className={S.actionsButtons}>
            <button
              className={S.cancelBtn}
              id="btn-cancel-delete-contributor"
              onClick={() => setModalDelete(false)}
              type="button"
            >
              Cancelar
            </button>
            <button
              className={S.deleteBtn}
              id="btn-confirm-delete-contributor"
              onClick={deleteContributor}
              type="button"
            >
              Excluir
            </button>
          </div>
        </div>
      </Modal>
    </AnimatePresence>
  );
}
