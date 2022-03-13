import {BindServices} from './src/ServiceBinder.js'
import {ServiceContainer} from './src/ServiceContainer.js'
import fs from 'fs'

BindServices();

fs.readdirSync('posts').forEach(filename => {
    let fileContent =  fs.readFileSync('posts/' + filename, {encoding: 'utf8'})

    let html = ServiceContainer.get('htmlBuilder')
        .with('title', 'Test')
        .with('css', ServiceContainer.get('config').get('css'))
        .withContent(fileContent)
        .getHtml()

    let htmlFilename = filename.replace('.md', '.html')
    fs.writeFileSync('docs/' + htmlFilename, html)
})
