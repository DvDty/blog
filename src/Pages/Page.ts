import {container} from 'tsyringe'
import Storage from '../Services/Storage'
import CodeHighlighter from '../Services/CodeHighlighter'

export default abstract class Page {
    private html: string = ''
    private readonly templateData: Map<string, string> = new Map<string, string>()

    protected appendHtml(content: string): void {
        this.html += content
    }

    public getHtml(): string {
        let html: string = container.resolve(Storage).getContent('./assets/template.html')
        const styles: string = container.resolve(Storage).getContent('./assets/styles.css')

        this.templateData.set('content', container.resolve(CodeHighlighter).highlightAuto(this.html))
        this.templateData.set('styles', `<style>${styles}</style>`)

        this.templateData.forEach((value: string, key: string) => {
            html = html.replaceAll(`{{ ${key} }}`, value)
        })

        return html
    }
}
