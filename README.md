# Marketplace App 🛒

<p align="center">
  <a href="#tecnologias">Tecnologias</a> •
  <a href="#preview">Preview</a> •
  <a href="#rodar">Rodar o projeto</a> •
  <a href="#backend">Backend</a> •
  <a href="#funcionalidades">Funcionalidades</a> •
  <a href="#arquitetura">Arquitetura</a> •
  <a href="#colaboradores">Colaboradores</a> •
  <a href="#contribuicao">Contribuição</a>
</p>

<p align="center">
  <b>Aplicativo mobile de marketplace para explorar produtos, filtrar por categoria e preço, gerenciar carrinho, finalizar pedidos com cartão de crédito, acompanhar histórico de compras e avaliar produtos. Autenticação com refresh token, perfil editável e notificações locais com deep link.</b>
</p>

## 🎬 Preview

<p align="center">
  <img src="./docs/demo.gif" alt="Demonstração do Marketplace App" width="320" />
</p>

## 💻 Tecnologias

### App & dados

- [Expo 54](https://expo.dev/) + [React Native 0.81](https://reactnative.dev/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Expo Router 6](https://docs.expo.dev/router/introduction/) (navegação file-based, typed routes)
- [TanStack React Query 5](https://tanstack.com/query) (cache e mutations da API)
- [Axios](https://axios-http.com/) (cliente HTTP com interceptors de auth)
- [Zustand](https://zustand.docs.pmnd.rs/) (estado global: usuário, carrinho, filtros, modais)

### UI & formulários

- [NativeWind](https://www.nativewind.dev/) + [Tailwind CSS 3](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/) + [@hookform/resolvers](https://github.com/react-hook-form/resolvers)
- [Yup](https://github.com/jquense/yup) (validação de schemas)
- [@gorhom/bottom-sheet](https://gorhom.dev/react-native-bottom-sheet/) (bottom sheets)
- [@expo/vector-icons](https://docs.expo.dev/guides/icons/) (ícones)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) + [Worklets](https://docs.swmansion.com/react-native-worklets/)
- [toastify-react-native](https://github.com/zahidalidev/toastify-react-native) (toasts)
- [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge), [tailwind-variants](https://www.tailwind-variants.org/)

### Device & utilitários

- [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) (notificações locais e deep links)
- [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/) (avatar via câmera ou galeria)
- [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/) (persistência de sessão)
- [date-fns](https://date-fns.org/) (formatação de datas)

### Qualidade

- [ESLint 9](https://eslint.org/) + [eslint-config-expo](https://www.npmjs.com/package/eslint-config-expo)
- [Prettier](https://prettier.io/) + [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

## 🚀 Rodar o projeto

### Pré-requisitos

- [Node.js 20+](https://nodejs.org/) (recomendado)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- [Expo Go](https://expo.dev/go) no dispositivo **ou** emulador/simulador configurado
- **Backend** do marketplace rodando em `http://localhost:3001` — repositório: [marketplace-push-notification-backend](https://github.com/brenooliveiranascimento/marketplace-push-notification-backend)

### Backend

Este app consome a API do repositório [brenooliveiranascimento/marketplace-push-notification-backend](https://github.com/brenooliveiranascimento/marketplace-push-notification-backend) (módulo de push notification e deeplink da Rocketseat).

**Stack:** Node.js, TypeScript, TypeORM e SQLite.

#### Clonar e configurar o backend

```bash
git clone https://github.com/brenooliveiranascimento/marketplace-push-notification-backend.git
cd marketplace-push-notification-backend
npm install
npm run migration:run
```

Crie o arquivo `.env` na raiz do backend (use `.env.example` como base) com as credenciais do OneSignal:

```env
ONESIGNAL_APP_ID="your-onesignal-app-id"
ONESIGNAL_API_KEY="your-onesignal-rest-api-key"
```

Documentação do OneSignal: [REST API Overview](https://documentation.onesignal.com/reference/rest-api-overview)

#### Subir o servidor

```bash
npm run dev
```

O backend ficará disponível em [http://localhost:3001](http://localhost:3001). A documentação da API está em [http://localhost:3001/docs](http://localhost:3001/docs).

> **Android (emulador):** o app aponta para `http://10.0.2.2:3001`, que mapeia o `localhost` da máquina host.
>
> **iOS (simulador):** usa `http://localhost:3001` diretamente.
>
> **Dispositivo físico:** ajuste a URL base em `src/shared/api/market-place.ts` para o IP da sua máquina na rede local.

### Clonando o app (frontend)

```bash
git clone https://github.com/Matheus-Bezerra/marketplace-app.git
cd marketplace-app
```

### Instalação

```bash
npm install
```

### Subir o app

Inicie o bundler do Expo:

```bash
npm start
```

Depois escolha a plataforma:

```bash
npm run android   # emulador ou device Android
npm run ios       # simulador iOS (macOS)
npm run web       # versão web (opcional)
```

Para builds nativos com pastas `android/` e `ios/`:

```bash
npm run prebuild
```

### Scripts úteis

| Comando | Descrição |
|--------|-----------|
| `npm start` | Inicia o Expo Dev Server |
| `npm run android` | Roda no Android |
| `npm run ios` | Roda no iOS |
| `npm run web` | Roda no navegador |
| `npm run prebuild` | Gera projetos nativos com Expo Prebuild |
| `npm run lint` | ESLint + Prettier (check) |
| `npm run format` | ESLint fix + Prettier (write) |

## 📍 Funcionalidades

### Autenticação

| Recurso | Descrição |
|--------|-----------|
| Registro | Cria conta com nome, e-mail e senha |
| Login | Autenticação JWT com refresh automático em token expirado |
| Sessão | Persistência via AsyncStorage; logout limpa carrinho e tokens |

### Produtos

| Recurso | Descrição |
|--------|-----------|
| Listagem | Grid com scroll infinito e pull-to-refresh |
| Busca | Debounce no campo de pesquisa |
| Filtros | Categoria, faixa de preço (mín./máx.) |
| Detalhe | Informações do produto, adicionar ao carrinho |
| Avaliações | Comentários paginados; criar ou editar avaliação com nota |

### Carrinho & pedidos

| Recurso | Descrição |
|--------|-----------|
| Carrinho | Adicionar, remover e alterar quantidade (Zustand) |
| Cartões | Cadastro e seleção de cartão de crédito no checkout |
| Pedido | Envio dos itens + cartão selecionado para a API |
| Histórico | Listagem de pedidos na aba **Pedidos** |

### Perfil & notificações

| Recurso | Descrição |
|--------|-----------|
| Perfil | Editar nome, e-mail, telefone e senha |
| Avatar | Upload via câmera ou galeria |
| Notificações | Lembretes de carrinho e feedback pós-compra com deep link (`marketplace://`) |

### Endpoints consumidos

A comunicação passa pelo client em `src/shared/api/market-place.ts` e pelos services em `src/shared/services/`.

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/auth/register` | Registro de usuário |
| `POST` | `/auth/login` | Login |
| `POST` | `/auth/refresh` | Renovação de token |
| `POST` | `/user/avatar` | Upload de avatar |
| `PUT` | `/user` | Atualização de perfil |
| `POST` | `/products` | Listagem paginada com filtros |
| `GET` | `/products/categories` | Categorias |
| `GET` | `/products/:id` | Detalhe do produto |
| `POST` | `/products/comments` | Comentários do produto |
| `POST` | `/products/create/comments` | Criar avaliação |
| `PUT` | `/products/comments/:id` | Editar avaliação |
| `GET` | `/products/:id/user-comment` | Avaliação do usuário logado |
| `GET` | `/credit-cards` | Listar cartões |
| `POST` | `/credit-cards` | Cadastrar cartão |
| `POST` | `/orders` | Finalizar pedido |
| `GET` | `/orders` | Histórico de pedidos |

## 🏗 Arquitetura

O projeto segue **MVVM** (Model-View-ViewModel):

```
src/
├── app/              # Rotas (Expo Router) — público e privado
├── viewModels/       # View + ViewModel por feature
└── shared/
    ├── api/          # Cliente HTTP (Axios + interceptors)
    ├── components/   # Componentes reutilizáveis
    ├── hooks/        # Hooks compartilhados
    ├── queries/      # React Query (queries e mutations)
    ├── services/     # Chamadas à API e lógica de domínio
    ├── store/        # Zustand (carrinho, usuário, filtros…)
    └── interfaces/   # Tipos e contratos HTTP
```

**Fluxo de navegação:**

- `(public)` — login e registro
- `(private)/(tabs)` — home (produtos), pedidos e carrinho
- `(private)/product/[id]` — detalhe do produto
- `(private)/profile` — perfil do usuário

## 🤝 Colaboradores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Matheus-Bezerra">
        <img src="https://github.com/Matheus-Bezerra.png" width="100px;" alt="Matheus Bezerra"/><br>
        <sub>
          <b>Matheus Bezerra</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 📫 Contribuição

1. `git clone https://github.com/Matheus-Bezerra/marketplace-app.git`
2. `git checkout -b feature/NOME_DA_FEATURE`
3. Siga o padrão de commits do time
4. Abra um Pull Request explicando a feature ou correção. Se houver mudança visual, anexe prints ou atualize o GIF em `docs/demo.gif` e aguarde a revisão

### Documentações úteis

- [Backend do marketplace (Rocketseat)](https://github.com/brenooliveiranascimento/marketplace-push-notification-backend)
- [Como criar um Pull Request](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
- [Padrão de commits (iuricode)](https://github.com/iuricode/padroes-de-commits)
- [Documentação do Expo](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
