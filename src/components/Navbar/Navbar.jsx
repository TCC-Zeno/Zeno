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
import Logo from "../../assets/logo/LogoZeno_LogoPretoSFundo.png";

export function Navbar() {

  // const rotaStatus = useSelector(state => state.rotaReducer.rota);  
  const dashboard = "";
  return (
    <nav className={styles.navbar}>
      <div>
        <img className={styles.logo} src={Logo} alt="" />
        </div>
        <div>
        <ul>
          <Link className={`${styles.nav_link} ${dashboard === "/dashboard" ? styles.active : styles.nav_link}`} to="/dashboard" >
            <BsFillHouseFill className={styles.icons} />
            <span>Inicio</span>
          </Link>
          <Link className={styles.nav_link} to="/stock">
            <GiCardboardBoxClosed className={styles.icons} />
            <span>Estoque</span>
          </Link>
          <Link className={styles.nav_link} to="/finance">
            <TbCoinFilled className={styles.icons} />
            <span>Fluxo de caixa</span>
          </Link>
          <Link className={styles.nav_link} to="/calendar">
            <FaCalendarAlt className={styles.icons} />
            <span>Agenda</span>
          </Link>
          <Link className={styles.nav_link} to="/list">
            < PiListChecksFill className={styles.icons} />
            <span>Organizador</span>
          </Link>
          <Link className={styles.nav_link} to="/report">
            <HiDocumentReport className={styles.icons} />
            <span>Relatório</span>
          </Link>
          <Link className={styles.nav_link} to="/service">
            <MdHomeRepairService className={styles.icons} />
            <span>Serviços</span>
          </Link>
          <Link className={styles.nav_link} to="/settings">
            <FaGear className={styles.icons} />
            <span>Personalizar</span>
          </Link>
        </ul>
      </div>
      <div className={styles.help}>
          <Link className={styles.nav_link} to="/support">
            <BiSupport className={styles.icons} />
            <span>Ajuda</span>
          </Link>
      </div>
    </nav>
  );
}
