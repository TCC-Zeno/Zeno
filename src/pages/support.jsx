import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/Accordion/Accordion";
import { support } from "../redux/Route/slice";
import S from "./../styles/support.module.css";
import { useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import Modal from "../components/Modal/Modal";

export function Support() {
  const [modalSuccess, setModalSuccess] = useState(false);
  const [isMessageDivActive, setIsMessageDivActive] = useState(false);
  const profileinfo = useSelector((state) => state.userReducer.userData);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(support());
  }, [dispatch]);

  const onSubmit = async (data) => {
    const serviceID = "service_jovc4m8";
    const templateID = "template_5m4ref4";
    console.log(data);
    console.log(profileinfo);

    const templateParams = {
      title: data.topic,
      logo_url: profileinfo.logo,
      content: data.message,
      company_name: profileinfo.company_name,
      name: profileinfo.owner_name,
      email: profileinfo.email,
    };
    try {
      const response = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          service_id: serviceID,
          template_id: templateID,
          user_id: import.meta.env.VITE_PUBLIC_EMAILJS_KEY,
          template_params: templateParams,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setModalSuccess(true);
      } else {
        alert("Erro ao enviar a mensagem, tente novamente mais tarde.");
      }
      reset();
      handleFunction();
    } catch (error) {
      console.error("Erro ao enviar email:", error);
    }
  };

  function handleFunction() {
    setIsMessageDivActive(!isMessageDivActive);
    console.log(isMessageDivActive);
  }
  return (
    <DefaultLayout>
      <>
        <div className={S.container}>
          <div className={S.docker}>
            {isMessageDivActive == false ? (
              <div className={S.accordionContainer}>
                <h1>Perguntas frequentes</h1>
                <Accordion type="single" collapsible className={S.accordion}>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className={S.accordionTitle}>
                      1 - O que é o Zeno?
                    </AccordionTrigger>
                    <AccordionContent className={S.accordionContent}>
                      <p>
                        O Zeno é um sistema de gestão integrado, desenvolvido
                        para pequenos empreendedores que atuam no comércio e na
                        prestação de serviços.
                      </p>
                      <p>
                        Ele ajuda a organizar tarefas, controlar o fluxo de
                        caixa e gerenciar o estoque de maneira eficiente.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className={S.accordionTitle}>
                      2 - Para quem o Zeno é indicado?
                    </AccordionTrigger>
                    <AccordionContent className={S.accordionContent}>
                      <p>
                        O Zeno foi desenvolvido para micro e pequenas empresas
                        que precisam de uma solução simples e eficiente para
                        gerenciar suas operações diárias, como lojas,
                        prestadores de serviços, e-commerces e muito mais.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className={S.accordionTitle}>
                      3 - Quais são os principais recursos do Zeno?
                    </AccordionTrigger>
                    <AccordionContent className={S.accordionContent}>
                      <ul className={S.orderedList}>
                        <li>Gestão de tarefas e produtividade</li>
                        <li>Controle de fluxo de caixa e financeiro</li>
                        <li>Controle de estoque e produtos</li>
                        <li>Relatórios gerenciais para tomada de decisão</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className={S.accordionTitle}>
                      4 - O Zeno é fácil de usar?
                    </AccordionTrigger>
                    <AccordionContent className={S.accordionContent}>
                      <p>
                        Sim! O nosso sistema foi desenvolvido para ser intuitivo
                        e fácil de usar, mesmo para quem não tem experiência com
                        ERPs.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger className={S.accordionTitle}>
                      5 - Posso acessar o Zeno pelo celular?
                    </AccordionTrigger>
                    <AccordionContent className={S.accordionContent}>
                      <p>
                        Sim, o Zeno funciona em qualquer dispositivo com acesso
                        à internet, incluindo computadores, tablets e
                        smartphones.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger className={S.accordionTitle}>
                      6 - O Zeno oferece suporte técnico?
                    </AccordionTrigger>
                    <AccordionContent className={S.accordionContent}>
                      <p>
                        Sim! Oferecemos suporte via e-mail e chat para garantir
                        que você tenha a melhor experiência possível com o
                        sistema.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7">
                    <AccordionTrigger className={S.accordionTitle}>
                      7 - Como posso testar o Zeno?
                    </AccordionTrigger>
                    <AccordionContent className={S.accordionContent}>
                      <p>
                        Você pode solicitar um período de teste gratuito para
                        conhecer todas as funcionalidades antes de decidir pela
                        assinatura.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-8">
                    <AccordionTrigger className={S.accordionTitle}>
                      8 - Como funciona a assinatura do Zeno?{" "}
                    </AccordionTrigger>
                    <AccordionContent className={S.accordionContent}>
                      <p>
                        Trabalhamos com planos acessíveis e sem burocracia. Você
                        pode escolher um plano que melhor atenda às suas
                        necessidades e cancelar a qualquer momento.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-9">
                    <AccordionTrigger className={S.accordionTitle}>
                      9 - Qual é o objetivo principal deste site?{" "}
                    </AccordionTrigger>
                    <AccordionContent className={S.accordionContent}>
                      <p>
                        Sim! Utilizamos criptografia e servidores seguros para
                        garantir a proteção total das suas informações.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-10">
                    <AccordionTrigger className={S.accordionTitle}>
                      10 - Como posso entrar em contato com a equipe do Zeno?
                    </AccordionTrigger>
                    <AccordionContent className={S.accordionContent}>
                      <p>
                        Você pode nos contatar através do e-mail, chat ou
                        formulário de contato disponível no site.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <button
                  onClick={handleFunction}
                  className={S.buttonSendMessage}
                  id="btn-send-message"
                >
                  Gostaria de fazer alguma pergunta?
                </button>
              </div>
            ) : (
              <div className={S.questionContainer}>
                <h1>Gostaria de fazer alguma pergunta?</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={S.row}>
                    <div className={S.nameInput}>
                      <label className={S.label}>Nome</label>
                      <input
                        type="text"
                        disabled
                        className={`${S.input} ${
                          errors.name ? S.errorInput : ""
                        }`}
                        value={profileinfo.company_name}
                      />
                    </div>
                    <div className={S.emailInput}>
                      <label className={S.label}>E-mail</label>
                      <input
                        type="email"
                        disabled
                        className={`${S.input} ${
                          errors.email ? S.errorInput : ""
                        }`}
                        value={profileinfo.email}
                      />
                    </div>
                  </div>
                  <div className={S.topicInput}>
                    <label className={S.label}> Assunto </label>
                    <input
                      type="text"
                      placeholder="Assunto da mensagem"
                      className={`${S.input} ${
                        errors.topic ? S.errorInput : ""
                      }`}
                      {...register("topic", { required: true, maxLength: 100 })}
                    />
                  </div>

                  <div className={S.messageInput}>
                    <label className={S.label}>Mensagem</label>
                    <textarea
                      placeholder="Sua mensagem"
                      className={errors.message ? S.errorInput : ""}
                      {...register("message", {
                        required: "Por favor, digite sua mensagem",
                      })}
                    />
                    <div className="text-red-600">
                      {errors.message?.message && (
                        <span>{errors.message.message}</span>
                      )}
                    </div>
                  </div>
                  <button
                    id="btn-send"
                    type="submit"
                    className={S.buttonSendMessage}
                  >
                    Enviar Mensagem
                    <IoIosSend className={S.icon} />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        {modalSuccess && (
          <Modal isOpen={modalSuccess} onClose={() => setModalSuccess(false)}>
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-4">Sucesso</h2>
              <p className="mb-4">Sua mensagem foi enviada com sucesso.</p>
              <button
                onClick={() => setModalSuccess(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Fechar
              </button>
            </div>
          </Modal>
        )}
      </>
    </DefaultLayout>
  );
}
