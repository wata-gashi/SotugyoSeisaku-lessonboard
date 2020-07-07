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
        <component :is="tabComponent" :edit-mode="true" @select-lesson-dialog="selectLessonDialog($event)"></component>
      </keep-alive>
    </div>
    <router-view name="led"/>
    <router-view name="sld"/>
  </div>
</template>

<script>
  import LessonList from '../components/LessonList'
  import LessonManager from '../components/LessonManager'

  export default {
    name: 'EditPage',
    components: {
      'lesson-list': LessonList,
      'lesson-manager': LessonManager
    },
    data () {
      return {
        selectTab: 'list'
      }
    },
    methods: {
      selectLessonDialog: function (data) {
        this.$router.push({name: 'sld', params: data})
      }
    },
    computed: {
      tabComponent: function () {
        return this.selectTab === 'list' ? 'lesson-list' : 'lesson-manager'
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
