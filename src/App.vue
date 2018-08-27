<template>
  <div id="body">
    <workspace/>
  </div>
</template>

<script>
import workspace from './components/workspace.vue';

export default {
  name: 'app',
  components: {
    workspace,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body,
#body {
  background-color: #fff;
  height: 100%;
  width: 100%;
}
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #333333;
  box-sizing: border-box;
  border-top: 1px solid rgba(178, 178, 178, 0.3);
}
::selection{
  background: #f34f4f;
  color:#fff;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f34f4f;
}
.el-menu--horizontal{
  border-bottom:none;
}
a,.el-button--text{
  color:#f34f4f;
}
.el-header, .el-main{
  padding:0;
}
.el-input.is-active .el-input__inner, .el-input__inner:focus{
  border-color:#f34f4f !important;
}
.el-button--success.is-active, .el-button--success:active, .el-button--success,.el-button--primary{
  background: #f34f4f !important;
  border-color:#f34f4f !important;
}
.el-button:focus, .el-button:hover{
  color: #f34f4f !important;
  border-color: #fbcbcb !important;
  background-color: #feecec !important;
}
</style>
