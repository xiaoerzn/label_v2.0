<template>
  <div class="imglist">
    <div v-for="item in pics" :key="item.index">
      <img class="img" :src="item.pic_url" alt="图片错误"  @click.stop.prevent="view_detail(item.pic_ip,item.pic_name)">
      <el-button circle type="danger" icon="el-icon-close" size="mini"  @click.stop.prevent="delete_img(item.pic_ip)"></el-button>
      <p>{{item.pic_name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["pics"],
  data() {
    return {

    };
  },
  methods: {
    view_detail(ip,name) {
      // console.log(ip,name)
      this.$emit('viewDetail',ip,name);
    },
    delete_img(params) {
      // console.log(params)
      this.$emit('delete_img',params);
    },
  },
};
</script>


<style lang="less" scoped>
.imglist {
  overflow: auto;
  height: 410px;
  display: flex;
  flex-wrap: wrap;
  background-color: #ebeef5;
  padding: 10px;
  div {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    p {
      margin: 0px 0px 13px 0;
    }
  }
}
.img {
  width: 380px;
  height: 230px;
  border-radius: 10px;
  margin: 10px;
}
.el-button {
  position: absolute;
  top: 0px;
  right: 0px;
  // width: 50px;
  // height: 50px;
  // display: none;
}
</style>
