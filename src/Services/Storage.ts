import { singleton } from 'tsyringe'
import fs from 'fs'

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
    fs.writeFileSync(path, content)
  }
}
