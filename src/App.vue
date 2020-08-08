<template>
  <div id="app">
    <header-s/>
    <router-view/>
    <footer-s/>
  </div>
</template>

<script>
  import HeaderS from './components/Header-S'
  import FooterS from './components/Footer-S'

  export default {
    components: {
      'header-s': HeaderS,
      'footer-s': FooterS
    },
    created () {
      this.$store.commit('loadStorage')
    }
  }
</script>

<style lang="scss">
@import "assets/sass/color";

  *{
    font-family: 'Hiragino Kaku Gothic ProN', meiryo, sans-serif;
    user-select: none;
    color: $text-color;
  }

  body{
    margin: 0;
    background-color: #deead9;
  }

  #app{
    margin-top: 3em;
    margin-bottom: 3em;
    padding: 5px;
  }
</style>
