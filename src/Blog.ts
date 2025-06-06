import { container } from 'tsyringe'
import fs from 'fs'
import Article from './Pages/Article'
import Index from './Pages/Index'
import Storage from './Services/Storage'

export default class Blog {
  public generate (): void {
    const articles = this.getArticles()

    articles.forEach((article: Article): void => {
      const path: string = 'public/' + article.htmlName
      const html: string = article.getHtml()

      container.resolve(Storage).writeContent(path, html)
    })

    container.resolve(Storage).writeContent('public/index.html', new Index(articles).getHtml())
  }

  private getArticles (): Article[] {
    return fs.readdirSync('articles').map((post: string) => new Article(post))
  }
}
