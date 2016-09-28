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
.exec-code-new-sub-title {
    font-size: .8rem;
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
.exec-code-box {
    width: calc(100vw - 23rem);
}
.console-code .cm-s-material {
    background: #4a5961;
}
.console-code-title {
    display: flex;
    padding: .5rem 1rem;
    background: #4a5961;
}
.console-code-title-box {
    width: 100%;
    color: #fff;
    line-height: 2rem;
}
.console-code-action {
    flex-shrink: 0;
}
</style>

<template>
    <div class="exec-code-content">
        <client-list :list="clientList" :touch-client="touchClient" :back-project="showProjectList"></client-list>
        <div class="exec-code-new exec-code-view">
            <div class="card-title">
                <div class="exec-code-new-title-box">
                    {{currentClient.browser ? currentClient.browser : '👈 先选择控制的客户端'}} 
                    <span class="exec-code-new-sub-title">{{currentClient.project}} {{currentClient.host}}</span>
                </div>
                <div class="exec-code-new-action">
                    <button class="card-title-btn" @click="execAction">执行</button>
                </div>
            </div>
            <div class="exec-code-box">
                <code-editor 
                    class=""
                    @code-change="codeChange"
                    ref="codeEditor"
                ></code-editor>
                <div class="console-code-box">
                    <div class="console-code-title">
                        <div class="console-code-title-box">
                            result
                        </div>
                        <div class="console-code-action">
                            <button class="card-title-btn" @click="clearConsole">清空</button>
                        </div>
                    </div>
                    <code-editor 
                        class="console-code"
                        @code-change="consoleChange"
                        ref="consoleEditor"
                    ></code-editor>
                </div>
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
    components: {
        covSelect,
        ClientList,
        ColorPicker,
        CodeEditor,
        ProjectList
    },
    mounted () {
        this.initSender()
    },
    methods: {
        initSender () {
            if (this.Sender) return
            this.Sender = io('/run-exec')
            this.Sender.emit('init-sender', {
                TOKEN: AV.User.current()._sessionToken
            })
            this.Sender.on('new-client', (data) => {
                this.clientList.push(data)
            })
            this.Sender.on('exec-code-result', (data) => {
                this.newConsole(JSON.stringify(data))
            })
            this.Sender.on('die-client', CID => {
                let willRemoveClient = this.clientList.find(c => c.CID === CID)
                this.clientList.$remove(willRemoveClient)
            })
        },
        execAction () {
            this.initSender()
            this.Sender.emit('run-code', {
                CID: this.currentClient.CID,
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
        clearConsole () {
            this.$refs.consoleEditor.$emit('new-code', '')
        },
        touchClient (item) {
            this.currentClient = item
        }
    }
} 
</script>