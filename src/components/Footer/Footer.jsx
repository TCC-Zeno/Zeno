import React from "react";
import style from "./footer.module.css";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { VscGithubAlt } from "react-icons/vsc";
import Logo from "../../assets/logo/LogoZeno_LogoPretoSFundo.png"

export function Footer() {
  return (
    <>
      <div className={style.container}>
        <div className={style.footer}>
        <div className={style.containerLogo}>
          <img src={Logo} alt="Zeno logo" />
        </div>
        <div className={style.conteudo}>
          <a className={style.links} href="terms">Termos de Serviço</a>
          <a className={style.links} href="about">Sobre Nós</a>
          <a className={style.links} href="support">Fale Conosco</a>
        </div>
        <div className={style.icons}>
          <a href="https://facebook.com"><FaFacebookF/></a>
          <a href="https://instagram.com"><FaInstagram/></a>
          <a href="https://youtube.com"><FaYoutube/></a>
          <a href="https://github.com"><VscGithubAlt/></a>
        </div>
        </div>
      </div>
    </>
  );
}
