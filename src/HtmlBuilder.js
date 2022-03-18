import {ServiceContainer} from './ServiceContainer.js'
import fs from 'fs'

export class HtmlBuilder {
    #config
    #converter
    #cache
    #template
    #templateData = {}
    #templateMetadata = {}

    constructor() {
        this.#config = ServiceContainer.get('config')
        this.#converter = ServiceContainer.get('converter')
        this.#cache = ServiceContainer.get('cache')

        this.#setTemplate()

        this.with('blogName', this.#config.get('blogName'))
        this.with('cssUrl', this.#config.get('cssUrl'))
    }

    with(key, data) {
        this.#templateData[key] = data
        return this
    }

    withMetadata(key, defaultValue) {
        this.#templateData[key] = this.#templateMetadata[key] ?? defaultValue
        return this
    }

    withContent(content) {
        this.with('content', this.#converter.makeHtml(content))
        this.#templateMetadata = this.#converter.getMetadata(false)
        return this
    }

    getHtml() {
        this.#bindTemplateData()
        return this.#template
    }

    getMetadata(key = null, defaultValue = null) {
        return key
            ? (this.#templateMetadata[key] ?? defaultValue)
            : this.#templateMetadata
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
