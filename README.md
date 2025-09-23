# Mini-Framework NodeJS com Injeção de Dependência e Decoradores

Este projeto é um **mini-framework de backend** construído do zero sobre o **Express.js**, inspirado em frameworks modernos como o **NestJS**.  
O objetivo é demonstrar na prática conceitos avançados de arquitetura, como **Injeção de Dependência**, **IoC** e **Decoradores**, além de servir como estudo de caso sobre como frameworks robustos são construídos.

---

## ✨ Funcionalidades

- **Injeção de Dependência (DI) e Inversão de Controle (IoC):**  
  Implementadas via um DI Container customizado.
- **Decoradores e Metadados:**  
  Anotações como `@Controller`, `@Get`, `@Injectable`, utilizando `reflect-metadata`.
- **Arquitetura Modular:**  
  Separação clara de responsabilidades entre controllers e services, com bootstrap modular.
- **Configuração de Ambiente:**  
  Projeto escrito em **TypeScript**, garantindo tipagem estrita e flexibilidade.

---

## 🎯 Por que este projeto?

O foco principal é **aprimorar conhecimentos em arquitetura de software**, explorando conceitos como:

- Princípios **SOLID**
- **Design Patterns** aplicados no backend
- Como a **Injeção de Dependência** funciona "por baixo dos panos"
- Criação de código mais **testável, desacoplado e escalável**

Este projeto pode ser utilizado como base de estudo ou como referência para entender o funcionamento interno de frameworks modernos.

---

## 🛠️ Tecnologias

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)

---

## 🚀 Como Rodar o Projeto

1. Clone este repositório:

   ```bash
   git clone https://github.com/LuizZomer/NestLite.git
   cd NestLite
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Compile o projeto:

   ```bash
   npm run build
   ```

4. Inicie o servidor:
   ```bash
   npm run start
   ```

---

## 📂 Estrutura do Projeto

```
.
├── src/
│   ├── core/                # Núcleo do mini-framework
│   │   ├── di-container.ts  # Container de Injeção de Dependência
│   │   ├── decorators.ts    # Decoradores (@Controller, @Get, etc.)
│   │   ├── factory.ts       # Classe de bootstrap
│   │   └── ...
│   ├── modules/             # Módulos da aplicação
│   │   └── users/
│   │       ├── users.controller.ts
│   │       └── users.service.ts
│   │       └── user.module.ts
│   │── app.module.ts        # Módulo raiz da aplicação
│   └── main.ts              # Inicialização principal
├── tsconfig.json
├── package.json
└── README.md
```

---

## 📖 Conclusão

Este projeto demonstra como construir **um mini-framework do zero**, aplicando conceitos avançados de **arquitetura backend** e servindo como um excelente material de estudo para desenvolvedores que desejam compreender melhor os bastidores de frameworks como **NestJS**.

---
