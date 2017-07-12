import _ from 'lodash'
import moment from 'moment'
import { parseCurrency, prettyCurrency } from '@/utils'

export class Type {
  constructor(value, key) {
    this.value = undefined
    if (key) this.key = key
    const val = this.getValue(value)
    if (val) this.set(val)
    return this
  }
  set(value) {
    this.in(value)
    return this
  }
  valueOf() {
    return this.out()
  }
  getValue(value) {
    return typeof value === 'string'
      ? value
      : typeof value === 'object'
        ? _.get(value, this.key)
        : undefined
  }
  in(value) {
    this.value = value
    return this
  }
  out() {
    return this.value
  }
  encode() {
    const output = {}
    output[this.key] = this.valueOf()
    return output
  }
}

export class ObjectId extends Type {
  constructor(value) {
    super(value, '$id')
    return this
  }
}

export class ISODate extends Type {
  constructor(value) {
    super(value, '$date')
    return this
  }
  in(value) {
    const parsed = moment.utc(value)
    if (parsed.isValid()) {
      this.value = value
    } else {
      throw new TypeError('invalid date')
    }
  }
  out() {
    return this.value
      ? moment.utc(this.value).toISOString()
      : undefined
  }
}

export class Currency extends Type {
  constructor(value) {
    super(value)
    return this
  }
  in(value) {
    this.value = parseCurrency(value, Number)
    return this
  }
  out() {
    return this.value
  }
  pretty() {
    return prettyCurrency(this.value)
  }
}
