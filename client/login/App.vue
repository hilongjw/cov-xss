<style>
html, body {
    min-height: 100%;
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
</style>
<template>
    <div id="app">
        <background></background>
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
