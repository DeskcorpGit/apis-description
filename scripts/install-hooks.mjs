import { writeFileSync, chmodSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const HOOKS_DIR = join(process.cwd(), '.git', 'hooks');
const HOOK_PATH = join(HOOKS_DIR, 'pre-push');

const HOOK_CONTENT = `#!/bin/sh
# Hook pre-push — gerado automaticamente por scripts/install-hooks.mjs
# Valida os arquivos OpenAPI e o build antes de permitir o push.

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

echo ""
echo "Executando build (tsc + vite)..."
echo ""

npm run build

if [ $? -ne 0 ]; then
  echo ""
  echo "Push bloqueado: o build falhou. Corrija os erros acima e tente novamente."
  echo ""
  exit 1
fi

exit 0
`;

if (!existsSync(HOOKS_DIR)) {
  mkdirSync(HOOKS_DIR, { recursive: true });
}

writeFileSync(HOOK_PATH, HOOK_CONTENT, { encoding: 'utf-8' });

try {
  chmodSync(HOOK_PATH, '755');
} catch {}

console.log('  ✔ Git hook pre-push instalado com sucesso.');
