import _ from 'lodash'
import app from '@/app'
import session from '@/session'
import Model from '@/modules/model'

const defaults = {
  name: 'funding_source',
  basePath: 'account/funding_sources',
  computed: {
    is_primary() {
      const primary_id = _.get(session.$user, 'dwolla.primary_funding_source')
      return this.id === primary_id
    },
    microdeposits() {
      const status = _.get(session.$user.dwolla_account.funding_sources, this.id)
      return _.get(status, 'microdeposits')
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
      id: String,
      _links: Array,
      name: String,
      type: String,
      status: String,
      bankName: String,
      channels: Array,
      created: String,
      removed: Boolean
    }
  }
  constructor(attributes, options) {
    super(attributes, [defaults, options])
  }
}
