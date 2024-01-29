## Portuguese Version:

Olá, este é um desafio prático elaborado para uma vaga de desenvolvedor fullstack. Para realizar o teste, certifique-se de ter o Docker e o Docker Compose instalados em sua máquina e basta executar o seguinte comando na pasta raiz deste projeto:

```bash
 docker-compose up --build
```

### DDL:

As consultas utilizadas neste projeto foram as seguintes:

##### Criar usuário

```bash
 INSERT INTO users (name, email, phone, x, y) VALUES ($1, $2, $3, $4, $5) RETURNING *
```

##### Listar todos os usuários

```bash
SELECT * FROM users
```

##### Procurar usuários

```bash
SELECT * FROM users WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1 OR CAST(x AS VARCHAR) ILIKE $1 OR CAST(y AS VARCHAR) ILIKE $1
```

### Problema de Cálculo de Rota

Utilizei o problema do caixeiro-viajante para abordar o cálculo de rota, pois ele se alinha perfeitamente com a descrição do problema fornecido.
Observações: o problema do caixeiro viajante é efetivo apenas até 23 arestas; acima desse número, seria necessário recorrer a aproximações, pois se trata de um problema NP-hard. Acredito que isso esteja fora do escopo deste projeto.

## English Version:

Hello, this is a practical challenge designed for a fullstack developer position. To take the test, make sure you have Docker and Docker Compose installed on your machine and simply run the following command in the root folder of this project:

```bash
docker-compose up --build
```

### DDL:

The queries used in this project were the following:

##### Creating user

```bash
 INSERT INTO users (name, email, phone, x, y) VALUES ($1, $2, $3, $4, $5) RETURNING *
```

##### Get list of users

```bash
SELECT * FROM users
```

##### Search users

```bash
SELECT * FROM users WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1 OR CAST(x AS VARCHAR) ILIKE $1 OR CAST(y AS VARCHAR) ILIKE $1
```

### Calculate Route Problem

I utilized the traveling salesman problem to address the route calculation, as it perfectly aligns with the description of the provided problem.
Observations: The traveling salesman problem is effective only up to 23 edges; beyond that, we would have to resort to approximation algorithms, as it is an NP-hard problem. I believe this is beyond the scope of this project.
