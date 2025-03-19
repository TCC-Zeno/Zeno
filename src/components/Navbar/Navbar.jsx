import React from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import { BsFillHouseFill } from "react-icons/bs";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { TbCoinFilled } from "react-icons/tb";
import { FaCalendarAlt } from "react-icons/fa";
import { PiListChecksFill } from "react-icons/pi";
import { HiDocumentReport } from "react-icons/hi";
import { MdHomeRepairService } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { TfiMenu } from "react-icons/tfi";
import Logo from "../../assets/logo/LogoZeno_LogoPretoSFundo.png";
import { useSelector } from "react-redux";

export function Navbar() {

  const rotaStatus = useSelector((state) => state.rotaReducer.rota);
  return (
    <nav className={styles.navbar}>
      <TfiMenu className={styles.menu}/>
      <div className={styles.containerLogo}>
        <img className={styles.logo} src={Logo} alt="" />
        </div>
        <div>
        <ul>
          <Link className={`${styles.nav_link} ${rotaStatus == "dashboard" ? styles.active : null}`} to="/dashboard" >
            <BsFillHouseFill className={styles.icons} />
            <span>Inicio</span>
          </Link>
          <Link className={`${styles.nav_link} ${rotaStatus == "stock" ? styles.active : null}`} to="/stock">
            <GiCardboardBoxClosed className={styles.icons}/>
            <span>Estoque</span>
          </Link>
          <Link className={`${styles.nav_link} ${rotaStatus == "finance" ? styles.active : null}`} to="/finance">
            <TbCoinFilled className={styles.icons} />
            <span>Fluxo de caixa</span>
          </Link>
          <Link className={`${styles.nav_link} ${rotaStatus == "calendar" ? styles.active : null}`} to="/calendar">
            <FaCalendarAlt className={styles.icons} />
            <span>Agenda</span>
          </Link>
          <Link className={`${styles.nav_link} ${rotaStatus == "list" ? styles.active : null}`} to="/list">
            < PiListChecksFill className={styles.icons} />
            <span>Organizador</span>
          </Link>
          <Link className={`${styles.nav_link} ${rotaStatus == "report" ? styles.active : null}`} to="/report">
            <HiDocumentReport className={styles.icons} />
            <span>Relatório</span>
          </Link>
          <Link className={`${styles.nav_link} ${rotaStatus == "service" ? styles.active : null}`} to="/service">
            <MdHomeRepairService className={styles.icons} />
            <span>Serviços</span>
          </Link>
          <Link className={`${styles.nav_link} ${rotaStatus == "settings" ? styles.active : null}`} to="/settings">
            <FaGear className={styles.icons} />
            <span>Personalizar</span>
          </Link>
        </ul>
      </div>
      <div className={styles.help}>
          <Link className={`${styles.nav_link} ${rotaStatus == "support" ? styles.active : null}`} to="/support">
            <BiSupport className={styles.icons} />
            <span>Ajuda</span>
          </Link>
      </div>
    </nav>
  );
}
