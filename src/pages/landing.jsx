import { Link } from "react-router-dom";
import Logo from "./../assets/logo/LogoZeno_LogoBrancoSFundo.png";
import img001 from "./../assets/tempLanding.png";
import video001 from "./../assets/3099938-hd_1920_1080_30fps.mp4";
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
            <li>
              <a href="#hero">Inicio</a>
            </li>
            <li>
              <a href="">Sobre</a>
            </li>
            <li>
              <a href="">Funções</a>
            </li>
            <li>
              <a href="">Personalização</a>
            </li>
            <li>
              <a href="">Sobre nós</a>
            </li>
          </ul>
        </div>
        <div className={S.buttonContainer}>
          <Link className={S.signInButton} to="/login">
            Entrar
          </Link>
          <Link className={S.signUpButton} to="/login">
            Criar
          </Link>
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
            <Link className={S.signUpButton} to="/login">
              Criar sua conta
            </Link>
          </div>
          <div className={S.imgContainer}>
            <img src={img001} alt="Mockup do sistema" />
          </div>
        </section>
        <section className={S.function}>
          <div className={S.functionCard}>
            <FaBoxes className={S.icon} />
            <div className={S.text}>
              <h2>Controle de estoque</h2>
              <p>Gerencie seu estoque da forma mais adequada.</p>
            </div>
          </div>
          <div className={S.functionCard}>
            <HiTrendingUp className={S.icon} />
            <div className={S.text}>
              <h2>Controle de caixa</h2>
              <p>
                Controle financeiro na palma da sua mão. Mantenha seu caixa
                sempre no azul com uma gestão simples e eficaz.
              </p>
            </div>
          </div>
          <div className={S.functionCard}>
            <FaCalendarAlt className={S.icon} />
            <div className={S.text}>
              <h2>Agenda</h2>
              <p>
                Organize seu dia, conquiste mais e nunca mais perca compromissos
                importantes. Sua agenda sempre atualizada e acessível.
              </p>
            </div>
          </div>
          <div className={S.functionCard}>
            <FaClipboardList className={S.icon} />
            <div className={S.text}>
              <h2>Organize tudo</h2>
              <p>
                Tarefas em ordem, produtividade em alta. Gerencie demandas,
                delegue funções e mantenha tudo sob controle.
              </p>
            </div>
          </div>
          <div className={S.functionCard}>
            <GiTakeMyMoney className={S.icon} />
            <div className={S.text}>
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
            <div className={S.guideCardAndVideo}>
              <div className={S.guideCard}>
                <ul>
                  <li>Tela Inicial: Veja tudo o que importa logo de cara.</li>
                  <li>
                    Estoque: Veja o que tem, o que falta e o que precisa repor.
                  </li>
                  <li>
                    Caixa: Controle de dinheiro entrando e saindo, direto e
                    claro.
                  </li>
                  <li>
                    Agenda: Nunca mais perca um compromisso! Agende reuniões,
                    entregas e tarefas.
                  </li>
                  <li>
                    Tarefas: Organize o que precisa ser feito, sem complicação
                  </li>
                  <li>
                    Organizador: Organize o que precisa ser feito, sem
                    complicação.
                  </li>
                </ul>
              </div>
              <video controls autoPlay>
                <source src={video001} type="video/mp4" />
              </video>
            </div>
          </div>
        </section>
        <section className={S.settings}>
          <div className={S.videoContainer}>
            <video controls autoPlay loop muted>
              <source src={video001} type="video/mp4" />
            </video>
          </div>
          <div className={S.textContainer}>
            <h1>Seu sistema, do seu  jeito!</h1>
            <p>
              Personalize cores, logo e detalhes para que o Zeno tenha a cara do
              seu negócio.
            </p>
          </div>
        </section>
      </main>
      <h1>Nosso site de apresentação</h1>
      <Link to="/login">Login</Link>
    </>
  );
}
