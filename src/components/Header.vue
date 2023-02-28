<template>
  <div>
    <el-container :style="{width:windowWidth * 0.42 + 'px','border-radius':20+'px'}">
      <div style="color: green;font-size: 30px;"><i class="el-icon-s-home" style="cursor: pointer;" @click="goBack"></i>
      </div>

      &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
      <span style="margin-top:6px;cursor:pointer;color:red;font-size: large;"
        @click="$router.push('/userSort')">用户排行榜</span>
      &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
      &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;

      <span style="margin-top:6px;font-size: large;">{{ title }}</span>
      &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
      <input v-model="searchInfo" type="text" style="width:60px;height:30px;margin-top:3px">
      <el-button @click="search()" size="small" style="height:40px;" icon="el-icon-search" circle></el-button>

      
      <el-popover placement="top-start" width="200" trigger="hover" style="margin-left: 20%; text-align: center">

          <el-image :src="avatarImg" slot="reference" @click="goto" style="width: 30px;" :fit='fit' />

        
        <h4>{{ username }}</h4>


        <el-divider></el-divider>
        <el-button style="width: 100%; background-color: pink; color: black" type="primary"
          @click="goto">个人中心</el-button><br />
        <el-button style="width: 100%; background-color: #ffccaa; color: black" type="primary"
          @click="$router.push('/blogedit')">写文章</el-button>
        <br />
        <el-button style="width: 100%; background-color: #556677; color: black" type="primary"
          @click="showCollecton(userId)">收藏夹</el-button>

        <span style="color:#218126;cursor:pointer" @click="signOut">退出登录</span>
      </el-popover>
    </el-container>

    <el-dialog title="收藏夹" :visible.sync="showDialog" width="70%" :before-close="handleClose">
      <List style="margin-left:-20%" :fullcontent="myCol"></List>
    </el-dialog>


  </div>


</template>

<script>
import List from './List.vue'
export default {
  name: "Header",
  components: { List },
  data() {
    return {
      windowWidth: document.documentElement.clientWidth,  //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight,   //实时屏幕高度
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      avatarImg: JSON.parse(localStorage.getItem("user")).avatar,
      username: JSON.parse(localStorage.getItem("user")).username,
      userId: JSON.parse(localStorage.getItem("user")).id,
      searchInfo: '',
      showDialog: false,
      myCol: ''
    };
  },
  props: ['title'],
  methods: {
    signOut() {
      localStorage.clear()
      this.$router.push('/')
    },
    showCollecton(id) {
      let formdata = new FormData()
      formdata.append("userId", id)
      this.$axs.post("http://localhost:8878/pro/collection/getMyCol", formdata)
        .then((val) => {
          if (val.code === 303) {
            alert("您没有收藏的文章")
          } else if (val.code === 401) {
            localStorage.removeItem('token')
            this.$router.push("/")
          } else {
            this.myCol = val.data
            this.showDialog = true
          }

        })
    },
    search() {
      if(this.searchInfo == "" | this.searchInfo.trim() == ""){
        localStorage.removeItem("searchStr")
        var page = new FormData();
        page.append("pageNo", 1);
        this.$axs
          .post(`http://localhost:8878/pro/blog/content`, page)
          .then((val) => {
            if (val.code === 401) {
              localStorage.removeItem("token");
              alert("請重新登錄");
              this.$router.push("/");
            } else {
              this.$emit("searchInfo", val)
            }
          });
        alert("请填写关键字")
        return
      }
      localStorage.setItem("searchStr",this.searchInfo)
      let formdata = new FormData()
      formdata.append("searchInfo", this.searchInfo)
      formdata.append("page", 1)
      if (this.$route.path === '/blogList') {
        this.$axs.post("http://localhost:8878/pro/blog/search", formdata)
          .then((val) => {
            if (val.code === 401) {
              this.$router.push("/")
            }
            else {
              this.$emit("searchInfo", val)
            }

          })
      } else if (this.$route.path === '/userSort') {
        this.$axs.post("http://localhost:8878/pro/user/search", formdata)
          .then((val) => {
            if (val.code === 401) {
              this.$router.push("/")
            } else {
              this.$emit("searchInfo", val)
            }
          })
      }

    },
    goBack() {
      this.$router.push("/");
    },
    goto() {
      if (
        localStorage.getItem("token") == null ||
        localStorage.getItem("token") == ""
      ) {
        this.$router.push("/login");
      } else {
        this.$router.push({
          path: "/myDetail",
          query: {
            curUserName: JSON.parse(localStorage.getItem("user")).username
          },
        });
      }
    },

  },
  mounted() {
    window.addEventListener("setItem", (e) => {
      this.avatarImg = JSON.parse(e.newValue).avatar;
    });
  },
};
</script>

<style scope>
.el-container {
  background-color: rgb(248, 240, 240);
  position: relative;
  bottom: 3px;

}

h3 {
  text-align: center;
  margin-top: 5px;
  margin-left: 37%;
}

h4 {
  margin-top: 0px;
  text-align: center;
}

i {
  margin-top: 5px;
  width: 20px;
}
</style>