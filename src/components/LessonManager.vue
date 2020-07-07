<template>
  <div class="lesson-manager-root">
    <lesson-select-box v-model="selectLessonId"></lesson-select-box>
    <div class="right-box">
      <button-s :click-event="addLesson">追加</button-s>
    </div>
    <router-view name="ald"/>
    <router-view name="led"/>
  </div>
</template>

<script>
  import LessonSelectBox from './LessonSelectBox'
  import ButtonS from './Button-S'

  export default {
    components: {
      'lesson-select-box': LessonSelectBox,
      'button-s': ButtonS
    },
    data () {
      return {
        selectLessonId: -1
      }
    },
    methods: {
      isExistId: function (id) {
        return this.$store.state.lessons.findIndex(lesson => lesson.id === id)
      },
      addLesson: function () {
        this.$router.push({name: 'ald'})
      }
    },
    watch: {
      selectLessonId: function (id) {
        if (this.isExistId(id) >= 0) {
          this.$router.push({name: 'led', params: {id: id}})
        }
      }
    },
    computed: {
    }
  }
</script>

<style lang="scss" scoped>
  .lesson-manager-root{
    display: flex;
    flex-direction: column;
    padding: 5px;
  }
</style>
