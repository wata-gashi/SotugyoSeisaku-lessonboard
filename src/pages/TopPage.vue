<template>
  <div class="top-root">
    <div class="balloon-box right-box">
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
    data () {
      return {
        viewSetting: 'all'
      }
    },
    methods: {
      goToDialog: function (id) {
        this.$router.push({name: 'li', params: {id: id}})
      },
      test: function () {
        console.log('test')
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
