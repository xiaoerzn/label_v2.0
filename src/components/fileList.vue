<template>
<div>
  <el-row class="colhead">
    <el-col :span="14" style="fontSize:14px;textAlign:left">
      <i class="el-icon-folder"></i>&nbsp;{{listitem.filename}}<span v-for="tagitem in dynamicTags" :key="tagitem.index">__{{tagitem}}</span>
    </el-col>
    <el-col :span="10" style="textAlign:right">
      <el-tag :key="tag.index" v-for="tag in listitem.tag" closable :disable-transitions="false" @close="handleClose(tag)" size="mini">
        {{tag}}
      </el-tag>
      <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
      </el-input>
      <el-button v-else class="button-new-tag" size="mini" @click.stop.prevent="showInput">+ tag</el-button>
    </el-col>
  </el-row>
</div>
</template>
<script>
export default {
  props: ["listitem"],
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      activeName: "1",
    };
  },
  computed: {
    dynamicTags_copy() {
      return JSON.parse(JSON.stringify(this.dynamicTags));
    },
  },
  watch: {
    dynamicTags_copy(newword, oldword) {
      this.TagPost(newword, oldword);
      // console.log("new:" + newword, "old:" + oldword);
    },
  },
  created() {
    this.dynamicTags = this.listitem.tag;

  },
  methods: {
    TagPost(newword, oldword) {
      this.$http
        .post("change", {
          category: this.listitem.filename,
          oldtag: oldword,
          newtag: newword,
        })
        .then((res) => {});
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        // console.log(this.$refs)
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style lang="less" scoped>

.el-tag + .el-tag {
  margin-left: 10px;

}
.button-new-tag {
  // margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  // margin-left: 10px;
  vertical-align: bottom;
}
.el-row {
  width: 100%;
}
.img {
  width: 400px;
  height: 250px;
  border-radius: 10px;
  margin: 10px;
}

.el-icon-folder {
  font-size: 14px; //改变图标大小

  color: #409eff; //设置图标颜色
  margin-right: 0;
}
.imglist {
  display: flex;
  flex-wrap: wrap;
  background-color: #ebeef5;
  padding: 10px;
  div {
    display: flex;
    align-items: center;
    flex-direction: column;

    p {
      margin: 0px 0px 13px 0;
    }
  }
}
</style>