import {container} from 'tsyringe';
import Storage from './Services/Storage';
import MarkdownConverter from './Services/MarkdownConventer';
import CodeHighlighter from './Services/CodeHighlighter';
import showdown from 'showdown';

export default abstract class Page {
    public readonly name: string;
    public readonly content: string;

    private template: string = '';
    private highlightCode: boolean = false;

    public constructor(name: string) {
        this.name = name;
        this.content = container.resolve(Storage).getContent('articles/' + name);
    }

    public withCodeHighlighting(): Page {
        this.highlightCode = true;

        return this;
    }

    public withTemplate(template: string): Page {
        this.template = template;

        return this;
    }

    public getHtml(): string {
        const markdownConverter: MarkdownConverter = container.resolve(MarkdownConverter);

        let html: string = markdownConverter.toHtml(this.content);
        let metadata: showdown.Metadata = markdownConverter.getMetadata();

        if (this.highlightCode) {
            html = container.resolve(CodeHighlighter).highlightAuto(html);
        }

        if (this.template) {
            container.resolve(Storage).getContent('templates/' + this.template);

            // html =
        }

        for (const key in metadata) {
            html = html.replace(`{{ ${key} }}`, metadata[key]);
        }

        return html;
    }
}
