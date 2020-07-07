<template>
  <div class="select-box">
    <div class="select-box-inner">
      <div class="lesson-box" v-for="(lesson, index) in lessonList">
        <input class="lesson-box-radio" :id="'lesson-box-id-' + lesson.id" type="radio"
               :value="lesson.id" :checked="lesson.id === select"
               @change="$emit('change', lesson.id)">
        <label class="lesson-box-label" :for="'lesson-box-id-' + lesson.id" :key="index">
          <span class="lesson-box-label-element" v-text="lesson.name"></span>
          <span class="lesson-box-label-element" v-text="lesson.room"></span>
          <span class="lesson-box-label-element" v-text="lesson.teacher"></span>
        </label>
      </div>
<!--
      <div class="lesson-box">
        <span>Test</span>
        <span>401</span>
        <span>test</span>
      </div>
      <div class="lesson-box">
        <span>国家試験対策講座</span>
        <span>401</span>
        <span>test</span>
      </div>
      <div class="lesson-box">
        <span>Test</span>
        <span>401</span>
        <span>test</span>
      </div>
      <div class="lesson-box">
        <span>Test</span>
        <span>401</span>
        <span>test</span>
      </div>
      <div class="lesson-box" v-for="lesson in lessonList">
        <span v-text="lesson.name"></span>
        <span v-text="lesson.room"></span>
        <span v-text="lesson.teacher"></span>
      </div>
-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LessonSelectBox',
    model: {
      prop: 'select',
      event: 'change'
    },
    props: {
      select: {
        type: Number,
        required: true
      }
    },
    computed: {
      lessonList: function () {
        return this.$store.state.lessons.filter(target => target.id !== -1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";

  .select-box{
    position: relative;
    border: 1px solid #999;
    height: 250px;
    overflow-y: scroll;

    &-inner{
      display: flex;
      flex-wrap: wrap;

/*
      .lesson-box{
        display: flex;
        flex-direction: column;
        border: 2px solid #646464;
        border-radius: 5px;
        margin: 10px;
        padding: 5px 15px;
        max-width: 100px;

        span{
          text-align: center;

          &:first-child{
            font-size: 1.1em;
            word-wrap: break-word;
          }
        }
      }
*/
      .lesson-box{
        &-radio{
          display: none;

          & + .lesson-box-label{
            display: flex;
            flex-direction: column;
            border: 2px solid #646464;
            border-radius: 5px;
            margin: 10px;
            padding: 5px 15px;
            max-width: 100px;
            background-color: white;
            transition: border-color .2s, background-color .2s;

            & > span{
              text-align: center;
              transition: color .2s, font-weight .2s;
              font-weight: normal;

              &:first-child{
                font-size: 1.1em;
                word-wrap: break-word;
              }
            }
          }

          &:checked + .lesson-box-label{
            border-color: #004579;
            background-color: #336ea5;

            & > span{
              color: white;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
</style>
