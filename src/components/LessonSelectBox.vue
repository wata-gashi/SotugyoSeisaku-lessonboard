<template>
  <div class="select-box">
    <div class="select-box-inner">
      <template v-for="lesson in lessonList">
        <div class="select-button" :class="{'sb-selected': lesson.id === selectId}"
             @click="clickSb(lesson.id)" tabindex="0">
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
    model: {
      prop: 'selectId',
      event: 'change'
    },
    props: {
      selectId: {
        type: Number,
        default: -1
      }
    },
    data () {
      return {
        clickFlag: false
      }
    },
    computed: {
      lessonList: function () {
        return this.$store.state.lessons.filter(target => target.id !== -1)
      }
    },
    methods: {
      clickSb (id) {
        if (this.selectId === id) id = -1
        this.$emit('change', id)
        this.clickFlag = true
      }
    },
    watch: {
      selectId (to) {
        if (to !== -1) {
          this.$nextTick(() => {
            const sel = document.getElementsByClassName('sb-selected')
            if (sel.length > 0) {
              if (this.clickFlag) {
                this.clickFlag = false
                return
              }
              sel[0].scrollIntoView({
                inline: 'center'
              })
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";

  .select-box{
    position: relative;
    border: 1px solid $border-color;
    height: auto;
    overflow-x: scroll;
    white-space: nowrap;

    &-inner{
      display: inline-block;
      padding: 10px;
      flex-flow: row nowrap;

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
      }
      .sb-selected{
        border-color: #207900;
      }

      &-none{
        color: darkred;
        font-size: 1.1em;
        padding: 10px;
      }
    }
  }
</style>
