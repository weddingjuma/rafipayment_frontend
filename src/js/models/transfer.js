import _ from 'lodash'
import moment from 'moment'
import session from '@/session'
import { Model } from '@/plugins/model'
import { ISODate, Currency } from '@/modules/types'

const defaults = {
  name: 'transfer',
  computed: {
    is_cancelable() {
      const today = moment.utc()
      const cancel_expiration = moment.utc(this.cancel_expiration)
      return today < cancel_expiration
    },
    unit_label() {
      let number = _.get(this.unit, 'number')
      if (/^[\d]/.test(number)) number = '#' + number;
      return number
    },
    address() {
      return `${_.get(this.property, 'address')}, ${this.unit_label}`
    }
  },
  methods: {
    cancel() {
      return session.request(`dwolla/transfer/${this.id}/cancel`, {
        method: 'POST'
      })
    }
  }
}

export default class Transfer extends Model {
  static schema() {
    return {
      id: String,
      company: String,
      created: ISODate,
      updated: ISODate,
      status: Object,
      amount: Currency,
      bill: String,
      bill_original: String,
      error_data: Object,
      cancel_expiration: ISODate,
      destination: String,
      destination_customer_id: String,
      destination_funding_source: String,
      dwolla_resourceId: String,
      lease: String,
      method: String,
      property: String,
      source: String,
      source_customer_id: String,
      source_funding_source: String,
      removed: Boolean,
      state: String,
      type: String,
      unit: String
    }
  }
  constructor(attributes, options) {
    super(attributes, [defaults, options])
  }
}
