# Configuração do Firebase

## 1. Criar arquivo .env.local

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyASDdArUboaeKvb_D7bvufFwobOcNi7mpw
VITE_FIREBASE_AUTH_DOMAIN=neomedi-bb3f0.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=neomedi-bb3f0
VITE_FIREBASE_STORAGE_BUCKET=neomedi-bb3f0.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# API Configuration
VITE_API_BASE_URL=http://localhost:8000
```

## 2. Verificar configuração do Firebase

Baseado no console, o projeto Firebase é `neomedi-bb3f0`. Você precisa:

1. Acessar o [Firebase Console](https://console.firebase.google.com/)
2. Selecionar o projeto `neomedi-bb3f0`
3. Ir em "Project Settings" > "General"
4. Copiar as configurações corretas para o arquivo `.env.local`

## 3. Verificar se a API está rodando

Certifique-se de que a API backend está rodando em `http://localhost:8000`

## 4. Reiniciar o servidor de desenvolvimento

Após criar o arquivo `.env.local`, reinicie o servidor:

```bash
npm run dev
```

## Problemas corrigidos:

✅ Form aninhado removido
✅ Botão Google duplicado removido  
✅ Lógica do Google Auth corrigida
✅ Logs de debug adicionados
✅ Método POST adicionado ao formulário 