import {injectable} from 'tsyringe';

@injectable()
export class Cache {
    private store: Map<string, string> = new Map<string, string>();

    public remember(key: string, callback: () => string): string {
        if (!this.store.has(key)) {
            this.store.set(key, callback());
        }

        return this.store.get(key) || '';
    }
}
