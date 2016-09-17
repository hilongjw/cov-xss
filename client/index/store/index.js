import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    Notifications: []
}

const mutations = {
    ADD_NOTIFICATION (state, { item }) {
        item['__key'] = (new Date()).getTime()
        state.Notifications.push(item)
    },
    REMOVE_NOTIFICATION (state, { item }) {
        state.Notifications.$remove(item)
    }
}

const actions = {
    addNotification: ({ commit }, payload) => {
        commit('ADD_NOTIFICATION', payload)
        setTimeout(() => {
            commit('REMOVE_NOTIFICATION', payload)
        }, payload.item.delay)
    },
    removeNotification: ({ commit }, payload) => commit('REMOVE_NOTIFICATION', payload)
}

const getters = {
  Notifications: state => state.Notifications
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})