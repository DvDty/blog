import {container} from 'tsyringe'
import fs from 'fs'
import path from 'path'
import Article from './Pages/Article'
import Index from './Pages/Index'
import Storage from './Services/Storage'

export default class Blog {
    private readonly storage: Storage

    constructor() {
        this.storage = container.resolve(Storage)
    }

    public generate(): void {
        const articles = this.getArticles()

        this.copyAssets()

        articles.forEach((article: Article): void => {
            const path: string = 'public/' + article.htmlName
            const html: string = article.getHtml()

            this.storage.writeContent(path, html)
        })

        this.storage.writeContent('public/index.html', new Index(articles).getHtml())
    }

    private getArticles(): Article[] {
        return fs.readdirSync('articles')
            .filter(file => file.endsWith('.md'))
            .map((post: string) => new Article(post))
    }

    private copyAssets(): void {
        const copyDir = (src: string, dest: string) => {
            if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest, { recursive: true })
            }

            const entries = fs.readdirSync(src, { withFileTypes: true })

            for (const entry of entries) {
                const srcPath = path.join(src, entry.name)
                const destPath = path.join(dest, entry.name)

                if (entry.isDirectory()) {
                    copyDir(srcPath, destPath)
                } else {
                    fs.copyFileSync(srcPath, destPath)
                }
            }
        }

        copyDir('assets', 'public/assets')
    }
}
