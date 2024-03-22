import {injectable} from 'tsyringe';
import showdown from 'showdown';
import hljs from 'highlight.js';

@injectable()
export default class MarkdownConverter
{
    private showdownConverter: showdown.Converter;

    constructor() {
        this.showdownConverter = new showdown.Converter();
        this.showdownConverter.setOption('tables', true);
        this.showdownConverter.setOption('tasklists', true);
        this.showdownConverter.setOption('literalMidWordUnderscores', true);
    }

    public toHtml(markdown: string): string {
        const html = this.showdownConverter.makeHtml(markdown);

        return this.highlightCodeBlocks(html);
    }

    private highlightCodeBlocks(html: string): string {
        return html.replace(/<pre><code class="([^"]+)">([\s\S]+?)<\/code><\/pre>/g, (_match, lang, code) => {
            const highlightedCode = hljs.highlightAuto(code, [lang]).value;
            return `<pre><code class="${lang}">${highlightedCode}</code></pre>`;
        });
    }
}
