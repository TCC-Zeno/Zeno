import { useState } from "react";
import Logo from "../assets/logo/LogoZeno_LogoPretoSFundo.png";
import SignUp from "../components/signUp";
import SignIn from "../components/signIn";
import S from "../styles/login.module.css";

export default function Login() {
  const [loginOption, setLoginOption] = useState("signUp");

  return (
    <main className={S.loginPage}>
      {loginOption === "signIn" ? <SignIn /> : null}
      <section
        className={`${S.containerToggle} ${
          loginOption === "signUp" ? S.signUpToggle : S.signInToggle
        }`}
      >
        <div className={S.particlesContainer}>
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className={S.particle}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                "--tx": `${(Math.random() - 0.5) * 200}px`,
                "--ty": `${(Math.random() - 0.5) * 200}px`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            ></div>
          ))}
        </div>

        <div className={S.wrapperContent}>
          <div className={S.containerLogo}>
            <img src={Logo} alt="Logo com arco colorido e o nome Zeno" />
          </div>
          {loginOption === "signUp" ? (
            <div className={S.wrapperText}>
              <h3>Bem-vindo de volta</h3>
              <p>
                Para se manter conectado de volta faça login com as informações
                da empresa
              </p>
              <button onClick={() => setLoginOption("signIn")}>Entrar</button>
            </div>
          ) : (
            <div className={S.wrapperText}>
              <h3>Bem-vindo ao Zeno</h3>
              <p>É tudo que você precisa para consolidar a sua micro empresa</p>
              <button onClick={() => setLoginOption("signUp")}>Criar</button>
            </div>
          )}
        </div>
      </section>
      {loginOption === "signUp" ? <SignUp /> : null}
    </main>
  );
}
