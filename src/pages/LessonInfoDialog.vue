<template>
  <transition name="fade">
    <div class="dialog">
      <div class="dialog-inner">
        <div class="lesson-info-root">
          <div class="head">
            <span class="dialog-title">授業詳細</span>
            <button-s :close="true" @click-event="goToBack"></button-s>
          </div>
          <template v-if="lesson!==null">
            <lesson-table :lesson="lesson" />
            <span class="horizon-margin"/>
            <div class="right-box">
              <button-s @click-event="goToEdit">編集</button-s>
            </div>
          </template>
          <div class="message" v-else>
            <span class="message-warning">
              エラー<br>
              指定した授業が見つかりませんでした。
            </span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import ButtonS from '../components/Button-S'
  import LessonTable from '../components/LessonTable'

  export default {
    name: 'LessonInfoDialog',
    props: {
      'id': {
        type: String,
        default: '-1'
      }
    },
    components: {
      'button-s': ButtonS,
      'lesson-table': LessonTable
    },
    data () {
      return {
        lesson: null
      }
    },
    computed: {
      idNumber () {
        return this.id - 0
      }
    },
    methods: {
      isExistId: function (id) {
        return this.$store.state.lessons.findIndex(lesson => lesson.id === id)
      },
      goToBack () {
        this.$router.push({name: 'top'})
      },
      goToEdit () {
        if (this.isExistId(this.idNumber) >= 0) {
          this.$router.push({name: 'led', params: {id: this.id}})
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        if (this.idNumber !== -1) {
          this.$store.state.lessons.forEach(lesson => {
            if (lesson.id !== -1 && lesson.id === this.idNumber) {
              this.lesson = lesson
            }
          })
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";
  @import "../assets/sass/fade-transition";

  .lesson-info-root{
    display: flex;
    flex-direction: column;
  }
</style>
