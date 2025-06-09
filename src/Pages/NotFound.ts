import Page from './Page'

export default class NotFound extends Page {
    public constructor() {
        super()

        this.html = `     
            <h1>404</h1>
            <h1>Page not found</h1>
        `
    }
}
