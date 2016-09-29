<style>
.client-list-card {
    overflow-y: auto; 
    position: relative;
    display: inline-block;
    width: 20rem;
    background: #fff;
    border-radius: 2px;
    padding: 0 0 1rem 0;
    box-sizing: border-box;
    box-shadow: 0 0 .5rem #d0d0d0;
    flex-shrink: 0;
}
.card-title {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    color: #545454;
    margin-bottom: 1rem;
    padding: 1rem;
    line-height: 1.6rem;
}
.card-title-btn {
    height: 1.6rem;
    min-width: 4rem;
    padding: 0 1rem;
    line-height: 1rem;
    background: none;
    border: 1px solid #51d79d;
    border-radius: 1rem;
    color: #51d79d;
    outline: none;
}
.card-title-btn.common {
    color: #777777;
    border: 1px solid #777777;
}
.card-title-btn.disable {
    color: #ccc;
    border: 1px solid #ccc;
}
.client-list {
    list-style: none;
}
.client-list-item {
    color: #868686;
    border-left: 4px solid #CDDC39;
    cursor: pointer;
    padding: .75rem 1rem;
    margin-bottom: .5rem;
}
.client-list-item:hover {
    background-color: #eee;
}
.item-title {
    margin-bottom: .5rem;
    font-size: 1rem;
    color: #000;
}
.item-other {
    font-size: .6rem;
    display: flex;
    justify-content: space-between;
}
</style>
<template>
    <div class="client-list-card">
        <div class="card-title">
            <span>客户端</span>
            <!-- <button class="card-title-btn" v-if="backProject" @click="backProject">返回项目</button> -->
        </div>
        <div class="card-content">
            <ul class="client-list">
                <li 
                    class="client-list-item" 
                    v-for="item in list" 
                    @click="touchClient(item)"
                >
                    <div class="item-title">
                        {{item.browser}}
                    </div> 
                    <div class="item-other">
                        <div class="item-quote">
                            <span class="module-tag">{{item.project}}</span>
                            <span class="module-tag">{{item.host}}</span>
                        </div>
                        <div class="item-date">
                            {{item.updatedAt | timeAgo}}
                        </div>
                    </div>
                </li>
                <li 
                    class="client-list-item" 
                    v-if="!list.length" 
                >
                    <div class="item-title">
                        没有在线的好友
                    </div> 
                    <div class="item-other">
                        <div class="item-quote">
                            <span class="module-tag"> 这里是为空的提示而已 </span>
                        </div>
                        <div class="item-date">
                            刚刚
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: Array,
        touchClient: Function,
        backProject: Function
    }
}
</script>