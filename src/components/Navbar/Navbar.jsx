import React from "react";
import styles from "./navbar.module.css";
import { BsFillHouseFill } from "react-icons/bs";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { BsCoin } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { BsListCheck } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { GoGear } from "react-icons/go";
import { BiSupport } from "react-icons/bi";
// import { Logo } from "../../assets/logo/LogoZeno_LogoPretoSFundo.png";

export function Navbar() {
  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.nav_brand}>
          <img className={styles.logo} src="" alt="" />
          <ul className={styles.ul}>
            <li>
              <a className={styles.icons}>
                <BsFillHouseFill />
              </a>
              <a href="/">Inicio</a>
            </li>
            <li>
              <a className={styles.icons}>
                <GiCardboardBoxClosed />
              </a>
              <a href="/">Estoque</a>
            </li>
            <li>
              <a className={styles.icons}>
                <BsCoin />
              </a>
              <a href="/">Fluxo de caixa</a>
            </li>
            <li>
              <a className={styles.icons}>
                <FaCalendarAlt />
              </a>
              <a href="/">Agenda</a>
            </li>
            <li>
              <a className={styles.icons}>
                <BsListCheck />
              </a>
              <a href="/">Organizador</a>
            </li>
            <li>
              <a className={styles.icons}>
                <TbReportAnalytics />
              </a>
              <a href="/">Relatório</a>
            </li>
            <li>
              <a className={styles.icons}>
                <MdOutlineHomeRepairService />
              </a>
              <a href="/">Serviços</a>
            </li>
            <li>
              <a className={styles.icons}>
                <GoGear />
              </a>
              <a href="/">Personalizar</a>
            </li>
            <li className={styles.help}>
              <a className={styles.icons}>
                <BiSupport />
              </a>
              <a href="/">Ajuda</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
