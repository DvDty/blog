import {ServiceContainer} from './src/ServiceContainer.js'

ServiceContainer.singleton('config', () => {test: 123})

console.log(ServiceContainer.get('config').test)
