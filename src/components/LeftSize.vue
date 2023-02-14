<template>
    <div>
        <!-- 日历 -->
        <div class="con Calendar"
            :style="{ width: windowWidth * 0.2 + 'px', 'margin-left': windowHeight * 0.1 + 'px', 'margin-top': windowHeight * 0.5 + 'px' }">
            <Calendar v-on:choseDay="clickDay" v-on:changeMonth="changeDate" v-on:isToday="clickToday"></Calendar>
        </div>

        <!-- 登陆框 -->
        <div class="leftSide" style=" border-radius:20px;background-color: white;display: inline;"
            :style="{ width: windowWidth * 0.2 + 'px', height: windowHeight * 0.2 + 'px', 'margin-left': windowHeight * 0.1 + 'px', 'margin-top': windowHeight * 0.01 - 25 + 'px' }">
            <el-image :style="{ width: windowWidth * 0.2 + 'px', height: windowHeight * 0.1 + 'px' }" :src="avatarImg"
                :fit="none">zxgds</el-image>
                <el-image :src="avatarImg" slot="reference" @click="goto" :style="{width: 60+'px','margin-left': 10 + 'px','margin-top': -30 + 'px'}" :fit="fit" />
                <p :style="{ 'margin-left': windowHeight * 0.1 + 'px','font-size':'30px','margin-top':-50+'px','font-color':'red' }">{{ username }}</p>
                


        </div>

        <!-- 热点框 -->
        <div class="leftSide" style="border-radius:20px"
            :style="{ width: windowWidth * 0.2 + 'px', height: windowHeight * 0.3 + 'px', 'margin-left': windowHeight * 0.1 + 'px', 'margin-top': windowHeight * 0.2 + 'px' }">
            <font style="font-size: large;">这里显示热点内容 </font>
        </div>
    </div>
</template>

<script>
import Calendar from 'vue-calendar-component';
export default {
    components: {
        Calendar

    },
    data() {
        return {
            windowWidth: document.documentElement.clientWidth,  //实时屏幕宽度
            windowHeight: document.documentElement.clientHeight,   //实时屏幕高度
            value: new Date(),
            avatarImg: JSON.parse(localStorage.getItem("user")).avatar,
            username: JSON.parse(localStorage.getItem("user")).username,
        }
    },
    methods: {
        // 日历
        clickDay(data) {
            console.log(data); //选中某天
        },
        changeDate(data) {
            console.log(data); //左右点击切换月份
        },
        clickToday(data) {
            console.log(data); // 跳到了本月
        },
    }
}
</script>





<style>
.Calendar {
    position: fixed;
    /* margin-left: 8%; */
}

.leftSide {
    /* background: url("../assets/car.jpeg"); */
    position: fixed;
}
</style>