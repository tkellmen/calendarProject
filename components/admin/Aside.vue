<template>
  <el-aside class="asideAdmin">
    <el-menu class="Hmenu" :default-active="$route.path" router :collapse="false" mode="vertical">
      <el-menu-item index="/admin/Students">
        <i class="el-icon-user-solid"></i>
        <span slot="title">Учні</span>
      </el-menu-item>
      <el-menu-item index="/admin/Lessons">
        <i class="el-icon-s-management"></i>
        <span slot="title">Предмети</span>
      </el-menu-item>
      <el-menu-item index="/admin/Posts">
        <i class="el-icon-s-order"></i>
        <span slot="title">Пости</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {};
</script>
<style>
.asideAdmin {
  width: 200px !important;
  background-color: rgb(238, 241, 246);
}
</style>
