import {container, singleton} from 'tsyringe';
import Storage from './Services/Storage';

@singleton()
class Template {
    private file: Storage;
    private templates: Map<string, string> = new Map();

    public constructor() {
        this.file = container.resolve(Storage);
    }

    public get(name: string): string {
        if (!this.templates.has(name)) {
            this.templates.set(name, this.file.getContent(name));
        }

        return this.templates.get(name) ?? '';
    }
}
