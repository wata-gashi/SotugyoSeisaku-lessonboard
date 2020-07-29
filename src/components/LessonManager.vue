<template>
  <div class="lesson-manager-root">
<!--    <lesson-select-box @click-lesson="clickLesson($event)"></lesson-select-box>-->
<!--
    <table>
      <tr>
        <th>授業名</th><th>教室名</th><th>教師名</th><th>持ち物</th>
      </tr>
      <tr @click="clickLesson(lesson.id)" v-for="lesson in lessonList">
        <td v-text="lesson.name"></td>
        <td v-text="lesson.room"></td>
        <td v-text="lesson.teacher"></td>
        <td v-text="lesson.belongings"></td>
      </tr>
    </table>
-->
    <div class="lesson-manager-container">
      <div class="lesson-box head">
        <div class="info">
          <span class="name">授業名</span>
          <div class="box">
            <span>教室</span>
            <span>教員名</span>
          </div>
          <span class="belongings">持ち物</span>
        </div>
      </div>
      <div class="lesson-manager-container-view">
        <label class="lesson-label" v-for="lesson in lessonList">
          <input type="radio" :value="lesson.id" v-model="selectLesson">
          <span class="lesson-box">
            <span class="info">
              <span class="name" v-text="lesson.name"></span>
              <span class="box">
                <span v-text="lesson.room"></span>
                <span v-text="lesson.teacher"></span>
              </span>
              <span class="belongings" v-text="lesson.belongings"></span>
            </span>
            <span class="edit-box right-box">
              <button-s @click-event="clickLesson(lesson.id)">編集</button-s>
            </span>
          </span>
        </label>
      </div>
    </div>
    <div class="right-box">
      <button-s @click-event="addLesson">追加</button-s>
    </div>
    <router-view name="ald"/>
    <router-view name="led"/>
  </div>
</template>

<script>
  import LessonSelectBox from './LessonSelectBox'
  import ButtonS from './Button-S'

  export default {
    components: {
      'lesson-select-box': LessonSelectBox,
      'button-s': ButtonS
    },
    data () {
      return {
        selectLesson: -1
      }
    },
    methods: {
      isExistId: function (id) {
        return this.$store.state.lessons.findIndex(lesson => lesson.id === id)
      },
      addLesson: function () {
        this.$router.push({name: 'ald'})
      },
      clickLesson: function (id) {
        if (this.isExistId(id) >= 0) {
          this.$router.push({name: 'led', params: {id: id}})
        }
      }
    },
    computed: {
      lessonList: {
        get () {
          return this.$store.state.lessons.filter(lesson => lesson.id !== -1)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";

  .lesson-manager-root{
    display: flex;
    flex-direction: column;
    padding: 5px;
  }

  .lesson-manager-container{
    border: 1px solid $border-color-2;
    border-radius: 2px;
    display: flex;
    flex-direction: column;

    &-view{
      max-height: 50vh;
      overflow-y: scroll;
    }

    .lesson-box{
      position: relative;
      padding: 10px;
      transition: background-color .3s;
      display: flex;
      flex-direction: column;

      .info{
        display: flex;
        flex-direction: row;

        .name{
          flex-basis: 40%;
          text-align: center;
          margin: auto 0;
          font-size: 1.1em;
          padding: 0 5px;
        }

        .box{
          flex-basis: 25%;
          display: flex;
          flex-direction: column;
          border-right: 1px solid $border-color-2;
          border-left: 1px solid $border-color-2;
          padding: 0 5px;

          span{
            text-align: center;
            font-size: .9em;
            margin: auto 0;
          }
        }

        .belongings{
          flex-basis: 35%;
          margin: auto 0;
          font-size: .9em;
          padding: 0 5px;
        }
      }

      .edit-box{
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transition: all .3s;
      }
    }

    .head{
      padding: 5px;
      font-weight: bold;
      text-align: center;
      background-color: #e1f6e1;
      border-bottom: 2px solid $border-color-2;
    }

    .lesson-label{
      input{
        display: none;

        &:checked + .lesson-box{
          background-color: #c1ffd5;

          .edit-box{
            max-height: 50px;
            opacity: 1;
          }
        }
      }

      &:not(:last-child){
        .lesson-box{
          border-bottom: 2px solid $border-color-2;
        }
      }

      &:nth-child(even){
        .lesson-box{
          background-color: #f7fff7;
        }
      }
    }
  }
</style>
