
<template>
  <el-header>
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
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
      <el-menu-item index="/admin">
        <i class="el-icon-date"></i>
        <nuxt-link to="/admin" exact>Головна д</nuxt-link>
      </el-menu-item>
      <el-menu-item index="/TableValue">
        <nuxt-link to="/TableValue">Оцінки</nuxt-link>
      </el-menu-item>
      <el-menu-item>
        <i class="el-icon-switch-button logout"></i>
      </el-menu-item>
    </el-menu>
  </el-header>
</template>


        <script>
export default {};
</script>
