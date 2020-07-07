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
      </div>
    </div>
  </div>
</template>

<script>
  import ButtonS from '../components/Button-S'
  import TextboxS from '../components/Textbox-S'

  export default {
    name: 'LessonEditDialog',
    props: ['id'],
    components: {
      'button-s': ButtonS,
      'tbs': TextboxS
    },
    data () {
      return {
        name: '',
        room: '',
        teacher: '',
        belongings: ''
      }
    },
    methods: {
      goToBack: function () {
        this.$router.push({name: 'edit'})
      },
      done: function () {
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
