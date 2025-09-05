# Desafio Full Stack - Gerenciador de Leads

[cite_start]Este projeto é uma solução para um desafio de estágio Full Stack, que consiste em um sistema de gerenciamento de leads. [cite: 5] [cite_start]A aplicação é composta por um backend construído com .NET 6 Web API e um frontend em React (SPA). [cite: 6, 7, 72]

## Como Executar o Projeto

[cite_start]Estas instruções irão guiá-lo para configurar e executar o projeto em uma máquina de desenvolvimento Windows a partir do zero. [cite: 85]

### 1. Pré-requisitos (Software Necessário)

Antes de começar, você precisará baixar e instalar as seguintes ferramentas:

* **Git:** Para clonar o repositório.
    * [**Download Git**](https://git-scm.com/downloads)

* [cite_start]**.NET 6 SDK:** Para compilar e executar o backend (API). [cite: 71]
    * [**Download .NET 6 SDK (x64)**](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)

* **Node.js (Versão LTS):** Para gerenciar os pacotes e rodar o frontend (React).
    * [**Download Node.js**](https://nodejs.org/)

* [cite_start]**SQL Server 2019 Express Edition:** O banco de dados que a aplicação utiliza. [cite: 73]
    * [**Download SQL Server Express**](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)
    * Durante a instalação, escolha o tipo **"Básico"** e siga os passos. Ao final, anote o **nome da instância** (geralmente `SQLEXPRESS`).

* **SQL Server Management Studio (SSMS):** Ferramenta visual para gerenciar o banco de dados.
    * [**Download SSMS**](https://aka.ms/ssmsfullsetup)

### 2. Configuração do Backend (API)

1.  [cite_start]**Clone o repositório para sua máquina local:** [cite: 84]
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO_GIT>
    ```

2.  **Navegue para a pasta do projeto:**
    ```bash
    cd <NOME_DA_PASTA_DO_PROJETO>
    ```

3.  **Configure a String de Conexão:**
    * Abra o arquivo `HipagesChallenge.API/appsettings.json`.
    * Localize a seção `ConnectionStrings`.
    * Certifique-se de que o valor de `Server` corresponde ao nome da instância do seu SQL Server Express (que você anotou durante a instalação).
    * A configuração padrão deve ser esta:
        ```json
        "ConnectionStrings": {
          "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=HipagesDb;Trusted_Connection=True;TrustServerCertificate=True;"
        }
        ```

4.  **Crie e Popule o Banco de Dados:**
    * Abra um terminal na pasta `HipagesChallenge.API`.
    * [cite_start]Execute o comando abaixo para criar o banco de dados e as tabelas usando o Entity Framework. [cite: 74]
        ```bash
        dotnet ef database update
        ```
        *(Caso receba um erro de `dotnet-ef` não encontrado, instale a ferramenta com: `dotnet tool install --global dotnet-ef --version 6.0.25` e tente novamente)*.

    * Abra o **SSMS**, conecte-se ao seu servidor (`localhost\SQLEXPRESS`).
    * Clique com o botão direito no banco de dados `HipagesDb` (que acabou de ser criado) e selecione **"Nova Consulta"**.
    * Copie e cole o script SQL abaixo e execute-o (pressionando F5 ou o botão "Executar") para popular o banco com dados de teste.
        ```sql
        USE HipagesDb;
        GO

        INSERT INTO Leads (ContactFirstName, DateCreated, Suburb, Category, Description, Price, Status)
        VALUES
        ('Bruno', '2025-01-04 14:37:00', 'Vila Mariana 04010-000', 'Pintores', 'Preciso pintar 2 janelas de alumínio e uma porta de vidro de correr', 62.00, 0),
        ('Carlos', '2025-01-04 13:15:00', 'Copacabana 22020-001', 'Pintura Interna', 'Pintura de paredes internas em 3 cores diferentes', 49.00, 0);

        INSERT INTO Leads (ContactFirstName, ContactFullName, PhoneNumber, Email, DateCreated, Suburb, Category, Description, Price, Status)
        VALUES
        ('Pedro', 'Pedro Almeida', '0412345678', 'pedro@teste.com', '2025-09-05 10:36:00', 'Savassi 30130-140', 'Construção Civil', 'Rebocar paredes de tijolo aparente e expandir a despensa', 26.00, 1),
        ('Cristiano', 'Cristiano Santos', '0498765432', 'cristiano@teste.com', '2025-08-30 11:14:00', 'Boa Viagem 51021-000', 'Renovações Residenciais', 'Converter um sobrado na frente da casa principal em uma área de estar independente', 32.00, 1);
        GO
        ```

### 3. Configuração do Frontend (React)

* Abra um **novo terminal**.
* Navegue até a pasta `frontend` do projeto.

    ```bash
    # Navegue para a pasta do frontend
    cd frontend

    # Instale todas as dependências do projeto
    npm install
    ```

### 4. Executando a Aplicação

Para rodar a aplicação, você precisará de **dois terminais abertos** simultaneamente.

**Terminal 1 - Rodando o Backend:**
```bash
# Navegue para a pasta da API
cd HipagesChallenge.API

# Inicie o servidor do backend
dotnet run
```
*Aguarde a mensagem de que o servidor está rodando (ex: `Now listening on: https://localhost:7052`)*.

**Terminal 2 - Rodando o Frontend:**
```bash
# Navegue para a pasta do frontend
cd frontend

# Inicie o servidor de desenvolvimento do React
npm start
```
*Uma nova aba abrirá automaticamente no seu navegador em `http://localhost:3000`.*

**Pronto!** A aplicação deve estar totalmente funcional no seu navegador.
