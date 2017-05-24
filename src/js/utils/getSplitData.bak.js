import _ from 'lodash'
import session from '@/session'

const getSplitData = (splitInput, _lease = { split: {} }) => {
  // console.log(splitInput, lease);
  let lease = _.merge({}, _lease)
  const my_id = session.$user.id
  const split = lease.split || {}

  lease.tenants = lease.tenants.map((tenant) => {
    if (typeof split[tenant._id] !== 'undefined') tenant.split = split[tenant._id]
    return tenant
  })

  // get tenants who have split set up
  let existing_splits = lease.tenants.filter((tenant) => {
    if (typeof tenant.split !== 'undefined') {
      if (typeof splitInput !== 'undefined') {
        return tenant._id !== my_id
      } else {
        return true
      }
    }
  }).map((tenant) => {
    return {
      id: tenant._id,
      split: tenant.split
    }
  })

  console.log({existing_splits});

// TODO: add other recurring charges to this?

  // get number of tenants without split
  const missing_splits = lease.tenants.length - existing_splits.length
  console.log({missing_splits});
  // console.log('missing: ' + missing_splits)
  // tally up how much rent is account for
  let rent_covered = existing_splits.map((tenant) => {
    return tenant.split
  }).reduce(function(a, b) {
    return a + b
  }, 0)

  let suggested_split

  const calculated_suggestion = missing_splits ? ((lease.rent - rent_covered) / missing_splits) : 0
  // if argument for split was passed, include that for current user
  if (splitInput) {
    suggested_split = parseFloat(splitInput)
  } else {
    suggested_split = calculated_suggestion
  }

  // not sure if i really need to check for this
  // const is_user_set = lease.split && lease.split.hasOwnProperty(my_id)

  // if user split is not set, add suggestion
  existing_splits.push({
    id: my_id,
    split: suggested_split
  })
  // console.log({existing_splits});

  // how much rent is unaccounted for
  let missing_rent = lease.rent - rent_covered
  if (missing_rent < 0) missing_rent = 0

  // tally splits up with new user suggested split
  const new_total = existing_splits.map((tenant) => {
    return tenant.split
  }).reduce((a, b) => {
    return a + b
  }, 0)

  // using the new suggested split, what is left?
  var remaining = lease.rent - new_total

  // check if this exceeds rent
  if (remaining < 0) {
    console.log('split exceeded max should be', missing_rent);
    existing_splits = existing_splits.map((tenant) => {
      if (tenant.id === my_id) tenant.split = missing_rent
      return tenant
    })
    remaining = 0
    // return false
  }

  // console.log('new total: ' + new_total)
  // console.log('suggested: ' + suggested_split + ' each')

  if (missing_rent) {
    existing_splits.push({
      id: 'remaining',
      split: remaining
    })
  }

  const output = {}

  existing_splits.map((tenant) => {
    output[tenant.id] = tenant.split
  })

  return output
}

export default getSplitData
