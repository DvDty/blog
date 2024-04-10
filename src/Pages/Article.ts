import moment from 'moment'
import Page from './Page'

export default class Article extends Page {
  public constructor (name: string) {
    super(name)

    let dates = moment(this.metadata.created_at).format('MMMM DD, YYYY')

    if (Object.prototype.hasOwnProperty.call(this.metadata, 'updated_at')) {
      dates += ` (updated ${moment(this.metadata.updated_at).fromNow()})`
    }

    this.content = `## ${dates} \n` + this.content
    this.content = `# ${this.metadata.title} \n` + this.content

    this.parseMarkdown()
  }
}
