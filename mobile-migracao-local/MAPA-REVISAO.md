# Mapa de RevisÃ£o do Projeto Mobile

## Arquivos mais importantes para a migraÃ§Ã£o

### 1. `mobile/.env`
Problema atual:
- aponta para domÃ­nio remoto

AÃ§Ã£o:
- substituir por configuraÃ§Ã£o neutra
- ou remover dependÃªncia obrigatÃ³ria

---

### 2. `mobile/hooks/useApiBase.ts`
Problema provÃ¡vel:
- escolhe uma base de API remota automaticamente

AÃ§Ã£o:
- criar fallback local/offline
- nunca depender de Replit por padrÃ£o

---

### 3. `mobile/context/AppContext.tsx`
Problema provÃ¡vel:
- centraliza aÃ§Ãµes que podem chamar backend remoto

AÃ§Ã£o:
- mapear funÃ§Ãµes dependentes de API
- isolar modo local

---

### 4. `mobile/components/Terminal.tsx`
Problema provÃ¡vel:
- terminal depende de sessÃ£o remota

AÃ§Ã£o:
- desativar temporariamente ou substituir por modo local futuro

---

### 5. `mobile/components/PreviewPanel.tsx`
Problema provÃ¡vel:
- preview de servidor depende de rota remota

AÃ§Ã£o:
- manter apenas preview local/HTML quando possÃ­vel

---

### 6. `mobile/components/SystemStatus.tsx`
Problema provÃ¡vel:
- mede saÃºde de serviÃ§os remotos

AÃ§Ã£o:
- adaptar para modo local
- exibir ârecurso desativadoâ em vez de erro

---

### 7. `mobile/app/(tabs)/terminal.tsx`
Problema provÃ¡vel:
- tela assume que existe terminal Linux remoto

AÃ§Ã£o:
- esconder ou adaptar
- mostrar mensagem clara no modo local

---

### 8. `mobile/app/(tabs)/plugins.tsx`
Problema provÃ¡vel:
- catÃ¡logo oferece instalaÃ§Ãµes que dependem de backend/servidor

AÃ§Ã£o:
- limitar para modo informativo
- marcar o que sÃ³ funciona em Termux/local futuro

---

### 9. `mobile/app/(tabs)/settings.tsx`
Problema provÃ¡vel:
- pode permitir configuraÃ§Ãµes que ainda usam backend remoto

AÃ§Ã£o:
- criar sessÃ£o âmodo localâ
- separar recursos locais e remotos

---

## Regra de ouro
Na primeira fase, o objetivo nÃ£o Ã© manter 100% dos recursos.
O objetivo Ã©:
- o app abrir
- funcionar bem
- nÃ£o depender do Replit
- estar pronto para APK