<template>
  <div class="background">
    <h1 class="h1">Welcome My {{msg}} !</h1>
    <el-row>
      <el-col :span="18" :offset="3">
        <div class="grid-content">
          <el-input placeholder="Something I want to tell you" class="input"></el-input>
          </div></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: this.$route.query.data
    };
  },
}
</script>
<style scoped>
body{
  margin:0;
  padding:0;
}
.background{
  width: 100%;
  height: 100%;
  background-image: url(../assets/bk.jpg);
  border-radius: 10px;
  position: fixed;
}
.h1{
  text-align: center;
  color: #aaa1ce;
}
.grid-content {
    border-radius: 15px;
    min-height: 100vh;
    margin: 0;
    background-color: rgba(0,0,0,0.1);
  }
  .input{
    width: 500px;
    align-items: center;
    
  }
</style>