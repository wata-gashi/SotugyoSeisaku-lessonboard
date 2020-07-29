<template>
  <div id="header-s"><span v-text="title"></span></div>
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
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 3em;
    text-align: center;
    background-color: $main-color;
    z-index: 5;

    span{
      color: white;
      font-size: x-large;
      margin: auto;
    }
  }
</style>
