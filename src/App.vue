<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
  #app,
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    overflow-y: hidden;
    overflow-x: scroll;
  }
  ::-webkit-scrollbar {
    display: none;
  }
</style>
