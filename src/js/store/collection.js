import Vuex from 'vuex'
import _ from 'lodash'
import { ISODate } from '@/modules/types'

import app from '@/app'
import session from '@/session'
import BaseModel from '@/modules/model'

import { sort, sortByDate } from '../utils'

export default class Collection {
  constructor({
    model = BaseModel,
    id_attribute = 'id',
    basePath = '',
    createPath = '',
    reverse = false,
    sortBy = false
  }) {
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
          // console.log(_process(collection));
          state.collection = _process(collection)
          // console.log(state);
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
          app.$store.dispatch('loading_begin')
          const request = session.request(`${_basePath()}`)
          request.then(response => {
            commit('FETCH', response)
            app.$store.dispatch('loading_end')
          })
          return request
        },
        add({ commit }, model) {
          app.$store.dispatch('loading_begin')
          const request = session.request(`${_basePath()}/${createPath}`, {
            method: 'POST',
            body: model
          })
          request.then(response => {
            commit('ADD', response)
            app.$store.dispatch('loading_end')
          })
          return request
        },
        delete({ commit }, id) {
          app.$store.dispatch('loading_begin')
          const request = session.request(`${_basePath()}/${id}`, {
            method: 'DELETE'
          })
          request.then(response => {
            commit('DELETE', id)
            app.$store.dispatch('loading_end')
          })
          return request
        }
      }
    })
  }
}
