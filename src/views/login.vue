<template>
  <div>
    <div class="stars">
      <div v-for="(item,index) in starsCount" :key="index" class="star" ref="star"></div>
        </div>
    <div class="login">
      <el-row>
        <el-col :span="8" :offset="8">
          <div class="form-container">
            <h3 class="form-title">Welcome My Boy</h3>
            <el-form ref="loginForm" :model="loginForm" label-width="0">
              <el-form-item prop="username" :rules="[ { required: true, message: '账号不能为空'}]">
                <div class="form-line">
                  <i class="el-icon-edit-outline input-icon"></i>
                  <el-input name="username" 
                            type="text" 
                            placeholder="账号" 
                            auto-complete="on"
                            v-model="loginForm.username"></el-input>
                </div>
              </el-form-item>
              <el-form-item prop="password" :rules="[ { required: true, message: '密码不能为空'}]">
                <div class="form-line">
                  <i class="el-icon-service input-icon"></i>
                  <el-input name="password"
                            @keyup.enter.native="handleLogin"
                            v-model="loginForm.password"
                            autoComplete="on"
                            type="password" 
                            placeholder="密码"  ></el-input>
                </div>
              </el-form-item>
              <el-row class=form-item>
              <el-col>
                <el-form-item>
                  <el-checkbox class="checkbox">记住账号</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-button type="primary" 
                        icon="el-icon-search" 
                        class="submit-btn" 
                        size="small" 
                        :loading = "loading"
                        @click="handleLogin">
                登 录
              </el-button>
            </el-row>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
//创建前背景设置
beforeCreate () {
      document.querySelector('body').setAttribute('style', 'background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92);background: radial-gradient(200% 105% at top center, #1b2947 10%, #75517d 40%, #e96f92 65%);background-attachment: fixed;overflow: hidden;')
},
//销毁前背景清除
beforeDestroy () {
      document.querySelector('body').removeAttribute('style')
},

data() {
     return{
     starsCount: 800, // 星星数
     distance: 800, // 星星距离
     loginForm: {
          username: '',
          password: '',
        },
      loading: false,
    }
 },
 methods: {
   handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(response => {
              this.loading = false;
              let code = response.data.code;
              if (code == 200) {
                this.$router.push({
                  path: "/success",
                  query: { data: response.data.data }
                });
                this.$message({
                type: 'success',
                message: '登录成功!'
              });
              } else {
                this.$router.push({
                  path: "/error",
                  query: { message: response.data.message }
                });
                this.$message.error('登录失败!');
              }
            })
            .catch(() => {
              
              this.loading = false;
            });
        } else {
          // eslint-disable-next-line no-console
          return false;
        }
      });
    }
 },

 // 背景动态渲染
 mounted(){
   let _this = this
   let starArr = _this.$refs.star
   starArr.forEach(item => {
     var speed = 0.2 + (Math.random() * 1);
     var thisDistance = _this.distance + (Math.random() * 300);
     item.style.transformOrigin = `0 0 ${thisDistance}px`;
     item.style.transform = `translate3d(0,0,-${thisDistance}px) rotateY(${(Math.random() * 360)}deg) rotateX(${(Math.random() * -50)}deg) scale(${speed},${speed})`

   })
 }
}

</script>

<style lang="less" scoped>

// 动画
@keyframes rotate{
    0%{
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
    }
    100%{
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
    }
}
  // 背景星星
.stars{
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: absolute;
  perspective-origin: 50% 100%;
  left: 50%;
  animation: rotate 90s infinite linear;
  bottom: 0;
}
  // 星星样式
.star{
  width: 2px;
  height: 2px;
  background: #f7f7b8;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
}

// 表单样式
  .form-container {
    display: flex;
    margin-top: 30%;
    min-height: 50px;
    margin-bottom: 20px;
    line-height: 50px;
    justify-content: center;
    flex-direction: column;
    padding: 30px 40px;
    border-radius: 15px;
    box-shadow: 1px 1px 2px #fff;
    background-color: rgba(0,0,0,0.2);
    
  }
  // 账号密码提示框样式
  .form-line {
    position: relative;
    display: flex;
    align-items: center;
    &:after {
      content: '';
      position: absolute;
      bottom: 3px;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      border-width: 1px;
      border-style: solid;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-color: #dcdcdc;
      border-radius: 0;
    }
  }
  // 提示图标样式
  .input-icon {
    color: #999;
    margin-right: 6px;
  }
  // 登录按钮样式
  .submit-btn {
    margin-bottom: 25px;
    width: 100%;
    background: rgba(0,0,0,0.5);
    border-radius: 18px;
  }
  // 标题样式
  .form-title {
    margin: 0 0 20px;
    text-align: center;
    color: #aaa1ce;
    letter-spacing: 2px;
  }
</style>