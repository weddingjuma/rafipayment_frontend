import Vue from 'vue'
import _ from 'lodash'
import { ISODate } from '@/modules/types'
import * as utils from '@/utils/index'

import { request } from './utils'

const getDiff = (oldData, newData) => {
  const keys = getChangedKeys(oldData, newData)
  let output = {}
  for (let index in keys) {
    const key = keys[index]
    output[key] = newData[key]
  }
  return output
}

const getChangedKeys = (oldData, newData) => {
  const updated = _.merge({}, oldData, newData)
  const output = _.reduce(oldData, function(result, value, key) {
    return _.isEqual(value, updated[key]) ? result : result.concat(key);
  }, []);
  return output
}

export default class Model {
  static schema() {
    return {
      id: String,
      created: ISODate,
      updated: ISODate
    }
  }
  constructor(attributes = {}, options = {}) {
    const schema = this.constructor.schema()
    const default_attributes = utils.getDefaultsFromSchema(schema)

    // make sure options is an array and then merge items
    let _options = !(options instanceof Array) ? [ options ] : options
    _options = _.reduce(_options, (sum, n) => {
      return _.merge({}, sum, n)
    })

    const default_options = {
      name: 'model',
      created() {
        this.set(attributes)
      },
      computed: {
        basePath() {
          const basePath = this.$options.basePath
          return basePath || this.$options.name + 's'
        },
        urlRoot() {
          return `${this.basePath}/${this.id}`;
        },
        isNew() {
          return this.id === undefined
        },
        url() {
          let url
          if (_options.url) {
            url = _options.url
          } else {
            url = this.isNew ? this.basePath : this.urlRoot
          }
          return url
        }
      },
      data() {
        return default_attributes()
      },
      methods: {
        fetch() {
          const req = request(this.urlRoot)
          req.then((response) => {
            this.set(response)
          })
          return req
        },
        destroy() {
          return request(this.urlRoot, {
            method: 'DELETE'
          })
        },
        save(_body, options) {
          const _options = {
            path: ''
          }
          _.merge(_options, options)
          const changed = getDiff(this.$data, _body)
          if (_.isEmpty(changed)) return Promise.resolve() // maybe return changed: false
          const body = utils.decodeWithSchema(changed, schema)
          const method = this.isNew ? 'POST' : 'PUT'
          const path = _options.path ? '/' + _options.path : ''
          return request(this.url + path, {
            method,
            body
          })
        },
        set(data) {
          // NOTE: Vue reserves properties that begin with an underscore
          // so it is necessary to remove the underscore before setting
          for (let key in data) {
            const _key = key.charAt(0) === '_' ? key.substr(1) : key
            this[_key] = data[key]
          }
        },
        reset(defaults) {
          utils.resetState(this.$data, default_attributes())
        },
        toJSON() {
          return utils.modelToJSON(this)
        },
        decode() {
          return utils.decodeWithSchema(this.$data, schema)
        },
        schema() {
          return schema
        }
      }
    }

    const model_options = _.merge({}, default_options, _options)

    return new Vue(model_options)
  }
}
