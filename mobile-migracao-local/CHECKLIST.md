# Checklist de MigraÃ§Ã£o para APK Local

## 1. Limpeza inicial
- [ ] Remover `mockup-sandbox/`
- [ ] Remover `mobile/.expo/`
- [ ] Remover `api-server/dist/`

## 2. Limpeza de vÃ­nculo com Replit
- [ ] Revisar `.replit-artifact/`
- [ ] Revisar `EXPO_PUBLIC_DOMAIN`
- [ ] Procurar `replit`, `kirk.replit.dev`, `REPLIT_`
- [ ] Remover domÃ­nio remoto padrÃ£o

## 3. Modo local/offline
- [ ] Ajustar `mobile/hooks/useApiBase.ts`
- [ ] Criar fallback sem servidor
- [ ] Evitar crash quando API estiver indisponÃ­vel
- [ ] Mostrar aviso amigÃ¡vel quando recurso remoto estiver desligado

## 4. Ãreas que precisam revisÃ£o
- [ ] Terminal
- [ ] Preview servidor
- [ ] IA via proxy
- [ ] GitHub via backend
- [ ] Banco remoto
- [ ] Busca web via backend
- [ ] Status do sistema

## 5. Recursos que devem continuar funcionando
- [ ] Projetos
- [ ] Editor
- [ ] Tarefas
- [ ] ConfiguraÃ§Ãµes
- [ ] Estrutura visual do app
- [ ] ImportaÃ§Ã£o/exportaÃ§Ã£o local, se jÃ¡ existir

## 6. Build
- [ ] Revisar `app.json`
- [ ] Revisar permissÃµes Android
- [ ] Validar EAS config
- [ ] Gerar APK
- [ ] Testar em aparelho real

## 7. PÃ³s-migraÃ§Ã£o
- [ ] Decidir se vai integrar Termux
- [ ] Decidir se vai usar SQLite local
- [ ] Decidir se a IA serÃ¡ direta por API key
- [ ] Reativar recursos aos poucos