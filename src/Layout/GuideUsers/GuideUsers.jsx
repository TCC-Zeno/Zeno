import { useState } from "react";
import Stepper, { Step } from "./../../components/Stepper/Stepper";
import { BsQuestionLg } from "react-icons/bs";
import S from "./guideUsers.module.css";
import Modal from "../../components/Modal/Modal";
import img01 from "./../../assets/guide/resumoDeCaixa.png";
import img02 from "./../../assets/guide/fluxoDeCaixa.png";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function GuideUsers() {
  const rotaStatus = useSelector((state) => state.rotaReducer.rota);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = img01;
    preloadImage.onload = () => setImageLoaded(true);
  }, []);
  return (
    <>
      <button className={S.guideButton} onClick={() => setModalOpen(true)}>
        <BsQuestionLg className={S.icon} />
      </button>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
          color: "white",
          width: "50vw",
        }}
        guide={true}
      >
        {rotaStatus === "dashboard" ? (
          <Stepper
            initialStep={1}
            onStepChange={(step) => {
              console.log(step);
            }}
            onFinalStepCompleted={() => setModalOpen(false)}
            backButtonText="Voltar"
            nextButtonText="Continuar"
          >
            <Step>
              <h2 className={S.titleStep}>Fluxo de caixa </h2>
              <img
                className={S.imgStep}
                style={{
                  opacity: imageLoaded ? 1 : 0,
                }}
                src={img01}
                alt="fluxo de caixa"
                loading="eager"
              />
              <p>
                A função <b>Resumo de caixa</b> apresenta uma visão rápida e
                clara da movimentação do caixa da sua empresa um determinado
                período. O usuário pode escolher o intervalo desejado seja ele
                sendo Diário, Mensal ou Anual.
              </p>
              <p>
                Abaixo do título, três cartões exibem os principais indicadores
                financeiros:
              </p>
              <ul className="list-disc pl-5">
                <li>
                  <b>Montante</b>: Representa o total bruto movimentado, somando
                  todas as entradas e saídas do caixa.
                </li>
                <li>
                  <b>Lucro</b>: Mostra o valor obtido após subtrair as despesas
                  do montante total. Este valor é exibido em{" "}
                  <b className="text-green-500">verde</b>, indicando resultado
                  positivo.
                </li>
                <li>
                  <b>Despesas</b>: Indica o total de gastos ocorridos no período
                  selecionado. Este valor aparece em{" "}
                  <b className="text-red-500">vermelho</b> para destacar os
                  custos.
                </li>
              </ul>
            </Step>
            <Step>
              <h2 className={S.titleStep}>Fluxo de caixa </h2>
              <img
                className={S.imgStep}
                style={{
                  opacity: imageLoaded ? 1 : 0,
                }}
                src={img02}
                alt="fluxo de caixa"
                loading="eager"
              />
              <p>
                A função <b>Fluxo de caixa</b> permite o registro manual de
                entradas e saídas financeiras no sistema, oferecendo um controle
                detalhado das movimentações monetárias da empresa. É por meio
                desse painel que os dados alimentam o <b>Resumo de caixa</b> e
                outras análises financeiras do sistema.
              </p>
              <p>O função é composta pelos seguintes campos:</p>
              <ul className="list-disc pl-5">
                <li>
                  <b>Nome completo</b>: Campo para inserir o nome da pessoa ou
                  responsável pela transação.
                </li>
                <li>
                  <b>Valor</b>: Campo numérico onde se insere o valor da
                  transação.
                </li>
                <li>
                  <b>Método de pagamento</b>: Campo onde faz a seleção do tipo
                  de pagamento, ele podendo ser dinheiro, debito, credito, pix
                  ou algum outro.
                </li>
                <li>
                  <b>Categorias</b>: Classificação da transação (ex: Venda,
                  Compra, Salário, Impostos), a adição de uma nova categoria
                  poderá ser apartir da aba “personalizar”.
                </li>
                <li>
                  <b>Tipo de fluxo</b>: Define se a movimentação é uma
                  <b className="text-green-500"> Entrada</b> ou uma{" "}
                  <b className="text-red-500">Saída</b>.
                </li>
                <li>
                  <b>Enviar</b>: Botão que salva a transação no sistema,
                  atualizando automaticamente o resumo de caixa.
                </li>
              </ul>
            </Step>
            <Step>
              <h2>How about an input?</h2>
              <input
                type="text"
                placeholder="Type something..."
                className="w-full rounded-md border-2 border-gray-300 p-2"
              />
            </Step>
            <Step>
              <h2>Final Step</h2>
              <p>You made it!</p>
            </Step>
            <Step>
              <h2>Final Step</h2>
              <p>You made it!</p>
            </Step>
            <Step>
              <h2>Final Step</h2>
              <p>You made it!</p>
            </Step>
          </Stepper>
        ) : rotaStatus === "calendar" ? (
          <h1>Oi</h1>
        ) : (
          <h1>Oi</h1>
        )}
      </Modal>
    </>
  );
}
