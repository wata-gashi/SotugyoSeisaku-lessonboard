<template>
  <div class="lesson-edit-root">
    <lesson-list :edit-mode="true" @select-lesson="selectLesson($event)"></lesson-list>
    <span class="horizon-margin"></span>
    <lsb :horizon-view="true" v-model="selectLessonId"></lsb>
  </div>
</template>

<script>
  import LessonList from './LessonList'
  import LessonSelectBox from './LessonSelectBox'

  export default {
    name: 'LessonEdit',
    components: {
      'lesson-list': LessonList,
      'lsb': LessonSelectBox
    },
    data () {
      return {
        selectLessonId: -1,
        selectLessonPos: {
          day: -1,
          time: -1
        }
      }
    },
    methods: {
      selectLesson: function (data) {
        this.$set(this.selectLessonPos, 'day', data.day)
        this.$set(this.selectLessonPos, 'time', data.time)
        if (data.day !== -1 && data.time !== -1) {
          this.selectLessonId = this.$store.state.lessonBoard[data.day][data.time]
        } else {
          this.selectLessonId = -1
        }
      }
    },
    watch: {
      selectLessonId (to) {
        if (this.selectLessonPos.day !== -1 &&
          this.selectLessonPos.time !== -1) {
          this.$store.commit('updateLessonBoard', {
            day: this.selectLessonPos.day,
            time: this.selectLessonPos.time,
            id: to
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../assets/sass/global";

  .lesson-edit-root{
    display: flex;
    flex-direction: column;
  }
</style>
