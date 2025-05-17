import { Link } from "react-router-dom";
import Logo from "./../assets/logo/LogoZeno_LogoBrancoSFundo.png";
import LogoWhite from "./../assets/logo/LogoZeno_LogoPretoSFundo.png";
import img001 from "./../assets/tempLanding.png";
import video001 from "./../assets/videoDasCores.mp4";
import video002 from "./../assets/videoDasTelas.mp4";
import { HiTrendingUp } from "react-icons/hi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";

import S from "./../styles/landing.module.css";
import BlurText from "../components/BlurText/BlurText";
import { BsFillBoxSeamFill, BsSuitcaseLgFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { VscGithubAlt } from "react-icons/vsc";

export default function LandingPage() {
  const [burger, setBurguer] = useState(false);

  const toggleBurger = () => {
    setBurguer((prevState) => {
      if (!prevState) {
        const scrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";
        document.body.dataset.scrollY = scrollY.toString();
      } else {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        const scrollY = parseInt(document.body.dataset.scrollY || "0");
        window.scrollTo(0, scrollY);
      }
      return !prevState;
    });
  };

  useEffect(() => {
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      const scrollY = parseInt(document.body.dataset.scrollY || "0");
      if (scrollY) {
        window.scrollTo(0, scrollY);
      }
    };
  }, []);

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
          <img src={Logo} alt="Logo do Zeno" />
        </div>
        <div className={S.linksContainer}>
          <ul>
            <li>
              <a href="#hero">Início</a>
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
              <a href="#aboutUs">Sobre nós</a>
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
        <div className={S.burgerContainer} onClick={toggleBurger}>
          <label className={S.burger} htmlFor="burger">
            <input
              type="checkbox"
              id="burger"
              checked={burger}
              onChange={toggleBurger}
            />
            <span />
            <span />
            <span />
          </label>
        </div>
      </nav>
      <div className={`${S.drawerMenu} ${burger ? S.active : ""}`}>
        <div className={S.drawerMenuContainer}>
          <div className={S.logoContainer}>
            <img src={Logo} alt="Logo do Zeno" />
          </div>
          <ul>
            <li>
              <a href="#hero" onClick={toggleBurger}>
                Início
              </a>
            </li>
            <li>
              <a href="#function" onClick={toggleBurger}>
                Sobre
              </a>
            </li>
            <li>
              <a href="#guide" onClick={toggleBurger}>
                Funções
              </a>
            </li>
            <li>
              <a href="#settings" onClick={toggleBurger}>
                Personalização
              </a>
            </li>
            <li>
              <a href="#aboutUs" onClick={toggleBurger}>
                Sobre nós
              </a>
            </li>
            <div className={S.buttonContainer}>
              <Link className={S.signInButton} to="/login">
                Entrar
              </Link>
              <Link className={S.signUpButton} to="/login">
                Criar
              </Link>
            </div>
          </ul>
        </div>
      </div>
      <main className={S.page}>
        <section id="hero" className={S.hero}>
          <div className={S.titleContainer}>
            {/* O blur text tem um bug que faz vc precisar usar um caracter invisivel, eu peguei desse site: https://charactercalculator.com/pt/invisible-character/#:~:text=Esta%20p%C3%A1gina%20de%20copiar%20e%20colar%20caracteres%20invis%C3%ADveis,clicar%20em%20colar%20para%20usar%20os%20caracteres%20invis%C3%ADveis. */}
            <BlurText delay={250} direction="top" className={S.title}>
              {"O sistema que  ‎"}
              {"você ‎"}
              {"precisa para ‎"}
              <span className={S.spanTitle}>consolidar</span>
              {" o seu pequeno negócio."}
            </BlurText>
            <p>
              Otimize a gestão da sua empresa com o Zeno, um sistema inovador!
            </p>
            <Link className={S.signUpButton} to="/login">
              Crie sua conta
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
              <p>Gerencie seu estoque da forma mais eficaz.</p>
            </div>
          </div>
          <div className={S.functionCard}>
            <HiTrendingUp className={S.icon} />
            <div className={S.text}>
              <h2>Controle de caixa</h2>
              <p>
                Controle financeiro na palma da sua mão. Mantenha seu caixa
                sempre no verde com uma gestão simples e eficaz.
              </p>
            </div>
          </div>
          <div className={S.functionCard}>
            <FaCalendarAlt className={S.icon} />
            <div className={S.text}>
              <h2>Agenda</h2>
              <p>
                Organize seu dia e não perca mais compromissos importantes. Sua
                agenda estará sempre atualizada e acessível.
              </p>
            </div>
          </div>
          <div className={S.functionCard}>
            <FaClipboardList className={S.icon} />
            <div className={S.text}>
              <h2>Organize tudo</h2>
              <p>
                Deixe as suas tarefas em ordem, e sua produtividade em alta.
                Gerencie demandas, delegue funções e mantenha tudo sob controle.
              </p>
            </div>
          </div>
          <div className={S.functionCard}>
            <BsSuitcaseLgFill className={S.icon} />

            <div className={S.text}>
              <h2>Serviços</h2>
              <p>
                Tenha a facilidade para gerenciar seus serviços, controlar seus
                pedidos, acompanhar os prazos e aumentar sua eficiência com
                poucos cliques!
              </p>
            </div>
          </div>
        </section>
        <section id="guide" className={S.guide}>
          <div className={S.content}>
            <BlurText delay={150} direction="top" className={S.title}>
              {"O Sistema ‎"}
              {"Simples e ‎"}
              <span className={S.spanTitle}>Poderoso</span>
              {"para  ‎"}
              {"Seu Negócio."}
            </BlurText>
            <p>
              O Zeno foi criado para ajudar líderes de pequenos negócios a
              cuidarem de tudo com facilidade. Com telas intuitivas e
              ferramentas essenciais, você tem o controle da sua empresa na
              palma da mão.
            </p>
            <div className={S.guideCardAndVideo}>
              <div className={S.guideCard}>
                <ul>
                  <li>
                    Tela Inicial: Veja todas as informações importantes de
                    imediato.
                  </li>
                  <li>
                    Estoque: Veja o que tem, o que falta e o que precisa repor
                    dos seus produtos, ferramentas, entre outros.
                  </li>
                  <li>
                    Caixa: Controle de dinheiro entrando e saindo, de forma
                    direta e clara.
                  </li>
                  <li>
                    Agenda: Não perca mais um compromisso. Agende reuniões,
                    entregas e tarefas.
                  </li>
                  <li>
                    Tarefas: Organize o que precisa ser feito, sem complicação.
                  </li>
                  <li>
                    Organizador: Organize o que precisa ser feito, sem
                    complicação.
                  </li>
                </ul>
              </div>
              <video controls autoPlay>
                <source src={video002} type="video/mp4" />
              </video>
            </div>
          </div>
        </section>
        <section id="settings" className={S.settings}>
          <div className={S.videoContainer}>
            <video controls autoPlay loop muted>
              <source src={video001} type="video/mp4" />
            </video>
          </div>
          <div className={S.textContainer}>
            <BlurText delay={150} direction="top" className={S.title}>
              {"O nosso sistema, ‎"}
              {"do seu jeito!"}
            </BlurText>
            <p>
              Personalize cores, logo e detalhes para que o sistema Zeno tenha a
              cara do seu negócio.
            </p>
          </div>
        </section>
        <section id="callAction" className={S.callAction}>
          <div className={S.separator}></div>
          <BlurText delay={150} direction="top" className={S.title}>
            {"Se você  ‎"}
            {"quer dar ‎"}
            {"um ‎"}
            <span className={`${S.spanTitle} ${S.spanTitleLeft}`}>UP</span>
            {"‎ no seu ‎"}
            {"pequeno negócio, ‎"}
            {"crie sua ‎"}
            {"conta agora."}
          </BlurText>
        </section>
        <section id="aboutUs" className={S.aboutUs}>
          <div className={S.ball01}></div>
          <div className={S.ball02}></div>
          <div className={S.ball03}></div>
          <div className={S.ball04}></div>

          <h1>Sobre nós</h1>
          <p>
            Éramos um grupo de estudantes da ETEC Martinho Di Ciero em 2025
            quando criamos o sistema Zeno, um sistema para MEIs que simplifica a
            administração de pequenas empresas. Como parte do nosso TCC,
            desenvolvemos uma plataforma intuitiva com controle de caixa, gestão
            de estoque, agenda e muito mais. Nosso objetivo? Tornar a tecnologia
            acessível e eficiente, ajudando empreendedores a focarem no
            crescimento sem complicação. Transformamos desafios em soluções para
            fazer seu negócio prosperar!
          </p>
          <div className={S.wrapperDevs}>
            <div
              className={S.containerDevs}
              onClick={() =>
                window.open("https://github.com/CaioCosta2JZ", "_blank")
              }
            >
              <img
                src="https://avatars.githubusercontent.com/u/127055627?v=4"
                alt="Foto do Caio"
              />
              <h6>Caio Costa</h6>
              <div className={S.popover}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
              </div>
            </div>
            <div className={S.containerDevs}>
              <img
                src="https://avatars.githubusercontent.com/u/163062463?v=4"
                alt="Foto do José"
              />
              <h6>José de Souza</h6>
            </div>
            <div className={S.containerDevs}>
              <img
                src="https://avatars.githubusercontent.com/u/170425770?v=4"
                alt="Foto do Naresh"
              />
              <h6>Naresh Sharma</h6>
            </div>
            <div className={S.containerDevs}>
              <img
                src="https://avatars.githubusercontent.com/u/163760447?v=4"
                alt="Foto do Nicolas"
              />
              <h6>Nicolas Spinelli</h6>
            </div>
            <div className={S.containerDevs}>
              <img
                src="https://avatars.githubusercontent.com/u/141236294?v=4"
                alt="Foto do Nicollas"
              />
              <h6>Nicollas Reis</h6>
            </div>
            <div className={S.containerDevs}>
              <img
                src="https://avatars.githubusercontent.com/u/126972477?v=4"
                alt="Foto do Vinícius"
              />
              <h6>Vinícius Porto</h6>
            </div>
          </div>
        </section>
        <footer>
          <div className={S.container}>
            <div className={S.footer}>
              <div className={S.containerLogo}>
                <img className={S.img} src={LogoWhite} alt="Zeno logo" />
              </div>
              <div className={S.conteudo}>
                <p>© 2025 www.zeno.com - Todos os direitos reservados.</p>
              </div>
              <div className={S.icons}>
                <a href="https://facebook.com">
                  <FaFacebookF className={S.a} />
                </a>
                <a href="https://instagram.com">
                  <FaInstagram className={S.a} />
                </a>
                <a href="https://youtube.com">
                  <FaYoutube className={S.a} />
                </a>
                <a href="https://github.com/tcc-zeno">
                  <VscGithubAlt className={S.a} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
