import moment from 'moment'
import Page from './Page'
import {container} from "tsyringe";
import Storage from "../Services/Storage";
import type showdown from "showdown";
import MarkdownConverter from "../Services/MarkdownConventer";

export default class Article extends Page {
  public readonly name: string
  public readonly htmlName: string
  public readonly readingTime: number
  public content: string
  public metadata: showdown.Metadata = {}

  private calculateReadingTime(content: string): number {
    const plainText = content.replace(/[#*`_~\[\]]/g, '')
    const wordCount = plainText.trim().split(/\s+/).length

    return Math.ceil(wordCount / 200)
  }

  public constructor (name: string) {
    super()

    this.name = name
    this.htmlName = this.name.replace('.md', '.html')

    const markdownConverter: MarkdownConverter = container.resolve(MarkdownConverter)

    this.content = container.resolve(Storage).getContent('articles/' + name)

    // Convert to extract metadata
    markdownConverter.toHtml(this.content)
    this.metadata = markdownConverter.getMetadata()

    // Remove metadata from content
    this.content = this.content.replace(/---\n[\s\S]*?\n---/, '').trim()

    let date = '';

    if (Object.prototype.hasOwnProperty.call(this.metadata, 'created_at')) {
      date = this.metadata.created_at

      if (Object.prototype.hasOwnProperty.call(this.metadata, 'updated_at')) {
        date += ` (last updated ${moment(this.metadata.updated_at).fromNow()})`
      }
    }

    this.content = `# ${this.metadata.title} \n ${date} \n\n ${this.content}`

    this.readingTime = this.calculateReadingTime(this.content)

    this.html = markdownConverter.toHtml(this.content)
  }
}
