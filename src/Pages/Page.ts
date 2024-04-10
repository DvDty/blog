import { container } from 'tsyringe'
import Storage from '../Services/Storage'
import MarkdownConverter from '../Services/MarkdownConventer'
import CodeHighlighter from '../Services/CodeHighlighter'
import type showdown from 'showdown'

export default abstract class Page {
  public content: string
  public readonly name: string
  public metadata: showdown.Metadata = {}

  private html: string = ''
  private readonly templateData: Map<string, string> = new Map<string, string>()

  public constructor (name: string) {
    this.name = name
    this.content = container.resolve(Storage).getContent('articles/' + name)

    this.parseMarkdown()
  }

  protected parseMarkdown (): void {
    const markdownConverter: MarkdownConverter = container.resolve(MarkdownConverter)

    this.html = markdownConverter.toHtml(this.content)

    this.metadata = markdownConverter.getMetadata()

    for (const key in this.metadata) {
      this.templateData.set(key, this.metadata[key])
    }
  }

  public getHtml (): string {
    let html: string = container.resolve(Storage).getContent('./assets/template.html')
    const styles: string = container.resolve(Storage).getContent('./assets/styles.css')

    this.templateData.set('content', container.resolve(CodeHighlighter).highlightAuto(this.html))
    this.templateData.set('styles', `<style>${styles}</style>`)

    this.templateData.forEach((value: string, key: string) => { html = html.replaceAll(`{{ ${key} }}`, value) })

    return html
  }
}
