import { promises as fs } from 'fs';
import path from 'path';

const cwd = process.cwd();
const sourceDir = path.join(cwd, 'src', 'prompts');
const distDir = path.join(cwd, 'dist');

const prefix =
  (process.env.PROMPT_PREFIX ?? process.env.npm_package_config_promptPrefix ?? 'kickoff').trim();

async function ensureSourceExists(): Promise<void> {
  try {
    const stats = await fs.stat(sourceDir);
    if (!stats.isDirectory()) {
      throw new Error(`Source prompts path is not a directory: ${sourceDir}`);
    }
  } catch (error) {
    throw new Error(`Missing source prompts directory at ${sourceDir}`);
  }
}

async function resetDist(): Promise<void> {
  await fs.rm(distDir, { recursive: true, force: true });
  await fs.mkdir(distDir, { recursive: true });
}

function withPrefix(fileName: string): string {
  if (!prefix) return fileName;
  const ext = path.extname(fileName);
  const base = path.basename(fileName, ext);
  if (base === prefix || base.startsWith(`${prefix}-`)) return fileName;
  return `${prefix}-${base}${ext}`;
}

async function copyPrompts(from: string, to: string): Promise<void> {
  const entries = await fs.readdir(from, { withFileTypes: true });
  await fs.mkdir(to, { recursive: true });

  for (const entry of entries) {
    const srcPath = path.join(from, entry.name);
    const destName = entry.isFile() ? withPrefix(entry.name) : entry.name;
    const destPath = path.join(to, destName);

    if (entry.isDirectory()) {
      await copyPrompts(srcPath, destPath);
    } else if (entry.isFile()) {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function main() {
  await ensureSourceExists();
  await resetDist();
  await copyPrompts(sourceDir, distDir);
  console.log(`Built prompts from ${sourceDir} to ${distDir} with prefix "${prefix}".`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
