export const tasksSteps = [
  {
    target: "#todo-column",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          📝 Coluna A Fazer
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Lista de tarefas que ainda não foram iniciadas.
        </p>
      </div>
    ),
    placement: "bottom",
    disableBeacon: true,
  },
  {
    target: "#doing-column",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          📝 Coluna Em Andamento
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Tarefas que já começaram a ser executadas.
        </p>
      </div>
    ),
    placement: "bottom",
  },
  {
    target: "#done-column",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          📝 Coluna Concluído
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>Tarefas finalizadas.</p>
      </div>
    ),
    placement: "bottom",
  },
  {
    target: "#todo-column #btn-add-task",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          ➕ Adicionar Tarefa
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Clique em <strong>“+ Adicionar uma tarefa”</strong> em qualquer coluna
          para criar uma nova atividade.
        </p>
      </div>
    ),
    placement: "bottom",
  },
  {
    target: "#organizer",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          ➕ Adicionar Tarefa
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Utilize as três colunas como um fluxo de progresso:
        </p>
        <ul style={{ margin: "10px 0 0 20px", padding: "0", listStyleType: "disc", textAlign: "left" }}>
          <li style={{ marginBottom: "5px" }}>Crie a tarefa em <strong>A Fazer</strong>;</li>
          <li style={{ marginBottom: "5px" }}>
            Mova para <strong>Em andamento</strong> quando começar;
          </li>
          <li>Finalize em <strong>Concluído</strong>.</li>
        </ul>
      </div>
    ),
    placement: "bottom",
  },
];
