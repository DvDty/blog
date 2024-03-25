import {container} from 'tsyringe';
import fs from 'fs';
import Article from '../Article';
import Storage from './Storage';
import {Template} from '../Template';

export default class Blog {
    public generate(): void {
        this.getArticles().forEach((article: Article): void => {
            const path: string = 'docs/' + article.name.replace('.md', '.html');
            const html: string = article.withCodeHighlighting().withTemplate(Template.Article).getHtml();

            container.resolve(Storage).writeContent(path, html);
        });
    }

    private getArticles(): Article[] {
        return fs.readdirSync('articles').map((post: string) => new Article(post));
    }
}
