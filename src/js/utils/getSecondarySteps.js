import _ from 'lodash'

export default (user) => {
  let steps = []

  const is_tenant = ['tenant'].includes(user.role)

  if (is_tenant) {
    user.leases.forEach(function(lease) {
      const split = _.get(lease.split, user.id)

      if (split === undefined) {
        // console.log('split missing', lease);
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

    return steps.map(function(step, index) {
      step.index = index
      return step
    })
  }
}
