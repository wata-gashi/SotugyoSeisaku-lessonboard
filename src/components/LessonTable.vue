<template>
  <table>
    <tr><th>授業名</th><td v-text="lesson.name"></td></tr>
    <tr><th>教室</th><td v-text="lesson.room"></td></tr>
    <tr><th>教員名</th><td class="teacher" v-text="lesson.teacher"></td></tr>
    <tr><th>持ち物</th><td v-text="lesson.belongings"></td></tr>
  </table>
</template>

<script>
  export default {
    name: 'LessonTable',
    props: {
      lesson: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";

  table{
    th{
      text-align: right;
      width: 20%;
      white-space: nowrap;
    }
    th,td{
      padding: 0.3em;
    }
  }
</style>
