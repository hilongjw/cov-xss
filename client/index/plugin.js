exports.install = (Vue, store) => {
    Vue.prototype.$Notify = (type, title, content, delay, callback) => {
        if (delay !== -1) delay = 3000
        store.dispatch('addNotification', {
            title: title,
            type: type,
            content: content,
            delay: delay,
            callback: callback
        })
    }
    Vue.prototype.$Progress = {
        start (time) {
            if (!time) time = 3000
            store.dispatch('startProgressBar', { time })
        },
        finished () {
            store.dispatch('endProgressBar', {
                success: true
            })
        },
        failed () {
            store.dispatch('endProgressBar', {
                success: false
            })
        }
    }
}