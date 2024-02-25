# m6-desafio-fullstack-ElderTakahashi

# Contact List

## Descrição

Uma aplicação simples para gerenciar informações de contatos. Com esta API, você pode criar, atualizar, listar e excluir registros de contatos.

Para testar a aplicação antes de clonar o repositório basta acessar esse [link](https://frontend-b8gh6r750-eldertakahashi.vercel.app/).

Para ver a documentação da api acesse [link](https://m6-desafio-fullstack-eldertakahashi.onrender.com/api-documentation)

## Instalação

Clone o repositório git:

    git clone git@github.com:Kenzie-Academy-Brasil-Developers/m6-desafio-fullstack-ElderTakahashi.git

Agora siga os seguintes passos para começar:

<h4>Configuração backend:</h4>

1.  Acesse o diretório clonado e navegue até a pasta /backend

        cd /caminho/para/o/diretorio/clonado/backend

2.  Instale as dependências:

        npm install

3.  Crie um banco de dados PostgreSQL
4.  Crie um arquivo ".env" na raiz da past backend e configure-o conforme o arquivo ".env.example"

        PORT=app_port
        DATABASE_URL=postgres://<postgresUser>:<postgresPass>@<host>:<postgresPort>/<dbName>

        SECRET_KEY=<JWTSecret>
        EXPIRES_IN=<TimeToTokenExpires>

5.  Rode a migração do baco de dados:

        npm run typeorm:generate src/migrations/CreateDatabase
        npm run typeorm:run

6.  Rode o projeto:

        npm run dev

Agora você já pode acessar a documentação da api em:

        http://localhost:3000/api-documentation

<h4>Configuração frontend:</h4>

1.  Acesse o diretório clonado e navegue até a pasta /frontend

        cd /caminho/para/o/diretorio/clonado/frontend

2.  Instale as dependências:

        npm install

3.  A aplicação, por padrão, faz requisições para a PORT:3000, caso tenha alterado a PORT nas configuracoes do backend, altere o arquivo "api.js" localizado na pasta "src/services"

        export const contactListApi = axios.create({
            baseURL: "http://localhost:3000",
            timeout: 8 * 1000,
        });

4.  Rode o projeto:

        npm run dev
