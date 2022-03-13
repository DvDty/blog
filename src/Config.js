export class Config {
    constructor(config) {
        this.config = new Map(Object.entries(JSON.parse(config)))
    }

    get (key, defaultValue = null) {
        return this.config.get(key) ?? defaultValue
    }
}
