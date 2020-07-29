<template>
  <div id="footer-s">
    <span class="footer-item" :class="{selected: $route.path === '/'}"
          @click="$route.path !== '/'? $router.push({name: 'top'}): ''">トップページ</span>
    <span class="footer-item" :class="{selected: $route.path.startsWith('/edit')}"
          @click="!$route.path.startsWith('/edit')? $router.push({name: 'lbe'}): ''">編集</span>
    <span class="footer-item" :class="{selected: $route.path.startsWith('/setting')}"
          @click="!$route.path.startsWith('/setting')? $router.push({name: 'setting'}): ''">設定</span>
  </div>
</template>

<script>
  export default {
    name: 'Footer-S'
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";

  #footer-s{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    background-color: $main-color;
    height: 3em;

    .footer-item{
      color: white;
      font-size: large;
      font-weight: bold;
      margin: auto 0;
      opacity: 0.7;
      transform: scale(0.9);
      border-bottom: 2px transparent solid;
      transition: opacity .3s, transform .3s, border-bottom-color .3s;
    }

    .selected{
      opacity: 1;
      transform: scale(1);
      border-bottom-color: white;
    }
  }

</style>
