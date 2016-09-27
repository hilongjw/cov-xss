<style>
.exec-code-content {
    display: flex;
}
.exec-code-view {
    position: relative;
    width: 100%;
    min-height: calc(100vh - 6rem);
    background: #fff;
    margin-left: 1rem;
    box-shadow: 0 0 .5rem #d0d0d0;
}
.exec-code-new .card-title{
    width: 100%;
    box-sizing: border-box;
    z-index: 100;
    background: #263238;
    color: #fff;
    margin: 0;
}
.exec-code-new-title-box {
    width: 100%;
    padding-right: 1rem;
    margin-right: 1rem;
}
.exec-code-new-title {
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    font-size: 1rem;
    padding: .2rem .5rem;
    width: 100%;
}
.exec-code-new-action {
    flex-shrink: 0;
}
.exec-code-code-textarea {
    width: 100%;
    border: 1px solid #e8e8e8;
    background: #f7f7f7;
    line-height: 1.7;
    color: #717171;
    outline: none;
}
.exec-code-content .module-edit-textarea {
    border: none;
}
.in-out-translate-fade-enter-active, .in-out-translate-fade-leave-active {
  transition: all .5s;
}
.in-out-translate-fade-enter, .in-out-translate-fade-leave-active {
  opacity: 0;
}
.in-out-translate-fade-enter {
  transform: translate3d(50%, 0, 0);
}
.in-out-translate-fade-leave-active {
  transform: translate3d(-50%, 0, 0);
}
.out-in-translate-fade-enter-active, .out-in-translate-fade-leave-active {
  transition: all .5s;
}
.out-in-translate-fade-enter, .out-in-translate-fade-leave-active {
  opacity: 0;
}
.out-in-translate-fade-enter {
  transform: translate3d(-50%, 0, 0);
}
.out-in-translate-fade-leave-active {
  transform: translate3d(50%, 0, 0);
}
</style>

<template>
    <div class="exec-code-content">
        <transition :name="transitionName" mode="out-in">
            <project-list v-if="state.showProject" :list="projectList" :show-project="showProject"></project-list>
            <client-list v-else :list="clientList" :touch-client="touchClient" :back-project="showProjectList"></client-list>
        </transition>
        <div class="exec-code-new exec-code-view">
            <div class="card-title">
                <div class="exec-code-new-title-box">
                    {{currentClient.browser}} 
                </div>
                <div class="exec-code-new-action">
                    <button class="card-title-btn" @click="execAction">执行</button>
                    <button class="card-title-btn" @click="listenAction">Listen</button>
                </div>
            </div>
            <div class="exec-code-box">
                <code-editor 
                    class=""
                    @code-change="codeChange"
                    ref="codeEditor"
                ></code-editor>
                <code-editor 
                    class=""
                    @code-change="consoleChange"
                    ref="consoleEditor"
                ></code-editor>
            </div>
        </div>
    </div>
</template>

<script>
import covSelect from '../components/select.vue'
import ClientList from '../components/ClientList.vue'
import ProjectList from '../components/projectList.vue'
import ColorPicker from '../components/colorPicker.vue'
import CodeEditor from '../components/CodeEditor.vue'
import MD5 from 'md5'

import io from 'socket.io-client'

export default {
    name: 'Exec',
    data () {
        return {
            state: {
                showProject: true
            },
            Sender: null,
            currentClient: {},
            serverUrl: window.SERVER_CONFIG.ADDRESS + ':' + window.SERVER_CONFIG.PORT,
            clientList: [],
            edit: {
                code: '',
                console: '',

            },
            sendConfig: {
                keyId: ''
            }
        }
    },
    computed: {
        transitionName () {
            return this.state.showProject ? 'out-in-translate-fade' : 'in-out-translate-fade' 
        },
        projectList () {
            return this.$store.state.Projects
        }
    },
    mounted () {
    },
    components: {
        covSelect,
        ClientList,
        ColorPicker,
        CodeEditor,
        ProjectList
    },
    methods: {
        listenAction () {
            var socket = io('http://localhost:8080/exec')
            
            // browser info 
            navigator.sayswho= (function(){
                var ua= navigator.userAgent, tem, 
                M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                if(/trident/i.test(M[1])){
                    tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
                    return 'IE '+(tem[1] || '');
                }
                if(M[1]=== 'Chrome'){
                    tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
                    if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
                }
                M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
                if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
                return M.join(' ');
            })();

            socket.on('code', function (data) {
                var result = null
                var err = null
                try {
                    result = eval(data.code)
                } catch (e) {
                    console.log(e)
                    console.log(e.message)
                    console.log(e.stack)
                    err = {
                        name: e.name,
                        message: e.message
                    }
                }
                socket.emit('exec-code-result', { error: err, result: result })
            })
            socket.emit('init-client', {
                keyId: '2333',
                host: document.location.host,
                URL: document.URL,
                browser: navigator.sayswho,
                updatedAt: (new Date())
            })
        },
        initSender () {
            if (this.Sender) return
            this.Sender = io('http://localhost:8080/run-exec')
            this.Sender.emit('init-sender', {
                keyId: this.sendConfig.keyId
            })
            this.Sender.on('new-client', (data) => {
                this.clientList.push(data)
            })
            this.Sender.on('exec-code-result', (data) => {
                // console.log('exec-code-result:', data)
                this.newConsole(JSON.stringify(data))
            })
            this.Sender.on('die-client', cId => {
                let willRemoveClient = this.clientList.find(c => c.cId === cId)
                this.clientList.$remove(willRemoveClient)
            })
        },
        execAction () {
            this.initSender()
            this.Sender.emit('run-code', {
                cId: this.currentClient ? this.currentClient.cId : '', 
                code: this.edit.code
            })
        },
        showProjectList () {
            this.Sender = null
            this.state.showProject = true
        },
        showProject (project) {
            this.state.showProject = false
            this.Sender = null
            this.sendConfig.keyId = project.get('alias')
            this.initSender()
        },
        codeChange (code) {
            this.edit.code = code
        },
        consoleChange (code) {
            this.edit.console = code
        },
        newCode (code) {
            this.$refs.codeEditor.$emit('new-code', code)
        },
        newConsole (code) {
            this.$refs.consoleEditor.$emit('new-code', this.edit.console + '\n' + code)
        },
        touchClient (item) {
            this.currentClient = item
        }
    }
} 
</script>