<template>
  <div class="dialog">
    <div class="dialog-inner">
      <div class="select-lesson-root">
        <lsb v-model="selectLessonId"></lsb>
        <div class="center-box">
          <button-s :click-event="clickCancel">キャンセル</button-s>
          <button-s :click-event="clickOk" :disabled="selectLessonId===-1">決定</button-s>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ButtonS from '../components/Button-S'
  import LessonSelectBox from '../components/LessonSelectBox'

  export default {
    name: 'SelectLessonDialog',
    props: ['day', 'time'],
    components: {
      'button-s': ButtonS,
      'lsb': LessonSelectBox
    },
    data () {
      return {
        selectLessonId: -1
      }
    },
    methods: {
      clickCancel: function () {
        this.$router.back()
      },
      clickOk: function () {
        const src = this.$store.state.lessonBoard
        const copy = new Array(src.length)
        for (let i = 0; i < src.length; i++) {
          copy[i] = src[i].slice()
        }
        // copy[this.day].splice(this.time, 1, this.selectLessonDialog())
        copy[this.day][this.time] = this.selectLessonId
        this.$store.commit('setLessonToBoard', {
          day: this.day,
          time: this.time,
          lessonId: this.selectLessonId
        })
        this.$router.push({name: 'edit'})
      }
    },
    computed: {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";

</style>
