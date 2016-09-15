<style>
.login-box {
    position: fixed;
    left: 50%;
    top: 2rem;
    height: 35rem;
    width: 22rem;
    background: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 3rem;
    margin-left: -11rem;
    box-shadow: 0 0 3rem rgba(0,0,0,.3);

}
.login-box .title {
    text-align: center;
    color: #ccc;
}
.login-box .title h1 {
    color: #50d59e;
    font-size: 1.5rem;
    margin-bottom: .5rem;
}
.logo-box {
    margin-bottom: 1rem;
}
.logo-box .logo {
    height: 3rem;
}
.content {
    position: relative;
    padding-top: 5rem;
}
.text-row {
    margin-bottom: 1rem;
}
.text-title {
    color: #ccc;
    font-size: .8rem;
}
.text-input input {
    line-height: 2rem;
    width: 100%;
    border: none;
    border-bottom: 1px solid #e4e4e4;
    outline: none;
    font-size: 1.2rem;
}
.login-btn {
    overflow: hidden;
    position: relative;
    line-height: 3rem;
    border-radius: 1.5rem;
    border: none;
    background: none;
    text-align: center;
    width: 100%;
    background: #51d79d;
    font-size: 1.2rem;
    color: #fff;
    outline: none;
}
.action {
    margin-top: 3rem;
}
.footer {
    position: absolute;
    width: 100%;
    padding: 0 3rem;
    left: 0;
    box-sizing: border-box;
    bottom: 0;
}
.toggle-action {
    text-align: center;
    color: #45b8ad;
    cursor: pointer;
}
</style>
<template>
    <div class="login-box">
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
                    SIGN IN
                </button>
            </div>
            <div class="text-row toggle-action">
                <span @click="toggle">sign up</span>
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

            AV.User.logIn(this.form.username.value, this.form.password.value)
            .then(user => {
                console.log(user)
                this.notify('登陆成功！', 'success')
            }, err => {
                this.notify('用户名与密码不匹配')
            })
        }
    }
}
</script>