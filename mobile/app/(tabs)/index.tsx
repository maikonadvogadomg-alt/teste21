import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import LibrarySearch from "@/components/LibrarySearch";
import ProjectPlanModal from "@/components/ProjectPlanModal";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";
import { exportZip, importTar, importZip } from "@/utils/zipUtils";
import type { Project } from "@/context/AppContext";

const TEMPLATES: Record<string, { label: string; icon: string; files: { name: string; content: string }[] }> = {
  vazio: {
    label: "Vazio",
    icon: "box",
    files: [
      { name: "README.md", content: "# Novo Projeto\n\nDescreva seu projeto aqui.\n\n## InstalaÃ§Ã£o\n```bash\nnpm install\n```\n\n## Uso\n```bash\nnpm start\n```\n" },
      { name: ".gitignore", content: "node_modules/\n.env\n.DS_Store\ndist/\nbuild/\n*.log\n" },
    ],
  },
  javascript: {
    label: "JavaScript",
    icon: "code",
    files: [
      { name: "index.js", content: `const fs = require('fs');
const path = require('path');

// ConfiguraÃ§Ã£o
const config = {
  nome: 'Meu App',
  versao: '1.0.0',
  debug: process.env.NODE_ENV !== 'production',
};

// UtilitÃ¡rios
function formatarData(data = new Date()) {
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Classe principal
class App {
  constructor(config) {
    this.config = config;
    this.dados = [];
    this.inicializado = false;
  }

  async inicializar() {
    console.log(\`[\${formatarData()}] Iniciando \${this.config.nome} v\${this.config.versao}\`);
    await sleep(100);
    this.inicializado = true;
    return this;
  }

  adicionar(item) {
    if (!this.inicializado) throw new Error('App nÃ£o inicializado');
    const registro = { id: Date.now(), ...item, criadoEm: new Date().toISOString() };
    this.dados.push(registro);
    return registro;
  }

  buscar(id) {
    return this.dados.find(d => d.id === id) || null;
  }

  listar(filtro = {}) {
    return this.dados.filter(d =>
      Object.entries(filtro).every(([k, v]) => d[k] === v)
    );
  }

  remover(id) {
    const idx = this.dados.findIndex(d => d.id === id);
    if (idx === -1) return false;
    this.dados.splice(idx, 1);
    return true;
  }

  status() {
    return {
      nome: this.config.nome,
      versao: this.config.versao,
      totalRegistros: this.dados.length,
      inicializado: this.inicializado,
      dataAtual: formatarData(),
    };
  }
}

// ExecuÃ§Ã£o
async function main() {
  const app = await new App(config).inicializar();

  app.adicionar({ nome: 'Primeiro Item', tipo: 'exemplo' });
  app.adicionar({ nome: 'Segundo Item', tipo: 'exemplo' });
  app.adicionar({ nome: 'Item Especial', tipo: 'especial' });

  console.log('Todos:', app.listar());
  console.log('Exemplos:', app.listar({ tipo: 'exemplo' }));
  console.log('Status:', app.status());
}

main().catch(console.error);
` },
      { name: "package.json", content: '{\n  "name": "meu-projeto-js",\n  "version": "1.0.0",\n  "description": "Projeto JavaScript",\n  "main": "index.js",\n  "scripts": {\n    "start": "node index.js",\n    "dev": "nodemon index.js",\n    "test": "node --test"\n  },\n  "dependencies": {},\n  "devDependencies": {\n    "nodemon": "^3.0.0"\n  }\n}\n' },
      { name: ".env", content: "NODE_ENV=development\nPORT=3000\n" },
      { name: ".gitignore", content: "node_modules/\n.env\n*.log\n" },
      { name: "README.md", content: "# Meu Projeto JavaScript\n\n## InstalaÃ§Ã£o\n```bash\nnpm install\n```\n\n## Executar\n```bash\nnpm start\n# ou em modo desenvolvimento:\nnpm run dev\n```\n" },
    ],
  },
  typescript: {
    label: "TypeScript",
    icon: "file-text",
    files: [
      { name: "src/index.ts", content: `import path from 'path';

// Tipos
interface Usuario {
  id: number;
  nome: string;
  email: string;
  papel: 'admin' | 'usuario' | 'visitante';
  criadoEm: Date;
}

interface RespostaAPI<T> {
  sucesso: boolean;
  dados?: T;
  erro?: string;
  total?: number;
}

// RepositÃ³rio genÃ©rico
class Repositorio<T extends { id: number }> {
  private items: T[] = [];
  private nextId = 1;

  criar(data: Omit<T, 'id'>): T {
    const item = { ...data, id: this.nextId++ } as T;
    this.items.push(item);
    return item;
  }

  buscarPorId(id: number): T | undefined {
    return this.items.find(i => i.id === id);
  }

  listarTodos(filtro?: Partial<T>): T[] {
    if (!filtro) return [...this.items];
    return this.items.filter(item =>
      Object.entries(filtro).every(([k, v]) => (item as Record<string, unknown>)[k] === v)
    );
  }

  atualizar(id: number, data: Partial<T>): T | null {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx === -1) return null;
    this.items[idx] = { ...this.items[idx], ...data };
    return this.items[idx];
  }

  remover(id: number): boolean {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx === -1) return false;
    this.items.splice(idx, 1);
    return true;
  }
}

// ServiÃ§o de usuÃ¡rios
class ServicoUsuario {
  private repo = new Repositorio<Usuario>();

  criar(nome: string, email: string, papel: Usuario['papel'] = 'usuario'): RespostaAPI<Usuario> {
    if (!email.includes('@')) {
      return { sucesso: false, erro: 'Email invÃ¡lido' };
    }
    const usuario = this.repo.criar({ nome, email, papel, criadoEm: new Date() });
    return { sucesso: true, dados: usuario };
  }

  buscar(id: number): RespostaAPI<Usuario> {
    const usuario = this.repo.buscarPorId(id);
    if (!usuario) return { sucesso: false, erro: 'UsuÃ¡rio nÃ£o encontrado' };
    return { sucesso: true, dados: usuario };
  }

  listar(papel?: Usuario['papel']): RespostaAPI<Usuario[]> {
    const todos = papel ? this.repo.listarTodos({ papel } as Partial<Usuario>) : this.repo.listarTodos();
    return { sucesso: true, dados: todos, total: todos.length };
  }
}

// Main
async function main(): Promise<void> {
  const servico = new ServicoUsuario();

  console.log('=== Sistema de UsuÃ¡rios ===\\n');

  const r1 = servico.criar('JoÃ£o Silva', 'joao@email.com', 'admin');
  const r2 = servico.criar('Maria Souza', 'maria@email.com', 'usuario');
  const r3 = servico.criar('Carlos Lima', 'carlos@email.com', 'usuario');

  console.log('Criados:', [r1, r2, r3].map(r => r.dados?.nome));

  const lista = servico.listar();
  console.log('Total de usuÃ¡rios:', lista.total);
  console.log('UsuÃ¡rios:', lista.dados?.map(u => \`\${u.nome} (\${u.papel})\`));

  const buscado = servico.buscar(1);
  console.log('\\nUsuÃ¡rio ID 1:', buscado.dados);
}

main().catch(console.error);
` },
      { name: "tsconfig.json", content: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "commonjs",\n    "lib": ["ES2022"],\n    "strict": true,\n    "esModuleInterop": true,\n    "skipLibCheck": true,\n    "outDir": "./dist",\n    "rootDir": "./src",\n    "resolveJsonModule": true,\n    "declaration": true,\n    "sourceMap": true\n  },\n  "include": ["src/**/*"],\n  "exclude": ["node_modules", "dist"]\n}\n' },
      { name: "package.json", content: '{\n  "name": "meu-projeto-ts",\n  "version": "1.0.0",\n  "scripts": {\n    "build": "tsc",\n    "start": "node dist/index.js",\n    "dev": "ts-node src/index.ts",\n    "watch": "tsc --watch"\n  },\n  "dependencies": {},\n  "devDependencies": {\n    "typescript": "^5.3.0",\n    "ts-node": "^10.9.0",\n    "@types/node": "^20.0.0"\n  }\n}\n' },
      { name: ".gitignore", content: "node_modules/\ndist/\n.env\n*.log\n" },
    ],
  },
  python: {
    label: "Python",
    icon: "terminal",
    files: [
      { name: "main.py", content: `#!/usr/bin/env python3
"""API REST simples com Flask"""

from flask import Flask, jsonify, request, abort
from datetime import datetime
from typing import Optional
import os

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# "Banco" em memÃ³ria
usuarios = []
proximo_id = 1

def gerar_id():
    global proximo_id
    id_atual = proximo_id
    proximo_id += 1
    return id_atual

def validar_email(email: str) -> bool:
    return '@' in email and '.' in email.split('@')[-1]

# Rotas
@app.route('/api/saude', methods=['GET'])
def saude():
    return jsonify({
        'status': 'ok',
        'versao': '1.0.0',
        'horario': datetime.now().isoformat()
    })

@app.route('/api/usuarios', methods=['GET'])
def listar_usuarios():
    papel = request.args.get('papel')
    resultado = [u for u in usuarios if not papel or u['papel'] == papel]
    return jsonify({'sucesso': True, 'dados': resultado, 'total': len(resultado)})

@app.route('/api/usuarios/<int:uid>', methods=['GET'])
def buscar_usuario(uid: int):
    usuario = next((u for u in usuarios if u['id'] == uid), None)
    if not usuario:
        abort(404, description='UsuÃ¡rio nÃ£o encontrado')
    return jsonify({'sucesso': True, 'dados': usuario})

@app.route('/api/usuarios', methods=['POST'])
def criar_usuario():
    dados = request.get_json()
    if not dados or not dados.get('nome') or not dados.get('email'):
        abort(400, description='Nome e email sÃ£o obrigatÃ³rios')
    if not validar_email(dados['email']):
        abort(400, description='Email invÃ¡lido')
    usuario = {
        'id': gerar_id(),
        'nome': dados['nome'],
        'email': dados['email'],
        'papel': dados.get('papel', 'usuario'),
        'criado_em': datetime.now().isoformat(),
    }
    usuarios.append(usuario)
    return jsonify({'sucesso': True, 'dados': usuario}), 201

@app.route('/api/usuarios/<int:uid>', methods=['PUT'])
def atualizar_usuario(uid: int):
    usuario = next((u for u in usuarios if u['id'] == uid), None)
    if not usuario:
        abort(404, description='UsuÃ¡rio nÃ£o encontrado')
    dados = request.get_json() or {}
    usuario.update({k: v for k, v in dados.items() if k in ['nome', 'email', 'papel']})
    return jsonify({'sucesso': True, 'dados': usuario})

@app.route('/api/usuarios/<int:uid>', methods=['DELETE'])
def remover_usuario(uid: int):
    global usuarios
    tam = len(usuarios)
    usuarios = [u for u in usuarios if u['id'] != uid]
    if len(usuarios) == tam:
        abort(404, description='UsuÃ¡rio nÃ£o encontrado')
    return jsonify({'sucesso': True, 'mensagem': 'UsuÃ¡rio removido'})

@app.errorhandler(404)
def nao_encontrado(e):
    return jsonify({'sucesso': False, 'erro': str(e)}), 404

@app.errorhandler(400)
def requisicao_invalida(e):
    return jsonify({'sucesso': False, 'erro': str(e)}), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    print(f'Servidor rodando em http://localhost:{port}')
    app.run(host='0.0.0.0', port=port, debug=debug)
` },
      { name: "requirements.txt", content: "flask==3.0.0\npython-dotenv==1.0.0\ngunicorn==21.2.0\n" },
      { name: ".env", content: "FLASK_ENV=development\nPORT=5000\nSECRET_KEY=troque-esta-chave\n" },
      { name: ".gitignore", content: "__pycache__/\n*.pyc\n*.pyo\n.env\nvenv/\n.venv/\n*.egg-info/\ndist/\nbuild/\n" },
      { name: "README.md", content: "# API Python Flask\n\n## InstalaÃ§Ã£o\n```bash\npython -m venv venv\nsource venv/bin/activate  # Linux/Mac\nvenv\\Scripts\\activate     # Windows\npip install -r requirements.txt\n```\n\n## Executar\n```bash\npython main.py\n```\n\n## Endpoints\n- `GET /api/saude` â Status da API\n- `GET /api/usuarios` â Listar usuÃ¡rios\n- `POST /api/usuarios` â Criar usuÃ¡rio\n- `GET /api/usuarios/:id` â Buscar por ID\n- `PUT /api/usuarios/:id` â Atualizar\n- `DELETE /api/usuarios/:id` â Remover\n" },
    ],
  },
  html: {
    label: "HTML/CSS/JS",
    icon: "globe",
    files: [
      { name: "index.html", content: `<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Site</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="header">
    <nav class="nav">
      <div class="logo">MeuSite</div>
      <ul class="nav-links">
        <li><a href="#inicio">InÃ­cio</a></li>
        <li><a href="#sobre">Sobre</a></li>
        <li><a href="#contato">Contato</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="inicio" class="hero">
      <h1>Bem-vindo ao <span class="destaque">MeuSite</span></h1>
      <p>Uma soluÃ§Ã£o moderna e responsiva para seu negÃ³cio.</p>
      <button class="btn-primary" onclick="scrollParaContato()">Fale Conosco</button>
    </section>

    <section id="sobre" class="sobre">
      <h2>Sobre NÃ³s</h2>
      <div class="cards">
        <div class="card">
          <div class="card-icon">ð</div>
          <h3>RÃ¡pido</h3>
          <p>Performance otimizada para melhor experiÃªncia.</p>
        </div>
        <div class="card">
          <div class="card-icon">ð</div>
          <h3>Seguro</h3>
          <p>Dados protegidos com as melhores prÃ¡ticas.</p>
        </div>
        <div class="card">
          <div class="card-icon">ð±</div>
          <h3>Responsivo</h3>
          <p>Funciona em qualquer dispositivo.</p>
        </div>
      </div>
    </section>

    <section id="contato" class="contato">
      <h2>Entre em Contato</h2>
      <form id="form-contato" onsubmit="enviarForm(event)">
        <div class="form-group">
          <label for="nome">Nome</label>
          <input type="text" id="nome" placeholder="Seu nome" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="seu@email.com" required>
        </div>
        <div class="form-group">
          <label for="mensagem">Mensagem</label>
          <textarea id="mensagem" rows="4" placeholder="Sua mensagem..." required></textarea>
        </div>
        <button type="submit" class="btn-primary">Enviar</button>
      </form>
      <div id="feedback" class="feedback hidden"></div>
    </section>
  </main>

  <footer class="footer">
    <p>&copy; 2024 MeuSite. Todos os direitos reservados.</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
` },
      { name: "style.css", content: `* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --text: #1f2937;
  --text-muted: #6b7280;
  --bg: #ffffff;
  --bg-alt: #f9fafb;
  --border: #e5e7eb;
  --radius: 12px;
}

body { font-family: 'Segoe UI', sans-serif; color: var(--text); line-height: 1.6; }

.header { position: fixed; top: 0; width: 100%; background: rgba(255,255,255,0.95); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); z-index: 100; }
.nav { max-width: 1100px; margin: 0 auto; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
.logo { font-size: 1.3rem; font-weight: 700; color: var(--primary); }
.nav-links { list-style: none; display: flex; gap: 2rem; }
.nav-links a { text-decoration: none; color: var(--text-muted); font-weight: 500; transition: color 0.2s; }
.nav-links a:hover { color: var(--primary); }

.hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 6rem 2rem 2rem; background: linear-gradient(135deg, #f0f0ff 0%, #fff 60%); }
.hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; margin-bottom: 1rem; }
.destaque { color: var(--primary); }
.hero p { font-size: 1.2rem; color: var(--text-muted); margin-bottom: 2rem; max-width: 500px; }

.btn-primary { background: var(--primary); color: #fff; border: none; padding: 0.9rem 2.2rem; border-radius: var(--radius); font-size: 1rem; font-weight: 600; cursor: pointer; transition: background 0.2s, transform 0.1s; }
.btn-primary:hover { background: var(--primary-dark); transform: translateY(-2px); }

.sobre { padding: 5rem 2rem; background: var(--bg-alt); }
.sobre h2, .contato h2 { text-align: center; font-size: 2rem; margin-bottom: 3rem; }
.cards { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }
.card { background: #fff; border: 1px solid var(--border); border-radius: var(--radius); padding: 2rem; text-align: center; transition: transform 0.2s, box-shadow 0.2s; }
.card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.card-icon { font-size: 2.5rem; margin-bottom: 1rem; }
.card h3 { font-size: 1.2rem; margin-bottom: 0.5rem; }
.card p { color: var(--text-muted); font-size: 0.95rem; }

.contato { padding: 5rem 2rem; }
form { max-width: 560px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.2rem; }
.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
label { font-weight: 600; font-size: 0.9rem; }
input, textarea { border: 1px solid var(--border); border-radius: 8px; padding: 0.8rem 1rem; font-size: 1rem; font-family: inherit; transition: border-color 0.2s; }
input:focus, textarea:focus { outline: none; border-color: var(--primary); }
textarea { resize: vertical; }

.feedback { max-width: 560px; margin: 1rem auto 0; padding: 1rem; border-radius: var(--radius); text-align: center; font-weight: 600; }
.feedback.sucesso { background: #d1fae5; color: #065f46; }
.feedback.erro { background: #fee2e2; color: #991b1b; }
.hidden { display: none; }

.footer { background: var(--text); color: #9ca3af; text-align: center; padding: 1.5rem; font-size: 0.9rem; }

@media (max-width: 640px) { .nav-links { display: none; } }
` },
      { name: "script.js", content: `// Smooth scroll para seÃ§Ãµes
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

function scrollParaContato() {
  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
}

// FormulÃ¡rio de contato
function enviarForm(e) {
  e.preventDefault();
  const feedback = document.getElementById('feedback');
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const mensagem = document.getElementById('mensagem').value;

  if (!nome || !email || !mensagem) {
    mostrarFeedback('Por favor, preencha todos os campos.', false);
    return;
  }

  // Simula envio
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    mostrarFeedback(\`Mensagem enviada com sucesso, \${nome}! Entraremos em contato em breve.\`, true);
    e.target.reset();
    btn.textContent = 'Enviar';
    btn.disabled = false;
  }, 1500);
}

function mostrarFeedback(msg, sucesso) {
  const el = document.getElementById('feedback');
  el.textContent = msg;
  el.className = \`feedback \${sucesso ? 'sucesso' : 'erro'}\`;
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  setTimeout(() => { el.className = 'feedback hidden'; }, 5000);
}

// AnimaÃ§Ã£o de entrada ao rolar
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.style.opacity = '1';
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(el => {
  el.style.opacity = '0';
  el.style.transition = 'opacity 0.5s ease';
  observer.observe(el);
});
` },
    ],
  },
  api_express: {
    label: "API Express",
    icon: "server",
    files: [
      { name: "server.js", content: `const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log de requisiÃ§Ãµes
app.use((req, res, next) => {
  console.log(\`[\${new Date().toLocaleTimeString('pt-BR')}] \${req.method} \${req.url}\`);
  next();
});

// Banco em memÃ³ria
const db = {
  usuarios: [],
  nextId: 1,
};

// Helpers
function criarId() { return db.nextId++; }
function agora() { return new Date().toISOString(); }
function validar(obj, campos) {
  const faltando = campos.filter(c => !obj[c]);
  return faltando.length ? \`Campos obrigatÃ³rios: \${faltando.join(', ')}\` : null;
}

// === ROTAS ===

// SaÃºde
app.get('/api/saude', (req, res) => {
  res.json({ status: 'ok', versao: '1.0.0', timestamp: agora(), usuarios: db.usuarios.length });
});

// Listar usuÃ¡rios
app.get('/api/usuarios', (req, res) => {
  const { papel, busca } = req.query;
  let lista = [...db.usuarios];
  if (papel) lista = lista.filter(u => u.papel === papel);
  if (busca) lista = lista.filter(u =>
    u.nome.toLowerCase().includes(busca.toLowerCase()) ||
    u.email.toLowerCase().includes(busca.toLowerCase())
  );
  res.json({ sucesso: true, dados: lista, total: lista.length });
});

// Buscar por ID
app.get('/api/usuarios/:id', (req, res) => {
  const usuario = db.usuarios.find(u => u.id === +req.params.id);
  if (!usuario) return res.status(404).json({ sucesso: false, erro: 'UsuÃ¡rio nÃ£o encontrado' });
  res.json({ sucesso: true, dados: usuario });
});

// Criar usuÃ¡rio
app.post('/api/usuarios', (req, res) => {
  const erro = validar(req.body, ['nome', 'email']);
  if (erro) return res.status(400).json({ sucesso: false, erro });
  if (!req.body.email.includes('@')) return res.status(400).json({ sucesso: false, erro: 'Email invÃ¡lido' });
  const usuario = {
    id: criarId(),
    nome: req.body.nome,
    email: req.body.email.toLowerCase(),
    papel: req.body.papel || 'usuario',
    ativo: true,
    criadoEm: agora(),
    atualizadoEm: agora(),
  };
  db.usuarios.push(usuario);
  res.status(201).json({ sucesso: true, dados: usuario });
});

// Atualizar
app.put('/api/usuarios/:id', (req, res) => {
  const idx = db.usuarios.findIndex(u => u.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ sucesso: false, erro: 'UsuÃ¡rio nÃ£o encontrado' });
  const campos = ['nome', 'email', 'papel', 'ativo'];
  campos.forEach(c => { if (req.body[c] !== undefined) db.usuarios[idx][c] = req.body[c]; });
  db.usuarios[idx].atualizadoEm = agora();
  res.json({ sucesso: true, dados: db.usuarios[idx] });
});

// Remover
app.delete('/api/usuarios/:id', (req, res) => {
  const idx = db.usuarios.findIndex(u => u.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ sucesso: false, erro: 'UsuÃ¡rio nÃ£o encontrado' });
  const removido = db.usuarios.splice(idx, 1)[0];
  res.json({ sucesso: true, mensagem: 'UsuÃ¡rio removido', dados: removido });
});

// 404
app.use((req, res) => {
  res.status(404).json({ sucesso: false, erro: \`Rota \${req.method} \${req.url} nÃ£o encontrada\` });
});

// Iniciar
app.listen(PORT, () => {
  console.log(\`ð API rodando em http://localhost:\${PORT}\`);
  console.log(\`ð Endpoints disponÃ­veis:\`);
  console.log(\`   GET    /api/saude\`);
  console.log(\`   GET    /api/usuarios\`);
  console.log(\`   GET    /api/usuarios/:id\`);
  console.log(\`   POST   /api/usuarios\`);
  console.log(\`   PUT    /api/usuarios/:id\`);
  console.log(\`   DELETE /api/usuarios/:id\`);
});
` },
      { name: "package.json", content: '{\n  "name": "api-express",\n  "version": "1.0.0",\n  "description": "API REST com Node.js e Express",\n  "main": "server.js",\n  "scripts": {\n    "start": "node server.js",\n    "dev": "nodemon server.js"\n  },\n  "dependencies": {\n    "cors": "^2.8.5",\n    "dotenv": "^16.0.0",\n    "express": "^4.18.0"\n  },\n  "devDependencies": {\n    "nodemon": "^3.0.0"\n  }\n}\n' },
      { name: ".env", content: "PORT=3000\nNODE_ENV=development\nJWT_SECRET=troque-esta-chave-secreta\n" },
      { name: ".gitignore", content: "node_modules/\n.env\n*.log\n" },
    ],
  },
  neon: {
    label: "Neon DB",
    icon: "database",
    files: [
      { name: "index.js", content: `const express = require('express');
const { neon } = require('@neondatabase/serverless');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ConexÃ£o com Neon
const sql = neon(process.env.DATABASE_URL);

app.use(cors());
app.use(express.json());

// Inicializar tabelas
async function inicializarBanco() {
  await sql\`
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(200) NOT NULL,
      email VARCHAR(200) UNIQUE NOT NULL,
      papel VARCHAR(50) DEFAULT 'usuario',
      ativo BOOLEAN DEFAULT TRUE,
      criado_em TIMESTAMP DEFAULT NOW(),
      atualizado_em TIMESTAMP DEFAULT NOW()
    )
  \`;
  await sql\`
    CREATE TABLE IF NOT EXISTS registros (
      id SERIAL PRIMARY KEY,
      usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
      titulo VARCHAR(300) NOT NULL,
      conteudo TEXT,
      criado_em TIMESTAMP DEFAULT NOW()
    )
  \`;
  console.log('â Banco inicializado com sucesso');
}

// === ROTAS ===

app.get('/api/saude', async (req, res) => {
  try {
    const r = await sql\`SELECT NOW() as agora, version() as versao_pg\`;
    res.json({ status: 'ok', banco: 'Neon PostgreSQL', ...r[0] });
  } catch (e) {
    res.status(500).json({ status: 'erro', detalhe: e.message });
  }
});

// Listar usuÃ¡rios
app.get('/api/usuarios', async (req, res) => {
  try {
    const { papel, busca, pagina = 1, limite = 20 } = req.query;
    const offset = (pagina - 1) * limite;
    let usuarios;
    if (busca) {
      usuarios = await sql\`
        SELECT * FROM usuarios
        WHERE (nome ILIKE ${'$'}{('%' + busca + '%')} OR email ILIKE ${'$'}{('%' + busca + '%')})
        AND (${'$'}{papel} IS NULL OR papel = ${'$'}{papel})
        ORDER BY criado_em DESC LIMIT ${'$'}{limite} OFFSET ${'$'}{offset}
      \`;
    } else {
      usuarios = await sql\`
        SELECT * FROM usuarios
        WHERE (${'$'}{papel || null} IS NULL OR papel = ${'$'}{papel || null})
        ORDER BY criado_em DESC LIMIT ${'$'}{limite} OFFSET ${'$'}{offset}
      \`;
    }
    const [{ total }] = await sql\`SELECT COUNT(*) as total FROM usuarios\`;
    res.json({ sucesso: true, dados: usuarios, total: +total, pagina: +pagina });
  } catch (e) {
    res.status(500).json({ sucesso: false, erro: e.message });
  }
});

// Buscar por ID
app.get('/api/usuarios/:id', async (req, res) => {
  try {
    const [usuario] = await sql\`SELECT * FROM usuarios WHERE id = ${'$'}{req.params.id}\`;
    if (!usuario) return res.status(404).json({ sucesso: false, erro: 'UsuÃ¡rio nÃ£o encontrado' });
    const registros = await sql\`SELECT * FROM registros WHERE usuario_id = ${'$'}{req.params.id} ORDER BY criado_em DESC\`;
    res.json({ sucesso: true, dados: { ...usuario, registros } });
  } catch (e) {
    res.status(500).json({ sucesso: false, erro: e.message });
  }
});

// Criar usuÃ¡rio
app.post('/api/usuarios', async (req, res) => {
  try {
    const { nome, email, papel = 'usuario' } = req.body;
    if (!nome || !email) return res.status(400).json({ sucesso: false, erro: 'Nome e email obrigatÃ³rios' });
    const [usuario] = await sql\`
      INSERT INTO usuarios (nome, email, papel)
      VALUES (${'$'}{nome}, ${'$'}{email.toLowerCase()}, ${'$'}{papel})
      RETURNING *
    \`;
    res.status(201).json({ sucesso: true, dados: usuario });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ sucesso: false, erro: 'Email jÃ¡ cadastrado' });
    res.status(500).json({ sucesso: false, erro: e.message });
  }
});

// Atualizar
app.put('/api/usuarios/:id', async (req, res) => {
  try {
    const { nome, email, papel, ativo } = req.body;
    const [usuario] = await sql\`
      UPDATE usuarios SET
        nome = COALESCE(${'$'}{nome}, nome),
        email = COALESCE(${'$'}{email}, email),
        papel = COALESCE(${'$'}{papel}, papel),
        ativo = COALESCE(${'$'}{ativo}, ativo),
        atualizado_em = NOW()
      WHERE id = ${'$'}{req.params.id}
      RETURNING *
    \`;
    if (!usuario) return res.status(404).json({ sucesso: false, erro: 'UsuÃ¡rio nÃ£o encontrado' });
    res.json({ sucesso: true, dados: usuario });
  } catch (e) {
    res.status(500).json({ sucesso: false, erro: e.message });
  }
});

// Remover
app.delete('/api/usuarios/:id', async (req, res) => {
  try {
    const [removido] = await sql\`DELETE FROM usuarios WHERE id = ${'$'}{req.params.id} RETURNING *\`;
    if (!removido) return res.status(404).json({ sucesso: false, erro: 'UsuÃ¡rio nÃ£o encontrado' });
    res.json({ sucesso: true, mensagem: 'Removido com sucesso', dados: removido });
  } catch (e) {
    res.status(500).json({ sucesso: false, erro: e.message });
  }
});

// Iniciar
inicializarBanco().then(() => {
  app.listen(PORT, () => {
    console.log(\`ð API + Neon DB rodando em http://localhost:\${PORT}\`);
  });
}).catch(e => {
  console.error('â Erro ao conectar ao banco:', e.message);
  console.error('Verifique a variÃ¡vel DATABASE_URL no .env');
});
` },
      { name: "package.json", content: '{\n  "name": "api-neon-db",\n  "version": "1.0.0",\n  "description": "API REST com Node.js, Express e Neon PostgreSQL",\n  "main": "index.js",\n  "scripts": {\n    "start": "node index.js",\n    "dev": "nodemon index.js"\n  },\n  "dependencies": {\n    "@neondatabase/serverless": "^0.9.0",\n    "cors": "^2.8.5",\n    "dotenv": "^16.0.0",\n    "express": "^4.18.0"\n  },\n  "devDependencies": {\n    "nodemon": "^3.0.0"\n  }\n}\n' },
      { name: ".env", content: "# Cole sua connection string do Neon aqui:\n# Acesse: console.neon.tech â seu projeto â Connection string\nDATABASE_URL=postgresql://usuario:senha@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require\n\nPORT=3000\nNODE_ENV=development\n" },
      { name: ".gitignore", content: "node_modules/\n.env\n*.log\n" },
      { name: "README.md", content: "# API com Neon DB (PostgreSQL)\n\n## ConfiguraÃ§Ã£o do Neon\n\n1. Acesse [console.neon.tech](https://console.neon.tech)\n2. Crie um projeto\n3. Copie a **Connection string**\n4. Cole no arquivo `.env` em `DATABASE_URL=...`\n\n## InstalaÃ§Ã£o\n```bash\nnpm install\n```\n\n## Executar\n```bash\nnpm run dev\n```\n\n## Endpoints\n| MÃ©todo | Rota | DescriÃ§Ã£o |\n|--------|------|-----------|\n| GET | /api/saude | Status + versÃ£o do banco |\n| GET | /api/usuarios | Listar (suporte a busca e paginaÃ§Ã£o) |\n| GET | /api/usuarios/:id | Buscar com registros |\n| POST | /api/usuarios | Criar usuÃ¡rio |\n| PUT | /api/usuarios/:id | Atualizar |\n| DELETE | /api/usuarios/:id | Remover |\n\n## Testar\n```bash\n# Criar usuÃ¡rio\ncurl -X POST http://localhost:3000/api/usuarios \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"nome\":\"JoÃ£o\",\"email\":\"joao@email.com\"}'\n\n# Listar\ncurl http://localhost:3000/api/usuarios\n```\n" },
    ],
  },
  react: {
    label: "React + Vite",
    icon: "zap",
    files: [
      { name: "index.html", content: '<!DOCTYPE html>\n<html lang="pt-br">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>React App</title>\n</head>\n<body>\n  <div id="root"></div>\n  <script type="module" src="/src/main.jsx"></script>\n</body>\n</html>\n' },
      { name: "src/main.jsx", content: "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css';\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode><App /></React.StrictMode>\n);\n" },
      { name: "src/App.jsx", content: `import React, { useState, useEffect, useCallback } from 'react';

// Hook customizado para dados
function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try { return JSON.parse(localStorage.getItem(chave)) ?? valorInicial; }
    catch { return valorInicial; }
  });
  const salvar = useCallback(novoValor => {
    setValor(novoValor);
    localStorage.setItem(chave, JSON.stringify(novoValor));
  }, [chave]);
  return [valor, salvar];
}

// Componente de tarefa
function CartaoTarefa({ tarefa, onConcluir, onRemover }) {
  return (
    <div className={\`card \${tarefa.concluida ? 'concluida' : ''}\`}>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={tarefa.concluida}
          onChange={() => onConcluir(tarefa.id)}
        />
        <span className="texto">{tarefa.texto}</span>
      </label>
      <div className="card-footer">
        <span className="data">{new Date(tarefa.criadaEm).toLocaleDateString('pt-BR')}</span>
        <button onClick={() => onRemover(tarefa.id)} className="btn-remover">â</button>
      </div>
    </div>
  );
}

// App principal
export default function App() {
  const [tarefas, setTarefas] = useLocalStorage('tarefas', []);
  const [input, setInput] = useState('');
  const [filtro, setFiltro] = useState('todas');

  const adicionar = () => {
    if (!input.trim()) return;
    setTarefas([...tarefas, {
      id: Date.now(),
      texto: input.trim(),
      concluida: false,
      criadaEm: new Date().toISOString(),
    }]);
    setInput('');
  };

  const concluir = id => setTarefas(tarefas.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t));
  const remover = id => setTarefas(tarefas.filter(t => t.id !== id));
  const limparConcluidas = () => setTarefas(tarefas.filter(t => !t.concluida));

  const tarefasFiltradas = tarefas.filter(t =>
    filtro === 'todas' ? true : filtro === 'ativas' ? !t.concluida : t.concluida
  );
  const pendentes = tarefas.filter(t => !t.concluida).length;

  return (
    <div className="app">
      <header>
        <h1>ð Minhas Tarefas</h1>
        <p>{pendentes} pendente{pendentes !== 1 ? 's' : ''} de {tarefas.length}</p>
      </header>

      <div className="input-row">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && adicionar()}
          placeholder="Nova tarefa..."
          autoFocus
        />
        <button onClick={adicionar} disabled={!input.trim()}>Adicionar</button>
      </div>

      <div className="filtros">
        {['todas', 'ativas', 'concluÃ­das'].map(f => (
          <button key={f} onClick={() => setFiltro(f === 'concluÃ­das' ? 'concluidas' : f)}
            className={filtro === (f === 'concluÃ­das' ? 'concluidas' : f) ? 'ativo' : ''}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="lista">
        {tarefasFiltradas.length === 0
          ? <p className="vazio">Nenhuma tarefa aqui.</p>
          : tarefasFiltradas.map(t => (
              <CartaoTarefa key={t.id} tarefa={t} onConcluir={concluir} onRemover={remover} />
            ))
        }
      </div>

      {tarefas.some(t => t.concluida) && (
        <button onClick={limparConcluidas} className="btn-limpar">
          Limpar concluÃ­das ({tarefas.filter(t => t.concluida).length})
        </button>
      )}
    </div>
  );
}
` },
      { name: "src/index.css", content: `* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', sans-serif; background: #f3f4f6; color: #1f2937; min-height: 100vh; }
.app { max-width: 600px; margin: 0 auto; padding: 2rem 1rem; }
header { text-align: center; margin-bottom: 2rem; }
header h1 { font-size: 2rem; margin-bottom: 0.3rem; }
header p { color: #6b7280; }
.input-row { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.input-row input { flex: 1; padding: 0.8rem 1rem; border: 2px solid #e5e7eb; border-radius: 10px; font-size: 1rem; transition: border-color 0.2s; }
.input-row input:focus { outline: none; border-color: #6366f1; }
.input-row button { padding: 0.8rem 1.5rem; background: #6366f1; color: #fff; border: none; border-radius: 10px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
.input-row button:hover:not(:disabled) { background: #4f46e5; }
.input-row button:disabled { opacity: 0.5; cursor: not-allowed; }
.filtros { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.filtros button { flex: 1; padding: 0.5rem; border: 1px solid #e5e7eb; background: #fff; border-radius: 8px; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; }
.filtros button.ativo { background: #6366f1; color: #fff; border-color: #6366f1; }
.lista { display: flex; flex-direction: column; gap: 0.7rem; }
.card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 1rem; transition: all 0.2s; }
.card.concluida { opacity: 0.6; }
.checkbox-label { display: flex; align-items: flex-start; gap: 0.75rem; cursor: pointer; }
.checkbox-label input[type="checkbox"] { width: 18px; height: 18px; margin-top: 2px; accent-color: #6366f1; flex-shrink: 0; }
.texto { font-size: 1rem; line-height: 1.4; }
.concluida .texto { text-decoration: line-through; color: #9ca3af; }
.card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid #f3f4f6; }
.data { font-size: 0.8rem; color: #9ca3af; }
.btn-remover { background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1rem; padding: 2px 6px; border-radius: 4px; }
.btn-remover:hover { background: #fee2e2; }
.vazio { text-align: center; color: #9ca3af; padding: 2rem; }
.btn-limpar { width: 100%; margin-top: 1rem; padding: 0.7rem; background: none; border: 1px solid #e5e7eb; border-radius: 8px; color: #6b7280; cursor: pointer; transition: all 0.2s; }
.btn-limpar:hover { background: #fee2e2; color: #ef4444; border-color: #ef4444; }
` },
      { name: "package.json", content: '{\n  "name": "react-vite-app",\n  "version": "0.0.0",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "preview": "vite preview"\n  },\n  "dependencies": {\n    "react": "^18.3.0",\n    "react-dom": "^18.3.0"\n  },\n  "devDependencies": {\n    "@vitejs/plugin-react": "^4.2.0",\n    "vite": "^5.0.0"\n  }\n}\n' },
      { name: "vite.config.js", content: "import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nexport default defineConfig({ plugins: [react()] });\n" },
    ],
  },
  flask_api: {
    label: "Flask API",
    icon: "activity",
    files: [
      { name: "app.py", content: `from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

# ---- Banco de dados em memÃ³ria (substitua por PostgreSQL/SQLite) ----
db = []
next_id = [1]

@app.route("/api/saude", methods=["GET"])
def saude():
    return jsonify({"status": "ok", "versao": "1.0.0"})

@app.route("/api/itens", methods=["GET"])
def listar():
    return jsonify(db)

@app.route("/api/itens", methods=["POST"])
def criar():
    dados = request.get_json()
    if not dados or "nome" not in dados:
        return jsonify({"erro": "Campo 'nome' obrigatÃ³rio"}), 400
    item = {"id": next_id[0], **dados}
    next_id[0] += 1
    db.append(item)
    return jsonify(item), 201

@app.route("/api/itens/<int:item_id>", methods=["GET"])
def buscar(item_id):
    item = next((i for i in db if i["id"] == item_id), None)
    return jsonify(item) if item else (jsonify({"erro": "NÃ£o encontrado"}), 404)

@app.route("/api/itens/<int:item_id>", methods=["PUT"])
def atualizar(item_id):
    item = next((i for i in db if i["id"] == item_id), None)
    if not item:
        return jsonify({"erro": "NÃ£o encontrado"}), 404
    item.update(request.get_json())
    return jsonify(item)

@app.route("/api/itens/<int:item_id>", methods=["DELETE"])
def remover(item_id):
    global db
    db = [i for i in db if i["id"] != item_id]
    return jsonify({"ok": True})

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
` },
      { name: "requirements.txt", content: "flask==3.0.0\nflask-cors==4.0.0\npython-dotenv==1.0.0\ngunicorn==21.2.0\n" },
      { name: ".env", content: "PORT=5000\nFLASK_ENV=development\nDATABASE_URL=postgresql://usuario:senha@host/banco\n" },
      { name: "README.md", content: "# API Flask\n\n## Instalar\n```bash\npip install -r requirements.txt\n```\n\n## Rodar\n```bash\npython app.py\n```\n\n## Endpoints\n- `GET /api/saude` â Status\n- `GET /api/itens` â Listar\n- `POST /api/itens` â Criar\n- `PUT /api/itens/:id` â Atualizar\n- `DELETE /api/itens/:id` â Remover\n" },
    ],
  },
  fastapi: {
    label: "FastAPI",
    icon: "zap",
    files: [
      { name: "main.py", content: `from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import os

app = FastAPI(title="Minha API FastAPI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Modelos ----
class Item(BaseModel):
    nome: str
    descricao: Optional[str] = None
    preco: float = 0.0

class ItemResposta(Item):
    id: int

# ---- Banco em memÃ³ria ----
db: List[ItemResposta] = []
contador = 0

@app.get("/")
def raiz():
    return {"mensagem": "API FastAPI rodando!", "docs": "/docs"}

@app.get("/api/itens", response_model=List[ItemResposta])
def listar_itens():
    return db

@app.post("/api/itens", response_model=ItemResposta, status_code=201)
def criar_item(item: Item):
    global contador
    contador += 1
    novo = ItemResposta(id=contador, **item.dict())
    db.append(novo)
    return novo

@app.get("/api/itens/{item_id}", response_model=ItemResposta)
def buscar_item(item_id: int):
    for item in db:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item nÃ£o encontrado")

@app.delete("/api/itens/{item_id}")
def remover_item(item_id: int):
    global db
    db = [i for i in db if i.id != item_id]
    return {"ok": True}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
` },
      { name: "requirements.txt", content: "fastapi==0.110.0\nuvicorn[standard]==0.27.0\npython-dotenv==1.0.0\npydantic==2.6.0\n" },
      { name: ".env", content: "PORT=8000\nDATABASE_URL=postgresql://usuario:senha@host/banco\n" },
      { name: "README.md", content: "# API FastAPI\n\n## Instalar\n```bash\npip install -r requirements.txt\n```\n\n## Rodar\n```bash\nuvicorn main:app --reload\n```\n\nDocumentaÃ§Ã£o automÃ¡tica: `http://localhost:8000/docs`\n" },
    ],
  },
  telegram_bot: {
    label: "Bot Telegram",
    icon: "send",
    files: [
      { name: "bot.py", content: `import os
import logging
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from dotenv import load_dotenv

load_dotenv()
logging.basicConfig(format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO)

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

# ---- Handlers ----
async def start(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        f"OlÃ¡, {update.effective_user.first_name}! ð\\n\\n"
        "Eu sou seu bot assistente.\\n"
        "/ajuda â ver todos os comandos"
    )

async def ajuda(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "ð Comandos disponÃ­veis:\\n"
        "/start â Iniciar\\n"
        "/ajuda â Esta mensagem\\n"
        "/info â InformaÃ§Ãµes do chat"
    )

async def info(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    chat = update.effective_chat
    await update.message.reply_text(
        f"â¹ï¸ Info do chat:\\n"
        f"ID: {chat.id}\\n"
        f"Tipo: {chat.type}\\n"
        f"TÃ­tulo: {chat.title or 'N/A'}"
    )

async def mensagem(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    texto = update.message.text
    await update.message.reply_text(f"VocÃª disse: {texto}\\n\\nUse /ajuda para ver comandos.")

def main():
    if not TOKEN:
        raise ValueError("Configure TELEGRAM_BOT_TOKEN no arquivo .env")
    app = Application.builder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("ajuda", ajuda))
    app.add_handler(CommandHandler("info", info))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, mensagem))
    print("ð¤ Bot iniciado! Pressione Ctrl+C para parar.")
    app.run_polling()

if __name__ == "__main__":
    main()
` },
      { name: "requirements.txt", content: "python-telegram-bot==20.8\npython-dotenv==1.0.0\n" },
      { name: ".env", content: "# Obtenha o token com @BotFather no Telegram\nTELEGRAM_BOT_TOKEN=seu-token-aqui\n" },
      { name: "README.md", content: "# Bot Telegram em Python\n\n## ConfiguraÃ§Ã£o\n1. Crie um bot com @BotFather no Telegram\n2. Copie o token para o `.env`\n\n## Instalar\n```bash\npip install -r requirements.txt\n```\n\n## Rodar\n```bash\npython bot.py\n```\n" },
    ],
  },
  landing_page: {
    label: "Landing Page",
    icon: "layout",
    files: [
      { name: "index.html", content: `<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minha Landing Page</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root { --primario: #7c3aed; --texto: #1f2937; --fundo: #f9fafb; }
    body { font-family: 'Segoe UI', sans-serif; color: var(--texto); background: var(--fundo); }
    nav { background: #fff; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 1px 4px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 10; }
    .logo { font-size: 1.4rem; font-weight: 800; color: var(--primario); }
    nav ul { list-style: none; display: flex; gap: 2rem; }
    nav a { text-decoration: none; color: var(--texto); font-weight: 500; }
    .hero { min-height: 90vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, #ede9fe 0%, #f0fdf4 100%); }
    .hero h1 { font-size: clamp(2rem, 6vw, 4rem); font-weight: 900; color: var(--primario); margin-bottom: 1.5rem; line-height: 1.1; }
    .hero p { font-size: 1.2rem; color: #6b7280; max-width: 600px; margin: 0 auto 2.5rem; }
    .btn { display: inline-block; padding: 1rem 2.5rem; background: var(--primario); color: #fff; border-radius: 50px; font-weight: 700; font-size: 1.1rem; text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; }
    .btn:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(124,58,237,0.4); }
    .features { padding: 5rem 2rem; max-width: 1100px; margin: 0 auto; }
    .features h2 { text-align: center; font-size: 2rem; font-weight: 800; margin-bottom: 3rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
    .card { background: #fff; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .icon { font-size: 2.5rem; margin-bottom: 1rem; }
    .card h3 { font-size: 1.2rem; margin-bottom: 0.5rem; }
    .card p { color: #6b7280; line-height: 1.6; }
    footer { background: #111827; color: #9ca3af; text-align: center; padding: 2rem; }
    footer a { color: var(--primario); text-decoration: none; }
  </style>
</head>
<body>
  <nav>
    <div class="logo">MeuProduto</div>
    <ul>
      <li><a href="#features">Recursos</a></li>
      <li><a href="#contato">Contato</a></li>
    </ul>
  </nav>
  <section class="hero">
    <div>
      <h1>A soluÃ§Ã£o que vocÃª<br>sempre quis</h1>
      <p>Simplifique sua vida com nossa plataforma poderosa. RÃ¡pido, seguro e intuitivo.</p>
      <a href="#features" class="btn">ComeÃ§ar grÃ¡tis â</a>
    </div>
  </section>
  <section class="features" id="features">
    <h2>Por que nos escolher?</h2>
    <div class="grid">
      <div class="card"><div class="icon">â¡</div><h3>Ultra RÃ¡pido</h3><p>Performance de ponta para vocÃª nÃ£o perder tempo.</p></div>
      <div class="card"><div class="icon">ð</div><h3>Seguro</h3><p>Seus dados protegidos com criptografia de nÃ­vel militar.</p></div>
      <div class="card"><div class="icon">ð±</div><h3>Responsivo</h3><p>Funciona perfeitamente em qualquer dispositivo.</p></div>
    </div>
  </section>
  <footer id="contato"><p>Â© 2025 MeuProduto. Feito com â¤ï¸ no Brasil.</p></footer>
</body>
</html>
` },
    ],
  },
  cli_node: {
    label: "CLI Node.js",
    icon: "terminal",
    files: [
      { name: "cli.js", content: `#!/usr/bin/env node
'use strict';
const { Command } = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const pkg = require('./package.json');

const program = new Command();

program
  .name('minha-cli')
  .description('Ferramenta de linha de comando em Node.js')
  .version(pkg.version);

// Comando: saudar
program
  .command('ola <nome>')
  .description('Sauda alguÃ©m pelo nome')
  .option('-m, --maiusculo', 'Exibe em maiÃºsculas')
  .action((nome, opts) => {
    const msg = opts.maiusculo ? nome.toUpperCase() : nome;
    console.log(chalk.green(\`OlÃ¡, \${msg}! ð\`));
  });

// Comando: listar
program
  .command('listar')
  .description('Lista itens de exemplo')
  .option('-j, --json', 'SaÃ­da em JSON')
  .action(async (opts) => {
    const spinner = ora('Carregando...').start();
    await new Promise(r => setTimeout(r, 800));
    spinner.succeed('Feito!');
    const itens = [
      { id: 1, nome: 'Item A', status: 'ativo' },
      { id: 2, nome: 'Item B', status: 'inativo' },
      { id: 3, nome: 'Item C', status: 'ativo' },
    ];
    if (opts.json) {
      console.log(JSON.stringify(itens, null, 2));
    } else {
      itens.forEach(i =>
        console.log(\`  \${chalk.cyan(i.id)} \${chalk.bold(i.nome)} â \${i.status === 'ativo' ? chalk.green(i.status) : chalk.red(i.status)}\`)
      );
    }
  });

// Comando: info
program
  .command('info')
  .description('Mostra informaÃ§Ãµes do sistema')
  .action(() => {
    console.log(chalk.bold('\\nð InformaÃ§Ãµes do Sistema'));
    console.log(\`  Node.js : \${chalk.cyan(process.version)}\`);
    console.log(\`  Plataforma: \${chalk.cyan(process.platform)}\`);
    console.log(\`  DiretÃ³rio : \${chalk.cyan(process.cwd())}\\n\`);
  });

program.parse(process.argv);
` },
      { name: "package.json", content: '{\n  "name": "minha-cli",\n  "version": "1.0.0",\n  "description": "CLI em Node.js",\n  "bin": { "minha-cli": "./cli.js" },\n  "scripts": { "start": "node cli.js", "dev": "node cli.js --help" },\n  "dependencies": { "commander": "^12.0.0", "chalk": "^4.1.2", "ora": "^5.4.1" }\n}\n' },
      { name: "README.md", content: "# CLI Node.js\n\n## Instalar dependÃªncias\n```bash\nnpm install\n```\n\n## Usar\n```bash\nnode cli.js ola Mundo\nnode cli.js listar\nnode cli.js listar --json\nnode cli.js info\n```\n" },
    ],
  },
  discord_bot: {
    label: "Bot Discord",
    icon: "message-circle",
    files: [
      { name: "bot.js", content: `const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, REST, Routes } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// ---- Slash Commands ----
const comandos = [
  new SlashCommandBuilder().setName('ping').setDescription('Verifica latÃªncia do bot'),
  new SlashCommandBuilder().setName('ola').setDescription('Sauda o usuÃ¡rio'),
  new SlashCommandBuilder().setName('info').setDescription('Info do servidor'),
].map(c => c.toJSON());

// Registrar comandos ao iniciar
client.once('ready', async () => {
  console.log(\`â Bot online: \${client.user.tag}\`);
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), { body: comandos });
    console.log('ð Slash commands registrados!');
  } catch (e) { console.error(e); }
});

// Handler de interaÃ§Ãµes
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'ping') {
    await interaction.reply({ content: \`ð Pong! LatÃªncia: \${client.ws.ping}ms\`, ephemeral: true });
  }
  if (interaction.commandName === 'ola') {
    const embed = new EmbedBuilder()
      .setColor('#7c3aed')
      .setTitle(\`OlÃ¡, \${interaction.user.displayName}! ð\`)
      .setDescription('Bem-vindo ao servidor!')
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
  if (interaction.commandName === 'info') {
    const guild = interaction.guild;
    const embed = new EmbedBuilder()
      .setColor('#3b82f6')
      .setTitle(guild.name)
      .addFields(
        { name: 'Membros', value: String(guild.memberCount), inline: true },
        { name: 'Criado em', value: guild.createdAt.toLocaleDateString('pt-BR'), inline: true },
      );
    await interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.DISCORD_TOKEN);
` },
      { name: "package.json", content: '{\n  "name": "discord-bot",\n  "version": "1.0.0",\n  "main": "bot.js",\n  "scripts": { "start": "node bot.js", "dev": "nodemon bot.js" },\n  "dependencies": { "discord.js": "^14.14.0", "dotenv": "^16.0.0" },\n  "devDependencies": { "nodemon": "^3.0.0" }\n}\n' },
      { name: ".env", content: "# Obtenha em discord.com/developers/applications\nDISCORD_TOKEN=seu-token-aqui\n" },
      { name: "README.md", content: "# Bot Discord em Node.js\n\n## ConfiguraÃ§Ã£o\n1. Crie um app em discord.com/developers/applications\n2. Copie o token para o `.env`\n\n## Instalar\n```bash\nnpm install\n```\n\n## Rodar\n```bash\nnode bot.js\n```\n" },
    ],
  },
  vue_cdn: {
    label: "Vue.js CDN",
    icon: "triangle",
    files: [
      { name: "index.html", content: `<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>App Vue.js</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"><\/script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; background: #f1f5f9; min-height: 100vh; padding: 2rem; }
    #app { max-width: 700px; margin: 0 auto; }
    h1 { color: #42b883; font-size: 2rem; margin-bottom: 0.5rem; }
    .subtitulo { color: #6b7280; margin-bottom: 2rem; }
    .input-row { display: flex; gap: 10px; margin-bottom: 1.5rem; }
    input { flex: 1; padding: 0.75rem 1rem; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 1rem; outline: none; transition: border 0.2s; }
    input:focus { border-color: #42b883; }
    button { padding: 0.75rem 1.5rem; background: #42b883; color: #fff; border: none; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 1rem; }
    button:hover { background: #35a46e; }
    .lista { display: flex; flex-direction: column; gap: 10px; }
    .item { background: #fff; border-radius: 12px; padding: 1rem 1.25rem; display: flex; align-items: center; gap: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .check { width: 22px; height: 22px; accent-color: #42b883; cursor: pointer; }
    .texto { flex: 1; font-size: 1rem; }
    .texto.feito { text-decoration: line-through; color: #9ca3af; }
    .del { background: none; border: none; cursor: pointer; color: #ef4444; font-size: 1.2rem; padding: 0; }
    .contagem { text-align: center; color: #6b7280; margin-top: 1.5rem; font-size: 0.9rem; }
  </style>
</head>
<body>
<div id="app">
  <h1>â Lista de Tarefas</h1>
  <p class="subtitulo">Feito com Vue.js 3 (CDN)</p>
  <div class="input-row">
    <input v-model="nova" @keyup.enter="adicionar" placeholder="Nova tarefa..." />
    <button @click="adicionar">Adicionar</button>
  </div>
  <div class="lista">
    <div class="item" v-for="(t, i) in tarefas" :key="t.id">
      <input type="checkbox" class="check" v-model="t.feita" />
      <span class="texto" :class="{ feito: t.feita }">{{ t.texto }}</span>
      <button class="del" @click="remover(i)">ð</button>
    </div>
    <p v-if="tarefas.length === 0" style="text-align:center;color:#9ca3af;padding:2rem;">Nenhuma tarefa. Adicione uma acima!</p>
  </div>
  <p class="contagem" v-if="tarefas.length > 0">{{ pendentes }} de {{ tarefas.length }} tarefas pendentes</p>
</div>
<script>
const { createApp } = Vue;
createApp({
  data() {
    return { nova: '', tarefas: [{ id: 1, texto: 'Aprender Vue.js 3', feita: false }, { id: 2, texto: 'Criar meu app', feita: false }] };
  },
  computed: { pendentes() { return this.tarefas.filter(t => !t.feita).length; } },
  methods: {
    adicionar() {
      const texto = this.nova.trim();
      if (!texto) return;
      this.tarefas.push({ id: Date.now(), texto, feita: false });
      this.nova = '';
    },
    remover(i) { this.tarefas.splice(i, 1); },
  }
}).mount('#app');
<\/script>
</body>
</html>
` },
    ],
  },
  shell: {
    label: "Shell Script",
    icon: "terminal",
    files: [
      { name: "script.sh", content: `#!/bin/bash
# Script de automaÃ§Ã£o em Bash
set -euo pipefail

# Cores para output
VERDE='\\033[0;32m'
AMARELO='\\033[1;33m'
VERMELHO='\\033[0;31m'
SEM_COR='\\033[0m'

log() { echo -e "\${VERDE}[OK]\${SEM_COR} $1"; }
aviso() { echo -e "\${AMARELO}[AVISO]\${SEM_COR} $1"; }
erro() { echo -e "\${VERMELHO}[ERRO]\${SEM_COR} $1"; exit 1; }

# Verifica dependÃªncias
checar_deps() {
  local deps=("git" "node" "npm")
  for dep in "\${deps[@]}"; do
    command -v "$dep" &>/dev/null || erro "DependÃªncia nÃ£o encontrada: $dep"
    log "$dep: OK"
  done
}

# Backup de arquivos
fazer_backup() {
  local src="$1"
  local dest="backup_\$(date +%Y%m%d_%H%M%S)"
  [ -d "$src" ] || erro "DiretÃ³rio nÃ£o encontrado: $src"
  cp -r "$src" "$dest"
  log "Backup criado em: $dest"
}

# Menu interativo
menu() {
  echo "============================"
  echo " Menu Principal"
  echo "============================"
  echo "1) Verificar dependÃªncias"
  echo "2) Fazer backup"
  echo "3) Listar arquivos"
  echo "0) Sair"
  read -rp "Escolha: " opcao
  case $opcao in
    1) checar_deps ;;
    2) read -rp "DiretÃ³rio para backup: " dir; fazer_backup "$dir" ;;
    3) ls -la ;;
    0) log "Saindo..."; exit 0 ;;
    *) aviso "OpÃ§Ã£o invÃ¡lida" ;;
  esac
}

main() {
  log "Iniciando script..."
  while true; do menu; done
}

main "$@"
` },
      { name: "README.md", content: "# Shell Script\n\n## Executar\n```bash\nchmod +x script.sh\n./script.sh\n```\n" },
    ],
  },
  react_native: {
    label: "React Native",
    icon: "smartphone",
    files: [
      { name: "App.tsx", content: `import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
  FlatList, TextInput, Alert, StatusBar,
} from 'react-native';

interface Item {
  id: string;
  texto: string;
  feito: boolean;
}

export default function App() {
  const [itens, setItens] = useState<Item[]>([]);
  const [texto, setTexto] = useState('');

  const adicionar = () => {
    const t = texto.trim();
    if (!t) return;
    setItens(prev => [...prev, { id: Date.now().toString(), texto: t, feito: false }]);
    setTexto('');
  };

  const alternar = (id: string) =>
    setItens(prev => prev.map(i => i.id === id ? { ...i, feito: !i.feito } : i));

  const remover = (id: string) =>
    Alert.alert('Remover', 'Tem certeza?', [
      { text: 'Cancelar' },
      { text: 'Remover', style: 'destructive', onPress: () => setItens(prev => prev.filter(i => i.id !== id)) },
    ]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <Text style={styles.titulo}>ð Lista de Tarefas</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={texto}
          onChangeText={setTexto}
          placeholder="Nova tarefa..."
          placeholderTextColor="#888"
          onSubmitEditing={adicionar}
        />
        <TouchableOpacity style={styles.btnAdd} onPress={adicionar}>
          <Text style={styles.btnAddTxt}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={itens}
        keyExtractor={i => i.id}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma tarefa ainda!</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => alternar(item.id)} onLongPress={() => remover(item.id)}>
            <Text style={[styles.itemTxt, item.feito && styles.feito]}>{item.feito ? 'â' : 'â¬'} {item.texto}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.rodape}>Segure para remover â¢ Toque para marcar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', paddingTop: 60, paddingHorizontal: 20 },
  titulo: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 24, textAlign: 'center' },
  inputRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  input: { flex: 1, backgroundColor: '#16213e', color: '#fff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, borderWidth: 1, borderColor: '#0f3460' },
  btnAdd: { backgroundColor: '#6366f1', width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  btnAddTxt: { color: '#fff', fontSize: 28, fontWeight: '300', lineHeight: 32 },
  item: { backgroundColor: '#16213e', borderRadius: 12, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#0f3460' },
  itemTxt: { color: '#e2e8f0', fontSize: 16 },
  feito: { textDecorationLine: 'line-through', color: '#64748b' },
  vazio: { color: '#64748b', textAlign: 'center', marginTop: 60, fontSize: 16 },
  rodape: { color: '#475569', textAlign: 'center', fontSize: 12, paddingVertical: 16 },
});
` },
      { name: "package.json", content: '{\n  "name": "meu-app-rn",\n  "version": "1.0.0",\n  "main": "node_modules/expo/AppEntry.js",\n  "scripts": {\n    "start": "expo start",\n    "android": "expo run:android",\n    "ios": "expo run:ios"\n  },\n  "dependencies": {\n    "expo": "~54.0.0",\n    "react": "18.3.2",\n    "react-native": "0.76.7"\n  }\n}\n' },
      { name: "app.json", content: '{\n  "expo": {\n    "name": "MeuApp",\n    "slug": "meu-app",\n    "version": "1.0.0",\n    "orientation": "portrait",\n    "userInterfaceStyle": "dark"\n  }\n}\n' },
    ],
  },
  pwa: {
    label: "PWA",
    icon: "globe",
    files: [
      { name: "index.html", content: `<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, standalone">
  <meta name="theme-color" content="#6366f1">
  <meta name="description" content="Meu Progressive Web App">
  <link rel="manifest" href="manifest.json">
  <title>Meu PWA</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; }
    .card { background: #1e293b; border-radius: 20px; padding: 40px; max-width: 400px; width: 100%; text-align: center; box-shadow: 0 25px 50px rgba(0,0,0,0.5); }
    h1 { font-size: 2rem; margin-bottom: 10px; }
    p { color: #94a3b8; margin-bottom: 30px; }
    .status { background: #0f172a; border-radius: 12px; padding: 15px; margin-bottom: 20px; font-size: 0.9rem; color: #64748b; }
    .btn { background: #6366f1; color: #fff; border: none; padding: 14px 28px; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer; width: 100%; }
    .btn:hover { background: #4f46e5; }
    .offline { display: none; background: #dc2626; color: #fff; padding: 10px; border-radius: 8px; margin-top: 15px; font-size: 0.9rem; }
    .online { display: none; background: #16a34a; color: #fff; padding: 10px; border-radius: 8px; margin-top: 15px; font-size: 0.9rem; }
  </style>
</head>
<body>
  <div class="card">
    <h1>ð Meu PWA</h1>
    <p>Progressive Web App instalÃ¡vel</p>
    <div class="status" id="status">Verificando conexÃ£o...</div>
    <button class="btn" onclick="instalar()">ð² Instalar App</button>
    <div class="offline" id="offline">â ï¸ Sem conexÃ£o â modo offline</div>
    <div class="online" id="online">â Conectado!</div>
  </div>
  <script>
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      deferredPrompt = e;
    });
    async function instalar() {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
        document.getElementById('status').textContent = outcome === 'accepted' ? 'App instalado!' : 'InstalaÃ§Ã£o cancelada';
      } else {
        alert('Para instalar: menu do navegador â "Adicionar Ã  tela inicial"');
      }
    }
    function atualizarStatus() {
      const online = navigator.onLine;
      document.getElementById('status').textContent = online ? 'ð¢ Online' : 'ð´ Offline';
      document.getElementById('offline').style.display = online ? 'none' : 'block';
      document.getElementById('online').style.display = online ? 'block' : 'none';
    }
    window.addEventListener('online', atualizarStatus);
    window.addEventListener('offline', atualizarStatus);
    atualizarStatus();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(() => console.log('SW registrado'));
    }
  </script>
</body>
</html>
` },
      { name: "manifest.json", content: '{\n  "name": "Meu PWA",\n  "short_name": "MeuPWA",\n  "description": "Progressive Web App",\n  "start_url": "/",\n  "display": "standalone",\n  "background_color": "#0f172a",\n  "theme_color": "#6366f1",\n  "orientation": "portrait",\n  "icons": [\n    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },\n    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }\n  ]\n}\n' },
      { name: "sw.js", content: `const CACHE = 'meu-pwa-v1';
const ARQUIVOS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
` },
    ],
  },
  sql: {
    label: "SQL / Banco",
    icon: "database",
    files: [
      { name: "schema.sql", content: `-- Schema do banco de dados
-- CompatÃ­vel com PostgreSQL, MySQL e SQLite

-- Tabela de usuÃ¡rios
CREATE TABLE IF NOT EXISTS usuarios (
  id         SERIAL PRIMARY KEY,
  nome       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  papel      VARCHAR(20)  NOT NULL DEFAULT 'usuario' CHECK (papel IN ('admin', 'usuario', 'visitante')),
  ativo      BOOLEAN      NOT NULL DEFAULT TRUE,
  criado_em  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS categorias (
  id        SERIAL PRIMARY KEY,
  nome      VARCHAR(100) NOT NULL UNIQUE,
  descricao TEXT,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
  id           SERIAL PRIMARY KEY,
  categoria_id INTEGER REFERENCES categorias(id) ON DELETE SET NULL,
  nome         VARCHAR(200) NOT NULL,
  descricao    TEXT,
  preco        DECIMAL(10,2) NOT NULL CHECK (preco >= 0),
  estoque      INTEGER NOT NULL DEFAULT 0 CHECK (estoque >= 0),
  ativo        BOOLEAN NOT NULL DEFAULT TRUE,
  criado_em    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id          SERIAL PRIMARY KEY,
  usuario_id  INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
  status      VARCHAR(20) NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'pago', 'enviado', 'entregue', 'cancelado')),
  total       DECIMAL(10,2) NOT NULL DEFAULT 0,
  criado_em   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Itens do pedido
CREATE TABLE IF NOT EXISTS pedido_itens (
  id          SERIAL PRIMARY KEY,
  pedido_id   INTEGER REFERENCES pedidos(id) ON DELETE CASCADE,
  produto_id  INTEGER REFERENCES produtos(id) ON DELETE RESTRICT,
  quantidade  INTEGER NOT NULL CHECK (quantidade > 0),
  preco_unit  DECIMAL(10,2) NOT NULL
);

-- Ãndices para performance
CREATE INDEX IF NOT EXISTS idx_usuarios_email   ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_produtos_cat     ON produtos(categoria_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_usuario  ON pedidos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_pedidos_status   ON pedidos(status);
` },
      { name: "queries.sql", content: `-- Consultas Ãºteis

-- Buscar todos os usuÃ¡rios ativos
SELECT id, nome, email, papel, criado_em FROM usuarios WHERE ativo = TRUE ORDER BY nome;

-- Produtos com estoque baixo (menos de 10)
SELECT p.nome, p.estoque, c.nome AS categoria
FROM produtos p
LEFT JOIN categorias c ON p.categoria_id = c.id
WHERE p.ativo = TRUE AND p.estoque < 10
ORDER BY p.estoque ASC;

-- Pedidos com total por usuÃ¡rio
SELECT u.nome, COUNT(p.id) AS total_pedidos, SUM(p.total) AS valor_total
FROM usuarios u
JOIN pedidos p ON p.usuario_id = u.id
GROUP BY u.id, u.nome
ORDER BY valor_total DESC;

-- Ãltimos 30 dias de vendas
SELECT DATE(criado_em) AS dia, COUNT(*) AS pedidos, SUM(total) AS receita
FROM pedidos
WHERE criado_em >= NOW() - INTERVAL '30 days' AND status = 'pago'
GROUP BY DATE(criado_em)
ORDER BY dia DESC;

-- Inserir dados de exemplo
INSERT INTO categorias (nome, descricao) VALUES
  ('EletrÃ´nicos', 'Dispositivos e gadgets'),
  ('Livros', 'Livros fÃ­sicos e digitais'),
  ('Roupas', 'VestuÃ¡rio em geral');

INSERT INTO produtos (categoria_id, nome, preco, estoque) VALUES
  (1, 'Fone Bluetooth', 149.90, 50),
  (1, 'Carregador USB-C', 49.90, 100),
  (2, 'Clean Code', 89.90, 30),
  (3, 'Camiseta BÃ¡sica', 59.90, 200);
` },
      { name: "README.md", content: "# Banco de Dados SQL\n\n## Executar\n```bash\n# PostgreSQL\npsql -U postgres -d meu_banco -f schema.sql\npsql -U postgres -d meu_banco -f queries.sql\n\n# SQLite\nsqlite3 banco.db < schema.sql\nsqlite3 banco.db < queries.sql\n```\n" },
    ],
  },

  manual: {
    label: "ð Manual DevMobile",
    icon: "book-open",
    files: [
      { name: "MANUAL.md", content: `# ð Manual DevMobile v1.7.0

## â¡ O que Ã© o DevMobile?
IDE profissional para Android â editor Monaco (igual ao VS Code), terminal Linux real, IA (Jasmim), GitHub, banco de dados e plugins, tudo no celular.

---

## ð¥ï¸ Terminal
- Toque na aba **Terminal** (Ã­cone >\\_)
- Execute qualquer comando bash: \`node app.js\`, \`python3 script.py\`, \`npm install\`, etc.
- BotÃµes â/â navegam o histÃ³rico de comandos
- BotÃ£o ðï¸ limpa o terminal

---

## ð¤ IA â Jasmim
- Toque no Ã­cone ð¤ no editor
- PeÃ§a cÃ³digo, debug, explicaÃ§Ãµes em portuguÃªs
- Funciona com: Gemini (grÃ¡tis), GPT-4, Claude, e mais 8 modelos
- **Dica:** seja especÃ­fico â "crie uma API Express com rota GET /usuarios"

---

## ð GitHub â Clone e Push
1. Menu â° â **GitHub â Clonar / Enviar**
2. Para clonar: cole a URL do repositÃ³rio
3. Para push: informe usuÃ¡rio, repositÃ³rio e token
4. Token: github.com â Settings â Developer settings â Tokens

---

## ð¦ Importar / Exportar
- **ð Importar Arquivo:** â° â Importar Arquivo â qualquer .js .py .html .txt
- **ð¥ Importar ZIP:** â° â Importar ZIP â selecione o .zip
- **ð¤ Exportar ZIP:** â° â Exportar ZIP â salva no celular
- **ZIP do cÃ³digo-fonte:** https://97f8b209-9c54-425f-acd4-9a08e28660c3-00-1s536kgmeip6u.kirk.replit.dev/api/termux/download

---

## ð Instalar Linguagens e Ferramentas (Plugins)
1. VÃ¡ na aba **Plugins**
2. Escolha a linguagem ou ferramenta
3. Toque em **Instalar** â escolha a versÃ£o â Confirmar
4. O terminal executa o comando de instalaÃ§Ã£o ao vivo

**Aba ð± Android** â ferramentas especÃ­ficas para Termux:
- Java (OpenJDK 21), Node.js, Python, Flutter/Dart, React Native CLI, ADB

---

## ð¡ Modo Termux (offline total)
> Use o celular como servidor â zero dependÃªncia da internet

### InstalaÃ§Ã£o (1 comando no Termux):
\`\`\`bash
pkg update && pkg install nodejs git curl -y
curl -fsSL https://97f8b209-9c54-425f-acd4-9a08e28660c3-00-1s536kgmeip6u.kirk.replit.dev/api/termux/setup.sh | bash
\`\`\`

### Iniciar o servidor:
\`\`\`bash
bash ~/start-devmobile.sh
\`\`\`

### Conectar o DevMobile:
- ConfiguraÃ§Ãµes âï¸ â seÃ§Ã£o ð¡ MODO TERMUX â **â¡ Ativar**
- URL vira: http://localhost:8080

### Uso diÃ¡rio:
1. Abra o Termux â \`bash ~/start-devmobile.sh\` â minimize
2. Abra o DevMobile â use normalmente offline

---

## ðï¸ Banco de Dados
- Menu â° â **Banco de Dados (Neon/Postgres)**
- Crie banco grÃ¡tis em: neon.tech
- Cole a connection string â execute SQL direto no app

---

## ð Preview HTML/Servidor
- **Preview HTML:** â° â Preview HTML â visualiza .html ao vivo
- **Preview Servidor:** â° â Preview Servidor â vÃª app Node.js/Python rodando

---

## â±ï¸ Checkpoints (backup automÃ¡tico)
- â° â **Salvar Checkpoint** â cria snapshot do projeto
- â° â **HistÃ³rico de Checkpoints** â restaurar versÃ£o anterior
- Salve sempre antes de mudanÃ§as grandes!

---

## â Problemas comuns

**Terminal diz "Servidor nÃ£o configurado"**
â Servidor pode estar iniciando. Aguarde 30s e tente novamente.
â Ou abra o Termux e rode: bash ~/start-devmobile.sh

**Import deu erro**
â Use â° â Importar Arquivo (para arquivos simples)
â Se for ZIP, certifique que Ã© um .zip vÃ¡lido

**GitHub clone parou**
â Limite: 300 arquivos / 5MB por arquivo
â RepositÃ³rios muito grandes: clone manual pelo terminal

---

*DevMobile v1.7.0 â Feito para funcionar no celular, offline, do seu jeito.*
` },
      { name: "TERMUX-SETUP.sh", content: `#!/bin/bash
# DevMobile â InstalaÃ§Ã£o Termux (v1.7.0)
# Cole no Termux e execute

pkg update && pkg upgrade -y
pkg install nodejs git curl -y

echo "Baixando servidor DevMobile..."
curl -fsSL https://97f8b209-9c54-425f-acd4-9a08e28660c3-00-1s536kgmeip6u.kirk.replit.dev/api/termux/setup.sh | bash

echo ""
echo "Para iniciar: bash ~/start-devmobile.sh"
echo "No DevMobile: ConfiguraÃ§Ãµes â Modo Termux â Ativar"
` },
      { name: "ATALHOS.md", content: `# â¨ï¸ Atalhos e Dicas â DevMobile v1.7.0

## Menu â° (Menu Completo)
| OpÃ§Ã£o | O que faz |
|-------|-----------|
| ð Importar Arquivo | Importa qualquer .js .py .html .txt |
| ð¥ Importar ZIP | Importa projeto compactado |
| ð¤ Exportar ZIP | Exporta projeto atual |
| ð¤ Jasmim | Abre assistente IA |
| ð GitHub | Clonar / enviar repositÃ³rio |
| ð¦ Instalar Biblioteca | npm install, pip install... |
| ðï¸ Banco de Dados | Conectar PostgreSQL/Neon |
| ð¸ Checkpoint | Salvar ponto de restauraÃ§Ã£o |
| ð Preview HTML | Visualizar HTML ao vivo |
| â¬ Terminal | Abrir terminal bash |
| ðï¸ Limpar Projeto | Apagar todos os arquivos |

## Barra do Editor
- **â¡** â barra de sÃ­mbolos rÃ¡pidos: {}, [], (), ;, etc.
- **ð¤** â IA Jasmim (canto superior direito)
- **â°** â menu completo (canto superior esquerdo)
- **â¶** â executar arquivo atual

## Terminal
- â / â â histÃ³rico de comandos
- ðï¸ â limpar tela
- Ctrl+C (botÃ£o no teclado) â cancelar processo

## Plugins â Aba ð± Android
Para instalar Java, Node.js, Python, Flutter no celular via Termux:
â Plugins â aba "ð± Android" â escolha â Instalar
` },
    ],
  },
};

