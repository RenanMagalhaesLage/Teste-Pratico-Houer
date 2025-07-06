<div align="center">
  <h1> Teste Prático Fullstack - Instalações Escolar </h1>
</div>

<div align="center">
  <h3> Aplicação fullstack com upload de CSV e CRUD de dados escolares, usando Java com Spring Boot e React para o frontend. </h3>

  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white">
  <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-FFC222?style=for-the-badge&logo=mysql&logoColor=black">
</div>


Este projeto é composto por:

- **Backend**: Spring Boot (Java)
- **Frontend**: React.js (Vite)
- **Banco de Dados**: MySQL rodando em container Docker

---

## ✅ Funcionalidades do Sistema

- [x] Cadastro de usuários (registro e login)
- [x] Autenticação com JWT
- [x] Gerenciamento de escolas (criar, editar, visualizar, deletar)
- [x] Gerenciamento de dependências vinculadas às escolas (criar, editar, visualizar, deletar)
- [x] Importação de dados via upload de arquivos CSV

---

## 📦 Requisitos

Antes de iniciar, você precisa ter instalado:

- Node.js (v20.19.3)
- Java JDK 21
- Docker
- Maven ou, se preferir, pode usar uma IDE como o **IntelliJ IDEA (sugerido)**, que já trazem suporte ao Maven embutido e permitem rodar o projeto direto pela interface, sem precisar instalar o Maven globalmente.
---

## 📁 Repositório

Clone o repositório:
```bash
https://github.com/RenanMagalhaesLage/Teste-Pratico-Houer.git
```
---

## 🧩 Diagrama Entidade Relacionamento do Banco de Dados

```mermaid
erDiagram
    SCHOOL ||--o{ SCHOOL_DEPENDENCY : has
    SCHOOL_TYPE ||--o{ SCHOOL : describes

    USER {
        bigint id PK
        string username
        string email
        string password
        string role
    }

    SCHOOL {
        bigint id PK
        string name
        string education_network
        string education_board
        string city
        string district
        string code
        string school_type_id
        string school_status
        int schoolType FK
    }

    SCHOOL_DEPENDENCY {
        bigint id PK
        string name
        int quantity
        bigint school_id FK
    }

    SCHOOL_TYPE {
        int id PK
        string description
    }

```

---

## 🐳 Subindo o container do MySQL com Docker

Este projeto utiliza **Docker Compose** para subir facilmente o banco de dados MySQL necessário para o backend funcionar.

1. Abra o terminal e vá até a pasta raiz do backend:

```bash
cd backend/testePratico
```

2. Suba o container definido no **docker-compose.yml**:
```bash
docker compose up -d
```
3. Listar os containers em execução
```bash
docker ps 
```
4. Acessar o terminal do container (opcional)
```bash
docker exec -it container_mysql bash
```
5. Usar o cliente MySQL dentro do container (opcional)
```bash
mysql -u myuser -p
```
Digite a senha quando for solicitado (ela está configurada no docker-compose.yml)
A senha do usuário myuser: **secret**

---

## 🔧 Backend (Java / Spring Boot)

1. Abra o terminal e vá até a pasta raiz do backend:

```bash
cd backend/testePratico
```

2. Rode a aplicação

**(Sugerido)** Direto pela **IDE IntelliJ IDEA**

Ou, se preferiu pela instalação do Maven via terminal, o projeto pode ser rodado executando o comando

- Windows:
```bash
mvnw.cmd spring-boot:run
```

- Linux ou macOS
```bash
./mvnw spring-boot:run
```

---

## ⚛️ Frontend (React)

1. Abra o terminal e vá até a pasta raiz do backend

```bash
cd frontend/teste-pratico
```

2. Instale as dependências
```bash
npm install
```
3. Rode o projeto
```bash
npm run dev
```

---

## 🖼️ Imagens do Projeto

Abaixo estão algumas capturas de tela que ilustram as principais funcionalidades do sistema:

### Tela de Login
![Tela de Login](./img/Pagina_Login.png)

### Tela de Registro
![Tela de Registro](./img/Pagina_Registro.png)

### Tela de Listagem de Escolas
![Página de Listagem de Escolas](./img/Pagina_Listagem_Escolas.png)

### Tela de Visualização de Escola
![Página de Visualização de Escola](./img/Pagina_Visualizacao_Escola.png)

### Tela de Cadastro de Escola
![Página de Cadastro de Escola](./img/Pagina_Cadastro_Escola.png)

### Tela de Editar de Escola
![Página de Editar de Escola](./img/Pagina_Editar_Escola.png)

### Modal de Deletar de Escola
![Modal de Deletar de Escola](./img/Modal_Deletar.png)


---

## 📚 Documentação da API (Swagger)

A API do sistema é documentada utilizando o **Swagger**, que permite explorar os endpoints de forma interativa.
Disponível em: 
```bash
http://localhost:8080/swagger-ui/index.html
```

![Swagger](./img/Swagger.png)
---
