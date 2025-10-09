import { getFinanceWithPeriod } from "../services/financeService.js";
// import { createReport } from "../services/reportService.js";

export async function generateReport(req, res) {
  try {
    const { uuid, periodStart, periodEnd } = req.body;
    if (!uuid) {
      throw new Error("Sem uuid do usuario");
    }
    const tableData = await getFinanceWithPeriod(uuid, periodStart, periodEnd);

    // const response = await createReport(tableData);
    const response = "Esse recurso está temporariamente indisponível.";

    res.json({ table: tableData, report: response });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ error: err.message || "Erro desconhecido ao gerar relatório" });
  }
}
