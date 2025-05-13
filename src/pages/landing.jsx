import { Link } from "react-router-dom";
import Logo from "./../assets/logo/LogoZeno_LogoBrancoSFundo.png";
import img001 from "./../assets/tempLanding.png";
import video001 from "./../assets/videoDasCores.mp4";
import video002 from "./../assets/videoDasTelas.mp4";
import { HiTrendingUp } from "react-icons/hi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";

import S from "./../styles/landing.module.css";
import Exemplo from "./../assets/temp.jpg";
import BlurText from "../components/BlurText/BlurText";
import { Footer } from "../components/Footer/Footer";
import { BsFillBoxSeamFill, BsSuitcaseLgFill } from "react-icons/bs";
import { useEffect } from "react";

export default function LandingPage() {
  useEffect(() => {
    const handleClick = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const targetRect = targetElement.getBoundingClientRect();
        const targetPosition = targetRect.top + window.scrollY;
        const offsetPosition =
          targetPosition -
          window.innerHeight / 2 +
          targetElement.clientHeight / 2;

        window.scrollTo({
          top: offsetPosition - 100,
          behavior: "smooth",
        });
      }
    };

    const anchors = document.querySelectorAll('nav a[href^="#"]');
    anchors.forEach((anchor) => anchor.addEventListener("click", handleClick));

    return () => {
      anchors.forEach((anchor) =>
        anchor.removeEventListener("click", handleClick)
      );
    };
  }, []);
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
              <a href="#function">Sobre</a>
            </li>
            <li>
              <a href="#guide">Funções</a>
            </li>
            <li>
              <a href="#settings">Personalização</a>
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
        <section id="hero" className={S.hero}>
          <div className={S.titleContainer}>
            <BlurText delay={150} direction="top" className={S.title}>
              {"O sistema que você precisa para "}
              <span className={S.spanTitle}>consolidar</span>
              {"a sua microempresa"}
            </BlurText>
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
        <section id="function" className={S.function}>
          <div className={S.functionCard}>
            <BsFillBoxSeamFill className={S.icon} />
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
            <BsSuitcaseLgFill className={S.icon} />

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
        <section id="guide" className={S.guide}>
          <div className={S.content}>
            <BlurText delay={150} direction="top" className={S.title}>
              {"O Sistema Simples e "}
              <span className={S.spanTitle}>Poderoso</span>
              {"para Seu Negócio"}
            </BlurText>
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
        <section id="settings" className={S.settings}>
          <div className={S.videoContainer}>
            <video controls autoPlay loop muted>
              <source src={video002} type="video/mp4" />
            </video>
          </div>
          <div className={S.textContainer}>
            <BlurText delay={150} direction="top" className={S.title}>
              Seu sistema, do seu jeito!
            </BlurText>
            <p>
              Personalize cores, logo e detalhes para que o Zeno tenha a cara do
              seu negócio.
            </p>
          </div>
        </section>
        <section id="callAction" className={S.callAction}>
          <div className={S.separator}></div>
          <BlurText delay={150} direction="top" className={S.title}>
            {"Se você quer dar um"}
            <span className={S.spanTitle}>UP</span>
            {"no seu pequeno negócio, crie sua conta agora."}
          </BlurText>
        </section>
        <section className={S.aboutUs}>
          <h1>Sobre nós</h1>
          <p>
            Somos um grupo de estudantes da ETEC Martinho Di Ciero e criamos o
            Zeno, um sistema para MEIs que simplifica a administração de
            pequenos negócios. Como parte do nosso TCC, desenvolvemos uma
            plataforma intuitiva com controle de caixa, gestão de estoque,
            agenda e muito mais. Nosso objetivo? Tornar a tecnologia acessível e
            eficiente, ajudando empreendedores a focarem no crescimento sem
            complicação. Transformamos desafios em soluções para fazer seu
            negócio prosperar!
          </p>
          <div className={S.wrapperDevs}>
            <div className={S.containerDevs}>
              <img src={Exemplo} alt="Zeno logo" />
              <h6>Jose Marguarido</h6>
              <p>Uma pessoa muito boa</p>
            </div>
            <div className={S.containerDevs}>
              <img src={Exemplo} alt="Zeno logo" />
              <h6>Jose Marguarido</h6>
              <p>Uma pessoa muito boa</p>
            </div>
            <div className={S.containerDevs}>
              <img src={Exemplo} alt="Zeno logo" />
              <h6>Jose Marguarido</h6>
              <p>Uma pessoa muito boa</p>
            </div>
            <div className={S.containerDevs}>
              <img src={Exemplo} alt="Zeno logo" />
              <h6>Jose Marguarido</h6>
              <p>Uma pessoa muito boa</p>
            </div>
            <div className={S.containerDevs}>
              <img src={Exemplo} alt="Zeno logo" />
              <h6>Jose Marguarido</h6>
              <p>Uma pessoa muito boa</p>
            </div>
            <div className={S.containerDevs}>
              <img src={Exemplo} alt="Zeno logo" />
              <h6>Jose Marguarido</h6>
              <p>Uma pessoa muito boa</p>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
