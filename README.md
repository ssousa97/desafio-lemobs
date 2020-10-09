# Desafio Lemobs

Para rodar, utilize o comando:
	
    docker-compose up --build

A documentação do swagger se encontra em:

    http://localhost:3000/api

O a própria API é responsável por criar o banco e as tabelas, caso não ocorra os scripts estão na pasta ./db

  

## Tarefas concluídas:

- scripts de criação SQL [ok]

- conexões do banco com a API usando TypeORM [ok]

- serviço POST /aluno para cadastro [ok]

- serviço PUT /aluno/:id para editar [ok]

- serviço GET /aluno para retornar dados de todos os alunos[ok]

- serviço GET /aluno/:id para retornar dados de um unico aluno [ok]

- serviço GET /aluno/:id/endereco para retornar enderecos de um aluno [ok]

- serviço GET /aluno/:nota/criterio/:criterio [ok]

- serviço GET /aluno/media [ok]

- serviço POST /endereco [ok]

- serviço GET /endereco [ok]

- número e complemento como colunas não obrigatórias [ok]

- retornar dados dos endereços formatados conforme o padrão pedido [ok]

- versionar em github [ok]

- checar se o aluno já existe no banco [ok]

- validador de cpf [ok]

- salvar cpf sem pontuação e retornar com pontuação [ok]

- inserir filtro por bairro em /endereco (GET) [ok]

- usar typeORM [ok]

- usar docker [ok]
