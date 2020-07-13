<template>
  <div class="edit-root">
    <div class="balloon-tab">
      <label class="tab-button" :class="{'tab-button-active': selectTab==='list'}">
        <input type="radio" v-model="selectTab" value="list">
        時間割編集
      </label>
      <label class="tab-button" :class="{'tab-button-active': selectTab==='lesson'}">
        <input type="radio" v-model="selectTab" value="lesson">
        授業管理
      </label>
    </div>
    <div class="balloon-box">
      <keep-alive>
        <component :is="tabComponent"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import LessonManager from '../components/LessonManager'
  import LessonEdit from '../components/LessonEdit'

  export default {
    name: 'EditPage',
    components: {
      'lesson-edit': LessonEdit,
      'lesson-manager': LessonManager
    },
    data () {
      return {
        selectTab: 'list'
      }
    },
    methods: {
    },
    computed: {
      tabComponent: function () {
        return this.selectTab === 'list' ? 'lesson-edit' : 'lesson-manager'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .edit-root{
    margin-bottom: 50px;
  }
</style>
