<template>
  <div class="root-element">
    <el-container class="secont-root-element">
      <Aside class="asideAdmin" />

      <el-container class="admin-flex-container">
        <Header />
        <el-main>
          <nuxt />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/admin/Aside";
import Header from "@/components/admin/Header";
export default {
  async fetch({ store, params }) {
    await store.dispatch("GET_STARS");
  },
  components: {
    Aside,
    Header
  },
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      isCollapse: false
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {}
};
</script>
<style >
.logout {
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
