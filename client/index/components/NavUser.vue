<style>
.dash-header-nav-item {
    padding: 0 1rem;
    position: relative;
    cursor: pointer;
    flex-shrink: 0;
}
.dash-header-nav-item-pop {
    position: absolute;
    background: #fff;
    border-radius: 2px;
    border: 1px solid #f5f5f5;
    top: 5rem;
    right: .5rem;
    box-shadow: 0 0 .5rem rgba(0, 0, 0, 0.09);
    z-index: 1;
}
.dash-header-nav-item-pop::after {
    content: ' ';
    display: inline-block;
    position: absolute;
    top: -6px;
    right: 10px;
    display: inline-block;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #fff;
    border-left: 6px solid transparent;
}
.dash-header-nav-user-avatar {
    background-image: url(http://tp1.sinaimg.cn/1765813240/180/40054316852/1);
    display: inline-block;
    height: 1.5rem;
    width: 1.5rem;
    background-size: cover;
    border-radius: 50%;
    margin-top: 1.25rem;
}
.dash-header-nav-value {
    display: inline-block;
    vertical-align: top;
    line-height: 4rem;
    color: #696969;
}
.dash-header-nav-user-action-row:hover {
    background-color: #fbfbfb;
}
.dash-header-nav-user-action-row {
    padding: 0 1rem;
    border-bottom: 1px solid #ececec;
    height: 2.5rem;
    line-height: 2.5rem;
    color: #666;
    font-size: .9rem;
    min-width: 9rem;
}
.dash-header-nav-user-action-icon {
    margin-right: .5rem;
}
</style>

<template>
    <div class="dash-header-nav-item">
        <div class="dash-header-nav-user-avatar"></div>
        <div class="dash-header-nav-value" @click="toggle">
            <span>{{user.get('username')}}</span>
        </div>
        <div class="dash-header-nav-item-pop" v-show="state.popShow">
           <div class="dash-header-nav-user-action-row rd-col-24">
                <i class="ion-information-circled dash-header-nav-user-action-icon"></i> 消息
            </div>
            <div class="dash-header-nav-user-action-row rd-col-24">
                <i class="ion-gear-a dash-header-nav-user-action-icon"></i> 设置
            </div>
            <div class="dash-header-nav-user-action-row rd-col-24" @click="logOut">
                <i class="ion-log-out dash-header-nav-user-action-icon"></i>
                <span>退出</span>
            </div>
        </div>
    </div>
</template>

<script>
import {
    catIn
} from '../utils'

export default {
    data () {
        return {
            state: {
                popShow: false
            }
        }
    },
    computed: {
        user () {
            return this.$store.state.User
        }
    },
    mounted () {
        window.addEventListener('click', this.touchClose, false)
    },
    destroyed () {
        window.removeEventListener('click', this.touchClose)
    },
    methods: {
        touchClose (e) {
            if (!catIn(e.target, this.$el)) {
                this.state.popShow = false
            }
        },
        toggle (e) {
            this.state.popShow = !this.state.popShow
        },
        logOut () {
            this.$http.post('/log-out')
                .then(res => {
                    AV.User.logOut()
                    setTimeout(() => {
                        location.href = '/login'
                    }, 2000) 
                })
        }
    }
}
</script>