<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style lang="less" scoped>
header {
  height: 50px;
  line-height: 50px;
  background: #0c5bf8;
}

nav {
  a {
    color: #fff;
    height: 50px;
    line-height: 50px;
    padding: 0 8px;
    cursor: pointer;
  }
  :hover {
    color: #f89808;
  }
}
</style>
