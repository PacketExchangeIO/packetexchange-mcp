// Checks the client configurations and documentation in this repository.
//
//  1. Every JSON file in configs/ matches the JSON schema for its client format, and
//     every TOML file declares the documented server settings.
//  2. Every ```json block in the Markdown files parses, so copied snippets work.
//  3. Nothing that looks like a real API key appears anywhere.

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';

// Which schema each JSON configuration file follows.
const SCHEMA_FOR = {
  'claude-code.json': 'mcp-http.schema.json',
  'claude-desktop.json': 'mcp-remote.schema.json',
  'cursor.json': 'mcp-http.schema.json',
  'generic-stdio.json': 'mcp-remote.schema.json',
  'vscode.json': 'vscode-mcp.schema.json',
};

// Lines each TOML configuration must contain. Node has no TOML parser, and these files
// are three lines long, so an exact line check is enough.
const TOML_LINES = {
  'codex.toml': [
    '[mcp_servers.packetexchange]',
    'url = "https://packetexchange.io/mcp/http"',
    'bearer_token_env_var = "PACKETEXCHANGE_API_KEY"',
  ],
};

// A real key has a long random tail; the documented placeholder `wmmn_live_sk_...` does not.
const KEY_PATTERN = /wmmn_(live|test)_sk_[A-Za-z0-9]{8,}/;

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const errors = [];

const ajv = new Ajv2020({ allErrors: true, strict: true });
const validators = {};
for (const file of new Set(Object.values(SCHEMA_FOR))) {
  validators[file] = ajv.compile(readJson(join('schemas', file)));
}

for (const file of readdirSync('configs')) {
  if (file.endsWith('.toml')) {
    const expected = TOML_LINES[file];
    if (!expected) {
      errors.push(`configs/${file}: no expected lines are assigned in scripts/validate.mjs`);
      continue;
    }
    const lines = readFileSync(join('configs', file), 'utf8').split('\n').map((l) => l.trim());
    for (const line of expected) {
      if (!lines.includes(line)) errors.push(`configs/${file}: missing line: ${line}`);
    }
    continue;
  }
  const schema = SCHEMA_FOR[file];
  if (!schema) {
    errors.push(`configs/${file}: no schema is assigned in scripts/validate.mjs`);
    continue;
  }
  const validate = validators[schema];
  if (!validate(readJson(join('configs', file)))) {
    for (const e of validate.errors) errors.push(`configs/${file}${e.instancePath}: ${e.message}`);
  }
}

// Markdown files at the root and under docs/, walked recursively.
const markdownFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return entry.name.endsWith('.md') ? [path] : [];
  });

const documents = [...readdirSync('.').filter((f) => f.endsWith('.md')), ...markdownFiles('docs')];
for (const doc of documents) {
  const text = readFileSync(doc, 'utf8');
  for (const [, block] of text.matchAll(/```json\n([\s\S]*?)```/g)) {
    try {
      JSON.parse(block);
    } catch (e) {
      errors.push(`${doc}: a json code block does not parse (${e.message})`);
    }
  }
  if (KEY_PATTERN.test(text)) errors.push(`${doc}: contains what looks like a real API key`);
}

for (const file of readdirSync('configs')) {
  if (KEY_PATTERN.test(readFileSync(join('configs', file), 'utf8'))) {
    errors.push(`configs/${file}: contains what looks like a real API key`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(error);
  process.exit(1);
}
const configCount = Object.keys(SCHEMA_FOR).length + Object.keys(TOML_LINES).length;
console.log(`OK: ${configCount} configurations and ${documents.length} documents checked.`);
