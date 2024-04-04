import { container } from 'tsyringe'
import Storage from './Services/Storage'
import MarkdownConverter from './Services/MarkdownConventer'
import CodeHighlighter from './Services/CodeHighlighter'
import type showdown from 'showdown'
import { type Template } from './Template'
import moment from 'moment'

export default abstract class Page {
  public readonly name: string
  public readonly content: string
  public readonly metadata: showdown.Metadata

  private html: string
  private template: Template | undefined
  private highlightCode: boolean = false

  public constructor (name: string) {
    const markdownConverter: MarkdownConverter = container.resolve(MarkdownConverter)

    this.name = name
    this.content = container.resolve(Storage).getContent('articles/' + name)
    this.html = markdownConverter.toHtml(this.content)

    this.metadata = markdownConverter.getMetadata()
    this.metadata.created_at = moment(this.metadata.created_at).fromNow()
  }

  public withCodeHighlighting (): this {
    this.highlightCode = true

    return this
  }

  public withTemplate (template: Template): this {
    this.template = template

    return this
  }

  public getHtml (): string {
    if (this.highlightCode) {
      this.html = container.resolve(CodeHighlighter).highlightAuto(this.html)
    }

    if (this.template != null) {
      this.html = container.resolve(Storage).getContent(this.template).replace('{{ content }}', this.html)
    }

    for (const key in this.metadata) {
      this.html = this.html.replaceAll(`{{ ${key} }}`, this.metadata[key])
    }

    return this.html
  }
}
