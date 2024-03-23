import {container} from 'tsyringe';
import fs from 'fs';
import Article from '../Article';
import File from './File';

export default class Blog {
    private file: File;

    constructor() {
        this.file = container.resolve(File);
    }

    public generate(): void {
        this.getArticles().forEach((article: Article): void => {
            const path: string = 'docs1/' + article.name.replace('.md', '.html');
            const content: string = this.getTemplate('article').replace('{{ content }}', article.html);

            this.file.writeContent(path, content);
        });
    }

    private getArticles(): Article[] {
        return fs.readdirSync('articles').map((post: string) => new Article(post));
    }

    private getTemplate(template: string): string {
        return this.file.getContent('templates/' + template + '.html');
    }
}
