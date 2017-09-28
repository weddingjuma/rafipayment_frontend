import _ from 'lodash'
import moment from 'moment'
import session from '@/session'
import { Model } from '@/plugins/model'
import { ObjectId, ISODate, Currency } from '@/modules/types'

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
      id: {
        type: ObjectId
      },
      company: {
        type: String
      },
      created: {
        type: ISODate
      },
      updated: {
        type: ISODate
      },
      status: {
        type: Object
      },
      amount: {
        type: Currency
      },
      bill: {
        type: String
      },
      bill_original: {
        type: String
      },
      error_data: {
        type: Object
      },
      cancel_expiration: {
        type: ISODate
      },
      destination: {
        type: String
      },
      destination_customer_id: {
        type: String
      },
      destination_funding_source: {
        type: String
      },
      dwolla_resourceId: {
        type: String
      },
      lease: {
        type: String
      },
      method: {
        type: String
      },
      property: {
        type: String
      },
      source: {
        type: String
      },
      source_customer_id: {
        type: String
      },
      source_funding_source: {
        type: String
      },
      removed: {
        type: Boolean
      },
      state: {
        type: String
      },
      type: {
        type: String
      },
      unit: {
        type: String
      }
    }
  }
  constructor(attributes, options) {
    super(attributes, [defaults, options])
  }
}
