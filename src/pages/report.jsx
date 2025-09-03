import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { report } from "../redux/Route/slice";
import style from "./../styles/report.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import CurrencyInput from "react-currency-input-field";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Report() {
  const contentRef = useRef();
  const profileinfo = useSelector((state) => state.userReducer.userData);
  const [loading, setLoading] = useState(false);
  const [permissao, setPermissao] = useState(false);
  const [dataOfPaymentMethod, setDataOfPaymentMethod] = useState({});
  const [dataOfCategory, setDataOfCategory] = useState({});
  const [dataOfFlowType, setDataOfFlowType] = useState({});

  function dateFormatter(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getStartOfDay(date) {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }

  function getEndOfDay(date) {
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59, 999);
    return newDate;
  }

  function getStartOfWeek(date) {
    const newDate = new Date(date);
    const day = newDate.getDay();
    const diff = newDate.getDate() - day;
    newDate.setDate(diff);
    return getStartOfDay(newDate);
  }

  function calculatePeriodDates(option) {
    const now = new Date();
    switch (option) {
      case "daily":
        return dateFormatter(getStartOfDay(now));
      case "weekly":
        return dateFormatter(getStartOfWeek(now));
      case "monthly":
        return dateFormatter(
          new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        );
      case "quarterly":
        return dateFormatter(
          new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        );
      case "semesterly":
        return dateFormatter(
          new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000)
        );
      case "yearly":
        return dateFormatter(
          new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        );
      default:
        return dateFormatter(
          new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        );
    }
  }

  const [selectedPeriod, setSelectedPeriod] = useState(
    calculatePeriodDates("daily")
  );
  const dispatch = useDispatch();
  const [reportData, setReportData] = useState("");
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    dispatch(report());
  }, [dispatch]);

  async function generateReport(start = selectedPeriod) {
    const end = dateFormatter(getEndOfDay(new Date()));
    console.log(end, start);
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/report/generateReport`,
        {
          uuid: profileinfo.uuid,
          periodStart: start,
          periodEnd: end,
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

  const generatePDF = async () => {
    const element = contentRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = 210;
    const pageHeight = 297;

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("documento.pdf");
  };

  function countDataOfPaymentMethod() {
    return dataArray.reduce((acumulador, item) => {
      const paymentMethod = item.payment_method || "Desconhecido";
      acumulador[paymentMethod] = (acumulador[paymentMethod] || 0) + 1;
      return acumulador;
    }, {});
  }

  function countDataOfCategory() {
    return dataArray.reduce((acumulador, item) => {
      const category = item.category || "Desconhecida";
      acumulador[category] = (acumulador[category] || 0) + 1;
      return acumulador;
    }, {});
  }

  function countDataOfFlowType() {
    return dataArray.reduce((acumulador, item) => {
      const flowType = item.type_flow || "Desconhecido";
      acumulador[flowType] = (acumulador[flowType] || 0) + 1;
      return acumulador;
    }, {});
  }

  useEffect(() => {
    const paymentMethodCounts = countDataOfPaymentMethod();
    const categoryCounts = countDataOfCategory();
    const flowTypeCounts = countDataOfFlowType();

    setDataOfPaymentMethod({
      labels: Object.keys(paymentMethodCounts),
      datasets: [
        {
          label: "Vezes pagas com esse método",
          data: Object.values(paymentMethodCounts),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
    setDataOfCategory({
      labels: Object.keys(categoryCounts),
      datasets: [
        {
          label: "Quantas vezes essa categoria",
          data: Object.values(categoryCounts),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
    setDataOfFlowType({
      labels: Object.keys(flowTypeCounts),
      datasets: [
        {
          label: "Quantas vezes esse tipo de fluxo",
          data: Object.values(flowTypeCounts),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [dataArray]);

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
                    generateReport(selectedPeriod);
                    setPermissao(!permissao);
                  }}
                >
                  <span>Gerar Relatório</span>
                  <select
                    className={style.select}
                    defaultValue="daily"
                    onChange={(e) => {
                      const periodDate = calculatePeriodDates(e.target.value);
                      setSelectedPeriod(periodDate);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(e.target.value);
                    }}
                  >
                    <option defaultChecked value="daily">
                      Diário
                    </option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensal</option>
                    <option value="quarterly">Trimestral</option>
                    <option value="semesterly">Semestral</option>
                    <option value="yearly">Anual</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {permissao ? (
            dataArray.length > 0 ? (
              <div className={style.containerReport}>
                <div className={style.containerReport} ref={contentRef}>
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
                            <td className={style.valueTable}>R$ <CurrencyInput decimalSeparator="," groupSeparator="." value={data.value.toFixed(2)} className={style.currencyInput} /></td>
                            <td>{data.payment_method}</td>
                            <td>{data.category}</td>
                            <td className={style.tipoFluxo}>
                              {data.type_flow}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className={style.containerChart}>
                    <div className={style.cardChart}>
                      <h2 className={style.titleChart}>Métodos de Pagamento</h2>
                      <Doughnut data={dataOfPaymentMethod} />
                    </div>
                    <div className={style.cardChart}>
                      <h2 className={style.titleChart}>Categorias</h2>
                      <Doughnut data={dataOfCategory} />
                    </div>
                    <div className={style.cardChart}>
                      <h2 className={style.titleChart}>Tipos de Fluxo</h2>
                      <Doughnut data={dataOfFlowType} />
                    </div>
                    <div className={style.cardChart}>
                      <h2 className={style.titleChart}>
                        Não sei oq colocar pra ficar par
                      </h2>
                      <Doughnut data={dataOfPaymentMethod} />
                    </div>
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
                          <li className={style.Li}>
                            <b>Total de Entradas:</b> R${" "}
                            <CurrencyInput decimalSeparator="," groupSeparator="." value={amountValue.toFixed(2)} className={style.currencyInput} />
                          </li>
                          <li className={style.Li}>
                            <b>Total de Saídas:</b> R${" "}
                            <CurrencyInput decimalSeparator="," groupSeparator="." value={expensesValue.toFixed(2)} className={style.currencyInput} />
                          </li>
                          <li className={style.Li}>
                            <b>Saldo Final:</b> R$ <CurrencyInput decimalSeparator="," groupSeparator="." value={profitValue.toFixed(2)} className={style.currencyInput} />
                          </li>
                        </ul>
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: (props) => (
                              <h1 className={style.markdownH1} {...props} />
                            ),
                            h2: (props) => (
                              <h2 className={style.markdownH2} {...props} />
                            ),
                            h3: (props) => (
                              <h3 className={style.markdownH3} {...props} />
                            ),
                            p: (props) => (
                              <p className={style.markdownP} {...props} />
                            ),
                            ul: (props) => (
                              <ul className={style.markdownUl} {...props} />
                            ),
                            ol: (props) => (
                              <ol className={style.markdownOl} {...props} />
                            ),
                            li: (props) => (
                              <li className={style.markdownLi} {...props} />
                            ),
                            strong: (props) => (
                              <strong
                                className={style.markdownStrong}
                                {...props}
                              />
                            ),
                            table: (props) => (
                              <div className={style.markdownTableContainer}>
                                <table
                                  className={style.markdownTable}
                                  {...props}
                                />
                              </div>
                            ),
                            thead: (props) => (
                              <thead
                                className={style.markdownThead}
                                {...props}
                              />
                            ),
                            tbody: (props) => (
                              <tbody
                                className={style.markdownTbody}
                                {...props}
                              />
                            ),
                            tr: (props) => (
                              <tr className={style.markdownTr} {...props} />
                            ),
                            th: (props) => (
                              <th className={style.markdownTh} {...props} />
                            ),
                            td: (props) => (
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
                </div>
                <div className={style.buttonContainer2}>
                  <button className={style.button2} onClick={generateReport}>
                    Atualizar Relatorio
                  </button>
                  <button
                    className={style.button2}
                    onClick={() => generatePDF()}
                  >
                    Baixar PDF
                  </button>
                </div>
              </div>
            ) : (
              <div className={style.container}>
                <h1 className={style.title}>
                  Não possui dados suficientes para gerar relatórios.
                </h1>
              </div>
            )
          ) : null}
        </div>
      </DefaultLayout>
    </>
  );
}
