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
        <label>
          <input type="checkbox" v-model="initStartZero">
          ０時限目から開始にする
        </label>
      </div>
      <div id="areaC">
        <button-s :click-event="clickInitButton">決定</button-s>
      </div>
    </div>
    <div class="lesson-board-area" v-else>
      <table class="lesson-board">
        <tr>
          <th class="empty-cell"></th>
          <th class="number-cell" :class="{'select-lesson-line': selectLessonPos.time===index}"
              v-for="(number, index) in getLessonNumber">
            <span v-text="number"></span>
          </th>
        </tr>
        <tr :class="{'today-lesson': !editMode && getNowDay() === dayIndex + 1}" v-for="(day, dayIndex) in days"
            v-show="viewSetting==='all'||(getNowDay()===dayIndex+1)">
          <th class="day-cell" :class="{'select-lesson-line': selectLessonPos.day===dayIndex}"><span v-text="day"></span></th>
          <td class="lesson-cell" :class="{
            'select-lesson': selectLessonPos.day===dayIndex&&selectLessonPos.time===timeIndex,
            'select-lesson-line': selectLessonPos.day===dayIndex||selectLessonPos.time===timeIndex
          }"
              v-for="(id, timeIndex) in lessonBoard[dayIndex]"
              @click="editMode?selectLessonPos={day: dayIndex, time: timeIndex}:id!==-1?$emit('go-to-dialog', id):''">
            <div class="lesson-cell-inner" v-if="getLessonFromId(id)!==undefined">
              <span v-text="getLessonFromId(id)!==undefined?getLessonFromId(id).name:''"></span>
              <span v-text="getLessonFromId(id)!==undefined?getLessonFromId(id).room:''"></span>
              <span v-text="getLessonFromId(id)!==undefined?getLessonFromId(id).teacher:''"></span>
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

  export default {
    components: {
      'button-s': ButtonS,
      'check-dialog': CheckDialog
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
      }
    },
    mounted () {
      const ele = document.getElementsByClassName('today-lesson')
      if (ele.length > 0) {
        ele[0].scrollIntoView()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";

  .lesson-list-root{
    display: flex;
    justify-content: center;
    margin: 0 auto;
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
    writing-mode: vertical-lr;

    th, td{
      border: 1px solid $main-color;
    }

    .day-cell{
      width:     90px;
      min-width: 90px;
    }

    .number-cell{
      height: 70px;
      padding: 0 10px;
    }

    .day-cell>span, .number-cell>span, .empty-cell>span{
      writing-mode: horizontal-tb;
      white-space: nowrap;
    }

    .today-lesson{
      background-color: $selected;
    }

    .lesson-cell{
      &-inner{
        display: flex;
        flex-direction: column;
        justify-content: center;
        writing-mode: horizontal-tb;
        white-space: nowrap;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        max-width: 120px;

        span:not(:first-child){
          font-size: small;
        }
        span:first-child{
          word-wrap: break-word;
        }
      }
    }

    .select-lesson{
      &-line{
        background-color: #edffc9;
      }

      &:not(&-line){
        background-color: $selected;
        outline: 2px solid #2fd068;
        outline-offset: -1px;
      }
    }

    .empty-cell{
    }
  }

  .lesson-board-area{
    overflow: auto;
    white-space: nowrap;
  }
</style>
