import React, { useState, useEffect } from "react";
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
  const profileInfo = useSelector((state) => state.userReducer.userData);
  const employee = useSelector((state) => state.userReducer.employee);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [profileInfo.features]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <div className={styles.menuButton} onClick={toggleMenu}>
        <TfiMenu className={styles.burguerIcon} />
      </div>

      <nav className={`${styles.navbar} ${isMenuOpen ? styles.menuOpen : ""}`}>
        <div className={styles.containerLogo}>
          <img className={styles.logo} src={Logo} alt="ZENO Logo" />
          {isMobile && (
            <button className={styles.closeMenuButton} onClick={toggleMenu}>
              <AiOutlineClose />
            </button>
          )}
        </div>

        <div className={styles.navLinks}>
          <Link
            className={`${styles.nav_link} ${
              rotaStatus === "dashboard" ? styles.active : ""
            }`}
            to="/dashboard"
            onClick={closeMenu}
            id="dashboard"
          >
            <BsFillHouseFill className={styles.icons} />
            <span>Inicio</span>
          </Link>

          {profileInfo.features.stock && (
            <Link
              className={`${styles.nav_link} ${
                rotaStatus === "stock" ? styles.active : ""
              }`}
              to="/stock"
              onClick={closeMenu}
              id="stock"
            >
              <GiCardboardBoxClosed className={styles.icons} />
              <span>Estoque</span>
            </Link>
          )}

          {profileInfo.features.finance && (
            <Link
              className={`${styles.nav_link} ${
                rotaStatus === "finance" ? styles.active : ""
              }`}
              to="/finance"
              onClick={closeMenu}
              id="finance"
            >
              <TbCoinFilled className={styles.icons} />
              <span>Fluxo de caixa</span>
            </Link>
          )}

          {profileInfo.features.calendar && (
            <Link
              className={`${styles.nav_link} ${
                rotaStatus === "calendar" ? styles.active : ""
              }`}
              to="/calendar"
              onClick={closeMenu}
              id="calendar"
            >
              <FaCalendarAlt className={styles.icons} />
              <span>Agenda</span>
            </Link>
          )}

          {profileInfo.features.task && (
            <Link
              className={`${styles.nav_link} ${
                rotaStatus === "task" ? styles.active : ""
              }`}
              to="/tasks"
              onClick={closeMenu}
              id="tasks"
            >
              <PiListChecksFill className={styles.icons} />
              <span>Tarefas</span>
            </Link>
          )}

          {profileInfo.features.stock && (
            <Link
              className={`${styles.nav_link} ${
                rotaStatus === "report" ? styles.active : ""
              }`}
              to="/report"
              onClick={closeMenu}
              id="report"
            >
              <HiDocumentReport className={styles.icons} />
              <span>Relatório</span>
            </Link>
          )}

          {profileInfo.features.service && (
            <Link
              className={`${styles.nav_link} ${
                rotaStatus === "service" ? styles.active : ""
              }`}
              to="/service"
              onClick={closeMenu}
              id="service"
            >
              <MdHomeRepairService className={styles.icons} />
              <span>Serviços</span>
            </Link>
          )}

          {!employee && (
            <Link
              className={`${styles.nav_link} ${
                rotaStatus === "settings" ? styles.active : ""
              }`}
              to="/settings"
              onClick={closeMenu}
              id="settings"
            >
              <FaGear className={styles.icons} />
              <span>Personalizar</span>
            </Link>
          )}
        </div>

        <div className={styles.help}>
          <Link
            className={`${styles.help_link} ${
              rotaStatus === "support" ? styles.active : ""
            }`}
            to="/support"
            onClick={closeMenu}
            id="support"
          >
            <BiSupport className={styles.icons} />
            <span>Ajuda</span>
          </Link>
        </div>
      </nav>

      {isMobile && isMenuOpen && (
        <div className={styles.overlay} onClick={toggleMenu}></div>
      )}
    </>
  );
}