// Gera avatar colorido igual ao SK Code Editor
const AVATAR_COLORS = ["#8b5cf6","#ef4444","#f97316","#22c55e","#3b82f6","#ec4899","#14b8a6","#a855f7","#06b6d4","#84cc16"];
function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function ProjectCard({
  project,
  onPress,
  onDelete,
  onExport,
  onSelect,
  onRename,
  onPush,
  isSelected,
}: {
  project: Project;
  onPress: () => void;
  onDelete: () => void;
  onExport: () => void;
  onSelect: () => void;
  onRename: () => void;
  onPush: () => void;
  isSelected: boolean;
}) {
  const colors = useColors();
  const avatarColor = getAvatarColor(project.name);
  const initials = getInitials(project.name);

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        Alert.alert(project.name, "OpÃ§Ãµes do Projeto", [
          { text: "âï¸  Renomear", onPress: onRename },
          { text: "ð  Abrir no Editor", onPress },
          { text: "ð  Selecionar para combinar", onPress: onSelect },
          { text: "ð¦  Exportar como ZIP", onPress: onExport },
          { text: "ð¤  Enviar para GitHub/GitLab", onPress: onPush },
          { text: "ðï¸  Excluir", style: "destructive", onPress: onDelete },
          { text: "Cancelar", style: "cancel" },
        ]);
      }}
      style={[styles.card, { backgroundColor: isSelected ? avatarColor + "22" : colors.card, borderColor: isSelected ? avatarColor : colors.border, borderWidth: isSelected ? 1.5 : 1 }]}
      activeOpacity={0.7}
    >
      {/* Seta indicadora esquerda */}
      <Feather name="chevron-right" size={14} color={colors.mutedForeground + "55"} style={{ marginRight: 4 }} />

      {/* Avatar colorido com iniciais */}
      <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      {/* Info */}
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={[styles.cardTitle, { color: colors.foreground }]} numberOfLines={1}>{project.name}</Text>
        <Text style={[styles.cardMeta, { color: colors.mutedForeground }]}>
          {new Date(project.updatedAt).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })}
          {" Â· "}
          {project.files.length} arquivo{project.files.length !== 1 ? "s" : ""}
        </Text>
      </View>

      {/* BotÃ£o VS Code / abrir */}
      <TouchableOpacity onPress={onPress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} style={styles.openBtn}>
        <Feather name="code" size={16} color="#007acc" />
      </TouchableOpacity>

      {/* Menu */}
      <TouchableOpacity
        onPress={() => Alert.alert(project.name, "OpÃ§Ãµes", [
          { text: "âï¸ Renomear", onPress: onRename },
          { text: "ð¦ Exportar ZIP", onPress: onExport },
          { text: "ð¤ Enviar para Git", onPress: onPush },
          { text: "ð Selecionar", onPress: onSelect },
          { text: "ðï¸ Excluir", style: "destructive", onPress: onDelete },
          { text: "Cancelar", style: "cancel" },
        ])}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={{ paddingHorizontal: 6 }}
      >
        <Feather name="more-vertical" size={16} color={colors.mutedForeground} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default function ProjectsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const {
    projects,
    createProject,
    deleteProject,
    updateProject,
    setActiveProject,
    combineProjects,
    importGitRepo,
    pushToGit,
    gitConfigs,
    createFile,
    activeProject,
  } = useApp();

  const [showNewModal, setShowNewModal] = useState(false);
  const [showGitModal, setShowGitModal] = useState(false);
  const [showCombineModal, setShowCombineModal] = useState(false);
  const [showLibSearch, setShowLibSearch] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  // Novo: abas + pesquisa + modo + Criar com IA
  const [activeTab, setActiveTab] = useState<"tudo" | "recente" | "criar">("tudo");
  const [searchText, setSearchText] = useState("");
  const [showCriarComIA, setShowCriarComIA] = useState(false);
  const [iaDesc, setIaDesc] = useState("");
  const [iaProjectName, setIaProjectName] = useState("");
  const [iaGenerating, setIaGenerating] = useState(false);

  const [renameTarget, setRenameTarget] = useState<Project | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [template, setTemplate] = useState("vazio");

  const [gitUrl, setGitUrl] = useState("");
  const [gitToken, setGitToken] = useState("");
  const [gitProvider, setGitProvider] = useState<"github" | "gitlab">("github");

  const [combineName, setCombineName] = useState("");
  const [importing, setImporting] = useState(false);

  const [showPushModal, setShowPushModal] = useState(false);
  const [showPwaModal, setShowPwaModal] = useState(false);
  const [pwaUrl, setPwaUrl] = useState("");
  const [pushProject, setPushProject] = useState<Project | null>(null);
  const [pushRepoUrl, setPushRepoUrl] = useState("");
  const [pushToken, setPushToken] = useState("");
  const [pushBranch, setPushBranch] = useState("main");
  const [pushing, setPushing] = useState(false);

  const topPadding = Platform.OS === "web" ? 14 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 70 : Math.max(insets.bottom, 16) + 70;

  const handleOpenProject = (project: Project) => {
    setActiveProject(project);
    router.navigate("/(tabs)/editor");
  };

  const handleExportZip = async (project: Project) => {
    const ok = await exportZip(project);
    if (!ok) Alert.alert("Erro", "NÃ£o foi possÃ­vel exportar o projeto.");
  };

  const handleImportZip = async () => {
    setShowActionsMenu(false);
    try {
      const data = await importZip();
      if (!data) return;
      const proj = createProject(data.name, data.description);
      data.files.forEach((f) => createFile(proj.id, f.name, f.content));
      setActiveProject(proj);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Importado!", `Projeto "${data.name}" importado com ${data.files.length} arquivo(s).`);
    } catch (err: any) {
      Alert.alert("Erro ao importar ZIP", err?.message || String(err) || "Falha desconhecida ao ler o arquivo.");
    }
  };

  const handleImportTar = async () => {
    setShowActionsMenu(false);
    const data = await importTar();
    if (!data) return;
    const proj = createProject(data.name, data.description);
    data.files.forEach((f) => createFile(proj.id, f.name, f.content));
    setActiveProject(proj);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Importado!", `Projeto "${data.name}" criado.`);
  };

  const handleCreateProject = () => {
    const autoName = newName.trim() || `Projeto ${projects.length + 1}`;
    const tmpl = TEMPLATES[template];
    const proj = createProject(autoName, newDesc.trim());
    tmpl.files.forEach((f) => createFile(proj.id, f.name, f.content));
    setActiveProject(proj);
    setShowNewModal(false);
    setNewName("");
    setNewDesc("");
    setTemplate("vazio");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.navigate("/(tabs)/editor");
  };

  const handleImportGit = async () => {
    if (!gitUrl.trim()) return;
    setImporting(true);
    try {
      const token = gitToken || gitConfigs.find((g) => g.provider === gitProvider)?.token || "";
      const proj = await importGitRepo(gitUrl.trim(), token, gitProvider);
      setActiveProject(proj);
      setShowGitModal(false);
      setGitUrl("");
      setGitToken("");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.navigate("/(tabs)/editor");
    } catch {
      Alert.alert("Erro", "NÃ£o foi possÃ­vel importar o repositÃ³rio.");
    } finally {
      setImporting(false);
    }
  };

  const handlePushToGit = async () => {
    if (!pushProject || !pushRepoUrl.trim() || !pushToken.trim()) return;
    setPushing(true);
    try {
      const result = await pushToGit(pushProject.id, pushRepoUrl.trim(), pushToken.trim(), pushBranch.trim() || "main");
      setShowPushModal(false);
      setPushRepoUrl("");
      setPushToken("");
      setPushBranch("main");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert(
        "â Enviado!",
        `${result.pushed} arquivo(s) enviado(s) com sucesso!${result.errors > 0 ? `\n${result.errors} erro(s).` : ""}`
      );
    } catch (e: unknown) {
      Alert.alert("Erro", e instanceof Error ? e.message : "NÃ£o foi possÃ­vel enviar para o repositÃ³rio.");
    } finally {
      setPushing(false);
    }
  };

  const handleCombine = () => {
    if (selectedProjects.length < 2 || !combineName.trim()) return;
    const combined = combineProjects(selectedProjects, combineName.trim());
    setActiveProject(combined);
    setSelectedProjects([]);
    setCombineName("");
    setShowCombineModal(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.navigate("/(tabs)/editor");
  };

  const handleRename = () => {
    if (!renameTarget || !renameValue.trim()) return;
    updateProject(renameTarget.id, { name: renameValue.trim() });
    if (activeProject?.id === renameTarget.id) {
      setActiveProject({ ...activeProject, name: renameValue.trim() });
    }
    setRenameTarget(null);
    setRenameValue("");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleCriarComIA = async () => {
    if (!iaDesc.trim()) return;
    setIaGenerating(true);
    const nomeProjeto = iaProjectName.trim() || `Projeto IA ${projects.length + 1}`;
    try {
      const apiBase = `http://localhost:8080/api`;
      const response = await fetch(`${apiBase}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Crie um projeto completo chamado "${nomeProjeto}" com a seguinte descriÃ§Ã£o:\n\n${iaDesc}\n\nResponda APENAS com um JSON no formato:\n{\n  "files": [\n    {"name": "index.js", "content": "...cÃ³digo completo..."},\n    {"name": "package.json", "content": "..."},\n    {"name": "README.md", "content": "..."}\n  ]\n}\n\nIncluir pelo menos 3-5 arquivos funcionais. NÃ£o coloque nada fora do JSON.`,
            },
          ],
          model: "gemini-2.5-flash",
        }),
      });

      let fullText = "";
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        for (const line of chunk.split("\n")) {
          if (line.startsWith("data: ")) {
            try {
              const d = JSON.parse(line.slice(6));
              if (d.content) fullText += d.content;
            } catch {}
          }
        }
      }

      // Extrai o JSON da resposta
      const match = fullText.match(/\{[\s\S]*"files"[\s\S]*\}/);
      if (!match) throw new Error("IA nÃ£o retornou JSON vÃ¡lido");
      const parsed = JSON.parse(match[0]);
      const filesData = parsed.files as Array<{ name: string; content: string }>;

      const proj = createProject(nomeProjeto, iaDesc.trim().slice(0, 100));
      filesData.forEach((f) => createFile(proj.id, f.name, f.content));
      setActiveProject(proj);
      setShowCriarComIA(false);
      setIaDesc("");
      setIaProjectName("");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("â Projeto criado!", `"${nomeProjeto}" criado com ${filesData.length} arquivo(s) pela IA!`, [
        { text: "Abrir no Editor", onPress: () => router.navigate("/(tabs)/editor") },
        { text: "Ver depois", style: "cancel" },
      ]);
    } catch (e: unknown) {
      Alert.alert("Erro", e instanceof Error ? e.message : "Erro ao gerar projeto com IA.");
    } finally {
      setIaGenerating(false);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedProjects((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Filtrar projetos por aba e busca
  const filteredProjects = (() => {
    let list = [...projects].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    if (activeTab === "recente") list = list.slice(0, 5);
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }
    return list;
  })();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      {/* ââ HEADER SK CODE EDITOR ââ */}
      <View style={[styles.skHeader, { paddingTop: topPadding + 8, backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        {/* Logo + tÃ­tulo */}
        <View style={styles.skHeaderLeft}>
          <View style={styles.skLogo}>
            <Text style={styles.skLogoText}>{"</>"}</Text>
          </View>
          <View>
            <Text style={[styles.skTitle, { color: colors.foreground }]}>DevMobile</Text>
            <Text style={[styles.skSubtitle, { color: colors.mutedForeground }]}>IDE no Celular</Text>
          </View>
        </View>

        {/* BotÃµes direita */}
        <View style={styles.skHeaderRight}>
          {selectedProjects.length >= 2 && (
            <TouchableOpacity onPress={() => setShowCombineModal(true)} style={[styles.skBtn, { backgroundColor: "#7c3aed" }]}>
              <Feather name="layers" size={14} color="#fff" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => setShowActionsMenu(true)}
            style={[styles.skBtn, { backgroundColor: colors.secondary, borderColor: colors.border, borderWidth: 1 }]}
          >
            <Feather name="more-horizontal" size={15} color={colors.foreground} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowNewModal(true)}
            style={[styles.skBtn, { backgroundColor: colors.primary }]}
          >
            <Feather name="plus" size={16} color={colors.primaryForeground} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ââ BARRA DE PESQUISA ââ */}
      <View style={[styles.skSearchBar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={[styles.skSearchInput, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
          <Feather name="search" size={14} color={colors.mutedForeground} />
          <TextInput
            style={[styles.skSearchText, { color: colors.foreground }]}
            placeholder="Pesquisar projetos..."
            placeholderTextColor={colors.mutedForeground}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <Feather name="x" size={13} color={colors.mutedForeground} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ââ ABAS: TUDO / RECENTE / CRIAR ââ */}
      <View style={[styles.skTabs, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        {(["tudo", "recente", "criar"] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.skTab, activeTab === tab && { borderBottomColor: colors.primary, borderBottomWidth: 2 }]}
          >
            <Text style={[styles.skTabText, { color: activeTab === tab ? colors.primary : colors.mutedForeground }]}>
              {tab === "tudo" ? "TUDO" : tab === "recente" ? "RECENTE" : "CRIAR"}
            </Text>
            {tab === "tudo" && projects.length > 0 && (
              <View style={[styles.skTabBadge, { backgroundColor: colors.primary }]}>
                <Text style={styles.skTabBadgeText}>{projects.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* ââ CONTEÃDO DAS ABAS ââ */}
      {activeTab === "criar" ? (
        /* Aba CRIAR */
        <ScrollView contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: bottomPadding + 16 }}>
          {/* Criar com IA â destaque */}
          <TouchableOpacity
            onPress={() => setShowCriarComIA(true)}
            style={[styles.criarIACard, { backgroundColor: "#7c3aed" }]}
            activeOpacity={0.85}
          >
            <View style={styles.criarIAIcon}>
              <Feather name="cpu" size={22} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.criarIATitle}>Criar com IA</Text>
              <Text style={styles.criarIADesc}>Descreva o que quer criar e a IA gera o projeto completo</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#ffffff88" />
          </TouchableOpacity>

          {/* OpÃ§Ãµes de criaÃ§Ã£o */}
          {[
            { icon: "file-plus", label: "Projeto em Branco", desc: "ComeÃ§a do zero", action: () => { setTemplate("vazio"); setShowNewModal(true); } },
            { icon: "upload", label: "Importar ZIP", desc: "Carrega um arquivo .zip", action: handleImportZip },
            { icon: "archive", label: "Importar TAR", desc: "Carrega um arquivo .tar.gz", action: handleImportTar },
            { icon: "git-branch", label: "Git Clone", desc: "Clone do GitHub ou GitLab", action: () => setShowGitModal(true) },
            { icon: "package", label: "Buscar Biblioteca", desc: "npm / PyPI / etc.", action: () => setShowLibSearch(true) },
          ].map((item) => (
            <TouchableOpacity
              key={item.label}
              onPress={item.action}
              style={[styles.criarOption, { backgroundColor: colors.card, borderColor: colors.border }]}
              activeOpacity={0.7}
            >
              <View style={[styles.criarOptionIcon, { backgroundColor: colors.secondary }]}>
                <Feather name={item.icon as never} size={18} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.criarOptionLabel, { color: colors.foreground }]}>{item.label}</Text>
                <Text style={[styles.criarOptionDesc, { color: colors.mutedForeground }]}>{item.desc}</Text>
              </View>
              <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        /* Abas TUDO / RECENTE â lista de projetos */
        <>
          {selectedProjects.length > 0 && (
            <View style={[styles.selectBanner, { backgroundColor: colors.accent }]}>
              <Text style={styles.selectText}>
                {selectedProjects.length} selecionado{selectedProjects.length > 1 ? "s" : ""}
              </Text>
              <TouchableOpacity onPress={() => setSelectedProjects([])}>
                <Text style={styles.selectCancel}>Limpar</Text>
              </TouchableOpacity>
            </View>
          )}

          <FlatList
            data={filteredProjects}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProjectCard
                project={item}
                onPress={() => handleOpenProject(item)}
                onDelete={() =>
                  Alert.alert("Excluir projeto", `Excluir "${item.name}"?`, [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Excluir", style: "destructive", onPress: () => deleteProject(item.id) },
                  ])
                }
                onExport={() => handleExportZip(item)}
                onSelect={() => toggleSelect(item.id)}
                onRename={() => { setRenameTarget(item); setRenameValue(item.name); }}
                onPush={() => {
                  setPushProject(item);
                  setPushRepoUrl(item.gitRepo || "");
                  setShowPushModal(true);
                }}
                isSelected={selectedProjects.includes(item.id)}
              />
            )}
            ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: colors.border }]} />}
            contentContainerStyle={{ paddingBottom: bottomPadding + 16, flexGrow: filteredProjects.length === 0 ? 1 : undefined }}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Feather name="code" size={48} color={colors.mutedForeground} />
                <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Nenhum projeto ainda</Text>
                <Text style={[styles.emptyDesc, { color: colors.mutedForeground }]}>
                  VÃ¡ para a aba CRIAR para comeÃ§ar um projeto novo
                </Text>
                <TouchableOpacity
                  onPress={() => setActiveTab("criar")}
                  style={[styles.emptyBtn, { backgroundColor: colors.primary, flexDirection: "row", gap: 8 }]}
                >
                  <Feather name="plus" size={16} color={colors.primaryForeground} />
                  <Text style={[styles.emptyBtnText, { color: colors.primaryForeground }]}>Criar Projeto</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </>
      )}

      {/* ââ MODAL: CRIAR COM IA ââ */}
      <Modal visible={showCriarComIA} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={[styles.iaBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <View style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "#7c3aed", alignItems: "center", justifyContent: "center" }}>
                <Feather name="cpu" size={16} color="#fff" />
              </View>
              <Text style={[styles.modalTitle, { color: colors.foreground }]}>Criar com IA</Text>
              <TouchableOpacity onPress={() => setShowCriarComIA(false)} style={{ marginLeft: "auto" }}>
                <Feather name="x" size={20} color={colors.mutedForeground} />
              </TouchableOpacity>
            </View>

            <Text style={[{ color: colors.mutedForeground, fontSize: 13, marginBottom: 6 }]}>Nome do Projeto (opcional)</Text>
            <TextInput
              style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.secondary, marginBottom: 12 }]}
              placeholder={`Projeto IA ${projects.length + 1}`}
              placeholderTextColor={colors.mutedForeground}
              value={iaProjectName}
              onChangeText={setIaProjectName}
            />

            <Text style={[{ color: colors.mutedForeground, fontSize: 13, marginBottom: 6 }]}>Descreva o que vocÃª quer criar</Text>
            <TextInput
              style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.secondary, height: 100, textAlignVertical: "top" }]}
              placeholder={"Ex: Uma API REST em Node.js com rotas de usuÃ¡rios e banco SQLite\nEx: Site pessoal em HTML/CSS com portfolio\nEx: Script Python para analisar CSV e gerar relatÃ³rio"}
              placeholderTextColor={colors.mutedForeground}
              value={iaDesc}
              onChangeText={setIaDesc}
              multiline
              numberOfLines={4}
            />

            <View style={{ flexDirection: "row", gap: 10, marginTop: 16 }}>
              <TouchableOpacity
                onPress={() => setShowCriarComIA(false)}
                style={[styles.primaryBtn, { flex: 1, backgroundColor: colors.secondary }]}
              >
                <Text style={[styles.primaryBtnText, { color: colors.foreground }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCriarComIA}
                disabled={!iaDesc.trim() || iaGenerating}
                style={[styles.primaryBtn, { flex: 2, backgroundColor: iaDesc.trim() && !iaGenerating ? "#7c3aed" : colors.secondary }]}
              >
                {iaGenerating ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Feather name="cpu" size={14} color={iaDesc.trim() ? "#fff" : colors.mutedForeground} />
                )}
                <Text style={[styles.primaryBtnText, { color: iaDesc.trim() && !iaGenerating ? "#fff" : colors.mutedForeground }]}>
                  {iaGenerating ? "Gerando..." : "Criar com IA"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal: Renomear Projeto */}
      <Modal visible={!!renameTarget} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setRenameTarget(null)}
        >
          <TouchableOpacity activeOpacity={1}>
            <View style={[styles.renameBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.modalTitle, { color: colors.foreground, marginBottom: 12 }]}>
                âï¸  Renomear Projeto
              </Text>
              <TextInput
                style={[styles.input, { color: colors.foreground, borderColor: colors.primary, backgroundColor: colors.secondary }]}
                value={renameValue}
                onChangeText={setRenameValue}
                placeholder="Novo nome do projeto"
                placeholderTextColor={colors.mutedForeground}
                autoFocus
                selectTextOnFocus
                returnKeyType="done"
                onSubmitEditing={handleRename}
              />
              <View style={{ flexDirection: "row", gap: 10, marginTop: 4 }}>
                <TouchableOpacity
                  onPress={() => setRenameTarget(null)}
                  style={[styles.primaryBtn, { flex: 1, backgroundColor: colors.secondary }]}
                >
                  <Text style={[styles.primaryBtnText, { color: colors.foreground }]}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleRename}
                  disabled={!renameValue.trim()}
                  style={[styles.primaryBtn, { flex: 1, backgroundColor: renameValue.trim() ? colors.primary : colors.secondary }]}
                >
                  <Feather name="check" size={14} color={renameValue.trim() ? colors.primaryForeground : colors.mutedForeground} />
                  <Text style={[styles.primaryBtnText, { color: renameValue.trim() ? colors.primaryForeground : colors.mutedForeground }]}>
                    Salvar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Modal: Enviar para GitHub/GitLab */}
      <Modal visible={showPushModal} animationType="slide" presentationStyle="pageSheet" statusBarTranslucent onRequestClose={() => { setShowPushModal(false); setPushRepoUrl(""); setPushToken(""); }}>
        <View style={[styles.modal, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border, paddingTop: Math.max(24, insets.top + 12) }]}>
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>
              ð¤  Enviar para RepositÃ³rio
            </Text>
            <TouchableOpacity onPress={() => { setShowPushModal(false); setPushRepoUrl(""); setPushToken(""); }}>
              <Feather name="x" size={22} color={colors.mutedForeground} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.modalBody}>
            {pushProject && (
              <View style={[styles.hintBox, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
                <Feather name="folder" size={13} color={colors.primary} />
                <Text style={[styles.hintText, { color: colors.foreground, fontWeight: "600" }]}>
                  {pushProject.name}  ({pushProject.files?.length || 0} arquivo(s))
                </Text>
              </View>
            )}

            <View style={[styles.hintBox, { backgroundColor: colors.secondary, borderColor: colors.border, marginBottom: 14 }]}>
              <Feather name="info" size={13} color={colors.info} />
              <Text style={[styles.hintText, { color: colors.mutedForeground }]}>
                Cole a URL do repositÃ³rio e o token. Os arquivos do projeto serÃ£o enviados via API. O repositÃ³rio precisa existir antes.
              </Text>
            </View>

            <Text style={[styles.label, { color: colors.mutedForeground }]}>URL do RepositÃ³rio</Text>
            <TextInput
              style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.card }]}
              value={pushRepoUrl}
              onChangeText={(t) => {
                setPushRepoUrl(t);
              }}
              placeholder="https://github.com/usuario/repositorio"
              placeholderTextColor={colors.mutedForeground}
              autoCapitalize="none"
              autoCorrect={false}
            />

            {pushRepoUrl.trim().length > 5 && (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <Feather name="check-circle" size={12} color={colors.primary} />
                <Text style={{ color: colors.primary, fontSize: 12 }}>
                  Detectado: {pushRepoUrl.includes("gitlab") ? "GitLab" : "GitHub"}
                </Text>
              </View>
            )}

            <Text style={[styles.label, { color: colors.mutedForeground }]}>
              Token de Acesso{" "}
              <Text style={{ fontSize: 11 }}>(obrigatÃ³rio para enviar)</Text>
            </Text>
            <TextInput
              style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.card }]}
              value={pushToken}
              onChangeText={setPushToken}
              placeholder={pushRepoUrl.includes("gitlab") ? "glpat-xxxxxxxxxxxx" : "ghp_xxxxxxxxxxxx"}
              placeholderTextColor={colors.mutedForeground}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
            />

            <Text style={[styles.label, { color: colors.mutedForeground }]}>Branch</Text>
            <TextInput
              style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.card }]}
              value={pushBranch}
              onChangeText={setPushBranch}
              placeholder="main"
              placeholderTextColor={colors.mutedForeground}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={{ color: colors.mutedForeground, fontSize: 11, marginBottom: 16, lineHeight: 16 }}>
              {pushRepoUrl.includes("gitlab")
                ? "Token GitLab: gitlab.com â PreferÃªncias â Access Tokens â Adicionar (escopo: api, write_repository)"
                : "Token GitHub: github.com â Settings â Developer settings â Personal access tokens â (escopos: repo, contents:write)"}
            </Text>

            <TouchableOpacity
              onPress={handlePushToGit}
              disabled={!pushRepoUrl.trim() || !pushToken.trim() || pushing}
              style={[styles.primaryBtn, {
                backgroundColor: pushRepoUrl.trim() && pushToken.trim() && !pushing ? "#059669" : colors.muted
              }]}
            >
              <Feather name="upload-cloud" size={16} color="#fff" />
              <Text style={[styles.primaryBtnText, { color: "#fff" }]}>
                {pushing ? "Enviando..." : "Enviar para o RepositÃ³rio"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Modal: Menu de AÃ§Ãµes */}
      <Modal visible={showActionsMenu} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setShowActionsMenu(false)}
        >
          <View style={[styles.actionsMenu, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.menuTitle, { color: colors.mutedForeground }]}>IMPORTAR</Text>
            {[
              { label: "Importar ZIP", icon: "upload", action: handleImportZip },
              { label: "Importar TAR/TAR.GZ", icon: "archive", action: handleImportTar },
              { label: "Clonar do GitHub", icon: "github", action: () => { setShowActionsMenu(false); setShowGitModal(true); } },
              { label: "Clonar do GitLab", icon: "git-branch", action: () => { setShowActionsMenu(false); setShowGitModal(true); } },
            ].map((item) => (
              <TouchableOpacity
                key={item.label}
                onPress={item.action}
                style={[styles.menuItem, { borderBottomColor: colors.border }]}
              >
                <Feather name={item.icon as never} size={16} color={colors.primary} />
                <Text style={[styles.menuItemText, { color: colors.foreground }]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
            <Text style={[styles.menuTitle, { color: colors.mutedForeground, marginTop: 8 }]}>FERRAMENTAS</Text>
            <TouchableOpacity
              onPress={() => { setShowActionsMenu(false); setShowPwaModal(true); }}
              style={[styles.menuItem, { borderBottomColor: colors.border }]}
            >
              <Feather name="package" size={16} color="#f59e0b" />
              <Text style={[styles.menuItemText, { color: colors.foreground }]}>Converter PWA em APK</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal: Converter PWA em APK */}
      <Modal visible={showPwaModal} animationType="slide" presentationStyle="pageSheet" statusBarTranslucent onRequestClose={() => { setShowPwaModal(false); setPwaUrl(""); }}>
        <View style={[styles.modal, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border, paddingTop: Math.max(24, insets.top + 12) }]}>
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>ð¦ Converter PWA em APK</Text>
            <TouchableOpacity onPress={() => { setShowPwaModal(false); setPwaUrl(""); }}>
              <Feather name="x" size={22} color={colors.mutedForeground} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.modalBody}>
            <Text style={[styles.label, { color: colors.mutedForeground }]}>URL do seu site/PWA</Text>
            <TextInput
              style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.card }]}
              value={pwaUrl}
              onChangeText={setPwaUrl}
              placeholder="https://meusite.com"
              placeholderTextColor={colors.mutedForeground}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
            />
            <View style={{ backgroundColor: "#1e293b", borderRadius: 10, padding: 14, marginTop: 8, marginBottom: 16 }}>
              <Text style={{ color: "#94a3b8", fontSize: 13, lineHeight: 20 }}>
                {"Como funciona:\n\n1. Cole a URL do seu site/PWA acima\n2. Toque em \"Gerar APK\"\n3. O PWABuilder vai analisar seu site\n4. Clique em \"Package for Stores\" â Android\n5. Baixe o APK gerado gratuitamente"}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: "#f59e0b", opacity: pwaUrl.trim() ? 1 : 0.5 }]}
              disabled={!pwaUrl.trim()}
              onPress={() => {
                const url = pwaUrl.trim().startsWith("http") ? pwaUrl.trim() : `https://${pwaUrl.trim()}`;
                Linking.openURL(`https://www.pwabuilder.com/?site=${encodeURIComponent(url)}`);
              }}
            >
              <Feather name="package" size={18} color="#000" />
              <Text style={[styles.actionBtnText, { color: "#000" }]}>Gerar APK no PWABuilder</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: colors.secondary, borderColor: colors.border, borderWidth: 1, marginTop: 10 }]}
              onPress={() => Linking.openURL("https://www.pwabuilder.com")}
            >
              <Feather name="external-link" size={16} color={colors.foreground} />
              <Text style={[styles.actionBtnText, { color: colors.foreground }]}>Abrir PWABuilder</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Modal: Novo Projeto */}
      <Modal visible={showNewModal} animationType="slide" presentationStyle="pageSheet" statusBarTranslucent onRequestClose={() => setShowNewModal(false)}>
        <View style={[styles.modal, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border, paddingTop: Math.max(24, insets.top + 12) }]}>
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>Novo Projeto</Text>
            <TouchableOpacity onPress={() => setShowNewModal(false)}>
              <Feather name="x" size={22} color={colors.mutedForeground} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.modalBody}>
            <Text style={[styles.label, { color: colors.mutedForeground }]}>
              Nome do projeto <Text style={{ color: colors.mutedForeground, fontSize: 11 }}>(opcional â auto-gerado se vazio)</Text>
            </Text>
            <TextInput
              style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.card }]}
              value={newName}
              onChangeText={setNewName}
              placeholder={`Projeto ${projects.length + 1}`}
              placeholderTextColor={colors.mutedForeground}
              autoFocus
            />
            <Text style={[styles.label, { color: colors.mutedForeground }]}>DescriÃ§Ã£o (opcional)</Text>
            <TextInput
              style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.card }]}
              value={newDesc}
              onChangeText={setNewDesc}
              placeholder="DescriÃ§Ã£o do projeto"
              placeholderTextColor={colors.mutedForeground}
            />
            <Text style={[styles.label, { color: colors.mutedForeground }]}>Template</Text>
            <View style={styles.templateGrid}>
              {Object.entries(TEMPLATES).map(([key, tmpl]) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setTemplate(key)}
                  style={[
                    styles.templateCard,
                    {
                      backgroundColor: template === key ? colors.primary : colors.card,
                      borderColor: template === key ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Feather
                    name={tmpl.icon as never}
                    size={13}
                    color={template === key ? colors.primaryForeground : colors.mutedForeground}
                  />
                  <Text
                    style={[
                      styles.templateLabel,
                      { color: template === key ? colors.primaryForeground : colors.foreground },
                    ]}
                    numberOfLines={1}
                  >
                    {tmpl.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              onPress={handleCreateProject}
              style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            >
              <Feather name="plus-circle" size={16} color={colors.primaryForeground} />
              <Text style={[styles.primaryBtnText, { color: colors.primaryForeground }]}>
                Criar Projeto
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Modal: Git Import */}
      <Modal visible={showGitModal} animationType="slide" presentationStyle="pageSheet" statusBarTranslucent onRequestClose={() => setShowGitModal(false)}>
        <View style={[styles.modal, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border, paddingTop: Math.max(24, insets.top + 12) }]}>
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>Importar do Git</Text>
            <TouchableOpacity onPress={() => setShowGitModal(false)}>
              <Feather name="x" size={22} color={colors.mutedForeground} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.modalBody}>
            {/* Dica visual */}
            <View style={[styles.hintBox, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
              <Feather name="info" size={13} color={colors.info} />
              <Text style={[styles.hintText, { color: colors.mutedForeground }]}>
                Cole a URL do repositÃ³rio abaixo. GitHub e GitLab sÃ£o detectados automaticamente.
              </Text>
            </View>

            <Text style={[styles.label, { color: colors.mutedForeground }]}>URL do RepositÃ³rio</Text>
            <TextInput
              style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.card }]}
              value={gitUrl}
              onChangeText={(text) => {
                setGitUrl(text);
                if (text.includes("gitlab")) setGitProvider("gitlab");
                else setGitProvider("github");
              }}
              placeholder="https://github.com/usuario/repositorio"
              placeholderTextColor={colors.mutedForeground}
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
            />

            {/* Detectado automaticamente */}
            {gitUrl.trim().length > 5 && (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <Feather name="check-circle" size={12} color={colors.primary} />
                <Text style={{ color: colors.primary, fontSize: 12 }}>
                  Detectado: {gitUrl.includes("gitlab") ? "GitLab" : "GitHub"}
                </Text>
              </View>
            )}

            <Text style={[styles.label, { color: colors.mutedForeground }]}>
              Token de Acesso{" "}
              <Text style={{ fontSize: 11 }}>(opcional â para repositÃ³rios privados)</Text>
            </Text>
            <TextInput
              style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.card }]}
              value={gitToken}
              onChangeText={setGitToken}
              placeholder={gitProvider === "github" ? "ghp_xxxxxxxxxxxx" : "glpat-xxxxxxxxxxxx"}
              placeholderTextColor={colors.mutedForeground}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
            />

            <Text style={{ color: colors.mutedForeground, fontSize: 11, marginBottom: 14, lineHeight: 16 }}>
              {gitProvider === "github"
                ? "Token GitHub: github.com â Settings â Developer settings â Personal access tokens â Generate new token (selecione 'repo')"
                : "Token GitLab: gitlab.com â PreferÃªncias â Access Tokens â Adicionar (escopo: read_repository)"}
            </Text>

            <TouchableOpacity
              onPress={handleImportGit}
              disabled={!gitUrl.trim() || importing}
              style={[styles.primaryBtn, { backgroundColor: gitUrl.trim() && !importing ? colors.primary : colors.muted }]}
            >
              <Feather name="download-cloud" size={16} color={colors.primaryForeground} />
              <Text style={[styles.primaryBtnText, { color: colors.primaryForeground }]}>
                {importing ? "Importando..." : "Importar RepositÃ³rio"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Modal: Combinar */}
      <Modal visible={showCombineModal} animationType="slide" presentationStyle="pageSheet" statusBarTranslucent onRequestClose={() => setShowCombineModal(false)}>
        <View style={[styles.modal, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border, paddingTop: Math.max(24, insets.top + 12) }]}>
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>Combinar Projetos</Text>
            <TouchableOpacity onPress={() => setShowCombineModal(false)}>
              <Feather name="x" size={22} color={colors.mutedForeground} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.modalBody}>
            <Text style={[styles.sectionDesc, { color: colors.mutedForeground }]}>
              Combinando {selectedProjects.length} projetos em um novo
            </Text>
            <Text style={[styles.label, { color: colors.mutedForeground }]}>Nome do projeto combinado</Text>
            <TextInput
              style={[styles.input, { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.card }]}
              value={combineName}
              onChangeText={setCombineName}
              placeholder="Projeto Combinado"
              placeholderTextColor={colors.mutedForeground}
              autoFocus
            />
            <TouchableOpacity
              onPress={handleCombine}
              disabled={!combineName.trim()}
              style={[styles.primaryBtn, { backgroundColor: combineName.trim() ? colors.primary : colors.muted }]}
            >
              <Feather name="layers" size={16} color={colors.primaryForeground} />
              <Text style={[styles.primaryBtnText, { color: colors.primaryForeground }]}>Combinar Projetos</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      <LibrarySearch visible={showLibSearch} onClose={() => setShowLibSearch(false)} />
      <ProjectPlanModal visible={showPlan} onClose={() => setShowPlan(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  title: { fontSize: 24, fontWeight: "800", letterSpacing: -0.5 },
  subtitle: { fontSize: 12, marginTop: 2 },
  headerActions: { flexDirection: "row", gap: 8, alignItems: "center" },
  headerBtn: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  toolBar: {
    maxHeight: 44,
    borderBottomWidth: 1,
    paddingVertical: 6,
  },
  toolChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  toolChipText: { fontSize: 12, fontWeight: "500" },
  selectBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  selectText: { color: "#fff", fontSize: 13, fontWeight: "600" },
  selectCancel: { color: "#fff", fontSize: 13 },
  card: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 12 },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  projectIcon: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  cardTitle: { fontSize: 15, fontWeight: "600" },
  cardGit: { fontSize: 11, marginTop: 1 },
  cardDesc: { fontSize: 13, lineHeight: 18 },
  cardFooter: { flexDirection: "row", justifyContent: "space-between" },
  cardMeta: { fontSize: 12, marginTop: 2 },
  cardDate: { fontSize: 11 },
  exportBtn: { padding: 4 },
  emptyState: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, paddingVertical: 60 },
  emptyTitle: { fontSize: 20, fontWeight: "700" },
  emptyDesc: { fontSize: 14, textAlign: "center", maxWidth: 260, lineHeight: 20 },
  emptyActions: { flexDirection: "row", gap: 10, marginTop: 8 },
  emptyBtn: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
  emptyBtnText: { fontSize: 14, fontWeight: "600" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  renameBox: {
    width: 300,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    gap: 8,
  },
  actionsMenu: {
    width: 280,
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
    paddingTop: 8,
  },
  menuTitle: { fontSize: 10, fontWeight: "700", paddingHorizontal: 16, paddingBottom: 6, letterSpacing: 1 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuItemText: { fontSize: 15 },
  modal: { flex: 1 },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 24,
    borderBottomWidth: 1,
  },
  modalTitle: { fontSize: 18, fontWeight: "700" },
  modalBody: { padding: 20, gap: 8, paddingBottom: 40 },
  label: { fontSize: 12, fontWeight: "600", marginTop: 8, marginBottom: 2 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 15 },
  templateGrid: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginVertical: 4 },
  templateCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  templateLabel: { fontSize: 12, fontWeight: "600" },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 12,
  },
  primaryBtnText: { fontSize: 16, fontWeight: "700" },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 4,
  },
  actionBtnText: { fontSize: 15, fontWeight: "700" },
  providerRow: { flexDirection: "row", gap: 10 },
  providerBtn: {
    flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 8, paddingVertical: 10, borderRadius: 10, borderWidth: 1,
  },
  providerText: { fontSize: 14, fontWeight: "500" },
  sectionDesc: { fontSize: 14, marginBottom: 8 },
  hintBox: { flexDirection: "row", gap: 8, padding: 10, borderRadius: 8, borderWidth: 1, marginBottom: 8, alignItems: "flex-start" },
  hintText: { flex: 1, fontSize: 12, lineHeight: 18 },

  // ââ SK Code Editor styles ââ
  skHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  skHeaderLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  skLogo: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: "#007acc",
    alignItems: "center", justifyContent: "center",
  },
  skLogoText: { color: "#fff", fontSize: 13, fontWeight: "800", letterSpacing: -1 },
  skTitle: { fontSize: 18, fontWeight: "800", letterSpacing: -0.3 },
  skSubtitle: { fontSize: 11, marginTop: 1 },
  skHeaderRight: { flexDirection: "row", gap: 8, alignItems: "center" },
  skBtn: { width: 34, height: 34, borderRadius: 9, alignItems: "center", justifyContent: "center" },

  skSearchBar: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  skSearchInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  skSearchText: { flex: 1, fontSize: 14, padding: 0 },

  skTabs: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  skTab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  skTabText: { fontSize: 12, fontWeight: "700", letterSpacing: 0.5 },
  skTabBadge: { borderRadius: 8, paddingHorizontal: 5, paddingVertical: 1, minWidth: 18, alignItems: "center" },
  skTabBadgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },

  // Card SK style (horizontal row)
  avatar: { width: 38, height: 38, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#fff", fontSize: 13, fontWeight: "800" },
  openBtn: { padding: 6 },
  separator: { height: StyleSheet.hairlineWidth, marginLeft: 70 },

  // Aba CRIAR
  criarIACard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 14,
  },
  criarIAIcon: {
    width: 44, height: 44, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center", justifyContent: "center",
  },
  criarIATitle: { color: "#fff", fontSize: 17, fontWeight: "800" },
  criarIADesc: { color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 2 },
  criarOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 14,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  criarOptionIcon: { width: 40, height: 40, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  criarOptionLabel: { fontSize: 15, fontWeight: "600" },
  criarOptionDesc: { fontSize: 12, marginTop: 2 },

  // Modal Criar com IA
  iaBox: {
    width: "92%",
    maxWidth: 420,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
  },
});
