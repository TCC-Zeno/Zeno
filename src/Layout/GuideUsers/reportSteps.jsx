export const reportSteps = [
  {
    target: "#generate-report",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          📊 Gerar Relatório
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Clique aqui para iniciar a criação do relatório.
        </p>
        <div
          style={{
            background: "#f8f9fa",
            padding: "10px",
            borderRadius: "4px",
            margin: "10px 0",
            textAlign: "left",
            paddingLeft: "20px",
          }}
        >
          <p style={{ margin: "5px 0", fontSize: "14px" }}>
             <strong>Diário</strong>: Mostra um resumo das movimentações do
            dia.
            <br />
             <strong>Semanal</strong>: Apresenta dados consolidados da semana
            <br />
             <strong>Mensal</strong>: Exibe o panorama de todo o mês.
            <br />
             <strong>Trimestral</strong>: Exibe o panorama dos últimos 3 mês.
            <br />
             <strong>Semestral</strong>: Exibe o panorama dos últimos 6 mês.
            <br />
             <strong>Anual</strong>: Exibe o panorama do último ano.
          </p>
        </div>
      </div>
    ),
    placement: "bottom",
    disableBeacon: true,
  },
];
