<style>
.project-list-card {
    overflow-y: auto; 
    position: relative;
    display: inline-block;
    width: 20rem;
    height: calc(100vh - 6rem);
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
.project-list {
    list-style: none;
}
.project-list-item {
    color: #868686;
    border-left: 4px solid #CDDC39;
    cursor: pointer;
    padding: .75rem 1rem;
    margin-bottom: .5rem;
}
.project-list-item:hover {
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
    <div class="project-list-card">
        <div class="card-title">
            <span>项目</span>
            <button class="card-title-btn" @click="showNew">创建</button>
        </div>
        <div class="card-content">
            <ul class="project-list">
                <li class="project-list-item" v-for="item in list" @click="showProject(item)">
                    <div class="item-title">
                        {{item.get('title')}}
                    </div> 
                    <div class="item-other">
                        <div class="item-quote">
                            <span class="module-tag">{{item.get('summary')}}</span>
                        </div>
                        <div class="item-date">
                            {{item.updatedAt | timeAgo}}
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
        showNew: Function,
        showProject: Function
    }
}
</script>