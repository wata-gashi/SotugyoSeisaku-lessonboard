<template>
  <div id="header-s" v-text="title">
  </div>
</template>

<script>
  export default {
    name: 'Header-S',
    data () {
      return {
        title: '時間割表'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";

  #header-s{
    text-align: center;
    background-color: $main-color;
    color: white;
    font-size: x-large;
    padding: 5px 0;
  }
</style>
