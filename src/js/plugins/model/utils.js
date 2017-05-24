import _ from 'lodash'

export function isDef (v) {
  if (v === undefined) return false
  return !_.some(...v, _.isEmpty)
}
