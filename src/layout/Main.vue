<template>
  <div
    class="nav"
    :class="{
      'side-nav-active': !isCollapse,
      'side-nav-inactive': isCollapse,
    }"
  >
    <sidebar :isCollapse="isCollapse" />
  </div>
  <div
    class="main"
    :class="{
      'head-nav-active': !isCollapse,
      'head-nav-inactive': isCollapse,
    }"
  >
    <navbar />
    <div class="main-body"><router-view></router-view></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
});
</script>
<style scoped>
.nav {
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  height: 100%;
}
.nav-menu {
  min-height: 100%;
  text-align: left;
}
.main {
  height: 100%;
}
.main-body {
  height: calc(100% - 50px);
}
.side-nav-active {
  width: 150px;
}
.side-nav-inactive {
  width: 64px;
}
.head-nav-active {
  margin-left: 150px;
}
.head-nav-inactive {
  margin-left: 64px;
}
.el-menu-item:hover {
  background-color: #434a50;
}
</style>