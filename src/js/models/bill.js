import _ from 'lodash'
import moment from 'moment'
import { Model } from '@/plugins/model'
import session from '@/session'

import { ISODate, Currency } from '@/modules/types'

const defaults = {
  name: 'bill',
  computed: {
    bill_status() {
      const due_date = moment.utc(this.due_date).startOf('day')
      const today = moment.utc().startOf('day')
      const balance = parseFloat(this.display_balance)
      let status
      if (balance <= 0) {
        status = 'paid'
      } else if (due_date < today) {
        status = 'overdue'
      } else if (due_date > today) {
        status = 'future'
      } else if (due_date.isSame(today)) {
        status = 'due'
      }
      return status
    },
    label() {
      let label
      switch (this.type) {
        case 'monthly':
          label = `rent - ${moment(this.due_date).format('MMMM')}`
          break
        case 'anytime':
          label = 'one-time bill'
      }
      return label
    },
    is_autopay() {
      const lease = this.lease
      let is_autopay = false
      _.each(lease.autopay, function(value, key) {
        if (value && key === session.$user.id) is_autopay = true
      })
      return is_autopay
    },
    days_from_due() {
      const due_date = moment.utc(this.due_date).startOf('day')
      const today = moment.utc().startOf('day')
      const days = Math.abs(moment.duration(due_date.diff(today)).asDays())
      return days
    },
    display_date() {
      const due_date = moment.utc(this.due_date).startOf('day')
      const updated = moment.utc(this.updated).startOf('day')

      return this.bill_status === 'paid'
        ? updated
        : due_date
    },
    message() {
      const days = this.days_from_due
      let message
      switch (this.bill_status) {
        case 'paid':
          message = `Paid in full`
          break
        case 'overdue':
          message = `Overdue ${days} days`
          break
        case 'future':
          const autopay = this.has_autopay;
          message = autopay ? `Autopay in ${days} days` : `Due in ${days} days`
          break
        case 'due':
          message = `Due today`
          break
      }
      return message
    },
    target() {
      const type = this.type
      if (!type) return
      let target, property, unit, tenants
      if (type === 'monthly') {
        property = this.property
        unit = this.unit
        target = `${property.address} #${unit.number}`
      } else if (type === 'anytime') {
        tenants = this.tenants
        if (tenants.length === 1) {
          target = session.$user.full_name
        } else {
          target = `${tenants.length} Roommates`
        }
      }
      return target;
    },
    better_display_balance() {
      const valid_transfers = this.transfers.filter((transfer) => {
        return !['error', 'cancelled', 'failed'].includes(transfer.status.state)
      })
      const amount_paid = valid_transfers.reduce((a, b) => {
        return a + b.amount
      }, 0)
      return this.total - amount_paid
    },
    transfers_by_user() {
      let output = {};
      this.tenants.map((tenant) => {
        const id = tenant._id;
        let transfers = [];
        if (this.transfers) {
          this.transfers.map((transfer) => {
            if (transfer.source === id && !['failed', 'error', 'cancelled'].includes(transfer.status.state)) {
              transfers.push(transfer)
            }
          })
        }
        output[id] = transfers
      })
      return output;
    },
    totals_by_user() {
      let output = {}
      for (let id in this.transfers_by_user) {
        output[id] = this.transfers_by_user[id].reduce((a, b) => {
          return a + b.amount
        }, 0)
      }
      return output
    }
  },
  methods: {
    processType(type) {
      let output
      if (type === 'rent') {
        output = `${type} - ${moment(this.due_date).format('MMMM')}`
      } else if (type === 'previous_bill_overflow') {
        output = 'from_previous_bill'
      } else {
        output = type
      }
      return output
    }
  }
}

export default class Bill extends Model {
  static schema() {
    return {
      id: String,
      company: String,
      due_date: ISODate,
      type: String,
      amount: Currency,
      total: Currency,
      balance: Currency,
      // display_balance: Currency,
      charges: Object,
      identifier: String,
      lease: Object,
      property: Object,
      unit: Object,
      status: Object,
      tenants: Array,
      transfers: Array,
      created: ISODate,
      updated: ISODate
    }
  }
  constructor(attributes, options) {
    super(attributes, [defaults, options])
  }
}
