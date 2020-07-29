<template>
  <div class="select-box" :class="{'horizon-view': horizonView}">
    <div class="select-box-inner">
      <template v-for="lesson in lessonList">
        <div class="select-button" @click="$emit('click-lesson', lesson.id)" tabindex="0">
          <span class="select-button-element" v-text="lesson.name"></span>
          <span class="select-button-element" v-text="lesson.room"></span>
          <span class="select-button-element" v-text="lesson.teacher"></span>
        </div>
      </template>
      <span class="select-box-inner-none" v-if="lessonList.length <= 0">
        授業が登録されていません
      </span>
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
    border: 1px solid $border-color;
    height: 250px;
    overflow-y: scroll;

    &-inner{
      display: inline-block;
      padding: 10px;

      .select-button{
        display: inline-flex;
        flex-direction: column;
        border: 2px solid $border-color-2;
        margin-right: 10px;
        padding: 5px 15px;
        background-color: white;
        outline: none;

        &-element{
          font-size: 0.7em;
          text-align: center;
          font-weight: normal;
          margin-top: auto;
          margin-bottom: auto;
          white-space: normal;

          &:first-child{
            font-size: 0.9em;
            max-width: 5.4em;
            overflow: hidden;
            word-wrap: break-word;
            word-break: break-all;
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
  .horizon-view{
    height: auto;
    overflow-x: scroll;
    white-space: nowrap;

    .select-box-inner{
      flex-flow: row nowrap;
    }
  }
</style>
