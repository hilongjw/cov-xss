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
    },
    Projects: [],
    Modules: [],
    PublicModules: [],
    DataLog: {
        state: {
            noMore: false,
            loading: false
        },
        query: {
            alias: ''
        },
        list: []
    }
}

const mutations = {
    // notification
    ADD_NOTIFICATION (state, item) {
        console.log(item)
        item['__key'] = (new Date()).getTime()
        state.Notifications.push(item)
    },
    REMOVE_NOTIFICATION (state, item) {
        state.Notifications.$remove(item)
    },

    // progress bar
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
    },

    // project
    SET_PROJECT_LIST (state, list) {
        state.Projects = list
    },
    ADD_PROJECT_ITEM (state, item) {
        state.Projects.push(item)
    },
    REMOVE_PROJECT_ITEM (state, item) {
        state.Projects.$remove(item)
    },

    // Modules
    SET_MODULE_LIST (state, list) {
        state.Modules = list
    },
    ADD_MODULE_ITEM (state, list) {
        state.Modules.push(item)
    },
    REMOVE_MODULE_ITEM (state, item) {
        state.Modules.$remove(item)
    },

    // DataLogs
    SET_DATA_LOG (state, list) {
        state.DataLogs = list
    },
    ADD_DATA_LOG (state, item) {
        state.DataLogs.push(list)
    },
    ADD_DATA_LOG_LIST (state, list) {
        state.DataLogs = state.DataLogs.concat(list)
    },
    REMOVE_DATA_LOG (state, item) {
        state.DataLogs.$remove(list)
    }
}

const actions = {
    // notification
    addNotification: ({ commit }, item) => {
        commit('ADD_NOTIFICATION', item)
        if (item.delay !== -1) {
            setTimeout(() => {
                commit('REMOVE_NOTIFICATION', item)
            }, item.delay)
        }
    },
    removeNotification: ({ commit }, item) => {
        commit('REMOVE_NOTIFICATION', item)
        if (item.callback) item.callback()
    },

    // progress bar
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
    },

    // Project
    loadProjectList ({ commit, dispatch }) {
        dispatch('startProgressBar', {})
        const query = new AV.Query('Project')
        query.equalTo('creator', AV.User.current())
        query.include('creator')
        query.include('Module')
        query.descending('updatedAt')
        query.find()
            .then(list => {
                commit('SET_PROJECT_LIST', list)
                dispatch('endProgressBar', {
                    success: true
                })
            })
            .catch(err => {
                dispatch('endProgressBar', {
                    success: false
                })
            })
    },

    // Modules
    loadModuleList ({ commit, dispatch }) {
        dispatch('startProgressBar', {})
        const query = new AV.Query('Module')
        query.equalTo('creator', AV.User.current())
        query.include('creator')
        query.descending('updatedAt')
        query.find()
            .then(list => {
                commit('SET_MODULE_LIST', list)
                dispatch('endProgressBar', {
                    success: true
                })
            })
            .catch(err => {
                dispatch('endProgressBar', {
                    success: false
                })
            })
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