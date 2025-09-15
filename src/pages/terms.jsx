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
      <div className={S.termsContent}>
        <div className={S.container}>
          <div className={S.content}>
            <div className={S.titleContainer}>
              <h1 className={S.title}>Termos e Condições de Uso - Zeno</h1>
              <p className={S.lastUpdate}>Última atualização: 10/09/2025</p>
            </div>

            <div className={S.intro}>
              <p className={S.introText}>
                Seja bem-vindo ao Zeno, um sistema ERP desenvolvido para
                auxiliar microempreendedores na gestão eficiente de seus
                pequenos negócios. Ao acessar ou utilizar a plataforma, você
                concorda com os termos e condições aqui descritos. Leia
                atentamente antes de usar.
              </p>
            </div>

            <section className={S.section}>
              <h2 className={S.sectionTitle}>1. Definições</h2>
              <ul className={S.definitionList}>
                <li className={S.definition}>
                  <strong className={S.term}>Zeno</strong>: Sistema ERP online
                  desenvolvido com foco em simplicidade, personalização e
                  praticidade para atender as necessidades de
                  microempreendedores individuais.
                </li>
                <li className={S.definition}>
                  <strong className={S.term}>Usuário</strong>: Qualquer pessoa
                  cadastrada na plataforma.
                </li>
                <li className={S.definition}>
                  <strong className={S.term}>Microempreendedor</strong>: Usuário
                  que utiliza o Zeno para gerenciar atividades do seu pequeno
                  negócio.
                </li>
              </ul>
            </section>

            <section className={S.section}>
              <h2 className={S.sectionTitle}>2. Aceitação dos Termos</h2>
              <p className={S.text}>
                Ao se cadastrar e utilizar o Zeno, o usuário declara que leu,
                compreendeu e aceitou integralmente os presentes Termos e
                Condições de Uso. Caso não concorde com alguma cláusula, deverá
                evitar de utilizar a plataforma.
              </p>
            </section>

            <section className={S.section}>
              <h2 className={S.sectionTitle}>
                3. Cadastro e Responsabilidades
              </h2>
              <ul className={S.list}>
                <li className={S.listItem}>
                  O usuário deve fornecer dados verdadeiros, atualizados e
                  completos no momento do cadastro.
                </li>
                <li className={S.listItem}>
                  O uso da plataforma é permitido para maiores de 16 anos.
                  Menores deverão apresentar autorização dos responsáveis
                  legais.
                </li>
                <li className={S.listItem}>
                  O usuário é responsável por manter suas credenciais em sigilo
                  e por toda atividade realizada em sua conta.
                </li>
              </ul>
            </section>

            <section className={S.section}>
              <h2 className={S.sectionTitle}>
                4. Funcionalidades da Plataforma
              </h2>
              <p className={S.text}>
                O Zeno oferece recursos para apoiar o dia a dia do
                microempreendedor, incluindo:
              </p>
              <ul className={S.featureList}>
                <li className={S.feature}>Controle de Caixa</li>
                <li className={S.feature}>Gestão de Estoque</li>
                <li className={S.feature}>
                  Agenda e Organização de Compromissos
                </li>
                <li className={S.feature}>Geração de Relatórios Gerenciais</li>
                <li className={S.feature}>
                  Painel Personalizável conforme o tipo de negócio
                </li>
              </ul>
              <p className={S.text}>
                A plataforma está em constante evolução, podendo receber
                atualizações e melhorias ao longo do tempo.
              </p>
            </section>

            <section className={S.section}>
              <h2 className={S.sectionTitle}>5. Conduta Esperada</h2>
              <p className={S.text}>
                Ao utilizar o Zeno, o usuário compromete-se a:
              </p>
              <ul className={S.list}>
                <li className={S.listItem}>
                  Utilizar a plataforma de forma ética, profissional e
                  respeitosa.
                </li>
                <li className={S.listItem}>
                  Não compartilhar informações falsas, ofensivas,
                  discriminatórias ou ilegais.
                </li>
                <li className={S.listItem}>
                  Não utilizar o sistema para atividades ilícitas, como fraudes,
                  spam ou violação de direitos de terceiros.
                </li>
                <li className={S.listItem}>
                  Não tentar explorar falhas de segurança ou acessar dados de
                  outros usuários.
                </li>
              </ul>
            </section>

            <section className={S.section}>
              <h2 className={S.sectionTitle}>
                6. Privacidade e Proteção de Dados
              </h2>
              <ul className={S.list}>
                <li className={S.listItem}>
                  Os dados dos usuários são tratados com sigilo, conforme a{" "}
                  <strong className={S.highlight}>
                    Lei Geral de Proteção de Dados (LGPD -- Lei nº 13.709/2018)
                  </strong>
                  .
                </li>
                <li className={S.listItem}>
                  O Zeno compromete-se a coletar e utilizar os dados apenas para
                  fins operacionais da plataforma.
                </li>
                <li className={S.listItem}>
                  O usuário pode solicitar a exclusão de seus dados a qualquer
                  momento, mediante solicitação formal.
                </li>
                <li className={S.listItem}>
                  Os seus dados vão ser fornecidos a Inteligência Artificial do
                  Gemini.
                </li>
              </ul>
            </section>

            <section className={S.section}>
              <h2 className={S.sectionTitle}>7. Propriedade Intelectual</h2>
              <ul className={S.list}>
                <li className={S.listItem}>
                  Todos os elementos visuais, sistemas e códigos da plataforma
                  Zeno são protegidos por direitos autorais e pertencem aos seus
                  desenvolvedores.
                </li>
                <li className={S.listItem}>
                  Os dados inseridos pelos usuários (como registros de vendas,
                  compromissos ou relatórios) permanecem de sua propriedade.
                </li>
                <li className={S.listItem}>
                  O Zeno reserva-se o direito de exibir funcionalidades e
                  melhorias em materiais promocionais, desde que sem expor dados
                  pessoais ou sensíveis.
                </li>
              </ul>
            </section>

            <section className={S.section}>
              <h2 className={S.sectionTitle}>
                8. Limitação de Responsabilidade
              </h2>
              <ul className={S.list}>
                <li className={S.listItem}>
                  O Zeno é uma ferramenta de apoio à gestão e não se
                  responsabiliza por decisões administrativas, financeiras ou
                  fiscais tomadas pelos usuários com base nos dados gerados.
                </li>
                <li className={S.listItem}>
                  A plataforma não garante funcionamento ininterrupto ou livre
                  de falhas, mas compromete-se a corrigir erros técnicos
                  identificados o mais breve possível.
                </li>
                <li className={S.listItem}>
                  O uso indevido da plataforma poderá resultar em suspensão ou
                  exclusão da conta.
                </li>
              </ul>
            </section>

            <section className={S.section}>
              <h2 className={S.sectionTitle}>9. Atualizações e Modificações</h2>
              <ul className={S.list}>
                <li className={S.listItem}>
                  O Zeno poderá atualizar estes Termos de Uso a qualquer
                  momento.
                </li>
                <li className={S.listItem}>
                  Mudanças relevantes serão notificadas aos usuários por e-mail
                  ou dentro da plataforma.
                </li>
                <li className={S.listItem}>
                  O uso contínuo da plataforma após as atualizações será
                  considerado que o usuário aceita as novas condições.
                </li>
              </ul>
            </section>

            <section className={S.section}>
              <h2 className={S.sectionTitle}>10. Encerramento de Conta</h2>
              <ul className={S.list}>
                <li className={S.listItem}>
                  O usuário poderá solicitar o encerramento da conta a qualquer
                  momento.
                </li>
                <li className={S.listItem}>
                  Após 6 meses de inatividade, os dados armazenados poderão ser
                  excluídos definitivamente, conforme política de retenção da
                  plataforma.
                </li>
              </ul>
            </section>

            <section className={S.section}>
              <h2 className={S.sectionTitle}>
                11. Código de Ética do Usuário Zeno
              </h2>
              <ul className={S.ethicsList}>
                <li className={S.ethicsItem}>
                  Atuar com responsabilidade, honestidade e respeito.
                </li>
                <li className={S.ethicsItem}>
                  Não praticar plágio, falsificação de dados ou uso indevido de
                  informações.
                </li>
                <li className={S.ethicsItem}>
                  Zelar pela integridade das informações do seu negócio e pela
                  segurança dos dados.
                </li>
              </ul>
            </section>

            <section className={S.section}>
              <h2 className={S.sectionTitle}>12. Penalidades</h2>
              <p className={S.text}>
                O descumprimento destes Termos poderá acarretar:
              </p>
              <ul className={S.penaltyList}>
                <li className={S.penalty}>Advertência formal</li>
                <li className={S.penalty}>Suspensão temporária da conta</li>
                <li className={S.penalty}>Bloqueio ou exclusão definitiva</li>
                <li className={S.penalty}>
                  Comunicação às autoridades competentes, se houver infração
                  legal
                </li>
              </ul>
            </section>

            <section className={S.section}>
              <h2 className={S.sectionTitle}>13. Suporte e Contato</h2>
              <p className={S.text}>
                Para dúvidas, sugestões ou problemas técnicos, entre em contato
                com a equipe de suporte do Zeno por meio do canal oficial da
                plataforma ou e-mail informado na área de ajuda.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
