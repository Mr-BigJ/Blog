<template>
  <div class="">
    <div
      v-for="content in fullcontent.slice(start,end)"
      :key="content.id"
      style="margin-left: 25%; list-style-type: none"
    >
      <el-card style="width: 800px">
        <h4 style="cursor: pointer" id="title" @click="gotoDetail(content)">
          {{ content.title }}
        </h4>
        <p>{{ content.description }}</p>
        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        <span style="color: #0f0050">总点赞数:</span>
        <span style="color: #cc00dd; font-size: 20px">{{ content.praise }}</span
        >&emsp;&emsp;
        <span style="color: #abcdfe">总踩数:</span>
        <span style="color: #bbffdd; font-size: 20px">{{
          content.unpraise
        }}</span>
        &emsp;&emsp;
        <span style="color: #512132">总访问量:</span>
        <span style="color: #bbffdd; font-size: 20px">{{ content.look }}</span>
        &ensp;&ensp;
        &ensp;&ensp;
        <span @click="gotoUserDetail(content.userId)">{{content.username}}</span>
      </el-card>
    </div>

    <div class="block" style="width: 80px; margin-left: 40%">
      <span class="demonstration"></span>
      <el-pagination
        layout="prev, pager, next"
        :total="fullcontent.length"
        @current-change="currentChange"
        :current-page.sync="page"
        page-size= 5
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  components: {
    
  },
  data() {
    return {
      page: 1,
      sum: 0,
      start:0,
      end:5
    };
  },
  methods: {
    gotoDetail(p1) {
      this.$router.push({
        path:"/BlogDetail",
        query:{
          con:p1
        }
      });
      
    },
    gotoUserDetail(p1) {
      this.$router.push({
        path:"/userDetail",
        query:{
          curUserId:p1
        }
      });
      
    },
    currentChange() {
      this.start = (this.page-1) * 5
      this.end = this.page * 5
    },
  },
  mounted() {
    
  },
  props:['fullcontent','userName']
};
</script>

<style scoped>
#title {
  text-align: left;
  color: rgb(20, 18, 16);
  position: top;
  margin-top: -20px;
}

p {
  text-align: left;
  color: rgb(20, 18, 16);
}
</style>