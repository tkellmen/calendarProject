<template>
  <div>
    <el-container>
      <!-- <el-aside class="hor-menu" style="background-color: rgb(238, 241, 246)">
        <el-menu
          class="Hmenu"
          :collapse-transition="false"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          mode="vertical"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">Navigator One</span>
            </template>
            <el-menu-item-group>
              <span slot="title">Group One</span>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">item four</span>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">Navigator Four</span>
          </el-menu-item>
        </el-menu>
      </el-aside>-->

      <el-container>
        <el-header>
          <el-menu
            :default-active="$route.path"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
          >
            <!-- <el-button
              class="menu-button"
              v-model="isCollapse"
              @click="isCollapse = true"
              v-if="!isCollapse"
              icon="el-icon-s-fold"
              circle
            ></el-button>-->
            <!-- <el-button
              class="menu-button"
              v-model="isCollapse"
              @click="isCollapse = false"
              v-if="isCollapse"
              icon="el-icon-s-unfold"
              circle
            ></el-button>-->
            <el-menu-item index="/">
              <i class="el-icon-date"></i>
              <nuxt-link to="/" exact>Головна</nuxt-link>
            </el-menu-item>
            <el-menu-item index="/TableValue">
              <nuxt-link to="/TableValue">Оцінки</nuxt-link>
            </el-menu-item>
            <el-menu-item index="/admin">
              <nuxt-link to="/admin">Админ</nuxt-link>
            </el-menu-item>
            <el-menu-item>
              <i class="el-icon-switch-button logout"></i>
            </el-menu-item>
          </el-menu>
        </el-header>
        <el-main>
          <nuxt />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      isCollapse: true
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
  async created() {}
};
</script>
<style>
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
</style>
