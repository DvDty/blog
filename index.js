import {BindServices} from './src/ServiceBinder.js'
import {ServiceContainer} from './src/ServiceContainer.js'
import fs from 'fs'

BindServices()

const config = ServiceContainer.get('config')

fs.readdirSync('posts').forEach(filename => {
    const fileContent = fs.readFileSync('posts/' + filename, {encoding: 'utf8'})

    const html = ServiceContainer.get('htmlBuilder')
        .withContent(fileContent)
        .with('css', config.get('css'))
        .withMetadata('title', config.get('title'))
        .getHtml()

    const htmlFilename = filename.replace('.md', '.html')
    fs.writeFileSync('docs/' + htmlFilename, html)
})
