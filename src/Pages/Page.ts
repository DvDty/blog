import { container } from 'tsyringe'
import Storage from '../Services/Storage'
import MarkdownConverter from '../Services/MarkdownConventer'
import CodeHighlighter from '../Services/CodeHighlighter'
import type showdown from 'showdown'

export default abstract class Page {
  public readonly name: string
  public readonly content: string
  public readonly metadata: showdown.Metadata

  private readonly html: string
  private readonly templateData: Map<string, string> = new Map<string, string>()

  public constructor (name: string) {
    const markdownConverter: MarkdownConverter = container.resolve(MarkdownConverter)

    this.name = name
    this.content = container.resolve(Storage).getContent('articles/' + name)
    this.html = markdownConverter.toHtml(this.content)

    this.metadata = markdownConverter.getMetadata()

    for (const key in this.metadata) {
      this.templateData.set(key, this.metadata[key])
    }
  }

  public getHtml (): string {
    let html: string = container.resolve(Storage).getContent('./assets/template.html')

    this.templateData.set('content', container.resolve(CodeHighlighter).highlightAuto(this.html))

    this.templateData.forEach((value: string, key: string) => { html = html.replaceAll(`{{ ${key} }}`, value) })

    return html
  }
}
