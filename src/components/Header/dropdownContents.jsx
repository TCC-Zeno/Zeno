import { TbLogout, TbAlertHexagon } from "react-icons/tb";
import { LuTriangleAlert, LuCircleAlert, LuCircleHelp } from "react-icons/lu";
import { MdManageAccounts } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { GrHelpBook } from "react-icons/gr";

import Logo from "./../../assets/logo/LogoZeno_LogoBrancoSFundo.png";
import S from "./header.module.css";
import { Link } from "react-router-dom";
import { BsFillHouseFill } from "react-icons/bs";
// conteudos possiveis
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
    </div>
  );
}

export function ProfileContent() {
  return (
    <div className={S.containerProfile}>
      <div className={S.containerUser}>
        <div className={S.userPhoto}>
          <img src={Logo} alt="Sua Logo em miniatura" />
        </div>
        <div className={S.userInfo}>
          <h4>Nome da empresa</h4>
          <p>empresa@gmail.com</p>
        </div>
      </div>
      <div className={S.divider}></div>
      <div className={S.userManeger}>
        <Link className={S.manegerOption} to="/account">
          <MdManageAccounts />
          <span>Conta</span>
        </Link>
        <Link className={S.manegerOption} to="/settings">
          <IoSettingsSharp />
          <span>Personalizar</span>
        </Link>
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
      <button className={S.manegerOption}>
        <TbLogout />
        <span>Sair</span>
      </button>
    </div>
  );
}
