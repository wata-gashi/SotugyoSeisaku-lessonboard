<template>
  <div class="lesson-list-root">
    <div class="max-lesson-setting" v-if="maxLesson === -1">
      <span class="message">最大時限数を設定してください。</span>
      <div id="areaA">
        <div class="lesson-board-area">
          <table class="lesson-board">
            <tr>
              <th class="empty-cell"><span>時限</span></th>
              <th class="number-cell" v-for="number in getInitLessonNumber"><span v-text="number"></span></th>
            </tr>
          </table>
        </div>
      </div>
      <div id="areaB">
        <label class="modern-label">
          最大時限数
          <select v-model="initMaxLesson">
            <option v-for="number in getMaxLessons()"
                    :value="number">{{number}}時限</option>
          </select>
        </label>
        <checkbox-s v-model="initStartZero">０時限目から開始にする</checkbox-s>
      </div>
      <div id="areaC">
        <button-s @click-event="clickInitButton">決定</button-s>
      </div>
    </div>
    <div class="lesson-board-area" v-else>
      <table class="lesson-board">
        <tr>
          <th class="empty-cell"></th>
          <th v-for="(day, dayIndex) in days"
              class="day-cell"
              :class="{
                'select-lesson-line': selectLessonPos.day===dayIndex,
                'today-lesson': !editMode && getNowDay() === dayIndex + 1
              }"
              v-show="viewSetting==='all'||(getNowDay()===dayIndex+1)"
          >
            <span v-text="day"></span>
          </th>
        </tr>
        <tr v-for="(time, index) in getLessonNumber">
          <th class="number-cell" :class="{'select-lesson-line': selectLessonPos.time===index}">
            <span v-text="time"></span>
          </th>
          <td class="lesson-cell" :class="{
                // 'select-lesson': selectLessonPos.day===dayIndex&&selectLessonPos.time===index,
                'select-lesson-line': selectLessonPos.day===dayIndex||selectLessonPos.time===index,
                'today-lesson': !editMode && getNowDay() === dayIndex + 1
              }"
              :id="(selectLessonPos.day===dayIndex&&selectLessonPos.time===index)?'select-lesson':''"
              v-for="(lesson, dayIndex) in lessonBoard"
              @click="editMode?selectLessonPos={day: dayIndex, time: index}:lesson[index]!==-1?$emit('go-to-dialog', lesson[index]):''"
              v-show="viewSetting==='all'||(getNowDay()===dayIndex+1)"
          >
            <div class="lesson-cell-inner" v-if="show=isLessonExist(lesson[index])">
              <span v-if="visible.name" v-text="show?getLessonFromId(lesson[index]).name:''"></span>
              <span v-if="visible.room" v-text="show?getLessonFromId(lesson[index]).room:''"></span>
              <span v-if="visible.teacher" v-text="show?getLessonFromId(lesson[index]).teacher:''"></span>
              <span v-if="visible.belongings" v-text="show?getLessonFromId(lesson[index]).belongings:''"></span>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <check-dialog v-if="initCheckFlag" :click-yes="setInitSetting" :click-no="closeInitDialog">
      <template v-slot:title>確認</template>
      <template v-slot:message>
        <p>以下の内容で設定しますか？</p>
        <p>
          最大時限数: {{initMaxLesson}}<br>
          ０時限目から開始: {{initStartZero?'はい':'いいえ'}}
        </p>
      </template>
    </check-dialog>
  </div>
</template>

