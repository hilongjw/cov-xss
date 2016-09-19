<style>
.module-setting-content {
    padding-top: 1rem;
}
.module-setting-row {
    display: flex;
    margin-bottom: 1rem;
}
.module-setting-row-title {
    min-width: 10rem;
    text-align: center;
    line-height: 4rem;
    font-size: 1rem;
}
.module-setting-row-summary {
    font-size: .9rem;
    color: #ccc;
}
.module-delete-btn {
     height: 1.6rem;
    min-width: 4rem;
    padding: 0 1rem;
    line-height: 1rem;
    background: none;
    border: 1px solid #F44336;
    border-radius: 1rem;
    color: #F44336;
    outline: none;
}
.module-setting-action {
    height: 2rem;
    margin-top: .5rem;
    box-sizing: border-box;
}
.module-edit-title {
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    font-size: 1rem;
    padding: .2rem .5rem;
    width: 100%;
}
.module-setting-tag-action {
    display: flex;
}
.module-setting-row .module-setting-tag {
    width: 16rem;
}
</style>

<template>
    <div>
        <div class="module-setting-content">
            <div class="module-setting-row">
                <div class="module-setting-row-title">
                    模块
                </div>
                <div class="module-setting-row-content">
                    <div class="module-setting-row-summary"> 模块标题</div>
                    <div class="module-setting-action">
                        {{edit.title}}
                    </div>
                </div>
            </div>
            <div class="module-setting-row">
                <div class="module-setting-row-title">
                    标签
                </div>
                <div class="module-setting-row-content">
                    <div class="module-setting-row-summary">标签</div>
                    <div class="module-setting-action module-setting-tag-action">
                        <cov-select class="module-setting-tag" :select="select" @update="tagChange"></cov-select>
                        <div v-if="state.tagChanged">
                            <button 
                                class="card-title-btn common"
                                @click="tagUnchange"
                            >取消</button>
                            <button 
                                class="card-title-btn"
                                @click="saveTag"
                            >保存</button>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="module-setting-row">
                <div class="module-setting-row-title">
                    公开
                </div>
                <div class="module-setting-row-content">
                    <div class="module-setting-row-summary">
                        公开你的模块代码，其他用户可读不可写
                    </div>
                    <div class="module-setting-action">
                        <input 
                            type="radio" 
                            id="modulePublicTrue" 
                            value="true" 
                            v-model="form.publicState"
                            @change="savePublicState"
                        > 
                        <label for="modulePublicTrue">
                            公开
                        </label>
                        <input 
                            type="radio" 
                            id="modulePublicFalse" 
                            value="false" 
                            v-model="form.publicState"
                            @change="savePublicState"
                        > 
                        <label for="modulePublicFalse">
                            私有
                        </label>
                    </div>
                </div>
            </div>
            <div class="module-setting-row">
                <div class="module-setting-row-title">
                    删除
                </div>
                <div class="module-setting-row-content">
                    <div class="module-setting-row-summary">请注意，删除应用将清除该模块的所有数据，且该操作不能被恢复，您确定要删除吗
                    </div>
                    <div class="module-setting-action">
                        <button class="module-delete-btn" @click="delAction">删除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import covSelect from './select.vue'
export default {
    props: {
        edit: Object
    },
    data () {
        return {
            state: {
                tagChanged: false
            },
            select: {
                remove: [],
                value: [],
                options: [{
                    text: '基础库',
                    selected: false
                }, {
                    text: '数据获取',
                    selected: false
                }, {
                    text: 'CSRF',
                    selected: false
                }, {
                    text: '截图',
                    selected: false
                }]
            },
            form: {
                publicState: {
                    value: 'true'
                }
            }
        }
    },
    components: {
        covSelect
    },
    mounted () {
        this.form.publicState = this.edit.current.get('public') ? 'true' : 'false'
        if (this.edit.current.get('tag')) {
            this.edit.current.get('tag').forEach(tag => {
                this.select.value.push({
                    text: tag,
                    selected: true
                })
            })
        }
        
    },
    methods: {
        tagChange () {
            this.state.tagChanged = true
        },
        tagUnchange () {
            this.state.tagChanged = false
        },
        saveTag () {
            let module = this.edit.current
            let tags = this.select.value.map(t => {
                return t.text
            })
            module.set('tag', tags).save()
                .then(m => {
                    this.state.tagChanged = false
                    this.$Notify('success',' 保存成功', '', 3000)
                })
                .catch(err => {
                    this.$Notify('failed','遇到了一些问题', '', 3000)
                })
        },
        delAction () {
            let module = this.edit.current
            this.$http.get('/dash/api/remove-module', {
                params: {
                    id: module.get('objectId')
                }
            })
            .then(res => {
                console.log(res)
            })
        },
        savePublicState () {
            const publicState = this.form.publicState === 'true'
            let acl = new AV.ACL()
            let current = this.edit.current
            if (publicState) {
                acl.setPublicReadAccess(true)
                acl.setPublicWriteAccess(false)
                acl.setWriteAccess(AV.User.current(), true)
                acl.setReadAccess(AV.User.current(), true)
            } else {
                acl.setPublicReadAccess(false)
                acl.setPublicWriteAccess(false)
                acl.setWriteAccess(AV.User.current(), true)
                acl.setReadAccess(AV.User.current(), true)
            }

            current.setACL(acl)
            current.set('public', publicState)
            current.save()
                .then(module => {
                    this.$Notify('success',' 保存成功', '', 3000)
                })
                .catch(err => {
                    this.$Notify('failed','遇到了一些问题', '', 3000)
                })
        }
    }
}
</script>