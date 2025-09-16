export const stockSteps = [
  {
    target: "#card-add",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          ➕ Cadastro de Produtos
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Cadastre seus produtos para visualizá-los rapidamente no estoque.
        </p>
      </div>
    ),
    placement: "right",
    disableBeacon: true,
  },
  {
    target: "#input-filter",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          🔍 Busca Rápida
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Use a pesquisa por nome do produto ou descrição para encontrar
          rapidamente.
        </p>
      </div>
    ),
    placement: "bottom",
  },
  {
    target: "#btn-filters",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          🔍 Filtros
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Aplique filtros para encontrar o que procura de forma mais rápida.
        </p>
      </div>
    ),
    placement: "bottom",
  },
  {
    target: "#card-view",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          📦 Produtos
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Veja um breve resumo de cada produto.
        </p>
        <p style={{ margin: "0 0 10px 0" }}>
          <strong>Dica: </strong> Clique no item para visualizar informações
          detalhadas do produto e do fornecedor.
        </p>
      </div>
    ),
    placement: "bottom",
  },
  {
    target: "#actions-card",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          ✔️ Ações Rápidas
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          É possível adicionar ou retirar produtos de maneira rápida.
        </p>
      </div>
    ),
    placement: "bottom",
  },
];
