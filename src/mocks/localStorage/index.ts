export class LocalStorageMock {
  private store: { [key: string]: unknown }

  constructor(initialData = {}) {
    this.store = initialData
  }

  clear() {
    this.store = {}
  }

  getItem(key: string) {
    return this.store[key] || null
  }

  setItem(key: string, value: unknown) {
    this.store[key] = value + ''
  }

  removeItem(key: string) {
    delete this.store[key]
  }
}
