import { rename, rmdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const repositoryName = 'iisit-student-journey';
const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const clientDirectory = path.join(projectRoot, 'dist', 'client');
const prefixedDirectory = path.join(clientDirectory, repositoryName);

await rename(
  path.join(prefixedDirectory, '_next'),
  path.join(clientDirectory, '_next'),
);
await rmdir(prefixedDirectory);
