<template>
  <div class="edit-root">
    <div class="balloon-tab">
      <label class="tab-button" :class="{'tab-button-active': selectTab==='lbe'}">
        <input type="radio" v-model="selectTab" value="lbe">
        時間割編集
      </label>
      <label class="tab-button" :class="{'tab-button-active': selectTab==='lm'}">
        <input type="radio" v-model="selectTab" value="lm">
        授業管理
      </label>
    </div>
    <div class="balloon-box">
      <keep-alive>
        <router-view name="lbe"></router-view>
        <router-view name="lm"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EditPage',
    data () {
      return {
        selectTab: ''
      }
    },
    methods: {
    },
    computed: {
    },
    watch: {
      selectTab: function (to, from) {
        if (to !== from && this.$route.matched[1].name !== to) {
          this.$router.push({name: to})
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.selectTab = this.$route.matched[1].name
      })
    }
  }
</script>

<style lang="scss" scoped>
@import "../assets/sass/global";
@import "../assets/sass/baloon";

  .edit-root{
    max-width: 700px;
    margin: 0 auto;
  }
</style>
