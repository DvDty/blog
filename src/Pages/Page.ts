import {container} from 'tsyringe'
import Storage from '../Services/Storage'
import CodeHighlighter from '../Services/CodeHighlighter'

export default abstract class Page {
    private html: string = ''

    public getHtml(): string {
        let html: string = container.resolve(Storage).getContent('./assets/template.html')
        const styles: string = container.resolve(Storage).getContent('./assets/styles.css')

        html = html.replaceAll(`{{ styles }}`, `<style>${styles}</style>`)
        html = html.replaceAll(`{{ content }}`, container.resolve(CodeHighlighter).highlightAuto(this.html))
        html = html.replaceAll(`{{ title }}`, this?.metadata?.title ?? 'grancharov.dev')

        return html
    }
}
