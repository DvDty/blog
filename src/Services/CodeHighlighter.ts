import { injectable } from 'tsyringe'
import hljs from 'highlight.js'

@injectable()
export default class CodeHighlighter {
  public highlightAuto (html: string): string {
    return html.replace(
      /<pre><code class="([^"]+)">([\s\S]+?)<\/code><\/pre>/g,
      (_match: string, lang: string, code: string): string => {
        const highlightedCode: string = hljs.highlightAuto(code, [lang]).value

        return `<pre><code class="${lang}">${highlightedCode}</code></pre>`
      }
    )
  }
}
