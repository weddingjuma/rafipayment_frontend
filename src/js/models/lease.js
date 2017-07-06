import _ from 'lodash';
import moment from 'moment'
import session from '@/session';
import { Model } from '@/plugins/model'
import { ISODate, Currency } from '@/modules/types'
import { parseCurrency, statesHelper, unitsHelper } from '@/utils'

const defaults = {
  name: 'lease',
  beforeMount() {
    this.split_amount = undefined
  },
  computed: {
    address() {
      const property = this.property
      if (!this.start_date) return
      const unit = this.unit
      return `${property.address} ${unitsHelper(unit.number)}`
    },
    full_address() {
      const property = this.property
      if (!this.start_date) return
      return `${this.address}, ${property.city} ${statesHelper(property.state)}`
    },
    term() {
      if (!this.start_date) return
      const { start, end } = this.getTerm('l')
      return `${start} – ${end || 'N/A'}`
    },
    length() {
      if (!this.start_date) return
      const { start, end } = this.getTerm()
      if (!end) return 'N/A'
      const duration = moment.duration(end.diff(start))

      // round to the nearest .5 and remove the decimal if zero
      const months = parseFloat((Math.round(duration.asMonths() * 2) / 2).toFixed(1))
      const days = duration.asDays()

      const auto = months > 1 ? months + ' Months' : days + ' Days'
      return { months, days, auto }
    },
    tenants_sorted() {
      return this.tenants.sort((a, b) => {
        return _.get(this.split, a._id) !== undefined ? -1 : 1
      }).sort((a, b) => {
        return a._id === session.$user.id ? -1 : 1
      })
    },
    splits() {
      let split = _.merge({}, this.split || {})
      if (this.split_amount !== false) {
        split[session.$user.id] = this.split_amount
      }
      return split
    },
    splits_by_tenant_id() {
      let split = {}
      this.tenants.map((tenant) => {
        split[tenant._id] = _.get(this.splits, tenant._id)
      })
      return split
    },
    splits_value_array() {
      return Object.values(this.splits_by_tenant_id)
    },
    total_rent_covered() {
      return this.splits_value_array.reduce((sum, value) => {
        return value === undefined
          ? sum
          : sum + value
      }, 0)
    },
    missing_splits() {
      return this.splits_value_array.reduce((sum, value) => {
        return value === undefined
          ? ++sum
          : sum
      }, 0)
    },
    rent_remaining() {
      return this.rent - this.total_rent_covered
    },
    totalSplit() {
      return Object.keys(this.$lease.split).reduce((acc, item) => {
        return acc + this.$lease.split[item]
      }, 0)
    },
    rentCoverage() {
      return Math.floor(this.totalSplit / this.$lease.rent * 100)
    }
  },
  methods: {
    getTerm(format = 'MM/DD/YYYY') {
      if (!this.start_date) return
      const utc = moment.utc
      const start = format
        ? utc(this.start_date).format(format)
        : utc(this.start_date)
      let end
      if (this.end_date) {
        end = format
          ? utc(this.end_date).format(format)
          : utc(this.end_date)
      } else {
        end = false
      }
      return { start, end }
    },
    validateSplit(input) {
      this.split_amount = parseCurrency(input, Number)
      // if input exceeds rent remaining, use max possible amount
      let output
      if (this.rent_remaining < 0) {
        this.split_amount = null
        output = {
          validated: false,
          amount: this.rent_remaining
        }
      } else {
        output = {
          validated: true,
          amount: this.split_amount
        }
      }
      this.split_amount = false
      return output
    }
  }
}

export default class Lease extends Model {
  static schema() {
    return {
      id: String,
      company: String,
      updated: ISODate,
      created: ISODate,
      autopay: Object,
      bill_due_day: Number,
      bill_generation_day: Number,
      bill_overdue_day: Number,
      start_date: ISODate,
      end_date: ISODate,
      rent: Currency,
      charges: {
        type: Object,
        scheduled: {
          type: Array,
          amount: Currency,
          date: ISODate
        },
        recurring: {
          type: Array,
          amount: Currency
        }
      },
      split: Object,
      first_bill_generation_date: ISODate,
      last_bill_generation_date: ISODate,
      property: Object,
      status: Object,
      tenants: Array,
      type: String,
      unit: Object,
      split_amount: {
        type: Boolean,
        default: false
      }
    }
  }
  constructor(attributes, options) {
    super(attributes, [defaults, options])
  }
}
