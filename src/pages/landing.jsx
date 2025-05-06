import { Link } from "react-router-dom";
import Logo from "./../assets/logo/LogoZeno_LogoBrancoSFundo.png";
import img001 from "./../assets/tempLanding.png";
import { FaBoxes } from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";

import S from "./../styles/landing.module.css";

export default function LandingPage() {
  return (
    <>
      <nav className={S.navbar}>
        <div className={S.logoContainer}>
          <img src={Logo} alt="" />
        </div>
        <div className={S.linksContainer}>
          <ul>
            <li>Inicio</li>
            <li>Sobre</li>
            <li>Funções</li>
            <li>Personalização</li>
            <li>Sobre nós</li>
          </ul>
        </div>
        <div className={S.buttonContainer}>
          <Link className={S.signInButton} to="/login">Entrar</Link>
          <Link className={S.signUpButton} to="/login">Criar</Link>
        </div>
      </nav>
      <main className={S.page}>
        <section className={S.hero}>
          <div className={S.titleContainer}>
            <h1>
              O sistema que você precisa para <span>consolidar</span> a sua
              microempresa
            </h1>
            <p>
              Comece a sua empresa com melhor que tem para um microempreendedor
            </p>
            <Link className={S.signUpButton} to="/login">Criar sua conta</Link>
          </div>
          <div className={S.imgContainer}>
            <img src={img001} alt="" srcset="" />
          </div>
        </section>
        <section className={S.function}>
          <div className={S.functionCard}>
            <FaBoxes className={S.icon} />
            <div>
              <h2>Controle de estoque</h2>
              <p>Gerencie seu estoque da forma mais adequada.</p>
            </div>
          </div>
          <div className={S.functionCard}>
            <HiTrendingUp className={S.icon} />

            <div>
              <h2>Controle de caixa</h2>
              <p>
                Controle financeiro na palma da sua mão. Mantenha seu caixa
                sempre no azul com uma gestão simples e eficaz.
              </p>
            </div>
          </div>
          <div className={S.functionCard}>
            <FaCalendarAlt className={S.icon} />
            <div>
              <h2>Agenda</h2>
              <p>
                Organize seu dia, conquiste mais e nunca mais perca compromissos
                importantes. Sua agenda sempre atualizada e acessível.
              </p>
            </div>
          </div>
          <div className={S.functionCard}>
            <FaClipboardList className={S.icon} />
            <div>
              <h2>Organize tudo</h2>
              <p>
                Tarefas em ordem, produtividade em alta. Gerencie demandas,
                delegue funções e mantenha tudo sob controle.
              </p>
            </div>
          </div>
          <div className={S.functionCard}>
            <GiTakeMyMoney className={S.icon} />
            <div>
              <h2>Serviços</h2>
              <p>
                Facilidade para gerenciar seus serviços, controlar seus pedidos,
                acompanhar os prazos e aumentar sua eficiência com poucos
                cliques!
              </p>
            </div>
          </div>
        </section>
        <section className={S.guide}>
          <div className={S.content}>
            <h1>
              O Sistema Simples e <span>Poderoso</span> para Seu Negócio
            </h1>
            <p>
              O Zeno foi criado para ajudar microempreendedores a cuidarem de
              tudo com facilidade. Com telas intuitivas e ferramentas
              essenciais, você tem o controle do seu negócio na palma da mão.
            </p>
            <video></video>
          </div>
          <div className={S.guideCard}>
            <ul>
              <li></li>
            </ul>
          </div>
        </section>
      </main>
      <h1>Nosso site de apresentação</h1>
      <Link to="/login">Login</Link>
    </>
  );
}
