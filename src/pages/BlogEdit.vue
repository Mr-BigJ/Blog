<template>
  <div>
    <Header :title="' 编辑文章 '" style="width: 840px; margin-left: 23.5%" />

    <md-card style="height:100px">
      <md-card-actions >
      <div class="md-subhead" style="width: 800px; margin-left: 25%">
        <el-input
          class="input"
          style="width:400px;white-space:nowrap;  margin-left: 25%;"
          v-model="title"
          placeholder="请输入标题"
        ></el-input>
        <el-input
          class="input"
          v-model="summary"
          placeholder="请输入文章主要内容"
        ></el-input>
      </div>
      </md-card-actions>
      <md-card-media >
        <div class="quill-editor-example"  >
          <!-- quill-editor -->
          <quill-editor
            style="width: 800px; margin-left: 25%;"
            v-model="content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
          >
          </quill-editor>
        </div>
      </md-card-media>
    </md-card>
    <el-upload
      ref="uploadImg"
      class="avatar-uploader"
      action="http://localhost:8878/pro/blog/uploadContentImg"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <el-button id="uploadBtn" v-show="flase" size="small" type="primary"
        >点击上传头像</el-button
      >
      <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
    </el-upload>

    <el-dialog
      title="提示"
      :visible.sync="showDialog"
      width="30%"
      :before-close="handleClose"
    >
      <span
        v-show="successData == '添加成功' ? true : false"
        style="color: green"
        >{{ successData }}</span
      >
      <span
        v-show="successData == '添加失败' ? true : false"
        style="color: red"
        >{{ successData }}</span
      >
    </el-dialog>

    <div class="myfooter">
      <p style="margin-left: 100px; padding-top: 10px">
         &nbsp;&nbsp; 
        <el-button
          type="primary"
          style="margin-left: 25%"
          plain
          @click="addOne()"
          >发布</el-button
        >
      </p>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Quill from "quill";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);
import hljs from "highlight.js";

export default {
  name: "blogEdit",
  components: {
    Header,
    quillEditor,
  },
  data() {
    return {
      // name: "register-modules-example",
      content: "", //富文本的内容
      title: "",
      summary: "",
      sum: 0,
      showDialog: false,
      successData: "",
      name: "",
      imgUrl: "",
      editorOption: {
        modules: {
          toolbar: {
            container: [
              ["bold", "italic"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction
              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],
              ["clean"],
            ],
            handlers: {
              image: function (value) {
                if (value) {
                  document.getElementById("uploadBtn").click();
                  // upload点击上传事件
                  //document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format("image", false);
                }
              },
            },
          },
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false,
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
            },
            modules: ["Resize", "DisplaySize", "Toolbar"],
          },
        },
      },
    };
  },
  methods: {
    addOne() {
      var contentData = new FormData();
      contentData.append("content", this.content);
      contentData.append("title", this.title);
      contentData.append("description", this.summary);
      contentData.append("userId", JSON.parse(localStorage.getItem("user")).id);
      contentData.append(
        "username",
        JSON.parse(localStorage.getItem("user")).username
      );
      this.$axs
        .post("http://localhost:8878/pro/blog/addOne", contentData)
        .then((val) => {
          if (val.code === 401) {
          localStorage.removeItem('token')
          this.$router.push("/");
          }
          if (val.code === 200) {
            this.successData = val.msg;
            this.showDialog = true;
            setTimeout(() => {
              this.showDialog = false;
            }, 1000);
            
            this.$router.push({
              path:'/userDetail',
              query:{
                curUserName:JSON.parse(localStorage.getItem('user')).username
              }
            });
          }
        });
    },
    onEditorReady() {
      // 富文本准备时的事件
    },
    onEditorFocus(val, editor) {
      // 富文本获得焦点时的事件
      console.log(val); // 富文本获得焦点时的内容
      //editor.enable(false); // 在获取焦点的时候禁用
    },
    onEditorBlur(val) {
      // 富文本失去焦点时的事件
      console.log(val); // 富文本失去焦点时的内容
    },
    onContentChange(val) {
      // 富文本内容改变时的事件
      this.sum = this.content.length;
      console.log(this.sum); // 富文本改变时的内容
    },

    handleAvatarSuccess(res, file) {
      this.imgUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  watch: {
    imgUrl() {
      this.content = this.content + `<img src='${this.imgUrl}'>`;
    },
  },
  mounted() {},
  beforeDestroy() {
    
  },
  destroyed() {},
};
</script>

<style>
.myfooter {
  position: absolute;
  height: 80px;
  background-color: rgb(233, 232, 232);
  bottom: 10px;
  width: 800px;
  margin-left: 24.6%;
  margin-top: 20px;
}
.quill-editor:not(.bubble) .ql-container,
.quill-editor:not(.bubble) .ql-container .ql-editor {
  height: 30rem;
  height: 400px;
  padding-bottom: 1rem;

}
</style>


