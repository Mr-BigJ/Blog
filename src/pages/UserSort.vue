<!--  -->
<template>
  <div class="">
    <Header
      v-on:searchInfo="getSearchInfo"
      :title="'用户排行榜'"
      style="width: 840px; margin-left: 23.5%"
    />
    <div
      v-for="(user, index) in users.data"
      :key="index"
      style="margin-left: 25%; list-style-type: none"
    >
      <el-card style="width: 800px">
        <span style="color: gray; font-size: 20px">{{ index + 1 + "." }}</span
        >&ensp;&ensp;
        <span
          style="cursor: pointer; font-size: 25px"
          id="title"
          @click="gotoDetail(user,user.split('-')[0])"
        >
          {{ user.split('-')[0] }}
        </span><br>
        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        <span>总点赞数:</span>
        <span style="color:#ff00aa">{{ user.split('-')[3] }}</span
        >&emsp;&emsp;
        <span>总被踩数:</span><span style="color:#ff55aa">{{ user.split('-')[2] }}</span>
        &ensp;&ensp;
        <span>总访问数:</span>
        <span style="color:#1a5599">{{ user.split('-')[1] }}</span>
      </el-card>
    </div>

    
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { Header },
  data() {
    //这里存放数据
    return {
      users: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getSearchInfo(e) {
      this.users = e;
    },
    
    gotoDetail(User,arg2) {
      this.$router.push({
        path: "/userDetail",
        query: {
          curUserName: arg2,
          rankUser:User
        },
      });

    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$axs.post("http://localhost:8878/pro/user/allUser").then((val) => {
      this.users = val;
    });
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
</style>