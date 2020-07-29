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
        <router-view name="lbe"></router-view>
        <router-view name="lm"></router-view>
<!--        <component :is="tabComponent"></component>-->
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
    },
    watch: {
      selectTab: function (tab) {
        this.$router.push({name: tab === 'list' ? 'lbe' : 'lm'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .edit-root{
  }
</style>
