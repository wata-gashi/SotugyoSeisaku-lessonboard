<template>
  <transition name="fade">
    <div class="dialog">
      <div class="dialog-inner">
        <div class="add-qr-root">
          <div class="head">
            <span class="dialog-title">QRコードから追加</span>
            <button-s :close="true" @click-event="goToBack"></button-s>
          </div>
          <div class="body">
            <video v-show="!error" id="video" autoplay></video>
            <div v-text="error"></div>
          </div>
          <transition name="fade">
            <check-dialog v-if="check" :click-no="clickNo" :click-yes="clickOk">
              <template v-slot:title>確認</template>
              <template v-slot:message>
                <p>以下の内容で追加しますか？</p>
                <lesson-table :lesson="getNewLesson()"></lesson-table>
              </template>
            </check-dialog>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import ButtonS from '../components/Button-S'
  import CheckDialog from '../components/CheckDialog'
  import jsQR from 'jsqr'
  import {LessonInit} from '../jsclass/lesson'
  import LessonTable from '../components/LessonTable'

  export default {
    name: 'AddLessonQRDialog',
    components: {LessonTable, ButtonS, CheckDialog},
    data () {
      return {
        result: {},
        check: false,
        error: ''
      }
    },
    methods: {
      goToBack: function () {
        this.$router.push({name: 'lm'})
      },
      qrParse: function (video) {
        const canvas = new OffscreenCanvas(320, 320)
        const render = canvas.getContext('2d')
        return new Promise((resolve) => {
          const loop = setInterval(() => {
            render.drawImage(video, 0, 0, canvas.width, canvas.height)

            const img = render.getImageData(0, 0, canvas.width, canvas.height)
            const result = jsQR(img.data, img.width, img.height)

            if (result) {
              let obj = JSON.parse(result.data)
              if (obj.name && obj.room && obj.teacher && obj.belongings) {
                clearInterval(loop)
                return resolve(obj)
              }
            }
          }, 100)
        })
      },
      clickNo () {
        this.result = {}
        this.error = ''
        this.check = false
        this.start()
      },
      clickOk () {
        this.$store.commit('addLesson', this.getNewLesson())
        this.check = false
        this.$router.push({name: 'lm'})
      },
      start: function () {
        (async () => {
          const video = document.getElementById('video')
          video.srcObject = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
              facingMode: {
                exact: 'environment'
              }
            }
          }).catch(_ => {
            this.error = 'カメラが検出されませんでした。'
          })
          // document.getElementById('result').value = await this.qrParse(video)
          this.result = await this.qrParse(video)
          this.check = true
          this.stop()
        })()
      },
      stop: function () {
        const video = document.getElementById('video')
        video.pause()
        video.srcObject = ''
      },
      getNewLessonId: function () {
        let id = 0
        while (this.$store.state.lessons.some(i => i.id === id)) id++
        return id
      },
      getNewLesson () {
        return new LessonInit(this.getNewLessonId(), this.result.name, this.result.room, this.result.teacher, this.result.belongings)
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.start()
      })
    },
    beforeDestroy () {
      if (!this.error) {
        this.stop()
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../assets/sass/global";
@import "../assets/sass/fade-transition";

.add-qr-root{
  display: flex;
  flex-direction: column;

  .body{
    margin-top: 1em;
  }
}

#video{
  width: 100%;
  height: auto;
}
</style>
