<template>
  <div class="dialog">
    <div class="dialog-inner">
      <div class="lesson-edit-root">
        <span class="dialog-title">授業編集</span>
        <div v-if="lesson()!==undefined">
          <tbs v-model="name">授業名</tbs>
          <tbs v-model="room">教室</tbs>
          <tbs v-model="teacher">教員名</tbs>
          <tbs v-model="belongings">持ち物</tbs>
        </div>
        <div class="message" v-else>
          <span class="message-warning">
            エラー<br>
            指定した授業が見つかりませんでした。
          </span>
        </div>
        <div class="right-box">
          <button-s :click-event="goToBack">閉じる</button-s>
          <button-s :click-event="done" v-if="lesson()!==undefined">決定</button-s>
        </div>
        <check-dialog v-if="checkFlag" :click-yes="checkYes" :click-no="checkNo">
          <template v-slot:title>
            入力内容の確認
          </template>
          <template v-slot:message>
            <p>以下の内容で更新しますか？</p>
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

  export default {
    name: 'LessonEditDialog',
    props: ['id'],
    components: {
      'button-s': ButtonS,
      'tbs': TextboxS,
      'check-dialog': CheckDialog
    },
    data () {
      return {
        name: '',
        room: '',
        teacher: '',
        belongings: '',
        checkFlag: false
      }
    },
    methods: {
      goToBack: function () {
        this.$router.push({name: 'edit'})
      },
      done: function () {
        this.checkFlag = true
      },
      checkYes: function () {
        const newLesson = this.lesson()
        newLesson.name = this.name
        newLesson.room = this.room
        newLesson.teacher = this.teacher
        newLesson.belongings = this.belongings
        this.$store.commit('updateLesson', newLesson)
        this.$router.push({name: 'edit'})
      },
      checkNo: function () {
        this.checkFlag = false
      },
      lesson: function () {
        return this.$store.state.lessons.find(le => le.id === this.id)
      }
    },
    beforeMount () {
      const lesson = this.lesson()
      if (lesson === undefined) return
      this.name = lesson.name
      this.room = lesson.room
      this.teacher = lesson.teacher
      this.belongings = lesson.belongings
    }
  }
</script>

<style lang="scss" scoped>
  .lesson-edit-root{
    display: flex;
    flex-direction: column;
    background-color: white;
  }
</style>
