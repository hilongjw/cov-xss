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
            <p>a simple xss platform</p>
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
                if (!this.form[key].value) {
                    allDone = false
                    this.notify(key + ' is must be required')
                }
            })
            return allDone
        },
        signUp () {
            if (!this.check()) return

            this.$http.post('/sign-up', {
                username: this.form.username.value,
                password: this.form.password.value,
                invitation: this.form.invitation.value
            })
            .then(res => {
                let data = res.data
                if (data.error) {
                    this.notify(data.msg)
                } else {
                    this.notify(data.msg, 'success')
                    setTimeout(() => {
                        this.toggle()
                    }, 2000)
                }
            })
            .catch(err => {
                this.notify('服务器遇到了一些问题...')
            })
        }
    }
}
</script>