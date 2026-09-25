import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

fs.rmSync('dist', { recursive: true, force: true });
fs.cpSync('public', 'dist', { recursive: true });

fs.mkdirSync('dist/content/rooms', { recursive: true });
fs.cpSync('content/rooms', 'dist/content/rooms', { recursive: true });

fs.mkdirSync('dist/ink', { recursive: true });
execFileSync(
  'npx',
  ['--no-install', 'inkjs', '-o', 'dist/ink/rabbit-hole.json', 'ink/rabbit-hole.ink'],
  { stdio: 'inherit' }
);
fs.copyFileSync('node_modules/inkjs/dist/ink.js', 'dist/inkjs.js');

console.log('Browser build written to dist/ with compiled Ink story and InkJS runtime.');
