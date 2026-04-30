# PLANO DO PROJETO: Chat IA para Netlify (Campo Livre Standalone)

> Gerado automaticamente pelo SK Code Editor em 30/04/2026, 11:48:50
> **160 arquivo(s)** | **~130.527 linhas de codigo**

---

## RESUMO EXECUTIVO

- **Tipo de aplicacao:** Aplicacao Web Frontend (React)
- **Frontend / Stack principal:** React, TypeScript

**Para rodar o projeto:**
```bash
# Abra index.html no Preview (botao Play)
```

---

## ESTRUTURA DE ARQUIVOS

```
Chat IA para Netlify (Campo Livre Standalone)/
âââ .sk/
â   âââ memoria.json
â   âââ perfil-jasmim.md
âââ api-server/
â   âââ .replit-artifact/
â   â   âââ artifact.toml
â   âââ dist/
â   â   âââ index.mjs
â   â   âââ index.mjs.map
â   â   âââ pino-file.mjs
â   â   âââ pino-file.mjs.map
â   â   âââ pino-pretty.mjs
â   â   âââ pino-pretty.mjs.map
â   â   âââ pino-worker.mjs
â   â   âââ pino-worker.mjs.map
â   â   âââ thread-stream-worker.mjs
â   â   âââ thread-stream-worker.mjs.map
â   âââ src/
â   â   âââ lib/
â   â   â   âââ .gitkeep
â   â   â   âââ codeServer.ts
â   â   â   âââ logger.ts
â   â   âââ middlewares/
â   â   â   âââ .gitkeep
â   â   âââ routes/
â   â   â   âââ ai-proxy.ts
â   â   â   âââ db.ts
â   â   â   âââ github.ts
â   â   â   âââ health.ts
â   â   â   âââ index.ts
â   â   â   âââ preview.ts
â   â   â   âââ search.ts
â   â   â   âââ terminal.ts
â   â   â   âââ termux.ts
â   â   âââ app.ts
â   â   âââ index.ts
â   âââ .pnpmfile-approve.cjs
â   âââ build.mjs
â   âââ package.json
â   âââ tsconfig.json
âââ mobile/
â   âââ .expo/
â   â   âââ types/
â   â   â   âââ router.d.ts
â   â   âââ web/
â   â   â   âââ cache/
â   â   â       âââ production/
â   â   â           âââ images/
â   â   â               âââ favicon/
â   â   â                   âââ favicon-a81a8b823918132ad1bb32b7ba8be194b0e081efa726735499c96199d2d6f630-contain-transparent/
â   â   â                       âââ favicon-48.png
â   â   âââ devices.json
â   â   âââ README.md
â   âââ .replit-artifact/
â   â   âââ artifact.toml
â   âââ app/
â   â   âââ (tabs)/
â   â   â   âââ _layout.tsx
â   â   â   âââ ai.tsx
â   â   â   âââ editor.tsx
â   â   â   âââ index.tsx
â   â   â   âââ plugins.tsx
â   â   â   âââ settings.tsx
â   â   â   âââ tasks.tsx
â   â   â   âââ terminal.tsx
â   â   âââ _layout.tsx
â   â   âââ +not-found.tsx
â   âââ assets/
â   â   âââ images/
â   â       âââ icon.png
â   âââ components/
â   â   âââ AIChat.tsx
â   â   âââ AIMemoryModal.tsx
â   â   âââ CampoLivreModal.tsx
â   â   âââ CheckpointsModal.tsx
â   â   âââ CodeEditor.tsx
â   â   âââ CombinarAppsModal.tsx
â   â   âââ ErrorBoundary.tsx
â   â   âââ ErrorFallback.tsx
â   â   âââ FileSidebar.tsx
â   â   âââ FloatingAI.tsx
â   â   âââ GitHubModal.tsx
â   â   âââ HtmlPlayground.tsx
â   â   âââ KeyboardAwareScrollViewCompat.tsx
â   â   âââ LibrarySearch.tsx
â   â   âââ ManualModal.tsx
â   â   âââ MessageRenderer.tsx
â   â   âââ MonacoEditor.tsx
â   â   âââ PreviewPanel.tsx
â   â   âââ ProjectOverviewModal.tsx
â   â   âââ ProjectPlanModal.tsx
â   â   âââ SystemStatus.tsx
â   â   âââ Terminal.tsx
â   â   âââ VoiceAssistant.tsx
â   â   âââ VSCodeView.tsx
â   âââ constants/
â   â   âââ colors.ts
â   âââ context/
â   â   âââ AppContext.tsx
â   âââ hooks/
â   â   âââ useApiBase.ts
â   â   âââ useColors.ts
â   âââ plugins/
â   â   âââ withTermuxIntent.js
â   âââ scripts/
â   â   âââ build.js
â   âââ server/
â   â   âââ templates/
â   â   â   âââ landing-page.html
â   â   âââ serve.js
â   âââ utils/
â   â   âââ projectPlan.ts
â   â   âââ zipUtils.ts
â   âââ .env
â   âââ .gitignore
â   âââ app.json
â   âââ babel.config.js
â   âââ eas.json
â   âââ expo-env.d.ts
â   âââ metro.config.js
â   âââ package.json
â   âââ tsconfig.json
âââ mockup-sandbox/
    âââ .replit-artifact/
    â   âââ artifact.toml
    âââ src/
    â   âââ .generated/
    â   â   âââ mockup-components.ts
    â   âââ components/
    â   â   âââ ui/
    â   â       âââ accordion.tsx
    â   â       âââ alert-dialog.tsx
    â   â       âââ alert.tsx
    â   â       âââ aspect-ratio.tsx
    â   â       âââ avatar.tsx
    â   â       âââ badge.tsx
    â   â       âââ breadcrumb.tsx
    â   â       âââ button-group.tsx
    â   â       âââ button.tsx
    â   â       âââ calendar.tsx
    â   â       âââ card.tsx
    â   â       âââ carousel.tsx
    â   â       âââ chart.tsx
    â   â       âââ checkbox.tsx
    â   â       âââ collapsible.tsx
    â   â       âââ command.tsx
    â   â       âââ context-menu.tsx
    â   â       âââ dialog.tsx
    â   â       âââ drawer.tsx
    â   â       âââ dropdown-menu.tsx
    â   â       âââ empty.tsx
    â   â       âââ field.tsx
    â   â       âââ form.tsx
    â   â       âââ hover-card.tsx
    â   â       âââ input-group.tsx
    â   â       âââ input-otp.tsx
    â   â       âââ input.tsx
    â   â       âââ item.tsx
    â   â       âââ kbd.tsx
    â   â       âââ label.tsx
    â   â       âââ menubar.tsx
    â   â       âââ navigation-menu.tsx
    â   â       âââ pagination.tsx
    â   â       âââ popover.tsx
    â   â       âââ progress.tsx
    â   â       âââ radio-group.tsx
    â   â       âââ resizable.tsx
    â   â       âââ scroll-area.tsx
    â   â       âââ select.tsx
    â   â       âââ separator.tsx
    â   â       âââ sheet.tsx
    â   â       âââ sidebar.tsx
    â   â       âââ skeleton.tsx
    â   â       âââ slider.tsx
    â   â       âââ sonner.tsx
    â   â       âââ spinner.tsx
    â   â       âââ switch.tsx
    â   â       âââ table.tsx
    â   â       âââ tabs.tsx
    â   â       âââ textarea.tsx
    â   â       âââ toast.tsx
    â   â       âââ toaster.tsx
    â   â       âââ toggle-group.tsx
    â   â       âââ toggle.tsx
    â   â       âââ tooltip.tsx
    â   âââ hooks/
    â   â   âââ use-mobile.tsx
    â   â   âââ use-toast.ts
    â   âââ lib/
    â   â   âââ utils.ts
    â   âââ App.tsx
    â   âââ index.css
    â   âââ main.tsx
    âââ components.json
    âââ index.html
    âââ mockupPreviewPlugin.ts
    âââ package.json
    âââ tsconfig.json
    âââ vite.config.ts
```

