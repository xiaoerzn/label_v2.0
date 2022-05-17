<template>
  <el-card :body-style="{ padding: '10px', height: '340px' }">
    <div slot="header">
      <i class="el-icon-document" style="color:red;fontSize:20px"></i>&nbsp;&nbsp;<strong>sourcecode</strong>
    </div>
    <prism-editor class="my-editor height" v-model="code" :highlight="highlighter" :line-numbers="lineNumbers"></prism-editor>
    <p >Title : {{this.title}}</p>
  </el-card>
</template>

<script>
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere
// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
  props: ["code","title"],
  components: {
    PrismEditor,
  },
  data: () => ({
    lineNumbers: false,
    // code: '<html><head>\n<title>Login</title>\n</head>\n<body class="">\n<table border="0" cellpadding="0" cellspacing="0" align="center" class="loginsubtable">\n<form enctype="multipart/form-data" id="loginform" method="post" action="/login.cgi"></form>\n\t<tbody><tr>\n\t\t<td valign="top"><img src="/210818.1959/images/airos_logo.png"></td>\n\t\t<td class="loginsep">\n\t\t\t\t<input type="hidden" name="uri" id="uri" value="/index.cgi">\n\t\t\t\t<table border="0" cellpadding="0" cellspacing="0" class="logintable" align="center">\n\t\t\t\t\t<tbody><tr>\n\t\t\t\t\t\t<td colspan="2" align="center">\n\t\t\t\t\t\t\t<div id="errmsg" class="error">\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td colspan="2">&nbsp;</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td><label for="username">User Name:</label></td>\n\t\t\t\t\t\t<td><input class="config" type="text" name="username" id="username"></td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td><label for="password">Password:</label></td>\n\t\t\t\t\t\t<td><input class="config" type="password" name="password" id="password"></td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td colspan="2">&nbsp;</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody></table>\n\t\t</td>\n\t</tr>\n\n\t\n\n        <tr>\n\t\t<td colspan="2" class="submit" align="right">\n\t\t\t<input type="submit" value="Login">\n\t\t</td>\n\t</tr>\n\n</tbody></table>\n\n\n\n</body></html>',
  }),
  methods: {
    highlighter(code) {
      return highlight(code, languages.js); //returns html
    },
  },
};
</script>

<style lang="less" >
.my-editor {
  background: #2d2d2d;
  color: #ccc;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  /* padding: 5px; */
}

/* optional */
.prism-editor__textarea:focus {
  outline: none;
}

/* not required: */
.height {
  height: 300px;
}

</style>
