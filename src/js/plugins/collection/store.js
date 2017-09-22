import _ from 'lodash'
import Vuex from 'vuex'
import { Model } from '@/plugins/model'
import { ISODate } from '@/modules/types'

import store from '@/store'
import Request from '@/utils/request_auth'
import { sort, sortByDate } from './utils'

export default (
  model = Model,
  id_attribute = '_id',
  basePath = '',
  createPath = '',
  reverse = false,
  sortBy = false
) => {
  const _basePath = () => {
    let output
    if (typeof basePath === 'string') {
      output = basePath
    } else if (typeof basePath === 'function') {
      output = basePath()
    }
    return output
  }
  const _process = (collection) => {
    let output = collection
    if (sortBy) {
      const type = model.schema()[sortBy]
      const sortFunction = (type === ISODate) ? sortByDate : sort
      output = collection.sort(sortFunction.bind(null, sortBy))
    }
    if (reverse) {
      output = collection.reverse()
    }
    return output
  }
  return new Vuex.Store({
    state: {
      collection: []
    },
    getters: {
      collection: state => {
        return state.collection
      }
    },
    mutations: {
      RESET(state) {
        state.collection = []
      },
      FETCH(state, collection) {
        state.collection = _process(collection)
      },
      ADD(state, model) {
        if (reverse) {
          state.collection.unshift(model)
        } else {
          state.collection.push(model)
        }
      },
      DELETE(state, id) {
        const i = state.collection.findIndex(model => model[id_attribute] === id)
        state.collection.splice(i, 1)
      },
      UPDATE(state, id, data) {
        const i = state.collection.findIndex(model => model[id_attribute] === id)
        state.collection[i] = _.merge(state.collection[i], data)
        state.collection = _process(state.collection)
      }
    },
    actions: {
      reset({ commit }) {
        commit('RESET')
      },
      fetch({ commit }) {
        store.dispatch('loading_begin')
        const req = new Request(`${_basePath()}`)
        req.then(response => {
          commit('FETCH', response)
          store.dispatch('loading_end')
        })
        return req
      },
      add({ commit }, model) {
        store.dispatch('loading_begin')
        const req = new Request(`${_basePath()}/${createPath}`, {
          method: 'POST',
          body: model
        })
        req.then(response => {
          commit('ADD', response)
          store.dispatch('loading_end')
        })
        return req
      },
      delete({ commit }, id) {
        store.dispatch('loading_begin')
        const req = new Request(`${_basePath()}/${id}`, {
          method: 'DELETE'
        })
        req.then(response => {
          commit('DELETE', id)
          store.dispatch('loading_end')
        })
        return req
      }
    }
  })
}
