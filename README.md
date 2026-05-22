# SBCData · Consultor de CNPJs

Plataforma React para consulta do portfólio de CNPJs da Sociedade Brasileira Caminho de Damasco.

## 🚀 Como rodar

Requer **Node.js 18+** instalado.

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em modo desenvolvimento
npm run dev

# 3. Gerar build de produção
npm run build

# 4. Pré-visualizar o build de produção
npm run preview
```

A aplicação abrirá em `http://localhost:5173`.

## 📁 Estrutura do projeto

```
sbcdata-consultor-cnpj/
├── index.html              # HTML raiz (Vite)
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx            # Entry point — importa CSS e renderiza <App />
    ├── App.jsx             # Componente raiz com a state machine de navegação
    │
    ├── data/               # Dados estáticos
    │   ├── cnpjs.json   # Base de CNPJs (separada para fácil edição)
    │   └── ufNames.js      # Mapa UF → nome completo do estado
    │
    ├── config/
    │   └── auth.js         # Senha de acesso
    │
    ├── components/         # Componentes React
    │   ├── LoginScreen.jsx
    │   ├── Header.jsx
    │   ├── Crumbs.jsx
    │   ├── StepHead.jsx
    │   ├── UfScreen.jsx
    │   ├── MunicipioScreen.jsx
    │   ├── CNPJScreen.jsx
    │   └── DetalheScreen.jsx
    │
    └── styles/             # CSS modularizado por área
        ├── index.css       # Variáveis CSS + reset + base
        ├── login.css
        ├── header.css
        ├── stage.css
        ├── uf.css
        ├── row-list.css
        └── detail.css
```

## 🔁 Fluxo de navegação

1. **Login** → senha de acesso
2. **Estado** (UF) → cards com sigla, nome e quantidade de cnpjs
3. **Município** → lista de cidades com cnpjs naquele estado
4. **CNPJ** → lista de CNPJs naquele município
5. **Detalhe** → ficha completa do CNPJ, com opção de copiar

O breadcrumb no topo permite voltar a qualquer etapa anterior.

## ✏️ Como editar os dados

Para adicionar, remover ou alterar cnpjs, basta editar o arquivo:

```
src/data/cnpjs.json
```

Cada cnpj tem o formato:

```json
{
  "nome": "NOME DA CNPJ",
  "cnpj": "00.000.000/0000-00",
  "uf": "SP",
  "municipio": "Cidade",
  "endereco": "Endereço completo",
  "contrato": "Número do contrato (opcional)"
}
```

## 🔐 Como trocar a senha

Edite `src/config/auth.js`. Para produção, recomenda-se mover para uma variável de ambiente em um arquivo `.env`:

```
VITE_SENHA=minhaSenhaSecreta
```

E ajustar `auth.js` para `export const SENHA = import.meta.env.VITE_SENHA;`.

## 🛠️ Stack

- **React 18** — biblioteca de UI
- **Vite 5** — bundler / dev server
- **CSS puro** — sem frameworks; variáveis CSS para o tema
- **Fontes:** Inter Tight + JetBrains Mono (via Google Fonts)
