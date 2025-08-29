import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { report } from "../redux/Route/slice";
import style from "./../styles/report.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PuffLoader from "react-spinners/PuffLoader";
import axios from "axios";

export default function Report() {
  const profileinfo = useSelector((state) => state.userReducer.userData);
  const [loading, setLoading] = useState(false);
  const [permissao, setPermissao] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(report());
  }, [dispatch]);

  const [reportData, setReportData] = useState("");
  const [dataArray, setDataArray] = useState([]);

  async function generateReport() {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/report/generateReport`,
        {
          uuid: profileinfo.uuid,
          periodStart: "2022-01-01",
          periodEnd: "2029-01-31",
        }
      );
      console.log(response);
      if (response.status == 200) {
        const report = response.data;
        console.log(report);
        setDataArray(response.data.table);

        setReportData(response.data.report);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const amountValue = dataArray
    .filter((item) => item.type_flow === "Entrada")
    .reduce((acc, curr) => acc + parseFloat(curr.value), 0);

  const expensesValue = dataArray
    .filter((item) => item.type_flow === "Saída")
    .reduce((acc, curr) => acc + parseFloat(curr.value), 0);

  const profitValue = amountValue - expensesValue;

  function dateFormatter(dateString) {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <>
      <DefaultLayout loading={loading}>
        <div className={style.container}>
          {!permissao && (
            <>
              <div className={style.buttonContainer}>
                <div
                  className={style.button}
                  onClick={() => {
                    generateReport();
                    setPermissao(!permissao);
                  }}
                >
                  <span>Gerar Relatório</span>
                  <select className={style.select} onClick={(e) => {e.stopPropagation();
                    console.log(dateFormatter(e.target.value));
                  }}>
                    <option value={new Date()}>Diário</option>
                    <option value={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}>Semanal</option>
                    <option value={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}>Mensal</option>
                    <option value={new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)}>Trimestral</option>
                    <option value={new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)}>Semestral</option>
                    <option value={new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)}>Anual</option>
                  </select>
                </div>
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
                      <th className={style.th}>Data</th>
                      <th className={style.th}>Nome</th>
                      <th className={style.th}>Valor(R$)</th>
                      <th className={style.th}>Metodo de Pagamento</th>
                      <th className={style.th}>Categoria</th>
                      <th className={style.th}>Tipo de Fluxo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataArray.map((data) => (
                      <tr className={style.conteudo} key={data.id}>
                        <td>
                          {data.created_at
                            ? new Date(data.created_at).toLocaleDateString(
                                "pt-BR",
                                { day: "2-digit", month: "2-digit" }
                              )
                            : "N/A"}
                        </td>
                        <td>{data.name}</td>
                        <td>{data.value}</td>
                        <td>{data.payment_method}</td>
                        <td>{data.category}</td>
                        <td className={style.tipoFluxo}>{data.type_flow}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={style.textIA}>
                {reportData ? (
                  <>
                    <h2 className={style.markdownP}>
                      <strong className={style.markdownStrong}>
                        Cálculos:
                      </strong>
                    </h2>
                    <ul class="_markdownUl_mycij_419">
                      <li class="_markdownLi_mycij_433">
                        <b>Total de Entradas:</b> R$ {amountValue.toFixed(2)}
                      </li>
                      <li class="_markdownLi_mycij_433">
                        <b>Total de Saídas:</b> R$ {expensesValue.toFixed(2)}
                      </li>
                      <li class="_markdownLi_mycij_433">
                        <b>Saldo Final:</b> R$ {profitValue.toFixed(2)}
                      </li>
                    </ul>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ node, ...props }) => (
                          <h1 className={style.markdownH1} {...props} />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2 className={style.markdownH2} {...props} />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3 className={style.markdownH3} {...props} />
                        ),
                        p: ({ node, ...props }) => (
                          <p className={style.markdownP} {...props} />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul className={style.markdownUl} {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol className={style.markdownOl} {...props} />
                        ),
                        li: ({ node, ...props }) => (
                          <li className={style.markdownLi} {...props} />
                        ),
                        strong: ({ node, ...props }) => (
                          <strong className={style.markdownStrong} {...props} />
                        ),
                        table: ({ node, ...props }) => (
                          <div className={style.markdownTableContainer}>
                            <table className={style.markdownTable} {...props} />
                          </div>
                        ),
                        thead: ({ node, ...props }) => (
                          <thead className={style.markdownThead} {...props} />
                        ),
                        tbody: ({ node, ...props }) => (
                          <tbody className={style.markdownTbody} {...props} />
                        ),
                        tr: ({ node, ...props }) => (
                          <tr className={style.markdownTr} {...props} />
                        ),
                        th: ({ node, ...props }) => (
                          <th className={style.markdownTh} {...props} />
                        ),
                        td: ({ node, ...props }) => (
                          <td className={style.markdownTd} {...props} />
                        ),
                      }}
                    >
                      {reportData}
                    </ReactMarkdown>
                  </>
                ) : (
                  <p>Carregando análise da IA...</p>
                )}
              </div>
              <div className={style.buttonContainer2}>
                <button className={style.button2} onClick={generateReport}>
                  Atualizar Relatorio
                </button>
              </div>
            </div>
          )}
        </div>
      </DefaultLayout>
    </>
  );
}
