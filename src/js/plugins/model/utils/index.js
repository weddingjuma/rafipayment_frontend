import _ from 'lodash'
import Request from '@/utils/request'

export { Request }

export function isDef (v) {
  if (v === undefined) return false
  return !_.some(...v, _.isEmpty)
}

// turn schema definitions into json

export const getDefaultsFromSchema = (schema) => {
  let default_attrs = {}
  for (let key in schema) {
    let constructor, value
    const attr = schema[key]
    if (typeof attr === 'function') {
      constructor = attr
      default_attrs[key] = new constructor().valueOf()
    } else if (typeof attr === 'object') {
      if ('type' in attr) {
        constructor = attr.type
        value = attr.default
        default_attrs[key] = [undefined, null].includes(value)
          ? value
          : new constructor(value).valueOf()
      } else {
        default_attrs[key] = getDefaultsFromSchema(attr)
      }
    }
  }
  const immutable = () => {
    return _.merge({}, default_attrs)
  }
  return immutable
}

// convert model data to expected schema format

export const decodeWithSchema = (data, schema) => {
  let decoded_data = {}
  if (data instanceof Array) {
    decoded_data = data.map(item => {
      for (let key in item) {
        if (!['type', 'default'].includes(key)) {
          item[key] = decodeWithSchema(item[key], schema[key])
        }
      }
      return item
    })
  } else if (data instanceof Object) {
    for (let key in data) {
      if (key in schema) {
        // console.log({data});
        decoded_data[key] = processSchemaData(data[key], schema[key])
        for (let attr in schema[key]) {
          if (!['type', 'default'].includes(attr)) {
            decoded_data[key][attr] = decodeWithSchema(_.get(data[key], attr), schema[key][attr])
          }
        }
      }
    }
  } else {
    decoded_data = processSchemaData(data, schema)
  }
  return decoded_data
}

export const processSchemaData = (data, schema) => {
  let decoded_data
  if (typeof schema === 'function') {
    const constructor = schema
    // console.log({data});
    decoded_data = new constructor(data).valueOf()
  } else if (schema instanceof Object) {
    if ('type' in schema) {
      const constructor = schema.type
      decoded_data = new constructor(data).valueOf()
    }
  } else if (schema instanceof Array) {
    console.log('figure out how to handle array literal?', schema);
  }
  return decoded_data
}

// export const encodeWithSchema = (data, Constructor) => {
//   console.log(data, Constructor);
//   return Constructor
//     ? new Constructor(data)
//     : data
// }

// get all data and computed attributes from model

export const modelToJSON = (model) => {
  let computed = {}
  for (let key in model.$options.computed) {
    computed[key] = model[key]
  }
  let output = _.merge({}, model.$data, computed)
  delete output.errors
  delete output.fields
  return output
}

// reset collection or model state

export const resetState = (state, defaults) => {
  Object.keys(defaults).forEach(key => {
    state[key] = defaults[key]
  })
}

// reset all collection or model states

export const resetAllStates = (state, modules) => {
  Object.keys(modules).forEach(key => {
    resetState(state[key], modules[key].defaults())
  })
}
