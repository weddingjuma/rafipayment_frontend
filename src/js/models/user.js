import _ from 'lodash'
import { Model } from '@/plugins/model'
import { ObjectId, ISODate } from '@/modules/types'

import getOnboardingSteps from '@/utils/getOnboardingSteps'
import getSecondarySteps from '@/utils/getSecondarySteps'

const defaults = {
  name: 'user',
  computed: {
    basePath() {
      const basePath = this.$options.basePath
      return basePath || this.role + 's'
    },
    full_name() {
      return `${this.first_name} ${this.last_name}`
    },
    initials() {
      return `${this.first_name[0]}${this.last_name[0]}`.toUpperCase()
    },
    dwolla_account() {
      let path = ''
      if (['admin', 'manager'].includes(this.role)) {
        path = 'company.'
      }
      path += 'dwolla'
      return _.get(this, path)
    },
    is_active() {
      return !!this.status.active
    },
    onboarding_steps() {
      return getOnboardingSteps(this.$data)
    },
    secondary_steps() {
      return getSecondarySteps(this.$data)
    }
  }
}

export default class User extends Model {
  static schema() {
    return {
      id: {
        type: ObjectId
      },
      updated: {
        type: ISODate
      },
      created: {
        type: ISODate
      },
      company: {
        type: String
      },
      first_name: {
        type: String
      },
      last_name: {
        type: String
      },
      email: {
        type: String
      },
      role: {
        type: String
      },
      password: {
        type: String
      },
      avatar_color: {
        type: String
      },
      dwolla: {
        type: Object
      },
      notifications: {
        type: Object
      },
      status: {
        type: Object
      },
      leases: {
        type: Array
      },
      terms_accepted: {
        type: Object
      }
    }
  }
  constructor(attributes, options) {
    super(attributes, [defaults, options])
  }
}
