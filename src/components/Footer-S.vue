<template>
  <div id="footer-s">
    <label class="footer-label">
      <input class="footer-radio" type="radio" v-model="inTab" value="top">
      <span class="footer-item">ホーム</span>
    </label>
    <label class="footer-label">
      <input class="footer-radio" type="radio" v-model="inTab" value="edit">
      <span class="footer-item">編集</span>
    </label>
    <label class="footer-label">
      <input class="footer-radio" type="radio" v-model="inTab" value="setting">
      <span class="footer-item">設定</span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'Footer-S',
    data () {
      return {
        inTab: 'top'
      }
    },
    watch: {
      inTab: function (to, from) {
        if (to !== from && this.$route.matched[0].name !== to) {
          this.$router.push({name: to})
        }
      },
      $route: function (to) {
        this.inTab = to.matched[0].name
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.inTab = this.$route.matched[0].name
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";
  @import "../assets/sass/color";

  #footer-s{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    background-color: $main2-color;
    height: 3em;

    .footer-label{
      display: flex;
      margin: auto 0;

      .footer-item{
        color: white;
        font-size: large;
        font-weight: bold;
        opacity: 0.7;
        transform: scale(0.9);
        border-bottom: 2px transparent solid;
        transition: opacity .3s, transform .3s, border-bottom-color .3s;
      }

      .footer-radio{
        display: none;

        &:checked + .footer-item{
          opacity: 1;
          transform: scale(1);
          border-bottom-color: white;
        }
      }
    }
  }
</style>
