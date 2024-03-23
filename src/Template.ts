import {container, singleton} from 'tsyringe';
import File from './Services/File';

@singleton()
class Template {
    private file: File;
    private templates: Map<string, string> = new Map();

    public constructor() {
        this.file = container.resolve(File);
    }

    public get(name: string): string {
        if (!this.templates.has(name)) {
            this.templates.set(name, this.file.getContent(name));
        }

        return this.templates.get(name) ?? '';
    }
}
