import moment from 'moment'
import { parseCurrency, prettyCurrency } from '@/utils'

export class ISODate {
  constructor(value) {
    this.value = value
  }
  valueOf() {
    return moment.utc(this.value).toISOString()
  }
}

export class Currency {
  constructor(value) {
    this.set(value)
  }
  set(value) {
    this.value = parseCurrency(value, Number)
    return this
  }
  get() {
    return prettyCurrency(this.valueOf())
  }
  valueOf() {
    return this.value
  }
}
