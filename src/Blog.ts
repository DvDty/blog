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

        articles.forEach((article: Article): void => {
            const path: string = 'public/' + article.htmlName
            const html: string = article.getHtml()

            this.storage.writeContent(path, html)
            this.copyArticleImages(article)
        })

        this.storage.writeContent('public/index.html', new Index(articles).getHtml())
    }

    private getArticles(): Article[] {
        return fs.readdirSync('articles')
            .filter(file => file.endsWith('.md'))
            .map((post: string) => new Article(post))
    }

    private copyArticleImages(): void {
        const imagesDir = path.join('articles', 'images')
        const publicImagesDir = path.join('public', 'images')

        fs.readdirSync(imagesDir).forEach(file => {
            const sourcePath = path.join(imagesDir, file)
            const targetPath = path.join(publicImagesDir, file)

            if (fs.statSync(sourcePath).isFile()) {
                this.storage.copyImage(sourcePath, targetPath)
            }
        })
    }
}
