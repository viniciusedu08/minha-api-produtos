# API de Produtos

API REST desenvolvida em **Node.js** e **Express** para gerenciamento de produtos, utilizando operações CRUD.

## Tecnologias

* Node.js
* Express
* JavaScript
* JSON Server / arquivo JSON para armazenamento
* Postman para testes

## Funcionalidades

A API permite:

* Listar todos os produtos
* Buscar um produto pelo ID
* Cadastrar um novo produto
* Atualizar um produto
* Excluir um produto

## Endpoints

| Método   | Endpoint        | Descrição                |
| -------- | --------------- | ------------------------ |
| `GET`    | `/produtos`     | Lista todos os produtos  |
| `GET`    | `/produtos/:id` | Busca um produto pelo ID |
| `POST`   | `/produtos`     | Cadastra um novo produto |
| `PUT`    | `/produtos/:id` | Atualiza um produto      |
| `DELETE` | `/produtos/:id` | Exclui um produto        |

## Exemplo de produto

```json
{
  "id": 1,
  "nome": "Notebook",
  "preco": 3500
}
```

## Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/viniciusedu08/minha-api-produtos.git
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute a API

```bash
npm start
```

A API será iniciada em:

```text
http://localhost:3000
```

## Testes com Postman

Uma Collection do Postman está disponível no repositório para facilitar os testes dos endpoints da API.

Arquivo:

```text
minha-api-produtos.postman_collection.json
```

Para utilizar, abra o Postman e importe o arquivo da Collection.

## Deploy

A API também está publicada utilizando a **Vercel**.

## Autor

**Vinicius Eduardo**

Projeto desenvolvido para fins acadêmicos.
