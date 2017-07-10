import moment from 'moment'
import { parseCurrency, prettyCurrency } from '@/utils'

export class ISODate {
  constructor(value) {
    // console.log({value});
    if (value) this.set(value)
    return this
  }
  set(value) {
    const parsed = moment.utc(value)
    this.value = parsed.isValid()
      ? value
      : undefined
  }
  valueOf() {
    return this.value
      ? moment.utc(this.value).toISOString()
      : undefined
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
