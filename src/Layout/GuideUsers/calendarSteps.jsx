export const calendarSteps = [
  {
    target: "#calendar-component",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          🗓️ Calendário
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Os compromissos aparecem destacados dentro dos dias correspondentes.
        </p>
        <p style={{ margin: "0 0 10px 0" }}>
          Clique sobre o evento para visualizar mais detalhes, editar ou
          excluir.
        </p>
        <p style={{ margin: "0 0 10px 0" }}>
          É possível adicionar novos compromissos clicando no dia desejado.
        </p>
      </div>
    ),
    placement: "bottom",
    disableBeacon: true,
  },
  {
    target: "#input-filter",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          🔎 Filtro
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Aqui você pode filtrar para que fique melhor a visualização da tabela
          de acordo com o que você precisa.
        </p>
      </div>
    ),
    placement: "bottom",
  },
  {
    target: "#btn-filters-clear",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          ❌ Limpar Filtros
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Use o botão para redefinir a visualização.
        </p>
      </div>
    ),
    placement: "bottom",
  },
  {
    target: "#table",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          📋 Tabela de Registros
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Os dados ficam organizados por nome, valor, método de pagamento,
          categoria, tipo de fluxo e ações.
        </p>
        <p style={{ margin: "0 0 10px 0" }}>
          Você pode editar ou excluir qualquer registro caso seja necessário.
        </p>
      </div>
    ),
    placement: "bottom",
  },
  {
    target: "#container-add",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          ➕ Adicionar Registro
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Cadastre um novo fluxo de entrada ou saída.
        </p>
      </div>
    ),
    placement: "bottom",
  },
  {
    target: "#section-category",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          ➕ Adicionar Categoria
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Crie categorias para facilitar a organização do seu caixa.
        </p>
      </div>
    ),
    placement: "bottom",
  },
  {
    target: "#btn-report",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          📊 Relatórios
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Ao clicar você é direcionado para a aba do relatório.
        </p>
      </div>
    ),
    placement: "bottom",
  },
];
