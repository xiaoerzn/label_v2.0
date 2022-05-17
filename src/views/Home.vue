<template>
  <div>
    <el-container>
      <!-- img文件列表 -->
      <el-aside width="35%" v-loading="loadingmenu">
        <el-card v-for="item in listdata" :key="item.index" :body-style="{ padding: '0px'}">
          <el-button type="primary" plain @click="getListInfo(item.filename+'__'+item.tag.join('__'))">
            <fileList :listitem="item" :queryInfo="queryInfo"></fileList>
          </el-button>
        </el-card>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :hide-on-single-page="false" :current-page="queryInfo.pagenum" :page-size="queryInfo.eachpage"
          layout="total,prev,pager,next,jumper" :total="sum" background>
        </el-pagination>
      </el-aside>
      <!-- 文件详情 -->
      <el-main v-loading="loadingmain">
        <p>&nbsp;<i class="el-icon-folder-opened"></i>&nbsp;文件名 ：&nbsp;{{this.filename}}&nbsp;<el-divider direction="vertical"></el-divider> <i class="el-icon-picture"></i>&nbsp;图片 ：{{this.imgName}}</p>
        <el-row v-loading="loadingimginfo">
          <el-col :span="12">
            <htmlInfo :code="code" :title="title"></htmlInfo>
          </el-col>
          <el-col :span="12">
            <resInfo :rawData="response" :Server="Server"></resInfo>
          </el-col>
        </el-row>
        <picCard :pics="pics" @viewDetail="getImgInfo(arguments)" @delete_img="removeImg($event)"></picCard>
      </el-main>
    </el-container>
  </div>

</template>

<script>
import fileList from "../components/fileList.vue";
import htmlInfo from "../components/htmlInfo.vue";
import resInfo from "../components/resInfo.vue";
import picCard from "../components/picCard.vue";
export default {
  name: "Home",
  components: {
    fileList,
    htmlInfo,
    resInfo,
    picCard,
  },
  data() {
    return {
      activePath: "",
      sum: 1,
      queryInfo: {
        eachpage: 10,
        pagenum: 1,
      },
      loadingmain: false,
      loadingimginfo: false,
      loadingmenu: false,
      listdata: [],
      code: "",
      response: "",
      pics: [],
      title: "",
      Server: "",
      filename: "",
      imgIp: "",
      imgName: "",
      category: "",
    };
  },
  created() {
    this.getmenuList();
    this.activePath = this.$route.path;
  },
  methods: {
    // ---------------获取列表菜单--------------
    async getmenuList() {
      this.loadingmenu = true;
      const { data: res } = await this.$http.get("page_v2", {
        params: this.queryInfo,
      });
      this.listdata = res.data;
      this.sum = res.sum;
      this.loadingmenu = false;
      // console.log(this.listdata[0].tag);
      // document.getElementsByClassName("list").scrollTop = 0;
    },

    handleSizeChange(newSize) {
      this.queryInfo.eachpage = newSize;
      this.getmenuList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getmenuList();
    },
    // ------------获取列表信息
    async getListInfo(category) {
      this.loadingmain = true;
      this.category = category;
      const { data: res } = await this.$http.get("category_v2", {
        params: { category: category },
      });
      this.filename = category;
      this.listInfo = res;
      // console.log(this.listInfo)
      this.code = this.listInfo.first_pic.code;
      this.title = this.listInfo.first_pic.title;
      this.response = this.listInfo.first_pic.response;
      this.Server = this.listInfo.first_pic.Server;
      this.pics = this.listInfo.pics;
      this.imgName = this.listInfo.pics[0].pic_name;
      this.loadingmain = false;
      // console.log(this.listdata);
      // document.getElementsByClassName("list").scrollTop = 0;
    },

    // -------------------点击图片获取图片详情
    async getImgInfo(data) {
      this.loadingimginfo = true;
      const { data: res } = await this.$http.get("ip", {
        params: { ip: data[0] },
      });
      // this.imgIp=data
      // console.log(res.data)
      this.imgName = data[1];
      this.code = res.data.code;
      this.response = res.data.response;
      this.ImgInfo = res.data;
      this.loadingimginfo = false;
    },

    // -------------------移除图片
    async removeImg(ip) {
      const confirmResult = await this.$confirm(
        "此操作将移除该图片至other文件夹中, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (confirmResult !== "confirm") {
        return this.$message.info("已取消移除！");
      }
      // console.log(ip)
      const { data: res } = await this.$http.get("ipchange_v2", {
        params: { category: this.category, ip: ip, target_file: "" },
      });
      // console.log(res)
      if (res.data !== "移动完成") {
        return this.$message.error("移除失败！请重试");
      }
      this.$message.success("移除成功！");
      this.getmenuList();
      this.getListInfo(this.category);
    },
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-pagination {
  margin-top: 20px;
  float: right;
  padding: 0px 15px 15px 15px;
}
.el-menu-item {
  padding: 0;
}
.el-main {
  padding: 0px 0px 5px 0px;
}
.el-button {
  width: 100%;
  height: 100%;
  line-height: 32px;
}
.el-icon-folder-opened,
.el-icon-picture {
  font-size: 14px; //改变图标大小
  color: #409eff; //设置图标颜色
}
</style>
