# Mini E-commerce

Um mini e-commerce desenvolvido com React, TypeScript e Material-UI, utilizando a Fake Store API para dados de produtos.

## 🚀 Funcionalidades

- Listagem de produtos com cards responsivos
- Visualização detalhada de produtos
- Filtro por categorias
- Carrinho de compras com:
  - Adição/remoção de produtos
  - Ajuste de quantidades
  - Cálculo de total
  - Persistência local

## 🛠️ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI](https://mui.com/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Fake Store API](https://fakestoreapi.com/)

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/pac-william/Mini-E-commerce.git
```

2. Entre no diretório do projeto:
```bash
cd Mini-E-commerce
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm start
```

O projeto estará disponível em `http://localhost:3000`

## 🏗️ Estrutura do Projeto

```
src/
  ├── components/     # Componentes reutilizáveis
  ├── contexts/       # Contextos React (carrinho)
  ├── pages/         # Páginas da aplicação
  ├── services/      # Serviços de API
  ├── types/         # Definições de tipos TypeScript
  └── theme.ts       # Configuração do tema Material-UI
```

## 🎯 Como Usar

1. **Lista de Produtos**
   - Visualize todos os produtos na página inicial
   - Use o menu dropdown para filtrar por categoria
   - Clique em um produto para ver mais detalhes

2. **Detalhes do Produto**
   - Visualize informações detalhadas do produto
   - Adicione o produto ao carrinho
   - Ajuste a quantidade desejada

3. **Carrinho de Compras**
   - Acesse através do ícone no topo da página
   - Ajuste quantidades
   - Remova produtos
   - Visualize o total
   - Continue comprando

## 🔧 Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm build`: Cria a versão de produção
- `npm test`: Executa os testes
- `npm eject`: Ejecta do Create React App