<script>
  import ButtonS from '../components/Button-S'
  import CheckDialog from '../components/CheckDialog'
  import CheckBoxS from '../components/Checkbox-S'

  export default {
    components: {
      'button-s': ButtonS,
      'check-dialog': CheckDialog,
      'checkbox-s': CheckBoxS
    },
    props: {
      viewSetting: {
        type: String,
        default: 'all'
      },
      editMode: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        initMaxLesson: 1,
        initStartZero: false,
        initCheckFlag: false,
        days: ['月', '火', '水', '木', '金'],
        innerSelectLessonPos: {
          day: -1,
          time: -1
        }
      }
    },
    methods: {
      getMaxLessons: function () {
        return [...Array(8).keys()].map(i => ++i)
      },
      clickInitButton: function () {
        this.initCheckFlag = true
      },
      closeInitDialog: function () {
        this.initCheckFlag = false
      },
      setInitSetting: function () {
        this.maxLesson = this.initMaxLesson
        this.startZero = this.initStartZero
        localStorage.setItem('maxLesson', this.maxLesson)
        localStorage.setItem('startZero', this.startZero)
        this.$store.commit('initLessons')
        this.$store.commit('initLessonBoard')

        this.initCheckFlag = false
      },
      getNowDay: function () {
        return new Date().getDay()
      },
      getLessonFromId: function (id) {
        return this.$store.state.lessons.find(lesson => lesson.id === id)
      },
      isLessonExist: function (id) {
        return id !== -1 && this.getLessonFromId(id) !== undefined
      },
      scrollSelect: function () {
        const ele = document.getElementById('select-lesson')
        if (ele !== null) {
          ele.scrollIntoView({
            behavior: 'smooth',
            inline: 'center'
          })
        }
      }
    },
    computed: {
      getInitLessonNumber: function () {
        return [...Array(this.initMaxLesson).keys()].map(i => this.initStartZero ? i : ++i)
      },
      getLessonNumber: function () {
        return [...Array(this.maxLesson).keys()].map(i => this.startZero ? i : ++i)
      },
      startZero: {
        get () {
          return this.$store.state.startZero
        },
        set (value) {
          this.$store.commit('setStartZero', value)
        }
      },
      maxLesson: {
        get () {
          return this.$store.state.maxLesson
        },
        set (value) {
          this.$store.commit('setMaxLesson', value)
        }
      },
      lessonBoard: {
        get () {
          return this.$store.state.lessonBoard
        },
        set (value) {
          this.$store.commit('setLessonBoard', value)
        }
      },
      selectLessonPos: {
        get () {
          return this.innerSelectLessonPos
        },
        set (value) {
          this.$set(this.innerSelectLessonPos, 'day', value.day)
          this.$set(this.innerSelectLessonPos, 'time', value.time)
          this.$emit('select-lesson', this.selectLessonPos)
        }
      },
      visible () {
        return this.$store.state.visible
      }
    },
    mounted () {
      const ele = document.getElementsByClassName('today-lesson')
      if (ele.length > 0) {
        ele[0].scrollIntoView({
          behavior: 'smooth',
          inline: 'center'
        })
      }
    },
    watch: {
      selectLessonPos: {
        handler: function () {
          setTimeout(this.scrollSelect, 50)
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";

  .lesson-list-root{
    display: flex;
    justify-content: center;
    margin-left: auto; margin-right: auto;
    max-width: 90%;

    .max-lesson-setting{
      display: grid;
      grid-template-columns: 80px 1fr;
      grid-template-rows: 1fr 130px 130px;

      .message{
        grid-row: 1 / 2;
        grid-column: 1 / 3;

        font-size: 1.2em;
        text-align: center;
        margin: 10px 0;
        border-bottom: 2px dotted #143e00;
      }

      #areaA{
        grid-row: 2 / 4;
        grid-column: 1 / 2;
        display: flex;
        justify-content: center;
      }

      #areaB{
        grid-row: 2 / 3;
        grid-column: 2 / 3;
        display: flex;
        flex-direction: column;
      }

      #areaC{
        grid-row: 3 / 4;
        grid-column: 2 / 3;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
      }

      .modern-label{
        display: flex;
        flex-direction: column;
        margin: 10px 0;

        select{
          font-size: 1.2em;
        }
      }
    }
  }

  .lesson-board{
    text-align: center;
    border-collapse: collapse;
    table-layout: fixed;

    th, td{
      border: 1px solid $border-color;
    }

    .day-cell{
      width:     90px;
      min-width: 90px;
    }

    .number-cell{
      height: 70px;
      padding: 0 10px;
    }

    .today-lesson{
      background-color: $selected;
    }

    .lesson-cell{
      max-width: 120px;

      &-inner{
        position: relative;
        display: flex;
        flex-direction: column;
        align-content: space-around;
        /*white-space: nowrap;*/
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        max-width: 7em;
        margin: auto;
        overflow: hidden;

        span:not(:first-child){
          font-size: small;
        }
        span:first-child{
          position: relative;
          width: 6.5em;
          height: auto;
          margin: 0 auto;
          word-wrap: break-word;
          overflow: hidden;
          white-space: normal;
          font-weight: bold;
        }
      }
    }

    .select-lesson-line{
      background-color: #edffc9;
    }

    #select-lesson{
      background-color: $selected;
      outline: 2px solid #2fd068;
      outline-offset: -1px;
    }

    .empty-cell{
    }
  }

  .lesson-board-area{
    overflow: auto;
    white-space: nowrap;
  }
</style>