---

## STACK TECNOLOGICO DETECTADO

- **Frontend:** React, TypeScript

---

## ROTAS DA API (endpoints detectados automaticamente)

```
USE    /api  (em api-server/src/app.ts)
USE    /api  (em api-server/src/app.ts)
USE    /api  (em api-server/src/app.ts)
POST   /ai/chat  (em api-server/src/routes/ai-proxy.ts)
POST   /db/test-connection  (em api-server/src/routes/db.ts)
POST   /db/execute  (em api-server/src/routes/db.ts)
GET    /github/user  (em api-server/src/routes/github.ts)
GET    /github/repos  (em api-server/src/routes/github.ts)
POST   /github/clone  (em api-server/src/routes/github.ts)
POST   /github/create-repo  (em api-server/src/routes/github.ts)
POST   /github/push-files  (em api-server/src/routes/github.ts)
GET    /healthz  (em api-server/src/routes/health.ts)
GET    /preview/check  (em api-server/src/routes/preview.ts)
USE    /preview/port/:port  (em api-server/src/routes/preview.ts)
GET    /search  (em api-server/src/routes/search.ts)
POST   /terminal/exec  (em api-server/src/routes/terminal.ts)
POST   /terminal/write  (em api-server/src/routes/terminal.ts)
GET    /terminal/ls  (em api-server/src/routes/terminal.ts)
GET    /terminal/read  (em api-server/src/routes/terminal.ts)
DELETE /terminal/session/:sessionId  (em api-server/src/routes/terminal.ts)
GET    /termux/server.mjs  (em api-server/src/routes/termux.ts)
GET    /termux/setup.sh  (em api-server/src/routes/termux.ts)
GET    /termux/download  (em api-server/src/routes/termux.ts)
GET    /termux/info  (em api-server/src/routes/termux.ts)
```

---

## VARIAVEIS DE AMBIENTE NECESSARIAS

Crie um arquivo `.env` na raiz com estas variaveis:

```env
PATH=seu_valor_aqui
LOG_LEVEL=seu_valor_aqui
EXPO_PUBLIC_DOMAIN=seu_valor_aqui
BASE_PATH=seu_valor_aqui
REPLIT_INTERNAL_APP_DOMAIN=seu_valor_aqui
REPLIT_DEV_DOMAIN=seu_valor_aqui
REPL_ID=seu_valor_aqui
EXPO_PUBLIC_REPL_ID=seu_valor_aqui
PORT=seu_valor_aqui
```

---

## ARQUIVOS PRINCIPAIS

