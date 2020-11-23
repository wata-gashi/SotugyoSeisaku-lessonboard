<template>
  <transition name="fade">
    <div class="dialog">
      <div class="dialog-inner">
        <div class="lesson-qr-root">
          <div class="head">
            <span class="dialog-title">授業QRコード</span>
            <button-s :close="true" @click-event="goToBack"></button-s>
          </div>
          <div class="body">
            <canvas id="qrcode"></canvas>
            <lesson-table :lesson="lesson"></lesson-table>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import ButtonS from '../components/Button-S'
  import QRCode from 'qrcode'
  import LessonTable from '../components/LessonTable'
  import {Lesson} from '../jsclass/lesson'

  export default {
    name: 'LessonQRDialog',
    props: {
      id: {
        type: String,
        default: '-1'
      }
    },
    components: {LessonTable, ButtonS},
    methods: {
      goToBack () {
        this.$router.push({name: 'lm'})
      }
    },
    computed: {
      lesson () {
        return this.$store.state.lessons.find(le => le.id === this.id - 0)
      }
    },
    mounted () {
      if (this.id !== '-1') {
        if (this.lesson) {
          let canvas = document.getElementById('qrcode')
          let lesson = Lesson.copy(this.lesson)
          delete lesson.id
          QRCode.toCanvas(canvas, JSON.stringify(lesson), function (error) {
            if (error) console.error(error)
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../assets/sass/global";
@import "../assets/sass/fade-transition";

.lesson-qr-root{
  display: flex;
  flex-direction: column;

  .body{
    position: relative;
    text-align: center;
  }
}

</style>
