import React from "react";
import style from "./footer.module.css";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { VscGithubAlt } from "react-icons/vsc";
import Logo from "../../assets/logo/LogoZeno_LogoPretoSFundo.png";

export function Footer() {
  return (
    <footer>
      <div className={style.container}>
        <div className={style.footer}>
          <div className={style.containerLogo}>
            <img className={style.img} src={Logo} alt="Zeno logo" />
          </div>
          <div className={style.conteudo}>
            <a className={style.links} href="terms">
              Termos de Serviço
            </a>
            <a className={style.links} href="about">
              Sobre Nós
            </a>
          </div>
          <div className={style.icons}>
            <a href="https://facebook.com">
              <FaFacebookF className={style.a} />
            </a>
            <a href="https://instagram.com">
              <FaInstagram className={style.a} />
            </a>
            <a href="https://www.youtube.com/@ZenoEtec">
              <FaYoutube className={style.a} />
            </a>
            <a href="https://github.com">
              <VscGithubAlt className={style.a} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
