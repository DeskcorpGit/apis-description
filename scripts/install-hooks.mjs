#!/usr/bin/env node
// scripts/install-hooks.mjs
// Instalado automaticamente via "npm install" (script "prepare").
// Cria o hook pre-push no .git/hooks local do desenvolvedor.

import { writeFileSync, chmodSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const HOOKS_DIR = join(process.cwd(), ".git", "hooks");
const HOOK_PATH = join(HOOKS_DIR, "pre-push");

const HOOK_CONTENT = `#!/bin/sh
# Hook pre-push — gerado automaticamente por scripts/install-hooks.mjs
# Valida os arquivos OpenAPI em apis/ antes de permitir o push.

echo ""
echo "Executando validação de APIs antes do push..."
echo ""

npm run validate:apis

if [ $? -ne 0 ]; then
  echo ""
  echo "Push bloqueado: corrija os erros de validação acima e tente novamente."
  echo ""
  exit 1
fi

exit 0
`;

if (!existsSync(HOOKS_DIR)) {
  mkdirSync(HOOKS_DIR, { recursive: true });
}

writeFileSync(HOOK_PATH, HOOK_CONTENT, { encoding: "utf-8" });

try {
  chmodSync(HOOK_PATH, "755");
} catch {
  // chmod pode falhar no Windows, mas o hook ainda funciona via Git for Windows (bash)
}

console.log("  ✔ Git hook pre-push instalado com sucesso.");
