<style src="./assets/_ionicicon.css"></style>
<style>
html, body {
    min-height: 100%;
    font-family: -apple-system,PingFang SC,Hiragino Sans GB,Arial,Microsoft YaHei,Helvetica Neue,sans-serif;
    -webkit-font-smoothing: antialiased;
}
* {
    padding: 0;
    margin: 0;
}
body {
    min-height: 100vh;
    background: #f4f7f9;
}
#app {
    min-height: 100%;
}
header {
    background: #fff;
    height: 4rem;
    box-shadow: 0 0 .5rem #d0d0d0;
    display: flex;
    justify-content: space-between;
}
.logo-box {
    min-width: 10rem;
    text-align: center;
    line-height: 4rem;
    font-size: 1.5rem;
    color: #565656;
}
.nav-menu-btn {
    display: none;
}
.nav-box {
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    width: 100%;
}
.nav-box::-webkit-scrollbar {
    width: 2px;
    height: 2px;
}
.nav-box::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}
.nav-box::-webkit-scrollbar-thumb {
    background-color: #fdc8b7;
}
.nav-box a {
    text-decoration: none;
    line-height: 4rem;
    padding: 0 1rem;
    color: #969696;
    height: 4rem;
    box-sizing: border-box;
    display: inline-block;
}
.nav-box a.router-link-active {
    border-bottom: 2px solid #ff9472;
    color: #565656;
}
.view {
    padding: 1rem;
}
@-webkit-keyframes loading {
  from {
    transform-origin: 50% 50%;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    transform-origin: 50% 50%;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loading {
  from {
    transform-origin: 50% 50%;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    transform-origin: 50% 50%;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.icon-loading {
    display: inline-block;
    animation: loading 1s infinite linear;
}
.slide-left-enter-active {
    transition: transform .3s ease;
    transform: translateX(0)
}
.slide-left-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-left-enter, .slide-left-leave-active {
  transform: translateX(-100%)
}
.slide-left-transition {
  transition: transform .3s ease;
  transform: translateX(0)
}
@media all and (max-width: 768px) {
    #app .logo-box {
        font-size: 1rem;
        min-width: 6rem;
    }
    .view {
        flex-wrap: wrap;
    }
    .view .project-list-card,
    .view .module-card {
        width: 100%;
        height: 100%;
    }
    .view .data-log-view,
    .view .project-view,
    .view .module-edit {
        width: 100%;
        margin: 0;
        margin-top: 1rem;
        padding-bottom: 2rem;
    }
    .view .module-edit-textarea {
            min-height: 20rem;
    }
    .view .data-log-params {
        display: initial;
    }
    .view .screenshot-item {
        width: 100%;
    }
    .nav-box {
        position: fixed;
        width: 15rem;
        flex-wrap: wrap;
        background: #fff;
        z-index: 100;
        justify-content: space-around;
        top: 0;
        left: 0;
        box-shadow: 0 0 1rem #ccc;
        height: 100%;
        display: block;
        padding-top: 4rem;
    }
    .logo-box {
        display: none;
    }
    .nav-box a {
        width: 100%;
    }
    .nav-menu-btn {
        display: block;
        font-size: 2rem;
        line-height: 4rem;
        padding: 0 1rem;
        z-index: 101;
    }
}
</style>
<template>
    <div id="app">
        <header>
            <div class="logo-box">
                Cov XSS
            </div>
            <div class="ion-navicon nav-menu-btn" @click="toggleMenu"></div>
            <transition name="slide-left">
                <nav class="nav-box" v-show="state.showMenu">
                    <router-link to="/home">Home</router-link>
                    <router-link to="/run">Run</router-link>
                    <router-link to="/screenshot">Screenshot</router-link>
                    <router-link to="/project">Project</router-link>
                    <router-link to="/module">Module</router-link>
                    <router-link to="/store">Store</router-link>
                </nav>
            </transition>
            <nav-user></nav-user>
        </header>
        <notification></notification>
        <progress-bar></progress-bar>
        <router-view class="view"></router-view>
    </div>
</template>
<script>
import Notification from './components/Notification.vue'
import ProgressBar from './components/ProgressBar.vue'
import NavUser from './components/NavUser.vue'

import io from 'socket.io-client'

export default {
    data () {
        return {
            state: {
                timer: null,
                showMenu: false
            }
        }
    },
    computed: {
        user () {
            return this.$store.state.User
        }
    },
    components: {
        NavUser,
        ProgressBar,
        Notification
    },
    created () {
        this.queryNotification()
        this.queryProject()
        this.initSocket()
        this.resizeCheck()
        window.addEventListener('resize', this.resizeCheck)
    },
    methods: {
        resizeCheck () {
            if (this.state.timer) {
                clearTimeout(this.state.timer)
                this.state.timer = null
            }
            this.state.timer = setTimeout(() => {
                if (document.body.offsetWidth > 768) {
                    this.state.showMenu = true
                }
            }, 200)
        },
        toggleMenu () {
            this.state.showMenu = !this.state.showMenu
        },
        queryNotification () {
            let query = new AV.Query('UserNotification')
            query.equalTo('read', false)
            query.find()
                .then(noficaitons => {
                    noficaitons.forEach(noficaiton => {
                        this.$Notify(noficaiton.get('type'), noficaiton.get('about'), noficaiton.get('content'), -1, () => {
                            noficaiton.set('read', true).save()
                        })
                    })
                })
        },
        queryProject () {
            this.$store.dispatch('loadProjectList')
        },
        queryUserRole () {

        },
        initSocket () {
            window.Sender = io('/run-exec')
            Sender.emit('init-sender', {
                TOKEN: AV.User.current()._sessionToken
            })
            Sender.on('new-client', (data) => {
                this.$store.dispatch('addClient', data)
            })
            Sender.on('die-client', CID => {
                this.$store.dispatch('removeClient', CID)
            })
        }
    }
}
</script>
