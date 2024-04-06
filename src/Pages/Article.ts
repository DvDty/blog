import moment from 'moment'
import Page from './Page'

export default class Article extends Page {
  public constructor (name: string) {
    super(name)

    this.metadata.created_at = moment(this.metadata.created_at).fromNow()
  }
}
