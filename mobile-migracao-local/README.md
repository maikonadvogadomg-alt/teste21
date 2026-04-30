# MigraÃ§Ã£o do DevMobile para APK Local (sem depender do servidor Replit)

Este pacote foi criado para ajudar na limpeza e migraÃ§Ã£o do projeto `mobile` para uma versÃ£o que funcione no celular sem depender do servidor remoto.

## Objetivo
Transformar o app em um APK mais limpo, preparado para EAS Build, reduzindo ou removendo a dependÃªncia de:
- servidor Replit
- domÃ­nio remoto fixo
- rotas backend obrigatÃ³rias
- recursos que sÃ³ funcionam com API externa ligada

---

## EstratÃ©gia recomendada

### Etapa 1 â Limpeza estrutural
Pode remover do projeto principal:
- `mockup-sandbox/`
- `mobile/.expo/`
- `api-server/dist/`

Depois revisar para possÃ­vel remoÃ§Ã£o:
- `.replit-artifact/`
- referÃªncias a `replit`
- variÃ¡veis `REPLIT_*`
- previews e rotas que sÃ³ fazem sentido no servidor remoto

---

### Etapa 2 â Desacoplar do servidor remoto
Revisar estes arquivos:
- `mobile/.env`
- `mobile/hooks/useApiBase.ts`
- `mobile/context/AppContext.tsx`
- `mobile/components/SystemStatus.tsx`
- `mobile/components/Terminal.tsx`
- `mobile/components/PreviewPanel.tsx`
- `mobile/app/(tabs)/terminal.tsx`
- `mobile/app/(tabs)/plugins.tsx`
- `mobile/app/(tabs)/settings.tsx`

Objetivo:
- impedir que o app dependa de um domÃ­nio remoto por padrÃ£o
- permitir modo local/offline
- esconder recursos indisponÃ­veis quando nÃ£o houver backend

---

### Etapa 3 â Modo local
O app deve funcionar minimamente com:
- projetos
- editor
- tarefas
- configuraÃ§Ãµes
- importaÃ§Ã£o/exportaÃ§Ã£o local
- interface da IA (mesmo que parte dos recursos remotos fiquem desativados)

Recursos que podem precisar ser desativados ou adaptados:
- terminal remoto
- preview de servidor remoto
- GitHub via backend
- banco remoto
- busca web via backend
- proxy de IA via servidor

---

### Etapa 4 â Preparar para build APK
Revisar:
- `mobile/app.json`
- permissÃµes Android
- nome do app
- Ã­cone
- variÃ¡veis de ambiente
- dependÃªncias que exigem backend remoto

Depois:
- gerar build com EAS
- testar em Android real
- sÃ³ entÃ£o decidir o que serÃ¡ reativado localmente com Termux ou API local

---

## Resultado esperado
Ao final da primeira migraÃ§Ã£o, vocÃª terÃ¡:
- um app mais limpo
- menos dependÃªncia do servidor remoto
- base pronta para APK
- espaÃ§o para futura integraÃ§Ã£o local com Termux ou SQLite

---

## ObservaÃ§Ã£o importante
Se o app ainda estiver usando `api-server` como ponte para terminal, preview, GitHub, busca e IA, entÃ£o o APK pode abrir normalmente, mas esses recursos precisam ser:
- desligados temporariamente
- ou substituÃ­dos por soluÃ§Ãµes locais

---

## Ordem prÃ¡tica sugerida
1. limpar estrutura
2. remover domÃ­nio remoto fixo
3. criar modo local/offline
4. esconder mÃ³dulos que exigem backend
5. ajustar build EAS
6. testar APK
7. reativar recursos locais aos poucos

---

## Arquivos deste pacote
- `README.md` â visÃ£o geral
- `CHECKLIST.md` â lista de execuÃ§Ã£o
- `plano-migracao.json` â plano estruturado
- `env.local.exemplo` â exemplo de configuraÃ§Ã£o limpa
- `MAPA-REVISAO.md` â onde mexer no projeto
- `package-base-exemplo.json` â exemplo de referÃªncia para reorganizaÃ§Ã£o

Use este pacote como guia dentro do outro app/editor.