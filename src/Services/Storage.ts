import { singleton } from 'tsyringe'
import fs from 'fs'
import path from 'path'

@singleton()
export default class Storage {
  private readonly cache: Map<string, string> = new Map<string, string>()

  public getContent (path: string): string {
    if (!this.cache.has(path)) {
      this.cache.set(path, fs.readFileSync(path, { encoding: 'utf8' }))
    }

    return this.cache.get(path) ?? ''
  }

  public writeContent (path: string, content: string): void {
    const dir = path.substring(0, path.lastIndexOf('/'))
    if (dir) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(path, content)
  }

  public copyDir(src: string, dest: string): void {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }

    const entries = fs.readdirSync(src, { withFileTypes: true })

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name)
      const destPath = path.join(dest, entry.name)

      if (entry.isDirectory()) {
        this.copyDir(srcPath, destPath)
      } else {
        fs.copyFileSync(srcPath, destPath)
      }
    }
  }
}
