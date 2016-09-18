const throttle = function (action, delay) {
    let timeout = null
    let lastRun = 0
    return function () {
        if (timeout) {
            return
        }
        let elapsed = (+new Date()) - lastRun
        let context = this
        let args = arguments
        let runCallback = function () {
                lastRun = +new Date()
                timeout = false
                action.apply(context, args)
            }
            
        if (elapsed >= delay) {
            runCallback()
        }
        else {
            timeout = setTimeout(runCallback, delay)
        }
    }
}

const _ = {
    on (el, type, func) {
        el.addEventListener(type, func)
    },
    off (el, type, func) {
        el.removeEventListener(type, func)
    }
}

const scrollHandler = (binding) => throttle(() => {
    if (document.body.scrollHeight - (document.body.scrollTop + window.innerHeight) < 50) {
       binding.value.method() 
    }
}, 300)

const loadMore = (Vue) => {
    Vue.directive('load-more', {
        bind (el, binding, vnode) {
            window.addEventListener('scroll', scrollHandler.apply(null, [binding]))
        },
        unbind () {
            window.removeEventListener('scroll', scrollHandler) 
        }
    })
}

exports.install = loadMore