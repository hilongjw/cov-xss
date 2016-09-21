<style>
.rd-notification-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 9999;
}
.rd-notification {
    position: relative;
    width: 14rem;
    background-color: #fff;
    box-shadow: 0 0 .5rem #d6d6d6;
    border-radius: 2px;
    padding: 1rem 1.5rem;
    margin-bottom: 1rem;
}
.rd-notification.success,
.rd-notification.warning,
.rd-notification.failed,
.rd-notification.info {
    padding-left: 4rem;
}
.rd-notification.success .rd-notification-icon {
    color: #87d068;
}
.rd-notification.info .rd-notification-icon {
    color: #2db7f5;
}
.rd-notification.warning .rd-notification-icon {
    color: #fa0;
}
.rd-notification.failed .rd-notification-icon {
    color: #f50;
}
.rd-notification-title {
    font-size: .9rem;
}
.rd-notification-content {
    color: #999;
    font-size: .8rem;
    line-height: 1.5;
    margin: 0;
}
.rd-notification-close {
    position: absolute;
    top: .2rem;
    right: .5rem;
    font-size: .8rem;
    color: #ccc;
}
.rd-notification-close:hover {
    color: #969696;
}
.rd-notification-icon{
    position: absolute;
    top: 50%;
    font-size: 1.5rem;
    left: 1rem;
    margin-top: -.75rem;
    line-height: 1.5rem;
}
.notification-transition {
    transition: opacity .5s ease;
}
.notification-enter {
    opacity: 0;
}
.notification-leave {
    opacity: 0;
    position: absolute;
}
.notification-move {
    transition: transform .5s cubic-bezier(.55,0,.1,1);
}
@media screen and (max-width: 768px) {
    .rd-notification-container {
        top: 0;
        right: 0;
        width: 100%;
        padding: 1rem 2rem;
        box-sizing: border-box;
    }
    .rd-notification {
        width: 100%;
        box-sizing: border-box;
    }
}
.list-enter-active, .list-leave-active {
  transition: all .6s;
}
.list-enter, .list-leave-active {
  opacity: 0;
  transform: translateX(50%);
}
</style>
<template>
    <transition-group name="list" class="rd-notification-container" tag="div">
        <div 
            v-for="item in notifications"
            class="rd-notification" 
            :class="typeClass(item)"
            :key="item.__key"
        >
            <span class="rd-notification-icon" :class="iconClass(item)"></span>
            <span class="rd-notification-title">{{item.title}}</span>
            <p class="rd-notification-content">{{item.content}}</p>
            <span class="rd-notification-close ion-close-round" @click="closeItem($event, item)"></span>
        </div>
    </transition-group>
</template>
<script>
const ICON_MAP = {
    'success': 'ion-checkmark-circled',
    'failed': 'ion-close-circled',
    'warning': 'ion-alert-circled',
    'info': 'ion-information-circled',
    'loading': 'ion-load-a'
}

export default {
    computed: {
        notifications () {
            return this.$store.state.Notifications
        }
    },
    methods: {
        typeClass (item) {
            if (!item.type) {
                return ['rd-notification-info']
            }
            return [item.type]
        },
        iconClass (item) {
            if (!item.type || !ICON_MAP[item.type]) {
                return ['rd-notification-noicon']
            }
            return [ICON_MAP[item.type]]
        },
        closeItem (e, item) {
            this.$store.dispatch('removeNotification', item)
        }
    }
}
</script>
