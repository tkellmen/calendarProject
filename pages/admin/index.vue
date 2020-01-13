<template>
  <div>
    <el-row>
      <el-col class="calendarOnMain" :xs="23" :sm="23" :md="23" :lg="23">
        <client-only>
          <full-calendar :config="config" page="admin" ref="calendar"></full-calendar>
        </client-only>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      config: { eventTextColor: "red", editable: true, selectable: true }
    };
  }
};
</script>
<style  scoped>
logout {
  transform: rotate(90deg);
  color: #f9d5d5e0 !important;
}
.el-main {
  background-color: #f8f9fe;
}
.Hmenu {
  height: 100%;
}
.hor-menu {
  width: auto !important;
}
.menu-button {
  float: left;
  margin: 10px 10px;
}
.el-menu-item a {
  text-decoration: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 100%;
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu--collapse {
  height: 100%;
}
html {
  font-family: "Exo 2", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.el-header {
  padding: 0px;
}

.root-element {
  height: 100vh;
}
.secont-root-element {
  height: 100%;
}
.admin-flex-container {
  display: flex;
  flex-direction: column;
}
</style>
