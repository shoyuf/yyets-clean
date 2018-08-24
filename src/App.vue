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
a{
  color:#f34f4f;
}
::selection{
  background: #f34f4f;
  color:#fff;
}
.el-input.is-active .el-input__inner, .el-input__inner:focus{
  border-color:#f34f4f !important;
}
.el-button--success.is-active, .el-button--success:active, .el-button--success{
  background: #f34f4f !important;
  border-color:#f34f4f !important;
}
.el-button:focus, .el-button:hover{
  color: #f34f4f !important;
  border-color: #fbcbcb !important;
  background-color: #feecec !important;
}
</style>
