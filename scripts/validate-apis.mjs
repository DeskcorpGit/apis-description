import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const APIS_DIR = join(ROOT, 'apis');
const SPECTRAL_YAML = join(ROOT, '.spectral.yaml');
const SPECTRAL_BIN = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const SPECTRAL_ARGS = [
  '@stoplight/spectral-cli@6.11.1',
  'lint',
  '--ruleset',
  SPECTRAL_YAML,
  '--fail-severity=error',
];

const green = (t) => `\x1b[32m${t}\x1b[0m`;
const red = (t) => `\x1b[31m${t}\x1b[0m`;
const yellow = (t) => `\x1b[33m${t}\x1b[0m`;
const bold = (t) => `\x1b[1m${t}\x1b[0m`;

console.log(bold('\n🔍 Validação local de APIs (Spectral)\n'));

if (!existsSync(SPECTRAL_YAML)) {
  writeFileSync(SPECTRAL_YAML, 'extends: ["spectral:oas"]\n');
  console.log(yellow('  ℹ .spectral.yaml criado automaticamente.\n'));
}

if (!existsSync(APIS_DIR)) {
  console.log(
    yellow(
      '  ⚠ Pasta apis/ não encontrada. Nenhuma especificação para validar.\n',
    ),
  );
  process.exit(0);
}

function findApiFiles(dir) {
  let results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findApiFiles(fullPath));
    } else if (/\.(ya?ml|json)$/.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = findApiFiles(APIS_DIR);

if (files.length === 0) {
  console.log(yellow('  ⚠ Nenhum arquivo de API encontrado para validar.\n'));
  process.exit(0);
}

console.log(`  Encontrados ${bold(files.length)} arquivo(s) para validar:\n`);

let hasError = false;

for (const file of files) {
  const relativePath = file.replace(ROOT + '\\', '').replace(ROOT + '/', '');
  process.stdout.write(`  › ${relativePath} ... `);

  const result = spawnSync(SPECTRAL_BIN, [...SPECTRAL_ARGS, file], {
    encoding: 'utf-8',
    shell: true,
  });

  if (result.status === 0) {
    console.log(green('OK'));
  } else {
    console.log(red('ERRO'));
    hasError = true;
    const output = (result.stdout || '') + (result.stderr || '');
    const errorLines = output
      .split('\n')
      .filter((l) => l.includes('error') || l.includes('✖'))
      .map((l) => '    ' + l)
      .join('\n');
    if (errorLines) console.log(red(errorLines));
  }
}

console.log('');

if (hasError) {
  console.log(
    red(bold('❌ Validação falhou. Corrija os erros antes de fazer o push.\n')),
  );
  process.exit(1);
} else {
  console.log(green(bold('✅ Todas as especificações estão válidas!\n')));
  process.exit(0);
}
