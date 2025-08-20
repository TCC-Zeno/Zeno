export const initSteps = [
  {
    target: "#dashboard",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          🚀 Início
        </h2>
        {/* <p style={{ margin: "0 0 10px 0" }}>
          Visualize todas as informações importantes de forma rápida.
        </p>
        <p>
          Tenha acesso rápido às principais métricas do seu negócio, como resumo
          de caixa, inserção ágil de despesas e receitas, resumos de tarefas e
          detalhes do seu estoque.
        </p> */}
        <p style={{ margin: "0 0 10px 0" }}>
          Acompanhe de forma rápida o resumo de caixa, despesas, receitas,
          tarefas e estoque.
        </p>
      </div>
    ),
    placement: "right",
    disableBeacon: true,
  },
  {
    target: "#stock",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          📦 Estoque
        </h2>
        {/* <p style={{ margin: "0 0 10px 0" }}>
          Adicione produtos ao seu estoque para manter o controle do que está
          disponível.
        </p>
        <p>
          Ao adicionar produtos, você pode definir as informações básicas,
          informar dados do fornecedor para facilitar o reabastecimento, e
          inserir o custo e o preço. Assim, você acompanha seu lucro e margem.
          Além disso, você pode definir a quantidade mínima para que o sistema o
          avise quando o estoque estiver baixo.
        </p> */}
        <p style={{ margin: "0 0 10px 0" }}>
          Controle produtos, preços e receba alertas de reposição.
        </p>
        <p>
          Adicione todos os produtos em um lugar só e saiba o que está em falta
          e oq precisa ser resposto.
        </p>
        <p>
          Cadastre produtos, controle preços, margens e receba alertas de
          reposição.
        </p>
      </div>
    ),
    placement: "right",
  },
  {
    target: "#finance",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          💰 Financeiro
        </h2>
        {/* <p style={{ margin: "0 0 10px 0" }}>
          Controle as entradas e saídas de dinheiro de forma direta e clara.
        </p>
        <p>
          Adicione suas receitas e despesas para ter controle total sobre suas
          finanças. Ao separá-las por categorias, você consegue entender melhor
          para onde seu dinheiro está indo ou de onde ele está vindo.
        </p>
        <p>
          Você também tem acesso rápido às principais métricas do seu negócio,
          vendo as entradas e saídas de acordo com o que foi registrado e com os
          filtros aplicados.
        </p> */}
        <p style={{ margin: "0 0 10px 0" }}>
          Registre entradas e saídas, categorize despesas e receitas e acompanhe
          suas finanças de forma clara.
        </p>
      </div>
    ),
    placement: "right",
  },
  {
    target: "#calendar",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          🗓️ Calendário
        </h2>
        {/* <p style={{ margin: "0 0 10px 0" }}>
          Não perca mais um compromisso. Agende reuniões, entregas e tarefas.
        </p>
        <p>
          Você pode adicionar eventos, tarefas e lembretes para se manter
          organizado, selecionando dias específicos no calendário.
        </p> */}
        <p style={{ margin: "0 0 10px 0" }}>
          Organize os compromissos, as tarefas e prazos para não perder nada
          importante.
        </p>
      </div>
    ),
    placement: "right",
  },
  {
    target: "#tasks",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          ✅ Tarefas
        </h2>
        {/* <p style={{ margin: "0 0 10px 0" }}>
          Organize o que precisa ser feito de forma simples.
        </p>
        <p>
          Utilize o método de organização internacional Kanban para gerenciar
          suas tarefas, movendo-as entre colunas que representam os diferentes
          estágios do fluxo de trabalho.
        </p> */}
        <p style={{ margin: "0 0 10px 0" }}>
          Organize seu trabalho com o método Kanban, movendo atividades entre
          etapas de a fazer fazendo e concluído, também delimite funções para os
          funcionário.
        </p>
      </div>
    ),
    placement: "right",
  },
  {
    target: "#report",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          📊 Relatórios
        </h2>
        {/* <p style={{ margin: "0 0 10px 0" }}>
          Tenha um relatório completo das suas finanças.
        </p>
        <p>
          Gere um relatório detalhado das suas finanças, incluindo receitas,
          despesas e saldo dos últimos 30 dias. Este relatório será gerado por
          uma inteligência artificial do Google que analisará todos os dados
          registrados.
        </p> */}
        <p style={{ margin: "0 0 10px 0" }}>
          Acompanhe receitas, despesas e saldo em relatórios rápidos. Com dicas
          para melhorar a lucratividade da sua empresa.
        </p>
      </div>
    ),
    placement: "right",
  },
  {
    target: "#service",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          🛠️ Serviços
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Gerencie os serviços oferecidos pela sua empresa.
        </p>
        <p>
          Adicione novos serviços, defina preços e gerencie a disponibilidade de
          cada um. Assim, você mantém um controle eficiente, podendo filtrar os
          serviços pelo seu status.
        </p>
      </div>
    ),
    placement: "right",
  },
  {
    target: "#settings",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          ⚙️ Configurações
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Edite e adicione as informações da sua empresa.
        </p>
        <p>
          Adicione as informações da sua empresa para ter um sistema mais
          personalizado. Você também pode alterar o logo e as cores do sistema
          para se adequar à sua identidade visual.
        </p>
        <p>
          Além disso, é possível aplicar filtros de daltonismo para que pessoas
          com essa deficiência visual possam utilizar o sistema de forma mais
          confortável.
        </p>
        <p>
          Você também pode escolher quais funções deseja habilitar ou
          desabilitar no sistema.
        </p>
      </div>
    ),
    placement: "right",
  },
  {
    target: "#support",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          ❓ Ajuda
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Responda suas dúvidas e obtenha suporte quando necessário.
        </p>
        <p>
          Verifique se sua dúvida já foi respondida em nossa FAQ. Se não
          encontrar a resposta, entre em contato com o suporte.
        </p>
      </div>
    ),
    placement: "top",
  },
  {
    target: "#guideButton",
    content: (
      <div>
        <h2
          style={{ fontWeight: "bold", margin: "0 0 15px 0", color: "#2c3e50" }}
        >
          💡 Guia
        </h2>
        <p style={{ margin: "0 0 10px 0" }}>
          Veja pequenas explicações sobre cada funcionalidade.
        </p>
      </div>
    ),
    placement: "left",
  },
];
