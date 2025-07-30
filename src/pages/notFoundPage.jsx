import React from "react";
import S from "../styles/NotFoundPage.module.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className={S.containerContent}>
      <div className={S.containerText}>
        <h1>Erro 404</h1>
        <p>Essa página não está disponível </p>
        <div className={S.containerButton}>
          <Link
            id="signInButton"
            role="link"
            className={S.goHomeButton}
            aria-label="Ir para o início"
            to="/"
          >
            Ir para o início
          </Link>
          <Link
            id="signInButton"
            role="link"
            className={S.contactButton}
            aria-label="Entrar em contato"
            to="/"
          >
            Entrar em contato
          </Link>
        </div>
      </div>
    </main>
  );
}
