
<template>
  <div class="login block">
    <Header
      v-on:searchInfo="getSearchInfo"
      :title="'--主页--  '"
      :style="{
        width: windowWidth * 0.4 + 'px',
        'margin-left': windowWidth * 0.3 + 'px',
        color: 'red',
      }"
    />
    <LeftSize />

    <div
      v-for="content in contents.data.slice(start, end)"
      :key="content.id"
      :style="{
        width: windowWidth * 0.4 + 'px',
        'margin-left': windowWidth * 0.3 + 'px',
        'list-style-type': 'none',
      }"
    >
      <el-card style="width: 800px">
        <h4
          style="cursor: pointer"
          id="title"
          @click="gotoDetail(content), updateLook('updateLook', content.id)"
        >
          {{ content.title }}
        </h4>
        <p>{{ content.description }}</p>
        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        <br />
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
        <a
          title="查看角色信息"
          style="cursor: pointer; color: blue"
          @click="gotoUserDetail(content.username)"
          >{{ content.username }}</a
        >
        &ensp;&ensp;
      </el-card>
    </div>

    <!-- 分页 -->
    <div
      v-show="contents.length === 0 ? false : true"
      class="block"
      style="width: 180px; margin-left: 50%">
      <span class="demonstration"></span>
      <el-pagination 
        layout="prev, next"
        :total="contents.length"
        @current-change="currentChange"
        :current-page.sync="page"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import ScaleBox from "vue2-scale-box";
import LeftSize from "../components/LeftSize.vue";
export default {
  name: "BlogList",
  components: {
    Header,
    ScaleBox,
    LeftSize,
  },
  data() {
    return {
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight, //实时屏幕高度
      contents: [],
      page: 1,
      sum: 0,
      start: 0,
      end: 10,
    };
  },
  methods: {
    getSearchInfo(e) {
      if(e.code == 909){
        alert("没有相关记录")
        return
      }
      this.contents = e;
      this.page = 1;
    },
    gotoUserDetail(username) {
      this.$router.push({
        path: "/userDetail",
        query: {
          curUserName: username,
        },
      });
    },
    updateLook(type, contentId) {
      let formdata = new FormData();
      formdata.append("contentId", contentId);
      this.$axs
        .post(`http://localhost:8878/pro/blog/updateLook`, formdata)
        .then((res) => {
          if (res.code === 401) {
            localStorage.removeItem("token");
            this.$router.push("/");
          }
          if (res.code === 808) {
            alert(res.msg);
          }
        });
    },
    gotoDetail(p1) {
      this.$router.push({
        path: "/BlogDetail",
        query: {
          con: p1,
        },
      });
    },
    currentChange() {
      if (localStorage.getItem("searchStr") != null) {
        let formdata = new FormData();
        formdata.append("searchInfo", localStorage.getItem("searchStr"));
        formdata.append("page", this.page);
        this.$axs
          .post("http://localhost:8878/pro/blog/search", formdata)
          .then((val) => {
            if (val.code === 909) {
              this.contents = []
              alert("没有更多记录了")

            } else {
              this.contents = val;
            }
          });
      } else {
        var page = new FormData();
        page.append("pageNo", this.page);
        this.$axs
          .post(`http://localhost:8878/pro/blog/content`, page)
          .then((val) => {
            if (val.code === 401) {
              localStorage.removeItem("token");
              alert("請重新登錄");
              this.$router.push("/");
            } else {
              this.contents = val;
            }
          });
      }
    },
  },
  mounted() {
    var pageNo = new FormData();
    pageNo.append("pageNo", 1);
    this.$axs
      .post(`http://localhost:8878/pro/blog/content`, pageNo)
      .then((val) => {
        if (val.code === 401) {
          localStorage.removeItem("token");
          alert("請重新登錄");
          this.$router.push("/");
        } else {
          this.contents = val;
        }
      });
  },
  // 注意，在$emit时，必须已经$on，否则将无法监听到事件。
  // 所以正确的写法应该是在需要接收值的组件的created生命周期函数里写$on，在需要往外传值的组件的destroyed生命周期函数函数里写$emit
  destroyed() {},
};
</script>





<style scope>
img {
  /*设置图片宽度和浏览器宽度一致*/
  width: 30%;
  height: inherit;
}

#title {
  text-align: left;
  color: rgb(20, 18, 16);
  position: top;
  margin-top: -20px;
  font-size: large;
}

p {
  text-align: left;
  color: rgb(20, 18, 16);
}

.login {
  background: url("../assets/car1.jpeg");
  width: 100%;
  height: 100%;
  position: fixed;
  margin-top: -5px;
  /*上边距*/
  margin-left: -7px;
  /*左边距*/
  background-size: 100% 100%;
}

.contents {
  position: fixed;
}
</style>