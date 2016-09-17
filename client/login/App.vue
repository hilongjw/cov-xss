<style>
html, body {
    min-height: 100%;
    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
}
* {
    padding: 0;
    margin: 0;
}
body {
    height: 100vh;
    overflow: hidden;
}
#app {
    min-height: 100%;
    background: linear-gradient(30deg, #53db9d, #46b9ae);
}
.in-out-translate-fade-enter-active, .in-out-translate-fade-leave-active {
  transition: all .5s;
}
.in-out-translate-fade-enter, .in-out-translate-fade-leave-active {
  opacity: 0;
}
.in-out-translate-fade-enter {
  transform: translate3d(100%, 0, 0);
}
.in-out-translate-fade-leave-active {
  transform: translate3d(-100%, 0, 0);
}
@media all and (max-width: 768px) {
    body #app {
        width: 100%;
        height: 100%;
        padding: 1rem;
        box-sizing: border-box;
    }
    body .login-box {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        position: relative;
        margin: 0;
        left: 0;
        top: 0;
    }
    body .login-box .sign-up .content,
    body .login-box .content {
        position: initial;
        padding-top: 2rem;
    }
    body .info-notify {
        width: inherit;
        top: .5rem;
        left: 50%;
        transform: translateX(-50%);
    }
    body .footer {
        position: relative;
        padding: 0;
    }
}
</style>
<template>
    <div id="app">
        <transition name="in-out-translate-fade" mode="out-in">
            <sign-in v-if="state.signIn" @toggle="toggle"></sign-in>
            <sign-up v-else @toggle="toggle"></sign-up>
        </transition>
    </div>
</template>
<script>
import background from './components/background.vue'
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'

export default {
    data() {
        return {
            state: {
                signIn: true
            }
        }
    },
    components: {
        background,
        SignUp,
        SignIn
    },
    methods: {
        toggle () {
            this.state.signIn = !this.state.signIn
        }
    }
}
</script>
