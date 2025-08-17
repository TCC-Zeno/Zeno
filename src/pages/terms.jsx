import { ArrowBigLeft } from "lucide-react";
import Logo from "./../assets/logo/LogoZeno_LogoPretoSFundo.png";
import S from "./../styles/terms.module.css";
import { useNavigate } from "react-router-dom";

export function TermsPage() {
  const navigate = useNavigate();
  return (
    <main>
      <header className={S.header}>
        <button className={S.back}>
          <ArrowBigLeft size={30} width="100px" onClick={() => navigate(-1)} />
        </button>
        <div className={S.containerLogo}>
          <img src={Logo} alt="Logo do Zeno" />
        </div>
      </header>
      <section>
        
      </section>
    </main>
  );
}
