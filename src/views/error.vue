<template>
  <div>
    <h1>登录错误：{{msg}}</h1>
      <el-button @click="loginpage">返回登录</el-button>
  </div>

</template>
<script>
export default {
  data() {
    return {
      msg: null
    };
  },
  methods: {
    loginpage() {
      window.location.replace("@views/login")
    }
  },
  created() {
    this.msg = this.$route.query.message;
  }
};
</script>