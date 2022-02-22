class ServiceContainer {
    static services = new Map;

    static bind(key, callback) {
        this.services.set(key, {callback, singleton: false})
    }

    static singleton(key, callback) {
        this.services.set(key, {callback, singleton: true})
    }

    static get(key) {
        const item = this.services.get(key)

        if (!item) {
            throw new Error('item not in ioc container')
        }

        if (item.singleton && !item.instance) {
            item.instance = item.callback()
        }

        return item.singleton ? item.instance : item.callback()
    }
}
