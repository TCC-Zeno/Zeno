import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";
import { report } from "../redux/Route/slice";
import style from "./../styles/report.module.css";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import CurrencyInput from "react-currency-input-field";
// import Modal from "../components/Modal/Modal";
import { toast } from "react-toastify";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Report() {
  const contentRef = useRef();
  const profileinfo = useSelector((state) => state.userReducer.userData);
  const [loading, setLoading] = useState(false);
  const [permissao, setPermissao] = useState(false);
  const [dataOfPaymentMethod, setDataOfPaymentMethod] = useState({});
  const [dataOfCategory, setDataOfCategory] = useState({});
  const [dataOfFlowType, setDataOfFlowType] = useState({});
  const [dataOfOthersCount, setDataOfOthersCount] = useState({});
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  // const [modalPermitionOpen, setModalPermitionOpen] = useState(false);

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
  // const [reportData, setReportData] = useState("");
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    dispatch(report());
  }, [dispatch]);

  async function generateReport(start = selectedPeriod) {
    // if (localStorage.getItem("LGPDAccepted") !== "true") {
    //   setModalPermitionOpen(true);
    //   return;
    // }
    const end = dateFormatter(getEndOfDay(new Date()));
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
      if (response.status == 200) {
        toast.success("Relatório gerado com sucesso!");
        setDataArray(response.data.table);
        // setReportData(response.data.report);
      }
    } catch (err) {
      toast.error("Erro ao gerar relatório");
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

  const dataValues = [amountValue, expensesValue, profitValue];

  const generatePDF = async (print = false) => {
    setIsGeneratingPDF(true);
    document.body.classList.add("generating-pdf");
    const element = contentRef.current;

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 12;
    const contentWidth = pageWidth - margin * 2;
    const contentHeight = pageHeight - margin * 2;

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const sections = [
        { selector: ".pdfOnlyHeader", name: "Cabeçalho" },
        { selector: `.${style.containerChart}`, name: "Gráficos" },
        { selector: `.${style.textIA}`, name: "Análise" },
        { selector: `.pdf-only-table`, name: "Tabela" }, // Busca pela classe específica
      ];

      let currentY = margin;
      let pageNumber = 1;
      let isFirstSection = true;

      for (const section of sections) {
        const sectionElement = element.querySelector(section.selector);

        if (!sectionElement) continue;

        await new Promise((resolve) => setTimeout(resolve, 200));

        const canvas = await html2canvas(sectionElement, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: "#ffffff",
          logging: false,
          width: sectionElement.scrollWidth,
          height: sectionElement.scrollHeight,
        });

        const imgData = canvas.toDataURL("image/png", 0.95);
        const imgWidth = contentWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (imgHeight > contentHeight) {
          let remainingHeight = imgHeight;
          let sourceY = 0;

          while (remainingHeight > 0) {
            if (!isFirstSection) {
              pdf.addPage();
              currentY = margin;
              pageNumber++;
            }

            const availableHeight = pageHeight - currentY - margin;
            const sectionHeight = Math.min(availableHeight, remainingHeight);
            const sourceHeight = (sectionHeight * canvas.height) / imgHeight;

            const tempCanvas = document.createElement("canvas");
            const tempCtx = tempCanvas.getContext("2d");
            tempCanvas.width = canvas.width;
            tempCanvas.height = sourceHeight;

            tempCtx.fillStyle = "#ffffff";
            tempCtx.fillRect(0, 0, canvas.width, sourceHeight);

            tempCtx.drawImage(
              canvas,
              0,
              sourceY,
              canvas.width,
              sourceHeight,
              0,
              0,
              canvas.width,
              sourceHeight
            );

            const sectionImgData = tempCanvas.toDataURL("image/png", 0.95);
            pdf.addImage(
              sectionImgData,
              "PNG",
              margin,
              currentY,
              imgWidth,
              sectionHeight
            );

            pdf.setFontSize(8);
            pdf.setTextColor(128, 128, 128);
            pdf.text(
              `Página ${pageNumber}`,
              pageWidth - margin - 15,
              pageHeight - 5
            );

            sourceY += sourceHeight;
            remainingHeight -= sectionHeight;
            currentY += sectionHeight;
            isFirstSection = false;
          }
        } else {
          if (currentY + imgHeight > pageHeight - margin) {
            pdf.addPage();
            currentY = margin;
            pageNumber++;
          }

          pdf.addImage(imgData, "PNG", margin, currentY, imgWidth, imgHeight);

          pdf.setFontSize(8);
          pdf.setTextColor(128, 128, 128);
          pdf.text(
            `Página ${pageNumber}`,
            pageWidth - margin - 15,
            pageHeight - 5
          );

          currentY += imgHeight + 5;
          isFirstSection = false;
        }
      }

      const timestamp = new Date().toISOString().split("T")[0];

      if (print) {
        pdf.autoPrint();
        window.open(pdf.output("bloburl"), "_blank");
      } else {
        pdf.save(`relatorio_financeiro_${timestamp}.pdf`);
      }

      toast.success("PDF gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast.error("Erro ao gerar PDF. Tente novamente.");
    } finally {
      document.body.classList.remove("generating-pdf"); // Remove classe do body
      setIsGeneratingPDF(false);
    }
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
    setDataOfOthersCount({
      labels: ["Total de Entradas", "Total de Saídas", "Saldo Final"],
      datasets: [
        {
          label: "Resumo financeiro",
          data: dataValues,
          backgroundColor: [
            "rgba(76, 175, 80, 0.2)",
            "rgba(244, 67, 54, 0.2)",
            "rgba(33, 150, 243, 0.2)",
          ],
          borderColor: [
            "rgba(76, 175, 80, 1)",
            "rgba(244, 67, 54, 1)",
            "rgba(33, 150, 243, 1)",
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
                  id="generate-report"
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
                    }}
                  >
                    <option value="daily">Diário</option>
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
                <div
                  className={style.containerReport}
                  ref={contentRef}
                  id="report-content"
                >
                  {isGeneratingPDF && (
                    <div
                      className="pdfOnlyHeader"
                      style={{ padding: "20px", marginBottom: "20px" }}
                    >
                      <h1
                        style={{ margin: 0, fontSize: "24pt", color: "#333" }}
                      >
                        RELATÓRIO FINANCEIRO DETALHADO
                      </h1>
                      <p style={{ margin: "10px 0" }}>
                        <strong>Data de geração:</strong>{" "}
                        {new Date().toLocaleString("pt-BR")}
                      </p>
                      <p style={{ margin: "5px 0" }}>
                        <strong>Usuário:</strong>{" "}
                        {profileinfo.company_name || "N/A"}
                      </p>
                      <p style={{ margin: "5px 0" }}>
                        <strong>Período:</strong> {selectedPeriod} até{" "}
                        {new Date().toLocaleDateString("pt-BR")}
                      </p>
                      <p style={{ margin: "5px 0" }}>
                        <strong>Total de transações:</strong> {dataArray.length}
                      </p>
                      <hr
                        style={{ margin: "20px 0", border: "1px solid #ccc" }}
                      />
                    </div>
                  )}

                  <div className={style.title}>
                    <h2>
                      {isGeneratingPDF
                        ? "Relatório Completo"
                        : "Tabela do Relatório"}
                    </h2>
                  </div>

                  {!isGeneratingPDF && (
                    <div
                      className={`${style.containerTable} screen-only-table`}
                    >
                      <table className={style.table}>
                        <thead className={style.thead}>
                          <tr className={style.tr}>
                            <th className={style.th}>Data</th>
                            <th className={style.th}>Nome</th>
                            <th className={style.th}>Valor(R$)</th>
                            <th className={style.th}>Método de Pagamento</th>
                            <th className={style.th}>Categoria</th>
                            <th className={style.th}>Tipo de Fluxo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataArray.map((data) => (
                            <tr className={style.conteudo} key={data.id}>
                              <td>
                                {data.created_at
                                  ? new Date(
                                      data.created_at
                                    ).toLocaleDateString("pt-BR", {
                                      day: "2-digit",
                                      month: "2-digit",
                                    })
                                  : "N/A"}
                              </td>
                              <td>{data.name}</td>
                              <td className={style.valueTable}>
                                R${" "}
                                <CurrencyInput
                                  decimalSeparator=","
                                  groupSeparator="."
                                  value={data.value.toFixed(2)}
                                  className={style.currencyInput}
                                  disabled
                                />
                              </td>
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
                  )}

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
                      <h2 className={style.titleChart}>Resumo de caixa</h2>
                      <Doughnut data={dataOfOthersCount} />
                    </div>
                  </div>

                  <div className={style.textIA}>
                    {/* {reportData ? ( */}
                    <>
                      <h2 className={style.markdownP}>
                        <strong className={style.markdownStrong}>
                          Cálculos:
                        </strong>
                      </h2>
                      <ul className={style.markdownUl}>
                        <li className={style.Li}>
                          <b>Total de Entradas:</b> R${" "}
                          <CurrencyInput
                            decimalSeparator=","
                            groupSeparator="."
                            value={amountValue.toFixed(2)}
                            className={style.currencyInput}
                            disabled
                          />
                        </li>
                        <li className={style.Li}>
                          <b>Total de Saídas:</b> R${" "}
                          <CurrencyInput
                            decimalSeparator=","
                            groupSeparator="."
                            value={expensesValue.toFixed(2)}
                            className={style.currencyInput}
                            disabled
                          />
                        </li>
                        <li className={style.Li}>
                          <b>Saldo Final:</b> R${" "}
                          <CurrencyInput
                            decimalSeparator=","
                            groupSeparator="."
                            value={profitValue.toFixed(2)}
                            className={style.currencyInput}
                            disabled
                          />
                        </li>
                      </ul>

                      {/* <ReactMarkdown
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
                        </ReactMarkdown> */}
                    </>
                    {/* ) : (
                      <p>Carregando análise da IA...</p>
                    )} */}
                  </div>

                  {isGeneratingPDF && (
                    <div className={`${style.containerTable} pdf-only-table`}>
                      <div className={style.title}>
                        <h2>Detalhamento de Transações</h2>
                      </div>
                      <table className={style.table}>
                        <thead className={style.thead}>
                          <tr className={style.tr}>
                            <th className={style.th}>Data</th>
                            <th className={style.th}>Nome</th>
                            <th className={style.th}>Valor(R$)</th>
                            <th className={style.th}>Método de Pagamento</th>
                            <th className={style.th}>Categoria</th>
                            <th className={style.th}>Tipo de Fluxo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataArray.map((data) => (
                            <tr className={style.conteudo} key={data.id}>
                              <td>
                                {data.created_at
                                  ? new Date(
                                      data.created_at
                                    ).toLocaleDateString("pt-BR", {
                                      day: "2-digit",
                                      month: "2-digit",
                                    })
                                  : "N/A"}
                              </td>
                              <td>{data.name}</td>
                              <td className={style.valueTable}>
                                R${" "}
                                <CurrencyInput
                                  decimalSeparator=","
                                  groupSeparator="."
                                  value={data.value.toFixed(2)}
                                  className={style.currencyInput}
                                  disabled
                                />
                              </td>
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
                  )}
                </div>

                <div className={style.buttonContainer2}>
                  <button
                    className={style.button2}
                    onClick={generateReport}
                    disabled={loading}
                  >
                    Atualizar Relatório
                  </button>
                  <button
                    className={style.button2}
                    onClick={() => generatePDF(false)}
                    disabled={loading || isGeneratingPDF}
                  >
                    {isGeneratingPDF ? "Gerando PDF..." : "Baixar PDF"}
                  </button>
                  <button
                    className={style.button2}
                    onClick={() => generatePDF(true)}
                    disabled={loading || isGeneratingPDF}
                  >
                    {isGeneratingPDF
                      ? "Preparando Impressão..."
                      : "Imprimir PDF"}
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
        {/* <Modal
          isOpen={modalPermitionOpen}
          onClose={() => setModalPermitionOpen(false)}
        >
          <div className={style.modalContainer}>
            <h1 className={style.title}>Permissão Necessária</h1>
            <p>
              Para gerar relatórios, é necessário aceitar nossa política de
              privacidade e termos de uso, garantindo a conformidade com a LGPD.
            </p>
            <p style={{ marginTop: "10px" }}>
              Ao aceitar você concorda que TODOS os dados inseridos na página
              Fluxo de Caixa possam ser enviados para a inteligência artificial
              do Google, que gerará relatórios baseados nas suas transações.
            </p>
            <div className={style.modalButtons}>
              <button
                className={style.cancelButton}
                onClick={() => setModalPermitionOpen(false)}
              >
                Recusar
              </button>
              <button
                className={style.acceptButton}
                onClick={() => {
                  localStorage.setItem("LGPDAccepted", "true");
                  setModalPermitionOpen(false);
                }}
              >
                Aceitar
              </button>
            </div>
          </div>
        </Modal> */}
      </DefaultLayout>
    </>
  );
}
