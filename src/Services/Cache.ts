import {singleton} from 'tsyringe';

@singleton()
export default class Cache {
    private store: Map<string, string> = new Map<string, string>();

    public get(key: string): any {
        return this.store.get(key)
    }

    public set(key: string, value: any): void {
        this.store.set(key, value)
    }

    public remember(key: string, callback: () => string): any {
        if (!this.store.has(key)) {
            this.store.set(key, callback());
        }

        return this.store.get(key);
    }
}
