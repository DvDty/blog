export class Config {
    private config: Map<string, string>;

    constructor(config: string) {
        this.config = new Map(Object.entries(JSON.parse(config)));
    }

    get(key: string, defaultValue: string = ''): string {
        return this.config.get(key) ?? defaultValue;
    }
}
