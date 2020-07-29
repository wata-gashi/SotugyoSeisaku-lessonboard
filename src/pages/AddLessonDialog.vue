<template>
  <div class="dialog">
    <div class="dialog-inner">
      <div class="add-lesson-root">
        <span class="dialog-title">授業追加</span>
        <textbox-s v-model="name">授業名</textbox-s>
        <textbox-s v-model="room">教室</textbox-s>
        <textbox-s v-model="teacher">教員名</textbox-s>
        <textbox-s v-model="belongings">持ち物</textbox-s>
        <span class="horizon-margin" />
        <div class="center-box">
          <button-s @click-event="cancel">キャンセル</button-s>
          <button-s @click-event="ok">決定</button-s>
        </div>
        <check-dialog v-if="checkDialog"
                      :click-no="checkNo" :click-yes="checkOk">
          <template v-slot:title>確認</template>
          <template v-slot:message>
            <p>以下の内容で追加しますか？</p>
            <table>
              <tr><th>授業名</th><td v-text="name"></td></tr>
              <tr><th>教室</th><td v-text="room"></td></tr>
              <tr><th>教員名</th><td v-text="teacher"></td></tr>
              <tr><th>持ち物</th><td v-text="belongings"></td></tr>
            </table>
          </template>
        </check-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import ButtonS from '../components/Button-S'
  import TextboxS from '../components/Textbox-S'
  import CheckDialog from '../components/CheckDialog'
  import {LessonInit} from '../jsclass/lesson'

  export default {
    name: 'AddLessonDialog',
    components: {
      'button-s': ButtonS,
      'textbox-s': TextboxS,
      'check-dialog': CheckDialog
    },
    data () {
      return {
        name: '',
        room: '',
        teacher: '',
        belongings: '',
        checkDialog: false
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
        const lesson = new LessonInit(this.getNewLessonId(), this.name, this.room, this.teacher, this.belongings)
        this.$store.commit('addLesson', lesson)
        this.checkDialog = false
        this.$router.push({name: 'edit'})
      },
      getNewLessonId: function () {
        let id = 0
        while (this.$store.state.lessons.some(i => i.id === id)) id++
        return id
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";
  .add-lesson-root{
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
</style>
