import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { report } from "../redux/Route/slice";
import style from "./../styles/report.module.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function Report() {
  const [permissao, setPermissao] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(report());
  }, [dispatch]);

  const dataArray = [
    {
      id: 1,
      name: "Produto A",
      value: "R$ 100,00",
      method: "Cartão de crédito",
      category: "Compras",
      flow: "Entrada",
    },
    {
      id: 2,
      name: "Produto B",
      value: "R$ 200,00",
      method: "Dinheiro",
      category: "Contas",
      flow: "Saída",
    },
    {
      id: 3,
      name: "Produto C",
      value: "R$ 150,00",
      method: "Pix",
      category: "Manutenção",
      flow: "Entrada",
    },
    {
      id: 4,
      name: "Produto D",
      value: "R$ 300,00",
      method: "Cartão de débito",
      category: "Outros",
      flow: "Saída",
    },
    {
      id: 5,
      name: "Produto E",
      value: "R$ 250,00",
      method: "Cartão de crédito",
      category: "Compras",
      flow: "Entrada",
    },
    {
      id: 6,
      name: "Produto F",
      value: "R$ 400,00",
      method: "Dinheiro",
      category: "Contas",
      flow: "Saída",
    },
  ];

  return (
    <>
      <DefaultLayout>
        <div className={style.container}>
          {!permissao && (
            <>
              <div className={style.buttonContainer}>
                <button
                  className={style.button}
                  onClick={() => setPermissao(!permissao)}
                >
                  Gerar Relatório
                </button>
              </div>
            </>
          )}

          {permissao && (
            <div className={style.containerReport}>
              <div className={style.title}>
                <h2>Resumo do Relatório</h2>
              </div>
              <div className={style.containerTable}>
                <table className={style.table}>
                  <thead className={style.thead}>
                    <tr className={style.tr}>
                      <th className={style.th}>Nome</th>
                      <th className={style.th}>Valor(R$)</th>
                      <th className={style.th}>Metodo de Pagamento</th>
                      <th className={style.th}>Categoria</th>
                      <th className={style.th}>Tipo de Fluxo</th>
                      <th className={style.th}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Eu fiz uma map de um array só para ter como base, mas provavelmente os nomes irão mudar, mas isso o Backend decide */}
                    {dataArray.map((data) => (
                      <tr className={style.conteudo} key={data.id}>
                        <td>{data.name}</td>
                        <td>{data.value}</td>
                        <td>{data.method}</td>
                        <td>{data.category}</td>
                        <td className={style.tipoFluxo}>{data.flow}</td>
                        <td className={style.action}>
                          <button id="edit-button">
                            <FaEdit className={style.iconEdit} />
                          </button>
                          <button id="delete-button">
                            <MdDelete className={style.iconDelete} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {/* Esse é o padrão que o Goias fez */}
                    <tr className={style.conteudo}>
                      <td>José Eduardo</td>
                      <td>R$ 2000,00</td>
                      <td>Cartão de Crédito</td>
                      <td>asdadadedasda</td>
                      <td className={style.tipoFluxo}>Entrada</td>
                      <td className={style.action}>
                        <button>
                          <FaEdit className={style.iconEdit} />
                        </button>
                        <button>
                          <MdDelete className={style.iconDelete} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={style.textIA}>
                <p>
                  Aqui vai ficar as coisas que a IA vai falar sobre o relatorio
                </p>
              </div>
              <div className={style.buttonContainer2}>
                <button className={style.button2}>Atualizar Relatorio</button>
              </div>
            </div>
          )}
        </div>
      </DefaultLayout>
    </>
  );
}
