import { container } from 'tsyringe';
import fs from 'fs';
import Article from './Pages/Article';
import Index from './Pages/Index';
import Storage from './Services/Storage';
import NotFound from './Pages/NotFound';

export default class Blog {
    private readonly storage: Storage;

    constructor() {
        this.storage = container.resolve(Storage);
    }

    public generate(): void {
        const articles = this.getArticles();

        this.storage.copyDir('assets', 'public/assets');

        articles.forEach((article: Article): void => {
            const path: string = 'public/' + article.htmlName;
            const html: string = article.getHtml();

            this.storage.writeContent(path, html);
        });

        this.storage.writeContent('public/404.html', new NotFound().getHtml());
        this.storage.writeContent('public/index.html', new Index(articles).getHtml());
    }

    private getArticles(): Article[] {
        return fs.readdirSync('articles')
            .filter(file => file.endsWith('.md'))
            .sort((a, b) => {
                const numA = parseInt(a.match(/^(\d+)-/)?.[1] || '0');
                const numB = parseInt(b.match(/^(\d+)-/)?.[1] || '0');
                return numB - numA;
            })
            .map((post: string) => new Article(post));
    }
}
