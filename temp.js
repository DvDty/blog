//import 'reflect-metadata';
//import {container} from 'tsyringe';
//import Cache from './src/Services/Cache';
//
//const cache = container.resolve(Cache);
//
//cache.set('test', 1234);
//
//console.log(cache.get('test'));

// ServiceContainer.get('siteGenerator').generate()


// const config = ServiceContainer.get('config')

//
// fs.readdirSync('posts').forEach(filename => {
//     const fileContent = fs.readFileSync('posts/' + filename, {encoding: 'utf8'})
//
//     const builder = ServiceContainer.get('htmlBuilder')
//         .withContent(fileContent)
//
//     const htmlFilename = filename.replace('.md', '.html')
//     fs.writeFileSync('docs/' + htmlFilename, builder.getHtml())
//
//     pages.push({
//         title: builder.getMetadata('title'),
//         created_at: builder.getMetadata('created_at'),
//         path: './' + htmlFilename,
//     })
// })
//
// let landingPageContent = config.get('landingDescription') + '\n'
//
// pages.forEach(post => {
//     landingPageContent += `## [${post.title}](${post.path})\n${post.created_at}\n___\n`
// })
//
// const builder = ServiceContainer.get('htmlBuilder')
//     .withContent(landingPageContent)
//     .with('title', config.get('blogName'))
//
// fs.writeFileSync('docs/index.html', builder.getHtml())