<template>
  <div>
    <Header :title="'博客详情页'" style="width: 840px; margin-left: 23.5%" />

    <el-card style="width: 800px; margin-left: 25%">
      <h2 style="text-align: center">{{ con.title }}</h2>

      <p v-html="con.content"></p>
      <img
        id="dianzan"
        style="width: 15px; margin-left: 70%; cursor: pointer"
        :src="dianzanImg"
        alt=""
        @click="
          isDianZan(
            con.id,
            !dianzantype,
            1,
            dianzantype == true ? con.praise-- : con.praise++
          )
        "
      />
      <span>{{ con.praise }}</span
      >&emsp;&emsp;
      <img
        id="buzan"
        style="width: 15px; cursor: pointer"
        :src="buzanImg"
        alt=""
        @click="
          isDianZan(
            con.id,
            !buzantype,
            0,
            buzantype == true ? con.unpraise-- : con.unpraise++
          )
        "
      /><span>{{ con.unpraise }}</span>
      &ensp;&ensp;
      <a href="">{{ con.username }}</a>
      &ensp;&ensp;
      <i
        id="star"
        style="cursor: pointer"
        :class="collectionType"
        @click="changeType(!starType, con.id)"
      ></i>
    </el-card>
    <el-divider style="width: 500px"></el-divider>
    <el-card class="box-card" style="width: 800px; margin-left: 25%">
      <div class="clearfix">
        <span>评论</span>
        <el-input v-model="comment" placeholder="请输入内容"></el-input>
        <el-button
          @click="addComment(con.id)"
          style="float: right; padding: 3px 0"
          type="text"
          >发表评论</el-button
        >
      </div>
    </el-card>

    <div v-for="comment in comments" :key="comment.id">
      <el-card class="box-card" style="width: 800px; margin-left: 25%">
        <div class="clearfix">
          <span style="font-size: 25px; color: gray">{{
            comment.username
          }}</span>
          &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
          <span style="font-size: 15px; color: gray">{{
            comment.commentDate
          }}</span>
          <br /><br />&ensp;&ensp;&ensp;&ensp;&ensp;
          <span style="font-size: 22px; color: #ff0099">{{
            comment.comment
          }}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import buzan from "../assets/buzan.jpg";
