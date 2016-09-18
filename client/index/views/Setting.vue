<style>
.home-content {
    display: flex;
}
.setting-view {
    width: 100%;
    min-height: calc(100vh - 6rem);
    background: #fff;
    margin-left: 1rem;
    box-shadow: 0 0 .5rem #d0d0d0;
}
.setting-title-box {
    width: 100%;
    padding-right: 1rem;
    margin-right: 1rem;
}
.setting-title {
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    font-size: 1rem;
    padding: .2rem .5rem;
    width: 100%;
}
.setting-content {
    height: calc(100% - 6rem);
    padding: 0 1rem;
}
.setting-row {
    max-width: 20rem;
    padding: 0 1rem;
}
</style>

<template>
    <div class="home-content">
        <div class="setting-view">
            <div class="card-title">
                <div class="setting-title-box">
                    设置
                </div>
                <div class="setting-action">
                    <button class="card-title-btn" @click="saveAction">保存</button>
                </div>
            </div>
            <div class="setting-row" v-for="text in form">
                <textfield :text="text" @enter-key="saveAction"></textfield>
            </div>
        </div>
    </div>
</template>

<script>
import Textfield from '../components/Textfield.vue'
export default {
    name: 'Home',
    data () {
        return {
            form: {
                username: {
                    value: AV.User.current().get('username'),
                    title: 'Username'
                },
                email: {
                    value: AV.User.current().get('email'),
                    title: 'Email'
                }
            }
        }
    },
    mounted () {
    },
    components: {
        Textfield
    },
    methods: {
        saveAction () {
            if (this.form.username.value.length < 3) return this.$Notify('warning', '用户名不能少于3位', '', 3000)
            if (!this.form.email.value) return this.$Notify('warning', '请填写邮箱', '', 3000)
            let user = AV.User.current()
            user.set('username', this.form.username.value)
            user.set('email', this.form.email.value)
            user.save()
                .then(user => {
                    this.$Notify('success', '保存成功', '', 3000)
                })
                .catch(err => {
                    console.log(err)
                    this.$Notify('failed', '遇到了一些问题', '', 3000)
                })
        }
    }
} 
</script>