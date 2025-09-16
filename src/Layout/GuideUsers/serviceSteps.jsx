export const serviceSteps = [
  {
    target: "#status-container",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          📊 Visão Geral dos Serviços
        </h2>
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
            <strong>Agendados </strong>: Mostra quantos serviços estão marcados
            para acontecer.
            <br />
            <strong>Em Andamento </strong>: Exibe os serviços que já começaram.
            <br />
            <strong>Concluídos </strong>: Lista os serviços finalizados.
            <br />
            <strong>Valor Recebido </strong>: Soma o valor total dos serviços
            concluídos.
            <br />
          </p>
        </div>
      </div>
    ),
    placement: "bottom",
    disableBeacon: true,
  },
  {
    target: "#add-service",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          📊 Gerar Relatório
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Adicionar Serviço (+) → Clique no botão vermelho para cadastrar um
          novo serviço, informando dados como cliente, data e valor.
        </p>
      </div>
    ),
    placement: "bottom",
    disableBeacon: true,
  },
];
