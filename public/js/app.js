listarProdutos();

function listarProdutos() {
  const mensagem = document.getElementById("mensagem");

  fetch("/produtos")
    .then(function (resposta) {
      return resposta.json();
    })  
    .then(function (produtos) {
      montarTabela(produtos);
    })
    .catch(function (erro) {
      console.log(erro);
      mensagem.innerText = "Não foi possível carregar os produtos.";
    });
}

function montarTabela(produtos) {
  const tabelaCorpo = document.getElementById("tabela-corpo");

  tabelaCorpo.innerHTML = "";

  for (let i = 0; i < produtos.length; i++) {
    const produto = produtos[i];

    const linha = document.createElement("tr");
    linha.innerHTML =
      "<td>" +
      produto.id +
      "</td>" +
      "<td>" +
      produto.nome +
      "</td>" +
      "<td>R$ " +
      produto.preco.toFixed(2) +
      "</td>" +
      "<td>" +
      produto.categoria +
      "</td>" +
      "<td>" +
      produto.estoque +
      "</td>" +
      "<td>" +
      "<button class='btn-editar' onclick='editarProduto(" +
      produto.id +
      ")'>Editar</button> " +
      "<button class='btn-excluir' onclick='excluirProduto(" +
      produto.id +
      ")'>Excluir</button>" +
      "</td>";

    tabelaCorpo.appendChild(linha);
  }
}

const form = document.getElementById("form-produto");

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const inputId = document.getElementById("produto-id");
  const inputNome = document.getElementById("nome");
  const inputPreco = document.getElementById("preco");
  const inputCategoria = document.getElementById("categoria");
  const inputEstoque = document.getElementById("estoque");
  const mensagem = document.getElementById("mensagem");

  const nome = inputNome.value;
  const preco = inputPreco.value;
  const categoria = inputCategoria.value;
  const estoque = inputEstoque.value;

  if (nome === "" || categoria === "") {
    mensagem.innerText = "Preencha todos os campos obrigatórios.";
    return;
  }

  if (isNaN(preco) || preco < 0) {
    mensagem.innerText = "Informe um preço válido.";
    return;
  }

  if (isNaN(estoque) || estoque < 0) {
    mensagem.innerText = "Informe um estoque válido.";
    return;
  }

  const produto = {
    nome: nome,
    preco: parseFloat(preco),
    categoria: categoria,
    estoque: parseInt(estoque),
  };

  if (inputId.value === "") {
    cadastrarProduto(produto);
  } else {
    atualizarProduto(inputId.value, produto);
  }
});

function cadastrarProduto(produto) {
  const mensagem = document.getElementById("mensagem");

  fetch("/produtos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  })
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error("erro ao cadastrar");
      }
      mensagem.innerText = "Produto cadastrado com sucesso!";
      limparFormulario();
      listarProdutos();
    })
    .catch(function (erro) {
      console.log(erro);
      mensagem.innerText = "Não foi possível cadastrar o produto.";
    });
}

function editarProduto(id) {
  const mensagem = document.getElementById("mensagem");

  fetch("/produtos/" + id)
    .then(function (resposta) {
      return resposta.json();
    })
    .then(function (produto) {
      preencherFormulario(produto);
    })
    .catch(function (erro) {
      console.log(erro);
      mensagem.innerText = "Não foi possível carregar o produto.";
    });
}

function atualizarProduto(id, produto) {
  const mensagem = document.getElementById("mensagem");

  fetch("/produtos/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  })
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error("erro ao atualizar");
      }
      mensagem.innerText = "Produto atualizado com sucesso!";
      limparFormulario();
      listarProdutos();
    })
    .catch(function (erro) {
      console.log(erro);
      mensagem.innerText = "Não foi possível atualizar o produto.";
    });
}

function excluirProduto(id) {
  const confirmar = confirm("Tem certeza que deseja excluir este produto?");

  if (!confirmar) {
    return;
  }

  const mensagem = document.getElementById("mensagem");

  fetch("/produtos/" + id, {
    method: "DELETE",
  })
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error("erro ao excluir");
      }
      mensagem.innerText = "Produto excluído com sucesso!";
      listarProdutos();
    })
    .catch(function (erro) {
      console.log(erro);
      mensagem.innerText = "Não foi possível excluir o produto.";
    });
}

function preencherFormulario(produto) {
  const inputId = document.getElementById("produto-id");
  const inputNome = document.getElementById("nome");
  const inputPreco = document.getElementById("preco");
  const inputCategoria = document.getElementById("categoria");
  const inputEstoque = document.getElementById("estoque");
  const formTitulo = document.getElementById("form-titulo");

  inputId.value = produto.id;
  inputNome.value = produto.nome;
  inputPreco.value = produto.preco;
  inputCategoria.value = produto.categoria;
  inputEstoque.value = produto.estoque;
  formTitulo.innerText = "Editar Produto";
}

function limparFormulario() {
  const inputId = document.getElementById("produto-id");
  const inputNome = document.getElementById("nome");
  const inputPreco = document.getElementById("preco");
  const inputCategoria = document.getElementById("categoria");
  const inputEstoque = document.getElementById("estoque");
  const formTitulo = document.getElementById("form-titulo");

  inputId.value = "";
  inputNome.value = "";
  inputPreco.value = "";
  inputCategoria.value = "";
  inputEstoque.value = "";
  formTitulo.innerText = "Cadastrar Produto";
}

const btnCancelar = document.getElementById("btn-cancelar");

btnCancelar.addEventListener("click", function () {
  limparFormulario();
});
