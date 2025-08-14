export const dashboardSteps = [
  {
    target: ".sectionCash",
    content: (
      <div>
        <h2 style={{ margin: "0 0 15px 0", color: "#2c3e50" }}>
          Resumo de Caixa
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Aqui você tem uma <strong>visão geral das finanças</strong> da sua
          empresa.
        </p>
        <div
          style={{
            background: "#f8f9fa",
            padding: "10px",
            borderRadius: "4px",
            margin: "10px 0",
          }}
        >
          <p style={{ margin: "5px 0", fontSize: "14px" }}>
            📊 <strong>Montante</strong>: Total movimentado
            <br />
            📈 <strong>Lucro</strong>: Resultado positivo
            <br />
            📉 <strong>Despesas</strong>: Custos do período
          </p>
        </div>
        <p
          style={{
            fontSize: "12px",
            color: "#7f8c8d",
            margin: "10px 0 0 0",
          }}
        >
          💡 Dica: Use os filtros de período para análises mais específicas!
        </p>
      </div>
    ),
    placement: "bottom",
    disableBeacon: true,
    styles: {
      tooltip: {
        width: "350px",
      },
    },
  },
  {
    target: "#cash-summary-period",
    content: (
      <div>
        <h3 style={{ margin: "0 0 10px 0" }}>🗓️ Filtro de Período</h3>
        <p>
          Selecione entre <strong>Diário</strong>, <strong>Mensal</strong> ou{" "}
          <strong>Anual</strong> para ver diferentes perspectivas dos seus
          dados.
        </p>
      </div>
    ),
    placement: "bottom",
  },
  {
    target: ".sectionFinance",
    content: (
      <div>
        <h2 style={{ margin: "0 0 15px 0", color: "#2c3e50" }}>
          💳 Fluxo de Caixa
        </h2>
        <p>
          Este é o <strong>coração do sistema financeiro</strong>. Aqui você
          registra todas as movimentações:
        </p>
        <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
          <li>
            <strong>Entradas</strong>: Vendas, recebimentos
          </li>
          <li>
            <strong>Saídas</strong>: Compras, despesas
          </li>
        </ul>
        <p style={{ fontSize: "12px", color: "#7f8c8d" }}>
          ⚡ Os dados inseridos aqui alimentam automaticamente o Resumo de
          Caixa!
        </p>
      </div>
    ),
    placement: "top",
  },
  {
    target: "#input-name",
    content: (
      <div>
        <h3 style={{ margin: "0 0 10px 0" }}>👤 Nome da Transação</h3>
        <p>
          Digite o nome da pessoa ou descrição da transação para facilitar a
          identificação posteriormente.
        </p>
      </div>
    ),
    placement: "bottom",
  },
  {
    target: ".sectionOrganizer",
    content: (
      <div>
        <h2 style={{ margin: "0 0 15px 0", color: "#2c3e50" }}>
          📋 Organizador Diário
        </h2>
        <p>
          Gerencie suas tarefas com o método <strong>Kanban</strong>:
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "15px 0",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                background: "#e74c3c",
                color: "white",
                padding: "5px",
                borderRadius: "3px",
                fontSize: "12px",
              }}
            >
              A FAZER
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                background: "#f39c12",
                color: "white",
                padding: "5px",
                borderRadius: "3px",
                fontSize: "12px",
              }}
            >
              EM ANDAMENTO
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                background: "#27ae60",
                color: "white",
                padding: "5px",
                borderRadius: "3px",
                fontSize: "12px",
              }}
            >
              CONCLUÍDO
            </div>
          </div>
        </div>
      </div>
    ),
    placement: "top",
  },
  {
    target: ".sectionStock",
    content: (
      <div>
        <h2 style={{ margin: "0 0 15px 0", color: "#2c3e50" }}>
          📦 Controle de Estoque
        </h2>
        <p>Mantenha seu inventário sempre organizado:</p>
        <div
          style={{
            background: "#f8f9fa",
            padding: "10px",
            borderRadius: "4px",
            margin: "10px 0",
          }}
        >
          <p style={{ margin: "5px 0", fontSize: "14px" }}>
            ✅ <strong>Em estoque</strong>: Produtos disponíveis
            <br />
            ⚠️ <strong>Para repor</strong>: Baixo estoque
            <br />
            🛒 <strong>Para comprar</strong>: Produtos em falta
          </p>
        </div>
        <p style={{ fontSize: "12px", color: "#7f8c8d" }}>
          🎯 Nunca mais perca vendas por falta de produtos!
        </p>
      </div>
    ),
    placement: "top",
  },
];
