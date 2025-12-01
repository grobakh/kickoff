import { promises as fs } from "fs"
import os from "os"
import path from "path"

const cwd = process.cwd()
const distDir = path.join(cwd, "dist")

const configuredTarget =
  process.env.CODEX_PROMPT_DIR ??
  process.env.npm_package_config_codexPromptDir ??
  "~/.codex/prompts"

function expandUserPath(targetPath: string): string {
  if (targetPath.startsWith("~")) {
    return path.join(os.homedir(), targetPath.slice(1))
  }
  return targetPath
}

async function ensureDistExists(): Promise<void> {
  try {
    const stats = await fs.stat(distDir)
    if (!stats.isDirectory()) throw new Error()
  } catch {
    throw new Error(`Missing build output at ${distDir}. Run "npm run build" first.`)
  }
}

async function copyRecursive(from: string, to: string): Promise<void> {
  const entries = await fs.readdir(from, { withFileTypes: true })
  await fs.mkdir(to, { recursive: true })

  for (const entry of entries) {
    const srcPath = path.join(from, entry.name)
    const destPath = path.join(to, entry.name)

    if (entry.isDirectory()) {
      await copyRecursive(srcPath, destPath)
    } else if (entry.isFile()) {
      await fs.copyFile(srcPath, destPath)
    }
  }
}

async function main() {
  await ensureDistExists()
  const targetDir = expandUserPath(configuredTarget)
  await fs.mkdir(targetDir, { recursive: true })
  await copyRecursive(distDir, targetDir)
  console.log(`Deployed Codex prompts from ${distDir} to ${targetDir}.`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
