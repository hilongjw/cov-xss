import Vue from 'vue'

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

const Queue = []

const _ = {
    on (el, type, func) {
        el.addEventListener(type, func, false)
    },
    off (el, type, func) {
        el.removeEventListener(type, func)
    }
}

const scrollHandler = throttle(() => {
    checkSticky()
}, 16)

const checkSticky = () => {
    let scrollY = window.scrollY
    Queue.forEach((item) => {
        if (scrollY >= item.origin) {
            item.el.classList.add('sticky')
        } else {
            item.el.classList.remove('sticky')
        }
    })
}

const ElementWillUnmount = (el) => {
    Queue.forEach(item => {
        if (item.el === el) {
            Queue.$remove(item)
        }
    })
    if (!Queue.length) {
        onListen(window, false)
    }
}


const onListen = (el, start) => {
    if (start) {
        _.on(el, 'scroll', scrollHandler)
    } else {
        _.off(el, 'scroll', scrollHandler)
    }
}

onListen(window, true)

const newSticky = (el, binding, vnode) => {
    Vue.nextTick(() => {
        Queue.push({
            el: el,
            set: false,
            origin: el.offsetTop,
            top: binding.value
        })
    })
}

const Sticky = (Vue) => {
    Vue.directive('sticky', {
        bind: newSticky,
        unbind: ElementWillUnmount
    })
}

exports.install = Sticky