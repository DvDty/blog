import fs from 'fs';
import {Config} from './Services/Config.js';
import showdown from 'showdown';
import {MarkdownConverter} from './Services/MarkdownConverter';
import {Cache} from './Services/Cache.js';
import {SiteGenerator} from './Services/SiteGenerator';
import {container} from 'tsyringe';

export function BindServices() {
    // container;
    ServiceContainer.singleton('config', () => {
        let configFile = fs.readFileSync('config.json', {encoding: 'utf8'});
        return new Config(configFile);
    });

    ServiceContainer.singleton('converter', () => {
        return new showdown.Converter({
            metadata: true,
            tables: true,
        });
    });

    ServiceContainer.bind('htmlConverter', () => {
        return new MarkdownConverter();
    });

    ServiceContainer.singleton('cache', () => {
        return new Cache();
    });

    ServiceContainer.bind('siteGenerator', () => {
        return new SiteGenerator();
    });
}