import dianzan from "../assets/dianzan.jpg";
import yibudianzan from "../assets/yibudianzan.jpg";
import yidianzan from "../assets/yidianzan.jpg";
import Header from "../components/Header.vue";
export default {
  name: "BlogDetail",
  components: {
    Header,
  },
  data() {
    return {
      con: "",
      collectionType: "el-icon-star-off",
      starType: false,
      starColor: "",
      comment: "",
      comments: "",
      dianzanImg: dianzan,
      buzanImg: buzan,
      dianzantype: false,
      buzantype: false,
    };
  },
  methods: {
    isDianZan(contentId, s, status) {
      let formdata = new FormData();
      formdata.append("userId", JSON.parse(localStorage.getItem("user")).id);
      formdata.append("contentId", contentId);
      if (status === 0) {
        //操作不赞
        if (s) {
          //踩
          formdata.append("status", 2);
          this.buzantype = true;
          this.buzanImg = yibudianzan;
          this.dianzanImg = dianzan;
          this.dianzantype = false;
          this.$axs
            .post("http://localhost:8878/pro/dianzan/addDianZan", formdata)
            .then((val) => {
              if (val.code === 401) {
                localStorage.removeItem('token')
                this.$router.push("/");
              }
            });

          this.$axs
            .post("http://localhost:8878/pro/blog/updateUnPraise", formdata)
            .then((val) => {
              if (val.code === 401) {
                localStorage.removeItem('token')
                this.$router.push("/");
              }
            });
        } else {
          //不踩
          formdata.append("status", 0);
          this.buzantype = false;
          this.buzanImg = buzan;
          //this.buzanImg = "../assets/buzan.jpg";
          this.$axs
            .post("http://localhost:8878/pro/dianzan/addDianZan", formdata)
            .then((val) => {
              if (val.code === 401) {
                localStorage.removeItem('token')
                this.$router.push("/");
              }
            });

          this.$axs
            .post("http://localhost:8878/pro/blog/decUnPraise", formdata)
            .then((val) => {
              if (val.code === 401) {
                localStorage.removeItem('token')
                this.$router.push("/");
              }
            });
        }
      } else {
        //操作点赞
        if (s) {
          //点赞
          formdata.append("status", 1);
          this.dianzantype = true;
          this.dianzanImg = yidianzan;
          this.buzanImg = buzan;
          this.buzantype = false;
          this.$axs
            .post("http://localhost:8878/pro/dianzan/addDianZan", formdata)
            .then((val) => {
              if (val.code === 401) {
                localStorage.removeItem('token')
                this.$router.push("/");
              }
            });

          this.$axs
            .post("http://localhost:8878/pro/blog/updatePraise", formdata)
            .then((val) => {
              if (val.code === 401) {
                localStorage.removeItem('token')
                this.$router.push("/");
              }
            });
        } else {
          //取消点赞
          formdata.append("status", 0);
          this.dianzantype = false;
          this.dianzanImg = dianzan;
          this.$axs
            .post("http://localhost:8878/pro/dianzan/addDianZan", formdata)
            .then((val) => {
              if (val.code === 401) {
                localStorage.removeItem('token')
                this.$router.push("/");
              }
            });

          this.$axs
            .post("http://localhost:8878/pro/blog/decPraise", formdata)
            .then((val) => {
              if (val.code === 401) {
                localStorage.removeItem('token')
                this.$router.push("/");
              }
            });
        }
      }
    },
    addComment(contentId) {
      let formdata = new FormData();
      formdata.append("userId", JSON.parse(localStorage.getItem("user")).id);
      formdata.append("contentId", contentId);
      formdata.append("comment", this.comment);
      this.$axs
        .post("http://localhost:8878/pro/comment/addComment", formdata)
        .then((val) => {
          if (val.code === 401) {
            localStorage.removeItem('token')
            this.$router.push("/");
          }
          if (val.code === 200) {
            alert("添加成功");
            this.$axs
              .post("http://localhost:8878/pro/comment/getComments", formdata)
              .then((val) => {
                if (val.code === 401) {
                  localStorage.removeItem('token')
                  this.$router.push("/");
                } else {
                  this.comments = val.data;
                }
              });
          }
        });
    },
    changeType(s, id) {
      let formdata = new FormData();
      formdata.append("contentId", id);
      formdata.append("userId", JSON.parse(localStorage.getItem("user")).id);
      if (s) {
        document.getElementById("star").style.color = "yellow";
        document.getElementById("star").class = "el-icon-star-on";
        this.starType = true;

        this.$axs
          .post("http://localhost:8878/pro/collection/addCol", formdata)
          .then((val) => {
            if (val.code === 401) {
              localStorage.removeItem('token')
              this.$router.push("/");
            }
          });
      } else {
        this.starType = false;
        document.getElementById("star").style.color = "black";
        document.getElementById("star").class = "el-icon-star-off";
        this.$axs
          .post("http://localhost:8878/pro/collection/delCol", formdata)
          .then((val) => {
            if (val.code === 401) {
              localStorage.removeItem('token')
              this.$router.push("/");
            }
          });
      }
    },
  },
  mounted() {
    this.con = this.$route.query.con;

    let formdata = new FormData();
    formdata.append("userId", JSON.parse(localStorage.getItem("user")).id);
    formdata.append("contentId", this.$route.query.con.id);

    this.$axs
      .post("http://localhost:8878/pro/dianzan/isDianZan", formdata)
      .then((val) => {
        if (val.code === 401) {
          localStorage.removeItem('token')
          this.$router.push("/");
        }
        if (val.code === 505) {
          this.dianzanImg = dianzan;
        } else if (val.code === 202) {
          this.dianzanImg = yidianzan;
          this.dianzantype = true;
        } else {
          this.buzanImg = yibudianzan;
          this.buzantype = true;
        }
      });

    this.$axs
      .post("http://localhost:8878/pro/comment/getComments", formdata)
      .then((val) => {
        if (val.code === 401) {
          this.$router.push("/");
        } else {
          this.comments = val.data;
        }
      });

    this.$axs
      .post("http://localhost:8878/pro/collection/isCol", formdata)
      .then((val) => {
        if (val.code === 401) {
          this.$router.push("/");
        }
        if (val.code == 202) {
          this.starType = false;
          document.getElementById("star").style.color = "black";
          document.getElementById("star").class = "el-icon-star-off";
        } else {
          this.starType = true;
          document.getElementById("star").style.color = "yellow";
          document.getElementById("star").class = "el-icon-star-on";
        }
      });
  },
};
</script>

<style scope>
</style>