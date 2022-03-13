export class Cache {
    #cache = {}

    remember(key, callback) {
        return this.#cache[key] ?? (this.#cache[key] = callback())
    }
}