- `api-server/src/app.ts` â Ponto de entrada do backend
- `api-server/src/index.ts` â Ponto de entrada do backend
- `api-server/src/routes/index.ts` â Ponto de entrada do backend
- `mobile/app/(tabs)/index.tsx` â Arquivo principal
- `mockup-sandbox/index.html` â Arquivo principal
- `mockup-sandbox/src/App.tsx` â Componente raiz do frontend
- `mockup-sandbox/src/main.tsx` â Arquivo principal

---

## GUIA COMPLETO â O QUE CADA PARTE DO PROJETO FAZ

> Esta secao explica, em linguagem simples, o que e para que serve cada pasta e cada arquivo.

### ð `.sk/`
> Pasta '.sk' â agrupamento de arquivos relacionados.

**`memoria.json`** _(1 linha)_
Arquivo de dados ou configuracao no formato JSON (chave: valor).

**`perfil-jasmim.md`** _(36 linhas)_
Arquivo de documentacao em Markdown (texto formatado com #titulos, **negrito**, listas).

---

### ð `api-server/`
> Pasta 'api-server' â agrupamento de arquivos relacionados.

**`.pnpmfile-approve.cjs`** _(2 linhas)_
Arquivo CJS â parte do projeto.

**`build.mjs`** _(126 linhas)_
Arquivo MJS â parte do projeto.

**`package.json`** _(37 linhas)_
Registro de dependencias e scripts do projeto. Aqui ficam os comandos (npm run dev, npm start) e os pacotes instalados.

**`tsconfig.json`** _(21 linhas)_
Configuracao do TypeScript. Diz para o computador como interpretar o codigo .ts e .tsx.

---

### ð `mobile/`
> Pasta 'mobile' â agrupamento de arquivos relacionados.

**`.env`** _(2 linhas)_
Arquivo de variaveis secretas (senhas, chaves de API). NUNCA suba este arquivo para o GitHub.

**`.gitignore`** _(42 linhas)_
Lista de arquivos/pastas que o Git deve IGNORAR (nao versionar). Ex: node_modules, .env

**`app.json`** _(56 linhas)_
Arquivo de dados ou configuracao no formato JSON (chave: valor).

**`babel.config.js`** _(7 linhas)_
Arquivo de CONSTANTES/CONFIGURACAO â valores fixos usados em varios lugares do projeto.

**`eas.json`** _(50 linhas)_
Arquivo de dados ou configuracao no formato JSON (chave: valor).

**`expo-env.d.ts`** _(3 linhas)_
Arquivo TypeScript/JavaScript â logica, funcoes ou modulo do projeto.

**`metro.config.js`** _(4 linhas)_
Arquivo de CONSTANTES/CONFIGURACAO â valores fixos usados em varios lugares do projeto.

**`package.json`** _(71 linhas)_
Registro de dependencias e scripts do projeto. Aqui ficam os comandos (npm run dev, npm start) e os pacotes instalados.

**`tsconfig.json`** _(24 linhas)_
Configuracao do TypeScript. Diz para o computador como interpretar o codigo .ts e .tsx.

---

### ð `mockup-sandbox/`
> Pasta 'mockup-sandbox' â agrupamento de arquivos relacionados.

**`components.json`** _(22 linhas)_
Arquivo de dados ou configuracao no formato JSON (chave: valor).

**`index.html`** _(32 linhas)_
Pagina HTML raiz do projeto. E o ponto de entrada que o browser carrega primeiro.

**`mockupPreviewPlugin.ts`** _(181 linhas)_
Arquivo TypeScript/JavaScript â logica, funcoes ou modulo do projeto.

**`package.json`** _(75 linhas)_
Registro de dependencias e scripts do projeto. Aqui ficam os comandos (npm run dev, npm start) e os pacotes instalados.

**`tsconfig.json`** _(17 linhas)_
Configuracao do TypeScript. Diz para o computador como interpretar o codigo .ts e .tsx.

**`vite.config.ts`** _(73 linhas)_
Configuracao do Vite (servidor de desenvolvimento). Define a porta, alias de caminhos e plugins usados.

---

### ð `api-server/.replit-artifact/`
> Pasta '.replit-artifact' â agrupamento de arquivos relacionados.

**`artifact.toml`** _(33 linhas)_
Arquivo TOML â parte do projeto.

---

### ð `api-server/dist/`
> Codigo compilado/gerado automaticamente â NAO edite diretamente.

**`index.mjs`** _(83540 linhas)_
Arquivo MJS â parte do projeto.

**`index.mjs.map`** _(8 linhas)_
Arquivo MAP â parte do projeto.

**`pino-file.mjs`** _(4351 linhas)_
Arquivo MJS â parte do projeto.

**`pino-file.mjs.map`** _(8 linhas)_
Arquivo MAP â parte do projeto.

**`pino-pretty.mjs`** _(3312 linhas)_
Arquivo MJS â parte do projeto.

**`pino-pretty.mjs.map`** _(8 linhas)_
Arquivo MAP â parte do projeto.

**`pino-worker.mjs`** _(4707 linhas)_
Arquivo MJS â parte do projeto.

**`pino-worker.mjs.map`** _(8 linhas)_
Arquivo MAP â parte do projeto.

**`thread-stream-worker.mjs`** _(229 linhas)_
Arquivo MJS â parte do projeto.

**`thread-stream-worker.mjs.map`** _(8 linhas)_
Arquivo MAP â parte do projeto.

---

### ð `api-server/src/`
> Codigo-fonte principal do projeto. Nao apague esta pasta.

**`app.ts`** _(88 linhas)_
Arquivo TypeScript/JavaScript â logica, funcoes ou modulo do projeto.

**`index.ts`** _(46 linhas)_
Arquivo INDEX â ponto de entrada da pasta, exporta tudo que esta dentro.

---

### ð `mobile/.expo/`
> Pasta '.expo' â agrupamento de arquivos relacionados.

**`README.md`** _(14 linhas)_
Documentacao principal do projeto. Explica o que o projeto faz e como rodar.

**`devices.json`** _(4 linhas)_
Arquivo de dados ou configuracao no formato JSON (chave: valor).

---

### ð `mobile/.replit-artifact/`
> Pasta '.replit-artifact' â agrupamento de arquivos relacionados.

**`artifact.toml`** _(23 linhas)_
Arquivo TOML â parte do projeto.

---

### ð `mobile/app/`
> Pasta 'app' â agrupamento de arquivos relacionados.

**`+not-found.tsx`** _(46 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`_layout.tsx`** _(70 linhas)_
Componente de LAYOUT â define a estrutura visual da pagina (cabecalho, sidebar, rodape). Envolve outros componentes.

---

### ð `mobile/components/`
> Pecas visuais reutilizaveis da interface (botoes, cards, formularios...).

**`AIChat.tsx`** _(972 linhas)_
Componente de CHAT/MENSAGENS â interface de conversa em tempo real.

**`AIMemoryModal.tsx`** _(203 linhas)_
Componente MODAL â janela/popup que aparece sobre a tela pedindo uma acao ou mostrando uma informacao importante.

**`CampoLivreModal.tsx`** _(989 linhas)_
Componente MODAL â janela/popup que aparece sobre a tela pedindo uma acao ou mostrando uma informacao importante.

**`CheckpointsModal.tsx`** _(173 linhas)_
Componente MODAL â janela/popup que aparece sobre a tela pedindo uma acao ou mostrando uma informacao importante.

**`CodeEditor.tsx`** _(337 linhas)_
Componente EDITOR â area de edicao de texto, codigo ou conteudo rico.

**`CombinarAppsModal.tsx`** _(352 linhas)_
Componente MODAL â janela/popup que aparece sobre a tela pedindo uma acao ou mostrando uma informacao importante.

**`ErrorBoundary.tsx`** _(55 linhas)_
Componente de ERRO â exibido quando algo da errado, com mensagem explicativa.

**`ErrorFallback.tsx`** _(279 linhas)_
Componente de ERRO â exibido quando algo da errado, com mensagem explicativa.

**`FileSidebar.tsx`** _(595 linhas)_
Componente de BARRA LATERAL â menu ou painel que aparece na lateral da tela.

**`FloatingAI.tsx`** _(897 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`GitHubModal.tsx`** _(939 linhas)_
Componente MODAL â janela/popup que aparece sobre a tela pedindo uma acao ou mostrando uma informacao importante.

**`HtmlPlayground.tsx`** _(706 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`KeyboardAwareScrollViewCompat.tsx`** _(30 linhas)_
Componente de PAGINA/TELA â representa uma tela completa navegavel no app.

**`LibrarySearch.tsx`** _(327 linhas)_
Componente de BUSCA â campo e logica para filtrar/encontrar conteudo.

**`ManualModal.tsx`** _(723 linhas)_
Componente MODAL â janela/popup que aparece sobre a tela pedindo uma acao ou mostrando uma informacao importante.

**`MessageRenderer.tsx`** _(265 linhas)_
Componente de CHAT/MENSAGENS â interface de conversa em tempo real.

**`MonacoEditor.tsx`** _(163 linhas)_
Componente EDITOR â area de edicao de texto, codigo ou conteudo rico.

**`PreviewPanel.tsx`** _(493 linhas)_
Componente de PAGINA/TELA â representa uma tela completa navegavel no app.

**`ProjectOverviewModal.tsx`** _(504 linhas)_
Componente MODAL â janela/popup que aparece sobre a tela pedindo uma acao ou mostrando uma informacao importante.

**`ProjectPlanModal.tsx`** _(369 linhas)_
Componente MODAL â janela/popup que aparece sobre a tela pedindo uma acao ou mostrando uma informacao importante.

**`SystemStatus.tsx`** _(480 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`Terminal.tsx`** _(714 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`VSCodeView.tsx`** _(584 linhas)_
Componente de PAGINA/TELA â representa uma tela completa navegavel no app.

**`VoiceAssistant.tsx`** _(954 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

---

### ð `mobile/constants/`
> Pasta 'constants' â agrupamento de arquivos relacionados.

**`colors.ts`** _(98 linhas)_
Arquivo TypeScript/JavaScript â logica, funcoes ou modulo do projeto.

---

### ð `mobile/context/`
> Gerenciamento de estado global â dados compartilhados entre telas.

**`AppContext.tsx`** _(1113 linhas)_
CONTEXT do React â mecanismo para compartilhar dados entre componentes sem passar por props.

---

### ð `mobile/hooks/`
> Hooks React customizados â logica reutilizavel de estado e efeitos.

**`useApiBase.ts`** _(62 linhas)_
HOOK de dados â busca informacoes da API e gerencia estado de carregamento e erro.

**`useColors.ts`** _(25 linhas)_
HOOK React personalizado para gerenciar estado/comportamento de 'colors'.

---

### ð `mobile/plugins/`
> Pasta 'plugins' â agrupamento de arquivos relacionados.

**`withTermuxIntent.js`** _(26 linhas)_
Arquivo TypeScript/JavaScript â logica, funcoes ou modulo do projeto.

---

### ð `mobile/scripts/`
> Pasta 'scripts' â agrupamento de arquivos relacionados.

**`build.js`** _(574 linhas)_
Arquivo TypeScript/JavaScript â logica, funcoes ou modulo do projeto.

---

### ð `mobile/server/`
> Pasta 'server' â agrupamento de arquivos relacionados.

**`serve.js`** _(136 linhas)_
Arquivo TypeScript/JavaScript â logica, funcoes ou modulo do projeto.

---

### ð `mobile/utils/`
> Funcoes auxiliares reutilizaveis em varios lugares do projeto.

**`projectPlan.ts`** _(208 linhas)_
Arquivo TypeScript/JavaScript â logica, funcoes ou modulo do projeto.

**`zipUtils.ts`** _(403 linhas)_
Funcoes UTILITARIAS â ferramentas reutilizaveis de uso geral no projeto.

---

### ð `mockup-sandbox/.replit-artifact/`
> Pasta '.replit-artifact' â agrupamento de arquivos relacionados.

**`artifact.toml`** _(18 linhas)_
Arquivo TOML â parte do projeto.

---

### ð `mockup-sandbox/src/`
> Codigo-fonte principal do projeto. Nao apague esta pasta.

**`App.tsx`** _(147 linhas)_
Componente RAIZ do frontend â e o pai de todos os outros componentes. Aqui ficam as rotas principais.

**`index.css`** _(158 linhas)_
Arquivo de estilos visuais â cores, tamanhos, fontes, espacamentos da interface.

**`main.tsx`** _(6 linhas)_
Ponto de entrada do React â monta o componente App na pagina HTML.

---

### ð `api-server/src/lib/`
> Funcoes auxiliares reutilizaveis em varios lugares do projeto.

**`.gitkeep`** _(1 linha)_
Arquivo GITKEEP â parte do projeto.

**`codeServer.ts`** _(156 linhas)_
Arquivo TypeScript/JavaScript â logica, funcoes ou modulo do projeto.

**`logger.ts`** _(21 linhas)_
Arquivo TypeScript/JavaScript â logica, funcoes ou modulo do projeto.

---

### ð `api-server/src/middlewares/`
> Pasta 'middlewares' â agrupamento de arquivos relacionados.

**`.gitkeep`** _(1 linha)_
Arquivo GITKEEP â parte do projeto.

---

### ð `api-server/src/routes/`
> Definicao das URLs e navegacao do app.

**`ai-proxy.ts`** _(87 linhas)_
Arquivo TypeScript/JavaScript â logica, funcoes ou modulo do projeto.

**`db.ts`** _(67 linhas)_
Arquivo TypeScript/JavaScript â logica, funcoes ou modulo do projeto.

**`github.ts`** _(192 linhas)_
Arquivo TypeScript/JavaScript â logica, funcoes ou modulo do projeto.

**`health.ts`** _(12 linhas)_
Arquivo TypeScript/JavaScript â logica, funcoes ou modulo do projeto.

**`index.ts`** _(23 linhas)_
Arquivo INDEX â ponto de entrada da pasta, exporta tudo que esta dentro.

**`preview.ts`** _(57 linhas)_
Arquivo TypeScript/JavaScript â logica, funcoes ou modulo do projeto.

**`search.ts`** _(62 linhas)_
Arquivo TypeScript/JavaScript â logica, funcoes ou modulo do projeto.

**`terminal.ts`** _(249 linhas)_
Arquivo TypeScript/JavaScript â logica, funcoes ou modulo do projeto.

**`termux.ts`** _(157 linhas)_
Arquivo TypeScript/JavaScript â logica, funcoes ou modulo do projeto.

---

### ð `mobile/.expo/types/`
> Definicoes de tipos TypeScript â contratos de dados.

**`router.d.ts`** _(15 linhas)_
Arquivo de ROTAS â define as URLs/enderecos respondidos pelo servidor.

---

### ð `mobile/app/(tabs)/`
> Pasta '(tabs)' â agrupamento de arquivos relacionados.

**`_layout.tsx`** _(152 linhas)_
Componente de LAYOUT â define a estrutura visual da pagina (cabecalho, sidebar, rodape). Envolve outros componentes.

**`ai.tsx`** _(81 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`editor.tsx`** _(1567 linhas)_
Componente EDITOR â area de edicao de texto, codigo ou conteudo rico.

**`index.tsx`** _(3180 linhas)_
Ponto de entrada do React â monta o componente App na pagina HTML.

**`plugins.tsx`** _(1234 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`settings.tsx`** _(1527 linhas)_
Componente de CONFIGURACOES â tela onde o usuario ajusta preferencias do app.

**`tasks.tsx`** _(522 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`terminal.tsx`** _(81 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

---

### ð `mobile/assets/images/`
> Pasta 'images' â agrupamento de arquivos relacionados.

**`icon.png`** _(2137 linhas)_
Arquivo de imagem.

---

### ð `mobile/server/templates/`
> Pasta 'templates' â agrupamento de arquivos relacionados.

**`landing-page.html`** _(461 linhas)_
Arquivo HTML â parte do projeto.

---

### ð `mockup-sandbox/src/.generated/`
> Pasta '.generated' â agrupamento de arquivos relacionados.

**`mockup-components.ts`** _(6 linhas)_
Arquivo TypeScript/JavaScript â logica, funcoes ou modulo do projeto.

---

### ð `mockup-sandbox/src/hooks/`
> Hooks React customizados â logica reutilizavel de estado e efeitos.

**`use-mobile.tsx`** _(20 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`use-toast.ts`** _(190 linhas)_
HOOK React personalizado para gerenciar estado/comportamento de '-toast'.

---

### ð `mockup-sandbox/src/lib/`
> Funcoes auxiliares reutilizaveis em varios lugares do projeto.

**`utils.ts`** _(7 linhas)_
Funcoes UTILITARIAS â ferramentas reutilizaveis de uso geral no projeto.

---

### ð `mockup-sandbox/src/components/ui/`
> Componentes de UI (interface) basicos e genericos.

**`accordion.tsx`** _(56 linhas)_
Componente ACCORDION â secoes que abrem/fecham ao clicar, economizando espaco na tela.

**`alert-dialog.tsx`** _(140 linhas)_
Componente de NOTIFICACAO/ALERTA â mensagem temporaria que aparece na tela (ex: 'Salvo com sucesso!').

**`alert.tsx`** _(60 linhas)_
Componente de NOTIFICACAO/ALERTA â mensagem temporaria que aparece na tela (ex: 'Salvo com sucesso!').

**`aspect-ratio.tsx`** _(6 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`avatar.tsx`** _(51 linhas)_
Componente AVATAR â foto ou iniciais do usuario em formato circular.

**`badge.tsx`** _(38 linhas)_
Componente BADGE (etiqueta) â pequeno indicador com numero ou status (ex: '3 novas mensagens').

**`breadcrumb.tsx`** _(116 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`button-group.tsx`** _(84 linhas)_
Componente de BOTAO â elemento clicavel reutilizavel com estilo padrao do projeto.

**`button.tsx`** _(59 linhas)_
Componente de BOTAO â elemento clicavel reutilizavel com estilo padrao do projeto.

**`calendar.tsx`** _(214 linhas)_
Componente CALENDARIO/AGENDA â visualizacao e selecao de datas e eventos.

**`card.tsx`** _(77 linhas)_
Componente CARD (cartao) â exibe uma informacao em um bloco visual com borda e sombra. Muito usado para listas de items.

**`carousel.tsx`** _(261 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`chart.tsx`** _(366 linhas)_
Componente de GRAFICO â visualizacao de dados em forma de grafico (barras, linhas, pizza...).

**`checkbox.tsx`** _(29 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`collapsible.tsx`** _(12 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`command.tsx`** _(154 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`context-menu.tsx`** _(199 linhas)_
CONTEXT do React â mecanismo para compartilhar dados entre componentes sem passar por props.

**`dialog.tsx`** _(121 linhas)_
Componente DIALOG â caixa de dialogo que exige resposta do usuario (confirmar, cancelar...).

**`drawer.tsx`** _(117 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`dropdown-menu.tsx`** _(202 linhas)_
Componente de MENU/DROPDOWN â lista de opcoes que aparece ao clicar em um botao.

**`empty.tsx`** _(105 linhas)_
Componente de ESTADO VAZIO â exibido quando nao ha dados para mostrar (ex: 'Nenhum resultado encontrado').

**`field.tsx`** _(245 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`form.tsx`** _(177 linhas)_
Componente de FORMULARIO â campos de entrada de dados (texto, selecao, etc.) com validacao.

**`hover-card.tsx`** _(28 linhas)_
Componente CARD (cartao) â exibe uma informacao em um bloco visual com borda e sombra. Muito usado para listas de items.

**`input-group.tsx`** _(166 linhas)_
Componente de CAMPO DE ENTRADA â elemento de input com estilo personalizado.

**`input-otp.tsx`** _(70 linhas)_
Componente de CAMPO DE ENTRADA â elemento de input com estilo personalizado.

**`input.tsx`** _(23 linhas)_
Componente de CAMPO DE ENTRADA â elemento de input com estilo personalizado.

**`item.tsx`** _(194 linhas)_
Componente de ITEM â representa um elemento individual dentro de uma lista ou colecao.

**`kbd.tsx`** _(29 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`label.tsx`** _(27 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`menubar.tsx`** _(255 linhas)_
Componente de MENU/DROPDOWN â lista de opcoes que aparece ao clicar em um botao.

**`navigation-menu.tsx`** _(129 linhas)_
Componente de NAVEGACAO/CABECALHO â barra superior com logo, menu e links de navegacao.

**`pagination.tsx`** _(118 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`popover.tsx`** _(32 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`progress.tsx`** _(29 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`radio-group.tsx`** _(43 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`resizable.tsx`** _(46 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`scroll-area.tsx`** _(47 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`select.tsx`** _(160 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`separator.tsx`** _(30 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`sheet.tsx`** _(141 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`sidebar.tsx`** _(715 linhas)_
Componente de BARRA LATERAL â menu ou painel que aparece na lateral da tela.

**`skeleton.tsx`** _(16 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`slider.tsx`** _(27 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`sonner.tsx`** _(32 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`spinner.tsx`** _(17 linhas)_
Componente de CARREGAMENTO â animacao visual que aparece enquanto dados estao sendo buscados.

**`switch.tsx`** _(28 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`table.tsx`** _(121 linhas)_
Componente de TABELA â exibe dados em linhas e colunas.

**`tabs.tsx`** _(54 linhas)_
Componente de ABAS â permite alternar entre diferentes secoes de conteudo com clique.

**`textarea.tsx`** _(23 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`toast.tsx`** _(128 linhas)_
Componente de NOTIFICACAO/ALERTA â mensagem temporaria que aparece na tela (ex: 'Salvo com sucesso!').

**`toaster.tsx`** _(34 linhas)_
Componente de NOTIFICACAO/ALERTA â mensagem temporaria que aparece na tela (ex: 'Salvo com sucesso!').

**`toggle-group.tsx`** _(62 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`toggle.tsx`** _(44 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

**`tooltip.tsx`** _(33 linhas)_
Componente React â parte visual reutilizavel da interface do usuario.

---

### ð `mobile/.expo/web/cache/production/images/favicon/favicon-a81a8b823918132ad1bb32b7ba8be194b0e081efa726735499c96199d2d6f630-contain-transparent/`
> Pasta 'favicon-a81a8b823918132ad1bb32b7ba8be194b0e081efa726735499c96199d2d6f630-contain-transparent' â agrupamento de arquivos relacionados.

**`favicon-48.png`** _(10 linhas)_
Arquivo de imagem.

---

## CONTEXTO PARA IA (copie e cole para continuar o projeto)

> Use este bloco para explicar o projeto para qualquer IA ou desenvolvedor:

```
Projeto: Chat IA para Netlify (Campo Livre Standalone)
Tipo: Aplicacao Web Frontend (React)
Stack: React, TypeScript
Arquivos: 160 | Linhas: ~130.527
Rotas API: 24 endpoint(s) detectado(s)
Variaveis de ambiente necessarias: PATH, LOG_LEVEL, EXPO_PUBLIC_DOMAIN, BASE_PATH, REPLIT_INTERNAL_APP_DOMAIN, REPLIT_DEV_DOMAIN, REPL_ID, EXPO_PUBLIC_REPL_ID, PORT

Estrutura principal:
  .sk/memoria.json
  .sk/perfil-jasmim.md
  api-server/.pnpmfile-approve.cjs
  api-server/.replit-artifact/artifact.toml
  api-server/build.mjs
  api-server/dist/index.mjs
  api-server/dist/index.mjs.map
  api-server/dist/pino-file.mjs
  api-server/dist/pino-file.mjs.map
  api-server/dist/pino-pretty.mjs
  api-server/dist/pino-pretty.mjs.map
  api-server/dist/pino-worker.mjs
  api-server/dist/pino-worker.mjs.map
  api-server/dist/thread-stream-worker.mjs
  api-server/dist/thread-stream-worker.mjs.map
  api-server/package.json
  api-server/src/app.ts
  api-server/src/index.ts
  api-server/src/lib/.gitkeep
  api-server/src/lib/codeServer.ts
  api-server/src/lib/logger.ts
  api-server/src/middlewares/.gitkeep
  api-server/src/routes/ai-proxy.ts
  api-server/src/routes/db.ts
  api-server/src/routes/github.ts
  api-server/src/routes/health.ts
  api-server/src/routes/index.ts
  api-server/src/routes/preview.ts
  api-server/src/routes/search.ts
  api-server/src/routes/terminal.ts
  api-server/src/routes/termux.ts
  api-server/tsconfig.json
  mobile/.env
  mobile/.expo/README.md
  mobile/.expo/devices.json
  mobile/.expo/types/router.d.ts
  mobile/.expo/web/cache/production/images/favicon/favicon-a81a8b823918132ad1bb32b7ba8be194b0e081efa726735499c96199d2d6f630-contain-transparent/favicon-48.png
  mobile/.gitignore
  mobile/.replit-artifact/artifact.toml
  mobile/app.json
  mobile/app/(tabs)/_layout.tsx
  mobile/app/(tabs)/ai.tsx
  mobile/app/(tabs)/editor.tsx
  mobile/app/(tabs)/index.tsx
  mobile/app/(tabs)/plugins.tsx
  mobile/app/(tabs)/settings.tsx
  mobile/app/(tabs)/tasks.tsx
  mobile/app/(tabs)/terminal.tsx
  mobile/app/+not-found.tsx
  mobile/app/_layout.tsx
  mobile/assets/images/icon.png
  mobile/babel.config.js
  mobile/components/AIChat.tsx
  mobile/components/AIMemoryModal.tsx
  mobile/components/CampoLivreModal.tsx
  mobile/components/CheckpointsModal.tsx
  mobile/components/CodeEditor.tsx
  mobile/components/CombinarAppsModal.tsx
  mobile/components/ErrorBoundary.tsx
  mobile/components/ErrorFallback.tsx
  mobile/components/FileSidebar.tsx
  mobile/components/FloatingAI.tsx
  mobile/components/GitHubModal.tsx
  mobile/components/HtmlPlayground.tsx
  mobile/components/KeyboardAwareScrollViewCompat.tsx
  mobile/components/LibrarySearch.tsx
  mobile/components/ManualModal.tsx
  mobile/components/MessageRenderer.tsx
  mobile/components/MonacoEditor.tsx
  mobile/components/PreviewPanel.tsx
  mobile/components/ProjectOverviewModal.tsx
  mobile/components/ProjectPlanModal.tsx
  mobile/components/SystemStatus.tsx
  mobile/components/Terminal.tsx
  mobile/components/VSCodeView.tsx
  mobile/components/VoiceAssistant.tsx
  mobile/constants/colors.ts
  mobile/context/AppContext.tsx
  mobile/eas.json
  mobile/expo-env.d.ts
  mobile/hooks/useApiBase.ts
  mobile/hooks/useColors.ts
  mobile/metro.config.js
  mobile/package.json
  mobile/plugins/withTermuxIntent.js
  mobile/scripts/build.js
  mobile/server/serve.js
  mobile/server/templates/landing-page.html
  mobile/tsconfig.json
  mobile/utils/projectPlan.ts
  mobile/utils/zipUtils.ts
  mockup-sandbox/.replit-artifact/artifact.toml
  mockup-sandbox/components.json
  mockup-sandbox/index.html
  mockup-sandbox/mockupPreviewPlugin.ts
  mockup-sandbox/package.json
  mockup-sandbox/src/.generated/mockup-components.ts
  mockup-sandbox/src/App.tsx
  mockup-sandbox/src/components/ui/accordion.tsx
  mockup-sandbox/src/components/ui/alert-dialog.tsx
  mockup-sandbox/src/components/ui/alert.tsx
  mockup-sandbox/src/components/ui/aspect-ratio.tsx
  mockup-sandbox/src/components/ui/avatar.tsx
  mockup-sandbox/src/components/ui/badge.tsx
  mockup-sandbox/src/components/ui/breadcrumb.tsx
  mockup-sandbox/src/components/ui/button-group.tsx
  mockup-sandbox/src/components/ui/button.tsx
  mockup-sandbox/src/components/ui/calendar.tsx
  mockup-sandbox/src/components/ui/card.tsx
  mockup-sandbox/src/components/ui/carousel.tsx
  mockup-sandbox/src/components/ui/chart.tsx
  mockup-sandbox/src/components/ui/checkbox.tsx
  mockup-sandbox/src/components/ui/collapsible.tsx
  mockup-sandbox/src/components/ui/command.tsx
  mockup-sandbox/src/components/ui/context-menu.tsx
  mockup-sandbox/src/components/ui/dialog.tsx
  mockup-sandbox/src/components/ui/drawer.tsx
  mockup-sandbox/src/components/ui/dropdown-menu.tsx
  mockup-sandbox/src/components/ui/empty.tsx
  mockup-sandbox/src/components/ui/field.tsx
  mockup-sandbox/src/components/ui/form.tsx
  mockup-sandbox/src/components/ui/hover-card.tsx
  mockup-sandbox/src/components/ui/input-group.tsx
  mockup-sandbox/src/components/ui/input-otp.tsx
  mockup-sandbox/src/components/ui/input.tsx
  mockup-sandbox/src/components/ui/item.tsx
  mockup-sandbox/src/components/ui/kbd.tsx
  mockup-sandbox/src/components/ui/label.tsx
  mockup-sandbox/src/components/ui/menubar.tsx
  mockup-sandbox/src/components/ui/navigation-menu.tsx
  mockup-sandbox/src/components/ui/pagination.tsx
  mockup-sandbox/src/components/ui/popover.tsx
  mockup-sandbox/src/components/ui/progress.tsx
  mockup-sandbox/src/components/ui/radio-group.tsx
  mockup-sandbox/src/components/ui/resizable.tsx
  mockup-sandbox/src/components/ui/scroll-area.tsx
  mockup-sandbox/src/components/ui/select.tsx
  mockup-sandbox/src/components/ui/separator.tsx
  mockup-sandbox/src/components/ui/sheet.tsx
  mockup-sandbox/src/components/ui/sidebar.tsx
  mockup-sandbox/src/components/ui/skeleton.tsx
  mockup-sandbox/src/components/ui/slider.tsx
  mockup-sandbox/src/components/ui/sonner.tsx
  mockup-sandbox/src/components/ui/spinner.tsx
  mockup-sandbox/src/components/ui/switch.tsx
  mockup-sandbox/src/components/ui/table.tsx
  mockup-sandbox/src/components/ui/tabs.tsx
  mockup-sandbox/src/components/ui/textarea.tsx
  mockup-sandbox/src/components/ui/toast.tsx
  mockup-sandbox/src/components/ui/toaster.tsx
  mockup-sandbox/src/components/ui/toggle-group.tsx
  mockup-sandbox/src/components/ui/toggle.tsx
  mockup-sandbox/src/components/ui/tooltip.tsx
  mockup-sandbox/src/hooks/use-mobile.tsx
  mockup-sandbox/src/hooks/use-toast.ts
  mockup-sandbox/src/index.css
  mockup-sandbox/src/lib/utils.ts
  mockup-sandbox/src/main.tsx
  mockup-sandbox/tsconfig.json
  mockup-sandbox/vite.config.ts
```

---

*Plano gerado pelo SK Code Editor â 30/04/2026, 11:48:50*