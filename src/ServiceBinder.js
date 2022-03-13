import {ServiceContainer} from './ServiceContainer.js'
import fs from 'fs'
import {Config} from './Config.js'
import showdown from 'showdown'
import {HtmlBuilder} from './HtmlBuilder.js'
import {Cache} from './Cache.js'

export function BindServices() {
    ServiceContainer.singleton('config', () => {
        let configFile = fs.readFileSync('config.json', {encoding: 'utf8'})
        return new Config(configFile)
    })

    ServiceContainer.singleton('converter', () => {
        return new showdown.Converter({
            metadata: true,
            tables: true,
        })
    })

    ServiceContainer.bind('htmlBuilder', () => {
        return new HtmlBuilder()
    })

    ServiceContainer.singleton('cache', () => {
        return new Cache()
    })
}
