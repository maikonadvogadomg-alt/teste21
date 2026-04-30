# Pasta de patches planejada

## Objetivo
Esta pasta nÃ£o aplica mudanÃ§as automaticamente.
Ela diz quais arquivos reescrever primeiro no projeto.

## Ordem recomendada dos patches

### Patch 1 â Ambiente local
Arquivos:
- `mobile/.env`
- `mobile/hooks/useApiBase.ts`

Objetivo:
- remover domÃ­nio fixo do Replit
- criar fallback local/offline

---

### Patch 2 â Modo local no app
Arquivos:
- `mobile/context/AppContext.tsx`
- `mobile/components/SystemStatus.tsx`

Objetivo:
- identificar quando backend nÃ£o existe
- nÃ£o deixar o app quebrar
- exibir mensagens claras

---

### Patch 3 â DesativaÃ§Ã£o elegante do terminal remoto
Arquivos:
- `mobile/components/Terminal.tsx`
- `mobile/app/(tabs)/terminal.tsx`

Objetivo:
- evitar erro vermelho
- mostrar estado ârecurso local futuroâ ou âmodo remoto desligadoâ

---

### Patch 4 â VS Code / Preview
Arquivos:
- `mobile/components/VSCodeView.tsx`
- `mobile/components/PreviewPanel.tsx`

Objetivo:
- remover dependÃªncia dura de code-server remoto
- manter versÃ£o simplificada

---

### Patch 5 â Recursos remotos opcionais
Arquivos:
- `mobile/components/GitHubModal.tsx`
- `mobile/components/LibrarySearch.tsx`
- `mobile/components/AIChat.tsx`
- `mobile/app/(tabs)/plugins.tsx`
- `mobile/app/(tabs)/settings.tsx`

Objetivo:
- separar o que Ã© local e o que Ã© remoto
- evitar falhas quando nÃ£o houver servidor