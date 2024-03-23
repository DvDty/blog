import {container} from 'tsyringe';
import File from './Services/File';
import MarkdownConverter from './Services/MarkdownConventer';
import showdown from 'showdown';
import CodeHighlighter from './Services/CodeHighlighter';

export default abstract class Page {
    public readonly name: string;
    public readonly content: string;
    public readonly metadata: showdown.Metadata;

    private readonly html: string;

    public constructor(name: string) {
        this.name = name;
        this.content = container.resolve(File).getContent('articles/' + name);

        const markdownConverter: MarkdownConverter = container.resolve(MarkdownConverter);

        this.html = markdownConverter.toHtml(this.content);
        this.html = container.resolve(CodeHighlighter).highlightAuto(this.html)

        this.metadata = markdownConverter.getMetadata();

        for (const key in this.metadata) {
            this.html = this.html.replace(`{{ ${key} }}`, this.metadata[key])
        }
    }
}
