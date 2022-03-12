import {ServiceContainer} from './src/ServiceContainer.js'
import Config from './src/Config.js'
import * as fs from 'fs'
import showdown from  'showdown'

ServiceContainer.singleton('config', () => {
    let configFile = fs.readFileSync('config.json', {encoding: 'utf8'})
    return new Config(configFile)
})

ServiceContainer.singleton('converter', () => {
    return new showdown.Converter()
})
