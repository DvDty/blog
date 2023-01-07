import fs from 'fs'
import { ServiceContainer } from '../ServiceContainer.js'
import { MarkdownConverter } from './MarkdownConverter.js'

export class SiteGenerator {
    #pages = []

    constructor() {
    }

    generate() {
        let articles = this.#getArticles()
        this.#generateArticlePages()
        this.#generateIndexPage()
    }

    #generateIndexPage() {

    }

    #generateArticlePages() {

    }

    #getArticles() {
        let articles = []

        let markdownConverter = ServiceContainer.get('markdownConverter')

        fs.readdirSync('posts').forEach(file => {
            let markdown = fs.readFileSync('posts/' + file, {encoding: 'utf8'})

            articles.push({
                file,
                markdown,
                html:
            })
            // const fileContent = fs.readFileSync('posts/' + filename, {encoding: 'utf8'})
            //
            // const builder = ServiceContainer.get('htmlBuilder')
            //     .withContent(fileContent)
            //
            // const htmlFilename = filename.replace('.md', '.html')
            // fs.writeFileSync('docs/' + htmlFilename, builder.getHtml())
            //
            // pages.push({
            //     title: builder.getMetadata('title'),
            //     created_at: builder.getMetadata('created_at'),
            //     path: './' + htmlFilename,
            // })
        })
    }
}
