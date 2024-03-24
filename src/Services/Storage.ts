import {injectable} from 'tsyringe';
import fs from 'fs';

@injectable()
export default class Storage {
    public getContent(path: string): string {
        return fs.readFileSync(path, {encoding: 'utf8'});
    }

    public writeContent(path: string, content: string): void {
        fs.writeFileSync(path, content);
    }
}
