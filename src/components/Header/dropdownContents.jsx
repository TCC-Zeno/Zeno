import { TbLogout, TbAlertHexagon } from "react-icons/tb";
import { LuTriangleAlert, LuCircleAlert, LuCircleHelp } from "react-icons/lu";
import { MdManageAccounts } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { IoPeopleSharp } from "react-icons/io5";
import { GrHelpBook } from "react-icons/gr";

import Logo from "./../../assets/logo/LogoZeno_LogoBrancoSFundo.png";
import S from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import { useState } from "react";
import DropdownContributors from "./DropdownContributors";
import axios from "axios";
import { logout } from "../../redux/User/slice";

//import {useSelector} from "react-redux";

//const profileinfo =useSelector ((state) => state.userReducer.userData);

export function NotificationContent() {
  return (
    <div className={S.containerNotifications}>
      <div className={S.notification}>
        <div className={S.notificationTitle}>
          <TbAlertHexagon color="red" size="12%" />
          <h4>Produto acabou:</h4>
        </div>
        <p>Compre Feijão Carioca</p>
      </div>
      <div className={S.notification}>
        <div className={S.notificationTitle}>
          <LuTriangleAlert color="orange" size="12%" />
          <h4>Produto acabando:</h4>
        </div>
        <p>Compre mais Feijão Carioca</p>
      </div>
      <div className={S.notification}>
        <div className={S.notificationTitle}>
          <LuCircleAlert color="green" size="12%" />
          <h4>Produto para repor:</h4>
        </div>
        <p>Repor Feijão Carioca</p>
      </div>
      <div className={S.notification}>
        <div className={S.notificationTitle}>
          <TbAlertHexagon color="red" size="12%" />
          <h4>Produto acabou:</h4>
        </div>
        <p>Compre Feijão Carioca</p>
      </div>
      <div className={S.notification}>
        <div className={S.notificationTitle}>
          <LuTriangleAlert color="orange" size="12%" />
          <h4>Produto acabando:</h4>
        </div>
        <p>Compre mais Feijão Carioca</p>
      </div>
      <div className={S.notification}>
        <div className={S.notificationTitle}>
          <LuCircleAlert color="green" size="12%" />
          <h4>Produto para repor:</h4>
        </div>
        <p>Repor Feijão Carioca</p>
      </div>
      <div className={S.notification}>
        <div className={S.notificationTitle}>
          <TbAlertHexagon color="red" size="12%" />
          <h4>Produto acabou:</h4>
        </div>
        <p>Compre Feijão Carioca</p>
      </div>
      <div className={S.notification}>
        <div className={S.notificationTitle}>
          <LuTriangleAlert color="orange" size="12%" />
          <h4>Produto acabando:</h4>
        </div>
        <p>Compre mais Feijão Carioca</p>
      </div>
      <div className={S.notification}>
        <div className={S.notificationTitle}>
          <LuCircleAlert color="green" size="12%" />
          <h4>Produto para repor:</h4>
        </div>
        <p>Repor Feijão Carioca</p>
      </div>
      <div className={S.notification}>
        <div className={S.notificationTitle}>
          <TbAlertHexagon color="red" size="12%" />
          <h4>Produto acabou:</h4>
        </div>
        <p>Compre Feijão Carioca</p>
      </div>
      <div className={S.notification}>
        <div className={S.notificationTitle}>
          <LuTriangleAlert color="orange" size="12%" />
          <h4>Produto acabando:</h4>
        </div>
        <p>Compre mais Feijão Carioca</p>
      </div>
      <div className={S.notification}>
        <div className={S.notificationTitle}>
          <LuCircleAlert color="green" size="12%" />
          <h4>Produto para repor:</h4>
        </div>
        <p>Repor Feijão Carioca</p>
      </div>
    </div>
  );
}

export function ProfileContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownContributors, setDropdownContributors] = useState(false);
  const [error, setError] = useState({
    user: "",
    password: "",
    server: "",
    status: 200,
  });
  const navigate = useNavigate();

  const logoutuser = async () => {
    try {
      const resposta = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {
          logout: logout,
        }
      );
      if (resposta.status === 201) {
        navigate("/");
      }
      throw "Conexão recusada...";
    } catch (err) {
      console.log(err);
      // Se erro, mostra mensagem
      if (err.status == 401) {
        setError({
          user: err.response.data.error,
          status: err.status,
        });
      } else if (err.status == 409) {
        setError({
          user: err.response.data.error,
          status: err.status,
        });
      } else if (err.status == 400) {
        setError({
          user: err.response.data.error,
          status: err.status,
        });
      } else if (err.status == 409) {
        setError({
          user: err.response.data.error,
          status: err.status,
        });
      } else if (err.status == 400) {
        setError({
          server: err.response.data.error,
          status: err.status,
        });
      } else {
        setError({
          server: err.response?.data?.error || "Erro ao fazer login",
          status: err.status,
        });
      }
    }
  }
  return (
    <>
      <div className={S.containerProfile}>
        <div className={S.containerUser}>
          <div className={S.userPhoto}>
            <img src={Logo} alt="Sua Logo em miniatura" />
          </div>
          <div className={S.userInfo}>
            <h4> nome da empresa</h4>
            <p>Email da empresa</p>
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
        <button className={S.manegerOption} onClick={logoutuser}
        value= {logout}>
          <TbLogout />
          <span>Sair</span>
        </button>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <div className={S.modalContent}>
            <h1>Conta</h1>
            <div className={S.modalContainerInfo}>
              <p>Nome da empresa:</p>
              <input type="text" disabled value="nome da empresa" />
            </div>
            <div className={S.modalContainerInfo}>
              <p>Email da empresa:</p>
              <input type="email" disabled value="empresa@gmail.com" />
            </div>
            <div className={S.modalContainerInfo}>
              <p>Cor tema:</p>
              <input type="text" disabled value="Branco e Azul" />
            </div>
            <div className={S.modalContainerInfo}>
              <p>Opção de acessibilidade:</p>
              <input type="text" disabled value="Padrão" />
            </div>
            <div className={S.modalContainerInfo}>
              <p>Logo da empresa:</p>
              <div className={S.modalContainerImg}>
                <img src={Logo} alt="Sua Logo em miniatura" />
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
  return(
    <>
    <div className={S.containerFilters}>
      <div className={S.filterOptions}>
        <button className={S.filterButton}>Produtos em estoque</button>
      </div>
      <div className={S.filterOptions}>
        <button className={S.filterButton}>Produtos para repor</button>
      </div>
      <div className={S.filterOptions}>
        <button className={S.filterButton}>Produtos para comprar</button>
      </div>
      <div className={S.filterOptions}>
        <button className={S.filterButton}>Categoria</button>
      </div>
    </div>
    </>
  )
}

