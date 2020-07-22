<template>
  <div class="select-box" :class="{'horizon-view': horizonView}">
    <div class="select-box-inner">
      <div class="lesson-box" v-for="lesson in lessonList">
        <div class="select-button" @click="$emit('click-lesson', lesson.id)" tabindex="0">
          <span class="select-button-element" v-text="lesson.name"></span>
          <span class="select-button-element" v-text="lesson.room"></span>
          <span class="select-button-element" v-text="lesson.teacher"></span>
        </div>
      </div>
      <div class="lesson-box" v-if="lessonList.length <= 0">
        <span class="lesson-box-none">
          授業が登録されていません
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LessonSelectBox',
    props: {
      horizonView: {
        type: Boolean,
        default: false
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

      .lesson-box{
        .select-button{
          display: flex;
          flex-direction: column;
          border: 2px solid #646464;
          margin: 10px;
          padding: 5px 15px;
//          max-width: 100px;
          background-color: white;
          outline: none;

          &-element{
            text-align: center;
            font-weight: normal;

            &:first-child{
              font-size: 1.1em;
              word-wrap: break-word;
            }
          }

          &:hover{
            background-color: #c9f6b9;
          }

          &:active{
            background-color: #5ba533;
            & > .select-button-element{
              color: white;
            }
          }

          &:focus{
            border-color: #207900;
          }
        }

        &-none{
          color: darkred;
          font-size: 1.1em;
          padding: 10px;
        }
      }
    }
  }
  .horizon-view{
    height: auto;
    overflow: auto;
    white-space: nowrap;

    .select-box-inner{
      flex-flow: row nowrap;
    }
  }
</style>
