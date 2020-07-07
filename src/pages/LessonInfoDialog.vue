<template>
  <div class="dialog">
    <div class="dialog-inner">
      <div class="lesson-info-root">
        <p>授業詳細ダイアログ</p>
        <a @click="goToBack">戻る</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LessonInfoDialog',
    props: ['id'],
    methods: {
      goToBack: function () {
        this.$router.push({name: 'top'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .lesson-info-root{
  }
</style>
