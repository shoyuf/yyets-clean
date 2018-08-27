<style scoped>
.outer{
  position: fixed;
  z-index: 2001;
  top:0;
  left:0;
  bottom:0;
  right:0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inner{
  min-height: 338px;
  max-width: 440px;
  min-width: 320px;
  width: calc(100% - 40px);
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(0,0,0,.55);
  border: 1px solid rgba(0,0,0,.4);
  padding: 30px;
  box-sizing: border-box;
  position: relative;
}
.el-icon-close{
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
}
.el-icon-close:hover{
  color:#f34f4f;
}
</style>

<template>
  <div class="outer">
    <div class="inner" v-loading="loading">
      <i class="el-icon-close" @click="$emit('close');"></i>
      <el-form label-position="top" label-width="80px" :model="form" ref="form" :rules="rules">
        <el-form-item label="用户名" prop="username" required>
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" required>
          <el-tooltip content="本应用承诺不会收集您的账号密码，请放心使用。" placement="top" slot="label">
            <span>密码<i class="el-icon-question"></i></span>
          </el-tooltip>
          <el-input v-model="form.password" type="password" @keyup.enter.native="onLogin"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center;">
          <el-button type="primary" @click="onLogin" :loading="loading">登录</el-button>
          <el-button type="primary" @click="$openUrl('http://www.zimuzu.io/user/reg')">注册</el-button>
          <el-button type="default" @click="anonymous">匿名浏览</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login-component',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
      loading: false,
    };
  },
  methods: {
    anonymous() {
      window.localStorage.removeItem('userInfo');
      this.$emit('close');
    },
    onLogin() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const res = await this.$http.get('/index.php', {
            params: {
              a: 'login',
              account: this.form.username,
              password: this.form.password,
            },
          });
          this.loading = false;
          if (res.data.status === 1) {
            this.$message({
              message: '登陆成功',
              type: 'success',
            });
            window.localStorage.setItem('userInfo', JSON.stringify(res.data.data));
            this.$emit('close', res.data.data);
          }
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
  },
};
</script>
