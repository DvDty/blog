import {ServiceContainer} from './ServiceContainer.js'
import fs from 'fs'

export class HtmlBuilder {
    #config
    #converter
    #cache
    #template
    #templateData = {}

    constructor() {
        this.#config = ServiceContainer.get('config')
        this.#converter = ServiceContainer.get('converter')
        this.#cache = ServiceContainer.get('cache')

        this.#setTemplate()
    }

    with(key, data) {
        this.#templateData[key] = data
        return this
    }

    withContent(content) {
        this.with('content', this.#converter.makeHtml(content))
        return this
    }

    getHtml() {
        this.#bindTemplateData()
        return this.#template
    }

    #setTemplate() {
        this.#template = this.#cache.remember(
            'pageTemplate',
            () => fs.readFileSync('./src/templates/page.html', {encoding: 'utf8'})
        )
    }

    #bindTemplateData() {
        for (const key in this.#templateData) {
            this.#template = this.#template.replaceAll(`{{ ${key} }}`, this.#templateData[key])
        }
    }
}
