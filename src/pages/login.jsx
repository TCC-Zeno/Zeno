import { useEffect, useState } from "react";
import Logo from "../assets/logo/LogoZeno_LogoPretoSFundo.png";
import SignUp from "../components/SignUp/SignUp";
import SignIn from "../components/SignIn/SignIn";
import S from "../styles/login.module.css";
import { useLocation } from "react-router-dom";
import { Particles } from "../components/Particles/Particles";

export default function Login() {
  const location = useLocation();
  const mode = location.state?.mode || "signUp";
  const [loginOption, setLoginOption] = useState("signUp");

  useEffect(() => {
    setLoginOption(mode);
  }, [mode]);

  return (
    // * O login, tanto a parte dfe entrar como cadastro utilizam o react hook forms na parte do formulario, nos componentes que tem a parte que importa para o banco de dados
    <main className={S.loginPage}>
      {loginOption === "signIn" ? <SignIn /> : null}
      <section
        className={`${S.containerToggle} ${
          loginOption === "signUp" ? S.signUpToggle : S.signInToggle
        }`}
      >
        <Particles />

        <div className={S.wrapperContent}>
          <div className={S.containerLogo}>
            <img src={Logo} alt="Logo com arco colorido e o nome Zeno" />
          </div>
          {loginOption === "signUp" ? (
            <div className={S.wrapperText}>
              <h3>Bem-vindo de volta</h3>
              <p>
                Para se manter conectado, faça login com as informações da
                empresa.
              </p>
              <button id="btn-signIn" onClick={() => setLoginOption("signIn")}>
                Entrar
              </button>
            </div>
          ) : (
            <div className={S.wrapperText}>
              <h3>Bem-vindo ao Zeno</h3>
              <p>É tudo que você precisa para consolidar a sua microempresa.</p>
              <button id="btn-signUp" onClick={() => setLoginOption("signUp")}>
                Criar
              </button>
            </div>
          )}
        </div>
      </section>
      {loginOption === "signUp" ? <SignUp /> : null}
    </main>
  );
}
