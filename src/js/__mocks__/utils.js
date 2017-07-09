import data from './collection_data'

export default class utils {
  constructor() {
    return this
  }
  Request() {
    const promise = new Promise((resolve, reject) => {
      resolve(data())
    })
    return promise
  }
  Deferred() {
    this.resolve = null
    this.reject = null
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
    Object.freeze(this)
  }
}
