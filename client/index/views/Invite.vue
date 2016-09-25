<style>
.home-content {
    display: flex;
}
.invite-view {
    width: 100%;
    min-height: calc(100vh - 6rem);
    background: #fff;
    margin-left: 1rem;
    box-shadow: 0 0 .5rem #d0d0d0;
}
.invite-title-box {
    width: 100%;
    padding-right: 1rem;
    margin-right: 1rem;
}
.invite-title {
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    font-size: 1rem;
    padding: .2rem .5rem;
    width: 100%;
}
.invite-content {
    height: calc(100% - 6rem);
    padding: 0 1rem;
}
.invite-row {
    padding: 0 1rem;
}
.invite-item {
    display: flex;
    color: #333;
    padding: .5rem;
}
.invite-code {
    width: 100%;
    font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: .8rem;
    color: #505050;
}
.invite-sub {
    flex-shrink: 0;
    font-size: .8rem;
    line-height: 1rem;
    color: #ccc;  
}
.invite-state {
    display: inline-block;
    width: 5rem;
    color: #8BC34A;
}
.invite-state.used {
    color: #ccc;
}
.invite-time {
    display: inline-block;
    width: 5rem;
    text-align: right;
}
</style>

<template>
    <div class="home-content">
        <div class="invite-view">
            <div class="card-title">
                <div class="invite-title-box">
                    邀请码
                </div>
                <div class="invite-action">
                    <button class="card-title-btn" @click="newInvitation">生成</button>
                </div>
            </div>
            <div class="invite-row" v-for="invitation in invitations">
                <div class="invite-item">
                    <div class="invite-code">
                        {{invitation.get('code')}}
                    </div>
                    <div class="invite-sub" >
                        <div class="invite-state" :class="{ 'used': invitation.get('used') }">
                        {{invitation.get('used') ? '已使用' : '未使用'}}
                        </div>
                        <div class="invite-time">{{invitation.updatedAt | timeAgo}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Invite',
    data () {
        return {
            invitations: []
        }
    },
    mounted () {
        this.loadInvitations()
    },
    methods: {
        loadInvitations () {
            const query = new AV.Query('Invitation')
            query.equalTo('creator', AV.User.current())
            query.descending('updatedAt')
            query.find()
                .then(codes => {
                    this.invitations = codes
                })
        },
        newInvitation () {
            this.$http.get('/new-invite')
                .then(() => {
                    this.$Notify('success', '生成成功', '', 3000)
                    this.loadInvitations()
                })
                .catch(res => {
                    if (res.data.msg) {
                        this.$Notify('failed', res.data.msg, '', 3000)
                    }
                })
        }
    }
} 
</script>