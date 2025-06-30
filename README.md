# Clima

Aplicativo web de previsão do tempo desenvolvido com React, TypeScript e Vite.

## Descrição
O Clima permite pesquisar cidades e visualizar a previsão do tempo atual, além de previsões horárias e para os próximos dias. Utiliza APIs de clima para buscar dados em tempo real.

## Funcionalidades
- Busca de cidades
- Exibição do clima atual
- Previsão horária
- Previsão para os próximos dias

## Tecnologias Utilizadas
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

## Instalação
1. Clone este repositório:
   ```bash
   git clone <url-do-repositorio>
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd Clima
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

## Como usar
Para rodar o projeto em modo de desenvolvimento:
```bash
npm run dev
```
O aplicativo estará disponível em `http://localhost:5173`.

## Estrutura do Projeto
```
Clima/
├── public/                # Arquivos estáticos
├── src/
│   ├── components/        # Componentes React reutilizáveis
│   ├── services/          # Serviços de integração com APIs
│   ├── types/             # Tipos TypeScript
│   ├── App.tsx            # Componente principal
│   ├── main.tsx           # Ponto de entrada da aplicação
│   └── index.css          # Estilos globais
├── index.html             # HTML principal
├── package.json           # Dependências e scripts
└── README.md              # Este arquivo
```

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença
Este projeto está sob licença MIT. 