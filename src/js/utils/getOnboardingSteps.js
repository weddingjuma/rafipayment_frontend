import _ from 'lodash'

export default (user) => {
  let steps = []

  const is_tenant = ['tenant'].includes(user.role)
  const is_admin = ['admin', 'manager'].includes(user.role)

  const dwolla_account = is_admin ? user.company.dwolla : user.dwolla
  const is_first_admin = is_admin && !dwolla_account

  // step 1 - Check for Lease - Tenants
  if (is_tenant && !user.leases.length) {
    steps.push({
      name: 'no-lease',
      value: false
    })
    return steps
  }

  if (is_tenant && _.isEmpty(user.terms_accepted)) {
    steps.push({
      name: 'terms',
      value: false
    })
  }

  // step 2 - Dwolla account - Admins & Tenants
  if (is_tenant || is_admin) {
    if (is_first_admin && !_.get(dwolla_account, 'primary_funding_source')) {
      steps.push({
        name: 'dwolla-account',
        value: dwolla_account
      })
    }

    // step 3 - Dwolla IAV - Admins & Tenants
    if (!user.status.active && !_.get(dwolla_account, 'primary_funding_source')) {
      steps.push({
        name: 'dwolla-bank',
        value: false,
        dwolla_account: dwolla_account
      })
    }
  }

  // step 4 - Split/autopay for all leases - Tenants
  if (is_tenant) {
    user.leases.forEach(function(lease) {
      const split = _.get(lease.split, user.id)

      if (!split) {
        steps.push({
          name: 'show-lease',
          value: split,
          lease: lease
        })

        steps.push({
          name: 'split',
          value: split,
          lease: lease
        })
      }
    })
  }

  // step 5 - Password - All users
  if (user.status.password === false) {
    steps.push({
      name: 'set-password',
      value: user.status.active
    })
  }

  return steps.map(function(step, index) {
    step.index = index
    return step
  })
}
