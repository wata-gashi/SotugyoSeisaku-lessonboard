<template>
  <div class="top-root">
    <div class="balloon-box balloon-box-row right-box" v-if="visibleView">
      <switch-s v-model="todayOnly">今日のみ表示</switch-s>
    </div>
    <lesson-list class="balloon-box" :today-only="todayOnly"
                 @go-to-dialog="goToDialog($event)"></lesson-list>
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
  .top-root{
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
</style>
