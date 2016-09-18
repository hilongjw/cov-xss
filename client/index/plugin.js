exports.install = (Vue, store) => {
    Vue.prototype.$Notify = (type, title, content, delay = 3000) => {
        store.dispatch('addNotification', {
            item: {
                title: title,
                type: type,
                content: content,
                delay: delay
            }
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