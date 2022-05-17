<template>

  <el-card :body-style="{ padding: '10px', height: '340px' }">
    <div slot="header">
      <el-row>
        <el-col :span="12" style="lineHeight:21px">
          <i class="el-icon-chat-dot-square" style="color:red;fontSize:20px"></i>&nbsp;&nbsp;<strong>Response</strong>
        </el-col>
        <el-col :span="12" >
          <el-input  v-model.trim="searchword" placeholder="请输入搜索关键字" @keydown.enter.native="search">
            <!-- 搜索按钮 -->
            <el-button type="primary" @click="search()" slot="append" icon="el-icon-search">搜索</el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <p class="content" v-html="showData"></p>
    <p > Server : {{Server}}</p>
  </el-card>

</template>

<script>
export default {
  props: ["rawData","Server"],
  data() {
    return {
      searchword: "",
      showData: "",
      // rawData: "",
      // rawData: "一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。小草偷偷地从土里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻悄悄的，草软绵绵的。桃树、杏树、梨树，你不让我，我不让你，都开满了花赶趟儿。红的像火，粉的像霞，白的像雪。花里带着甜味儿；闭了眼，树上仿佛已经满是桃儿、杏儿、梨儿。花下成千成百的蜜蜂嗡嗡地闹着，大小的蝴蝶飞来飞去。野花遍地是：杂样儿，有名字的，没名字的，散在草丛里，像眼睛，像星星，还眨呀眨的。一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。小草偷偷地从土里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻悄悄的，草软绵绵的。桃树、杏树、梨树，你不让我，我不让你，都开满了花赶趟儿。红的像火，粉的像霞，白的像雪。花里带着甜味儿；闭了眼，树上仿佛已经满是桃儿、杏儿、梨儿。花下成千成百的蜜蜂嗡嗡地闹着，大小的蝴蝶飞来飞去。野花遍地是：杂样儿，有名字的，没名字的，散在草丛里，像眼睛，像星星，还眨呀眨的。",
    };
  },

  components: {},
  computed: {
    // 实时监听表格
  },
  created() {
    // this.getresponse();
  },
  // 监视器
  watch: {
        rawData(newword, oldword) {
      //如果输入的关键字为空，渲染原始数据
      this.showData=newword
    },
    searchword(newsearchword, oldsearchword) {
      //如果输入的关键字为空，渲染原始数据
      if (!newsearchword) this.showData = this.rawData;
    },
  },

  mounted() {},

  methods: {
    // 筛选变色
    search() {
      // 如果未输入关键字给出提示
      if (!this.searchword) {
        this.$message({
          message: "请先输入搜索内容！",
          type: "warning",
        });
        // 不在向下进行
        return;
      }
      this.showData = this.lightHigh(
        this.rawData,
        this.searchword,
        "#409EFF",
        "#fff"
      );
    },

    lightHigh(content, searchword, bgcolor, color) {
      //new Set 把关键字在整个内容里进行对筛选
      let resArr = [...new Set(content.match(searchword))];
      //把筛选出来的关键字遍历
      resArr.forEach((item) => {
        //全局搜索关键字
        let reg = new RegExp(item, "g");
        content = content.replace(
          reg,
          `<span style="background:${bgcolor};color:${color}">` +
            item +
            "</span>"
        );
      });
      return content;
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  height:300px;
  color: #676f77;
  overflow: auto;
  line-height: 1.3;
  white-space: pre-wrap;
  margin: 0;
  font-size: 14px;
}
.el-card /deep/ .el-card__header {
  height: 58px;
}

</style>
