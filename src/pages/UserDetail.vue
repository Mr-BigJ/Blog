<template>
  <div>
    <Header :title="'用户详情页'" style="width: 840px; margin-left: 23.5%">
    </Header>

    <div class="detail1">
      <el-upload
        action="http://localhost:8878/pro/user/uploadAvatar"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :data="user"
      >
        <el-button size="small" type="primary">点击上传头像</el-button>
        <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
      </el-upload>

      <span style="font-size: 20px">{{ curUserName }}</span>
      <br />
      <span>{{ sumLook.sumlook }}访问</span>
      <el-divider direction="vertical"></el-divider>
      <span style="color: green; cursor: pointer" @click="gotoSort()"
        >{{ rank }}排名</span
      >
      
      <el-divider direction="vertical"></el-divider>
      <span>{{ sumLook.sumpraise }}获赞</span>
      <el-divider direction="vertical"></el-divider>
      <span>{{ sumLook.sumcomment }}评论</span>
      <el-divider direction="vertical"></el-divider>
      <span v-show="localName == curUserName ? true : false">{{ sumCollection }}收藏</span>
      <el-divider direction="vertical"></el-divider>

      <span>加入时间{{ createTime }}</span>
    </div>
    <div>
      <el-menu
        style="margin-left: 25%; width: 800px"
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect(index)"
        :router="false"
      >
        <el-menu-item index="1" @click="(activeIndex = '1'), getMyBlogs()"
          >我的文章</el-menu-item
        >
        <el-menu-item index="2" @click="(activeIndex = '2'), getRecentBlogs()"
          >最近访问</el-menu-item
        >

        <el-menu-item index="3" disabled>视频</el-menu-item>
        <el-menu-item index="4">订单管理</el-menu-item>
      </el-menu>
      <div>
        <List :fullcontent="contents" :userName="username"></List>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import BlogList from "./BlogList";
import List from "../components/List.vue";
export default {
  name: "UserDetail",
  components: {
    Header,
    BlogList,
    List,
  },
  data() {
    return {
      
      contents: [],
      avatarUrl: "",
      user: "",
      activeIndex: "1",
      sumLook: '',
      sumPraise: 0,
      sumComment: 0,
      sumCollection: 0,
      sumStar: 0,
      userForm: new FormData(),
      curUserName: '',
      rank:0,
      rankName:'',
      localName:JSON.parse(localStorage.getItem("user")).username
    };
  },
  methods: {
    gotoSort() {
      this.$router.push("/userSort");
    },

    // beforeFresh() {
    //   localStorage.setItem("userId", this.$store.state.BlogList.userInfo);
    //   localStorage.setItem("page", 1);
    // },
    // onFresh() {
    //   this.userForm.append("userId", localStorage.getItem("userId"));
    //   this.userForm.append("page", localStorage.getItem("page"));
    // },
    // afterFresh() {
    //   this.userForm.append("userId", localStorage.getItem("userId"));
    //   this.userForm.append("page", localStorage.getItem("page"));
    // },
    getMyBlogs() {
      var formdata = new FormData();
      formdata.append("username", this.$route.query.curUserName);
      this.$axs
        .post(`http://localhost:8878/pro/blog/getMyBlogs`, formdata)
        .then((val) => {
          if (val.code === 401) {
            localStorage.removeItem('token')
        this.$router.push("/");
      }else{
this.contents = val.data.contents;
      }
          
        });
    },
    getRecentBlogs() {
      var formdata = new FormData();
      formdata.append("username", this.$route.query.curUserName);
      this.$axs
        .post(`http://localhost:8878/pro/blog/getRecentBlogs`, formdata)
        .then((val) => {
          if (val.code === 401) {
            localStorage.removeItem('token')
        this.$router.push("/");
      }else{
this.contents = val.data;
      }
          
        });
    },
    handleAvatarSuccess(res, file) {
      this.avatarImg = URL.createObjectURL(file.raw);
      this.avatarUrl = res.data;
      let user = JSON.parse(localStorage.getItem("user"));
      user.avatar = res.data;
      this.$addStorageValue("user", JSON.stringify(user));
      //console.log(JSON.stringify(user))
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  beforeMount() {},
  created() {},
  beforeRouteEnter(to, from, next) {
    console.log(to, from); // 可以拿到 from， 知道上一个路由是什么，从而进行判断
    //在next中写处理函数
    next(() => {
      if (from.path === "/blogedit") {
        console.log(from.path);
        console.log();
      }
    }); // err 与 12134 是随便传的值， 可忽略
  },

  mounted() {
    this.curUserName = this.$route.query.curUserName;
    this.rankName = this.$route.query.rankUser
    let getRankForm = new FormData()
    getRankForm.append("username",this.rankName)

    this.userForm.append("username", this.curUserName);

    this.$axs
      .post(`http://localhost:8878/pro/user/getRank`, getRankForm)
      .then((val) => {
        if (val.code === 401) {
          localStorage.removeItem('token')
        this.$router.push("/");
      }else{
        this.rank = val.data;
      }
      });


    this.$axs
      .post(`http://localhost:8878/pro/blog/getMyBlogs`, this.userForm)
      .then((val) => {
        if (val.code === 401) {
        this.$router.push("/");
      }else{
        this.contents = val.data.contents;
      }
      });

    this.$axs
      .post(`http://localhost:8878/pro/user/sumLook`, this.userForm)
      .then((val) => {
        if (val.code === 401) {
        this.$router.push("/");
      }else{
        this.sumLook = val.data;
      }
      });

    

    this.$axs
      .post(`http://localhost:8878/pro/collection/sumCollection`, this.userForm)
      .then((val) => {
        if (val.code === 401) {
        this.$router.push("/");
      }
        this.sumCollection = val.data;
      });

    

    this.$axs
      .post(`http://localhost:8878/pro/user/getUserInfo`, this.userForm)
      .then((val) => {
        this.user = val.data;
      });
  },

  computed: {
    createTime() {
      return (
        this.user.created.substring(0, 4) +
        "年" +
        this.user.created.substring(4, 6) +
        "月" +
        this.user.created.substring(6, 8) +
        "日"
      );
    },
  },
  directives: {
    autoclick: {
      // inserted(el,binding){
      //   if(binding.value === "1"){
      //     el.click()
      //   }
      // },
      // bind(el,binding){
      //   if(binding.value === "1"){
      //     el.click()
      //   }
      // },
      // update(el,binding){
      //   if(binding.value === "1"){
      //     el.click()
      //   }
      // }
    },
  },
};
</script>

<style scoped>
.detail1 {
  background-color: rgb(255, 255, 255);
  margin-left: 25%;
  width: 800px;
  margin-top: 10px;
}

.avatar-uploader .el-upload {
  border: 2px dashed #bd5555;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #518ee2;
  width: 108px;
  height: 108px;
  line-height: 108px;
  text-align: center;
}
.avatar {
  width: 108px;
  height: 108px;
  display: block;
}
</style>