<style>
.sign-up .content {
    padding-top: 5rem;
}
</style>
<template>
    <div class="login-box sign-up">
        <div class="title">
            <div class="logo-box">
                <img src="../assets/logo.svg" class="logo">
            </div>
            <h1>Welcome to Cov Xss</h1>
            <p>xss platform base on Vuejs</p>
        </div>
        <div class="content">
            <textfield :text="row" v-for="row in form"></textfield>
            <info v-show="info.show" :msg="info.msg" :type="info.type"></info>
        </div>
        <div class="footer">
            <div class="text-row action">
                <button class="login-btn" @click="signUp">
                    SIGN UP
                </button>
            </div>
            <div class="text-row toggle-action">
                <span @click="toggle">sign in</span>
            </div>
        </div>
    </div>
</template>

<script>
import textfield from '../components/textfield.vue'
import info from '../components/info.vue'

export default {
    data () {
        return {
            info: {
                show: false,
                type: '',
                msg: '',
                timer: null
            },
            form: {
                invitation: {
                    title: 'Invitation code',
                    value: ''
                },
                username: {
                    title: 'Username',
                    value: ''
                },
                password: {
                    type: 'password',
                    title: 'Password',
                    value: ''
                }
            }
        }
    },
    components: {
        textfield,
        info
    },
    methods: {
        toggle () {
            this.$emit('toggle')
        },
        notify (msg, type) {
            if (this.info.timer) {
                clearTimeout(this.info.timer)
                this.info.timer = null
            }

            this.info.msg = msg
            this.info.type = type || ''
            this.info.show = true

            this.info.timer = setTimeout(() => {
                this.info.show = false
                this.info.timer = null
            }, 5000)
        },
        check () {
            let allDone = true
            Object.keys(this.form).forEach((key) => {
                console.log(this.form[key], key)
                if (!this.form[key].value) {
                    allDone = false
                    this.notify(key + ' is must be required')
                }
            })
            return allDone
        },
        signUp () {
            if (!this.check()) return
                const user = new AV.User()
                user.setUsername(this.form.username.value)
                user.setPassword(this.form.password.value)
                user.signUp()
                    .then(loginedUser => {
                        this.notify('注册成功！', 'success')
                    }, (err) => {
                        console.log(err)
                        this.notify('遇到了一些问题...')
                    })
        }
    }
}
</script>