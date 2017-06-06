import _ from 'lodash'
import Model from '@/modules/model'

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
      id: String,
      company: String,
      first_name: String,
      last_name: String,
      email: String,
      role: String,
      avatar_color: String,
      dwolla: Object,
      notifications: Object,
      status: Object,
      updated: String,
      created: String,
      leases: Array,
      terms_accepted: Object
    }
  }
  constructor(attributes, options) {
    super(attributes, [defaults, options])
  }
}
