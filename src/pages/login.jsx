import { Link } from "react-router-dom";
import LoginComponent from "../components/loginButton";
import Logo from "../assets/logo/LogoZeno_LogoPretoSFundo.png";
import S from "../styles/login.module.css";

export default function Login() {
  return (
    <main className={S.authPage}>
      <section className={S.containerToggle}>
        <div className={S.wrapperContent}>
          <div className={S.containerLogo}>
            <img src={Logo} alt="Logo com arco colorido e o nome Zeno" />
          </div>
          <div className={S.wrapperText}>
            <h3>Bem-vindo de volta</h3>
            <p>
              Para se manter conectado de volta faça login com as informações da
              empresa
            </p>
          </div>
        </div>
      </section>
      <section className={S.containerLogin}>
        <h3 className="text-secondary">Criar nova conta</h3>
      </section>
      <LoginComponent />
      <Link to="/dashboard">Home</Link> 
    </main>
  );
}
