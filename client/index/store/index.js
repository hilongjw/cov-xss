import Vue from 'vue'
import Vuex from 'vuex'
import { AV } from '../../../config/config'

Vue.use(Vuex)

const state = {
    User: AV.User.current(),
    Notifications: [],
    ProgressBar: {
        timer: null,
        piece: 0, 
        percent: 0,
        options: {
            canSuccess: true,
            show: false,
            color: 'rgb(143, 255, 199)',
            failedColor: 'red',
            height: '2px'
        }
    }
}

const mutations = {
    ADD_NOTIFICATION (state, { item }) {
        item['__key'] = (new Date()).getTime()
        state.Notifications.push(item)
    },
    REMOVE_NOTIFICATION (state, { item }) {
        state.Notifications.$remove(item)
    },
    SET_PROGRESS_BAR (state, { num }) {
        state.ProgressBar.options.show = true
        state.ProgressBar.options.canSuccess = true
        state.ProgressBar.percent = Math.floor(num)
    },
    HIDE_PROGRESS_BAR (state, success) {
        if (state.ProgressBar.timer) clearTimeout(state.ProgressBar.timer)
        state.ProgressBar.options.canSuccess = success
        state.ProgressBar.percent = 100
        setTimeout(() => {
            state.ProgressBar.options.show = false
        }, 0)
        setTimeout(() => {
            state.ProgressBar.percent = 0
        }, 1000)
    },
    SET_PROGRESS_TIMER (state, { timer }) {
        if (state.ProgressBar.timer) clearTimeout(state.ProgressBar.timer)
        state.ProgressBar.timer = timer
    }
}

const actions = {
    addNotification: ({ commit }, payload) => {
        commit('ADD_NOTIFICATION', payload)
        setTimeout(() => {
            commit('REMOVE_NOTIFICATION', payload)
        }, payload.item.delay)
    },
    removeNotification: ({ commit }, payload) => commit('REMOVE_NOTIFICATION', payload),
    startProgressBar ({ commit, state }, { time }) {
        if (!time) time = 3000
        commit('SET_PROGRESS_BAR', { num: 0 })
        let piece = 10000 / Math.floor(time)
        let cut = 0
        let timer = setInterval(() => {
            cut = cut + piece * Math.random()
            if (cut > 100) {
                commit('HIDE_PROGRESS_BAR')
            } else {
                commit('SET_PROGRESS_BAR', { num: cut })
            }
        }, 200)
        commit('SET_PROGRESS_TIMER', { timer })
    },
    endProgressBar ({ commit }, { success }) {
        commit('HIDE_PROGRESS_BAR', success)
    }
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