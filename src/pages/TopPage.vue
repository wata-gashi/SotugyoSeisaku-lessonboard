<template>
  <div class="top-root">
    <div class="balloon-box balloon-box-row right-box" v-if="visibleView">
      <switch-s v-model="todayOnly">今日のみ表示</switch-s>
    </div>
    <div class="top-lesson-box">
      <div class="balloon-box">
        <lesson-list :today-only="todayOnly"
                     @go-to-dialog="goToDialog($event)"></lesson-list>
      </div>
    </div>
    <router-view name="li" />
  </div>
</template>

<script>
  import LessonList from '../components/LessonList'
  import SwitchS from '../components/Switch-S'

  export default {
    name: 'TopPage',
    components: {
      'lesson-list': LessonList,
      'switch-s': SwitchS
    },
    methods: {
      goToDialog: function (id) {
        this.$router.push({name: 'li', params: {id: id.toString()}})
      }
    },
    computed: {
      todayOnly: {
        get () {
          return this.$store.state.todayOnly
        },
        set (v) {
          this.$store.commit('setTodayOnly', v)
        }
      },
      visibleView () {
        return this.$store.state.maxLesson > 0 && this.$store.state.maxLesson < 9
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../assets/sass/baloon";
@import "../assets/sass/global";

  .top-root{
    display: flex;
    flex-direction: column;
    max-width: 700px;
    margin: 0 auto;

    .top-lesson-box{
      max-width: 100%;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
