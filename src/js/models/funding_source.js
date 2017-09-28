import _ from 'lodash'
import app from '@/app'
import session from '@/session'
import { Model } from '@/plugins/model'
import { ObjectId, ISODate } from '@/modules/types'

const defaults = {
  name: 'funding_source',
  basePath: 'account/funding_sources',
  computed: {
    is_primary() {
      const primary_id = _.get(session.$user, 'dwolla.primary_funding_source')
      return this.id && this.id === primary_id
    },
    microdeposits() {
      const status = _.get(session.$user.dwolla_account.funding_sources, this.id)
      return _.get(status, 'microdeposits')
    },
    $status() {
      const status = this.status
      const microdeposits = this.microdeposits
      return status === 'verified' ? status : `microdeposits ${microdeposits}`
    }
  },
  methods: {
    makePrimary() {
      app.$store.dispatch('loading_begin')
      const request = session.request(this.basePath, {
        method: 'PUT',
        body: {
          id: this.id
        }
      })
      request.catch(() => {})
      .then(() => {
        app.$store.dispatch('loading_end')
      })
      return request
    }
  }
}

export default class FundingSource extends Model {
  static schema() {
    return {
      id: {
        type: ObjectId
      },
      links: {
        type: Array
      },
      name: {
        type: String
      },
      type: {
        type: String
      },
      status: {
        type: String
      },
      bankName: {
        type: String
      },
      channels: {
        type: Array
      },
      created: {
        type: ISODate
      },
      removed: {
        type: Boolean
      },
      amount1: {
        type: Object
      },
      amount2: {
        type: Object
      }
    }
  }
  constructor(attributes, options) {
    super(attributes, [defaults, options])
  }
}
