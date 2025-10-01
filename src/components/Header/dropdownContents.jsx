import { TbLogout, TbAlertHexagon } from "react-icons/tb";
import { LuTriangleAlert, LuCircleAlert, LuCircleHelp } from "react-icons/lu";
import { MdManageAccounts } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import { GrHelpBook } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import S from "./header.module.css";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter, clearFilter } from "../../redux/StockFilter/slice";
import DropdownContributors from "./DropdownContributors";
import { useAuth } from "../../contexts/AuthContext";
import { useSelector } from "react-redux";
import ZenoGIF from "./../../assets/loadingZENO.gif";
import axios from "axios";
import { toast } from "react-toastify";

export function NotificationContent() {
  const [loading, setLoading] = useState(true);
  const [dataArray, setDataArray] = useState([]);
  const profileinfo = useSelector((state) => state.userReducer.userData);

  async function fetchProdutsAlert() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/stock/getAlerts`,
        {
          uuid: profileinfo.uuid,
        }
      );

      if (response.status === 200) {
        console.log(response);

        setDataArray(response.data);
      }
    } catch (err) {
      toast.error("Erro ao selecionar categorias.");
      console.error("Erro ao selecionar categorias:", err);
    }
  }

  useEffect(() => {
    const initializeData = async () => {
      try {
        await fetchProdutsAlert();
      } catch (error) {
        toast.error("Erro ao inicializar dados.");
        console.error("Erro ao inicializar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    if (loading) {
      initializeData();
    }
  }, []);

  return (
    <div className={S.containerNotifications}>
      {loading && (
        <div className={S.containerLoading}>
          <img src={ZenoGIF} alt="Description of GIF" className={S.load} />
        </div>
      )}
      {dataArray.map((product, index) => {
        if (product.alert === "out_stock") {
          return (
            <div key={index} className={S.notification}>
              <div className={S.notificationTitle}>
                <TbAlertHexagon color="red" size="12%" />
                <h4>Produto acabou:</h4>
              </div>
              <p>Compre {product.name}</p>
            </div>
          );
        } else if (product.alert === "restock") {
          return (
            <div key={index} className={S.notification}>
              <div className={S.notificationTitle}>
                <LuTriangleAlert color="orange" size="12%" />
                <h4>Produto acabando:</h4>
              </div>
              <p>Compre mais {product.name}</p>
            </div>
          );
        } else if (product.alert === "low_stock") {
          return (
            <div key={index} className={S.notification}>
              <div className={S.notificationTitle}>
                <LuCircleAlert color="green" size="12%" />
                <h4>Produto para repor:</h4>
              </div>
              <p>Repor {product.name}</p>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export function ProfileContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownContributors, setDropdownContributors] = useState(false);
  const { logout } = useAuth();
  const profileinfo = useSelector((state) => state.userReducer.userData);
  const colorBlindness = useSelector(
    (state) => state.userReducer.colorBlindness
  );
  async function logoutuser() {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className={S.containerProfile}>
        <div className={S.containerUser}>
          <div className={S.userPhoto}>
            <img src={profileinfo.logo} alt="Sua Logo em miniatura" />
          </div>
          <div className={S.userInfo}>
            <h4> {profileinfo.company_name}</h4>
            <p>{profileinfo.email}</p>
          </div>
        </div>
        <div className={S.divider}></div>
        <div className={S.userManeger}>
          <Link className={S.manegerOption} onClick={() => setModalOpen(true)}>
            <MdManageAccounts />
            <span>Conta</span>
          </Link>
          <button
            className={S.manegerOption}
            onClick={() => setDropdownContributors(!dropdownContributors)}
          >
            <IoPeopleSharp />
            <span>Contribuintes</span>
          </button>
          <Link className={S.manegerOption} to="/guide">
            <GrHelpBook />
            <span>Guia</span>
          </Link>
          <Link className={S.manegerOption} to="/support">
            <LuCircleHelp />
            <span>Ajuda</span>
          </Link>
        </div>
        <div className={S.divider}></div>
        <button className={S.configureSignature}>Configurar assinatura</button>
        <div className={S.divider}></div>
        <button className={S.manegerOption} onClick={logoutuser}>
          <TbLogout />
          <span>Sair</span>
        </button>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <div className={S.modalContent}>
            <h1>Conta</h1>
            <div className={S.modalContainerInfo}>
              <p>Nome da empresa:</p>
              <input type="text" disabled value={profileinfo.company_name} />
            </div>
            <div className={S.modalContainerInfo}>
              <p>Email da empresa:</p>
              <input type="email" disabled value={profileinfo.email} />
            </div>
            <div className={S.modalContainerInfo}>
              <p>Opção de acessibilidade:</p>
              <input type="text" disabled value={colorBlindness} />
            </div>
            <div className={S.modalContainerInfo}>
              <p>Logo da empresa:</p>
              <div className={S.modalContainerImg}>
                <img src={profileinfo.logo} alt="Sua Logo em miniatura" />
              </div>
            </div>
            <div className={S.modalButtons}>
              <button
                className={S.modalButtonClose}
                onClick={() => setModalOpen(false)}
              >
                Fechar
              </button>
              <Link className={S.modalButtonEdit} to="/settings">
                Editar
              </Link>
            </div>
          </div>
        </Modal>
      </div>
      <DropdownContributors
        isOpen={dropdownContributors}
        setIsOpen={setDropdownContributors}
      />
    </>
  );
}

export function FilterContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataCategory, setDataCategory] = useState({});
  const profileinfo = useSelector((state) => state.userReducer.userData);
  const dispatch = useDispatch();

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

  function getUniqueCategories(products) {
    return [...new Set(products.map((item) => item.product_category))];
  }

  async function fetchCategorysFilter() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/stock/readCategorysOfProducts`,
        {
          uuid: profileinfo.uuid,
        }
      );

      if (response.status === 200) {
        console.log(getUniqueCategories(response.data));

        setDataCategory(getUniqueCategories(response.data));
      }
    } catch (err) {
      console.error("Erro ao selecionar categorias:", err);
    }
  }
  useEffect(() => {
    fetchCategorysFilter();
  }, []);

  return (
    <>
      <div className={S.containerFilters}>
        <div className={S.filterOptions}>
          <button
            className={S.filterButton}
            onClick={() => dispatch(setFilter("default"))}
          >
            Produtos em estoque
          </button>
        </div>
        <div className={S.filterOptions}>
          <button
            className={S.filterButton}
            onClick={() => dispatch(setFilter("restock"))}
          >
            Produtos para repor
          </button>
        </div>
        <div className={S.filterOptions}>
          <button
            className={S.filterButton}
            onClick={() => dispatch(setFilter("low_stock"))}
          >
            Produtos para comprar
          </button>
        </div>
        <div className={S.filterOptions}>
          <button
            className={S.filterButton1}
            onClick={() => setModalOpen(!modalOpen)}
          >
            Categoria <IoIosArrowDown />
          </button>
        </div>
      </div>

      {modalOpen && (
        <AnimatePresence>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
          >
            {dataCategory.map((categoty) => (
              <div className={S.filterOption2} key={categoty}>
                <button
                  className={S.filterButton2}
                  onClick={() => dispatch(setFilter(categoty))}
                >
                  {categoty}
                </button>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
      <div className={S.filterOptions}>
        <button
          className={S.filterButtonClear}
          onClick={() => dispatch(clearFilter())}
        >
          Limpar filtro
        </button>
      </div>
    </>
  );
}
