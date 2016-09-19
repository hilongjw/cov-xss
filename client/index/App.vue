<style src="./assets/_ionicicon.css"></style>
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
}
.logo-box {
    min-width: 10rem;
    text-align: center;
    line-height: 4rem;
    font-size: 1.5rem;
    color: #565656;
}
.nav-box {
    overflow-x: auto;
    display: flex;
    width: 100%;
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
}
</style>
<template>
    <div id="app">
        <header>
            <div class="logo-box">
                Cov XSS
            </div>
            <nav class="nav-box">
                <router-link to="/home">Home</router-link>
                <router-link to="/screenshot">Screenshot</router-link>
                <router-link to="/project">Project</router-link>
                <router-link to="/module">Module</router-link>
                <router-link to="/store">Store</router-link>
            </nav>
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

export default {
    computed: {
        user () {
            return this.$store.state.User
        }
    },
    components: {
        NavUser,
        ProgressBar,
        Notification
    }
}
</script>
