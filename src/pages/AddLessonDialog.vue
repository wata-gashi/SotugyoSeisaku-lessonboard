<template>
  <transition name="fade">
    <div class="dialog">
      <div class="dialog-inner">
        <div class="add-lesson-root">
          <div class="head">
            <span class="dialog-title">授業追加</span>
            <button-s :close="true" @click-event="cancel"></button-s>
          </div>
          <textbox-s v-model="$v.name.$model" :error="$v.name.$error">
            授業名
            <template v-slot:error-message>授業名を入力してください。</template>
          </textbox-s>
          <textbox-s v-model="$v.room.$model" :error="$v.room.$error">
            教室
            <template v-slot:error-message>教室名を入力してください。</template>
          </textbox-s>
          <textbox-s v-model="$v.teacher.$model" :error="$v.teacher.$error">
            教員名
            <template v-slot:error-message>教員名を入力してください。</template>
          </textbox-s>
          <textbox-s v-model="belongings">持ち物</textbox-s>
          <span class="horizon-margin"/>
          <div class="right-box">
            <button-s @click-event="ok" :disabled="!enableOk">決定</button-s>
          </div>
          <check-dialog v-if="checkDialog"
                        :click-no="checkNo" :click-yes="checkOk">
            <template v-slot:title>確認</template>
            <template v-slot:message>
              <p>以下の内容で追加しますか？</p>
              <lesson-table :lesson="getNewLesson()"></lesson-table>
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
  import {LessonInit} from '../jsclass/lesson'
  import LessonTable from '../components/LessonTable'
  import {required} from 'vuelidate/lib/validators'
  import _ from 'lodash'

  export default {
    name: 'AddLessonDialog',
    components: {
      'button-s': ButtonS,
      'textbox-s': TextboxS,
      'check-dialog': CheckDialog,
      'lesson-table': LessonTable
    },
    data () {
      return {
        name: '',
        room: '',
        teacher: '',
        belongings: '',
        checkDialog: false,
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
    methods: {
      cancel: function () {
        this.$router.back()
      },
      ok: function () {
        this.checkDialog = true
      },
      checkNo: function () {
        this.checkDialog = false
      },
      checkOk: function () {
        this.$store.commit('addLesson', this.getNewLesson())
        this.checkDialog = false
        this.$router.push({name: 'lm'})
      },
      getNewLessonId: function () {
        let id = 0
        while (this.$store.state.lessons.some(i => i.id === id)) id++
        return id
      },
      getNewLesson () {
        return new LessonInit(this.getNewLessonId(), this.name, this.room, this.teacher, this.belongings)
      },
      enableButton () {
        this.enableOk = this.name.length !== 0 &&
          this.room.length !== 0 &&
          this.teacher.length !== 0
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
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";
  @import "../assets/sass/fade-transition";

  .add-lesson-root{
    display: flex;
    flex-direction: column;
  }
</style>
