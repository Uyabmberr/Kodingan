const { spawn } = require('child_process');
const path = require('path');

const projectPath = 'D:\\Kodingan\\guppy-ai-saas-2';
process.chdir(projectPath);

console.log('Starting Next.js dev server from:', process.cwd());

const nextDev = spawn('npx', ['next', 'dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: projectPath
});

nextDev.on('error', (err) => {
  console.error('Failed to start dev server:', err);
  process.exit(1);
});
