<template>
  <transition name="fade">
    <div class="dialog">
      <div class="dialog-inner">
        <div class="lesson-edit-root">
          <div class="head">
            <span class="dialog-title">授業編集</span>
            <button-s :close="true" @click-event="goToBack"></button-s>
          </div>
          <template v-if="lesson()!==undefined">
            <tbs v-model="$v.name.$model" :error="$v.name.$error">
              授業名
              <template v-slot:error-message>授業名を入力してください。</template>
            </tbs>
            <tbs v-model="$v.room.$model" :error="$v.room.$error">
              教室
              <template v-slot:error-message>教室名を入力してください。</template>
            </tbs>
            <tbs v-model="$v.teacher.$model" :error="$v.teacher.$error">
              教員名
              <template v-slot:error-message>教員名を入力してください。</template>
            </tbs>
            <tbs v-model="belongings">持ち物</tbs>
            <span class="horizon-margin"/>
            <div class="right-box">
              <button-s @click-event="done" :disabled="!enableOk">保存</button-s>
            </div>
          </template>
          <div class="message" v-else>
            <span class="message-warning">
              エラー<br>
              指定した授業が見つかりませんでした。
            </span>
          </div>
          <check-dialog v-if="checkFlag" :click-yes="checkYes" :click-no="checkNo">
            <template v-slot:title>
              入力内容の確認
            </template>
            <template v-slot:message>
              <p>以下の内容で更新しますか？</p>
              <lesson-table :lesson="newLesson()"/>
            </template>
          </check-dialog>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import ButtonS from '../components/Button-S'
  import TextboxS from '../components/Textbox-S'
  import CheckDialog from '../components/CheckDialog'
  import {Lesson} from '../jsclass/lesson'
  import LessonTable from '../components/LessonTable'
  import {required} from 'vuelidate/lib/validators'
  import _ from 'lodash'

  export default {
    name: 'LessonEditDialog',
    props: {
      id: {
        type: String,
        default: '-1'
      }
    },
    components: {
      'button-s': ButtonS,
      'tbs': TextboxS,
      'check-dialog': CheckDialog,
      'lesson-table': LessonTable
    },
    data () {
      return {
        name: '',
        room: '',
        teacher: '',
        belongings: '',
        checkFlag: false,
        enableOk: false
      }
    },
    validations: {
      name: {
        required
      },
      room: {
        required
      },
      teacher: {
        required
      }
    },
    computed: {
      idNumber () {
        return this.id - 0
      }
    },
    methods: {
      goToBack: function () {
        this.$router.push({name: 'lm'})
      },
      done: function () {
        this.checkFlag = true
      },
      checkYes: function () {
        this.$store.commit('updateLesson', this.newLesson())
        this.$router.push({name: 'lm'})
      },
      checkNo: function () {
        this.checkFlag = false
      },
      lesson: function () {
        return this.$store.state.lessons.find(le => le.id === this.idNumber)
      },
      newLesson () {
        const newL = Lesson.copy(this.lesson())
        newL.name = this.name
        newL.room = this.room
        newL.teacher = this.teacher
        newL.belongings = this.belongings
        return newL
      },
      enableButton () {
        const le = this.lesson()
        this.enableOk = this.name.length !== 0 &&
          this.room.length !== 0 && this.teacher.length !== 0 &&
          (this.name !== le.name || this.room !== le.room ||
          this.teacher !== le.teacher)
      }
    },
    watch: {
      name () {
        this.debounceEnableButton()
      },
      room () {
        this.debounceEnableButton()
      },
      teacher () {
        this.debounceEnableButton()
      }
    },
    created () {
      this.debounceEnableButton = _.debounce(this.enableButton, 300)
    },
    mounted () {
      this.$nextTick(() => {
        const lesson = this.lesson()
        if (lesson === undefined) return
        this.name = lesson.name
        this.room = lesson.room
        this.teacher = lesson.teacher
        this.belongings = lesson.belongings
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";
  @import "../assets/sass/fade-transition";

  .lesson-edit-root{
    display: flex;
    flex-direction: column;
  }
</style>
