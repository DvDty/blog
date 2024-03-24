import {container} from 'tsyringe';
import fs from 'fs';
import Article from '../Article';
import Storage from './Storage';

export default class Blog {
    private storage: Storage;

    constructor() {
        this.storage = container.resolve(Storage);
    }

    public generate(): void {
        this.getArticles().forEach((article: Article): void => {
            const path: string = 'docs1/' + article.name.replace('.md', '.html');

            this.storage.writeContent(path, article.withCodeHighlighting().getHtml());
        });
    }

    private getArticles(): Article[] {
        return fs.readdirSync('articles').map((post: string) => new Article(post));
    }

    private getTemplate(template: string): string {
        return this.storage.getContent('templates/' + template + '.html');
    }
}
