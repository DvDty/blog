import 'reflect-metadata';
import { container } from 'tsyringe';
import * as fs from 'fs';
import MarkdownConverter from './src/Services/MarkdownConventer';

const markdownConverter = container.resolve(MarkdownConverter);

const articleTemplate = fs.readFileSync('./templates/article.html', {encoding: 'utf8'});

fs.readdirSync('posts').forEach(filename => {
    const fileContent = fs.readFileSync('posts/' + filename, {encoding: 'utf8'});

    fs.writeFileSync(
        'docs1/' + filename.replace('.md', '.html'),
        articleTemplate.replace('{{ content }}', markdownConverter.toHtml(fileContent)),
    );
});
