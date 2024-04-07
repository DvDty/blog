import { container } from 'tsyringe'
import fs from 'fs'
import Article from './Pages/Article'
import Storage from './Services/Storage'

export default class Blog {
  public generate (): void {
    this.getArticles().forEach((article: Article): void => {
      const path: string = 'docs/' + article.name.replace('.md', '.html')
      const html: string = article.getHtml()

      container.resolve(Storage).writeContent(path, html)
    })
  }

  private getArticles (): Article[] {
    return fs.readdirSync('articles').map((post: string) => new Article(post))
  }
}
