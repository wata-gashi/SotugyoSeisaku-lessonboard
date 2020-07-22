<template>
  <div class="top-root">
    <div class="balloon-box balloon-box-row right-box" v-if="visibleView">
      <label>
        <input type="radio" value="all" v-model="viewSetting">
        全表示
      </label>
      <label>
        <input type="radio" value="today" v-model="viewSetting">
        本日のみ
      </label>
    </div>
    <lesson-list class="balloon-box" :view-setting="viewSetting"
                 @go-to-dialog="goToDialog($event)"></lesson-list>
    <router-view name="li" />
  </div>
</template>

<script>
  import LessonList from '../components/LessonList'

  export default {
    name: 'TopPage',
    components: {
      'lesson-list': LessonList
    },
    methods: {
      goToDialog: function (id) {
        this.$router.push({name: 'li', params: {id: id}})
      }
    },
    computed: {
      viewSetting: {
        get () {
          return this.$store.state.viewSetting
        },
        set (v) {
          this.$store.commit('setViewSetting', v)
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
  }
</style>
