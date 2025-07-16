import { useDispatch } from "react-redux";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/Accordion/Accordion";
import { support } from "../redux/Route/slice";
import S from "./../styles/support.module.css";

export function Support() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(support());
  }, [dispatch]);
  return (
    <DefaultLayout>
      <div className={S.container}>
        <div className={S.docker}>
          <h1>Perguntas frequentes</h1>
          <div className={S.accordionContainer}>
            <Accordion type="single" collapsible className={S.accordion}>
              <AccordionItem value="item-1">
                <AccordionTrigger className={S.accordionTitle}>
                  1 - O que é o Zeno?
                </AccordionTrigger>
                <AccordionContent className={S.accordionContent}>
                  <p>
                    O zeno é um sistema de gestão integrado desenvolvido para
                    pequenos empreendedores que atuam no comércio e na prestação
                    de serviços.
                  </p>
                  <p>
                    Ele ajuda a organizar tarefas, controlar o fluxo de caixa e
                    gerenciar o estoque de maneira eficiente.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className={S.accordionTitle}>
                  1 - O que é o Zeno?
                </AccordionTrigger>
                <AccordionContent className={S.accordionContent}>
                  <p>
                    O zeno é um sistema de gestão integrado desenvolvido para
                    pequenos empreendedores que atuam no comércio e na prestação
                    de serviços.
                  </p>
                  <p>
                    Ele ajuda a organizar tarefas, controlar o fluxo de caixa e
                    gerenciar o estoque de maneira eficiente.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className={S.accordionTitle}>
                  1 - O que é o Zeno?
                </AccordionTrigger>
                <AccordionContent className={S.accordionContent}>
                  <p>
                    O zeno é um sistema de gestão integrado desenvolvido para
                    pequenos empreendedores que atuam no comércio e na prestação
                    de serviços.
                  </p>
                  <p>
                    Ele ajuda a organizar tarefas, controlar o fluxo de caixa e
                    gerenciar o estoque de maneira eficiente.
                  </p>
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
