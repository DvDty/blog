import { injectable } from 'tsyringe'
import showdown from 'showdown'

@injectable()
export default class MarkdownConverter {
  private readonly showdownConverter: showdown.Converter

  constructor () {
    this.showdownConverter = new showdown.Converter()

    this.showdownConverter.setOption('ghCompatibleHeaderId', true)
    this.showdownConverter.setOption('ghMentions', true)

    this.showdownConverter.setOption('metadata', true)
    this.showdownConverter.setOption('openLinksInNewWindow', true)
    this.showdownConverter.setOption('simplifiedAutoLink', true)
    this.showdownConverter.setOption('strikethrough', true)
    this.showdownConverter.setOption('tables', true)
    this.showdownConverter.setOption('tasklists', true)
  }

  public toHtml (markdown: string): string {
    this.showdownConverter.getMetadata()
    return this.showdownConverter.makeHtml(markdown)
  }

  public getMetadata (): showdown.Metadata {
    const metadata: string | showdown.Metadata = this.showdownConverter.getMetadata(false)

    if (typeof metadata === 'string') {
      return {}
    }

    return metadata
  }
}
