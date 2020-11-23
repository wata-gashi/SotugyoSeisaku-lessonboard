<template>
  <div class="lesson-manager-root">
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
                <span class="teacher" v-text="lesson.teacher"></span>
              </span>
              <span class="belongings" v-text="lesson.belongings"></span>
            </span>
            <span class="edit-box right-box">
              <button-s :red="true" @click-event="clickRemove(lesson.id)">削除</button-s>
              <button-s @click-event="clickQR(lesson.id)">QR表示</button-s>
              <button-s @click-event="clickLesson(lesson.id)">編集</button-s>
            </span>
          </span>
        </label>
        <div class="lesson-box message-warning" v-if="lessonList.length===0">
          授業が登録されていません
        </div>
      </div>
    </div>
    <div class="right-box">
      <button-s @click-event="addLessonFromQR">QRから追加</button-s>
      <button-s @click-event="addLesson">追加</button-s>
    </div>
    <router-view name="ald"/>
    <router-view name="alqr"/>
    <router-view name="led"/>
    <router-view name="lqr"/>
    <check-dialog v-if="removeCheck" :click-yes="removeOk" :click-no="removeNo">
      <template v-slot:title>確認</template>
      <template v-slot:message>
        <p>
          以下の授業を削除してもよろしいですか？
        </p>
        <lesson-table :lesson="removeLesson"/>
      </template>
    </check-dialog>
  </div>
</template>

<script>
  import LessonSelectBox from './LessonSelectBox'
  import ButtonS from './Button-S'
  import CheckDialog from './CheckDialog'
  import LessonTable from './LessonTable'

  export default {
    components: {
      'lesson-select-box': LessonSelectBox,
      'button-s': ButtonS,
      'check-dialog': CheckDialog,
      'lesson-table': LessonTable
    },
    data () {
      return {
        selectLesson: -1,
        removeCheck: false,
        removeLessonId: -1
      }
    },
    methods: {
      isExistId: function (id) {
        return this.$store.state.lessons.findIndex(lesson => lesson.id === id)
      },
      addLesson: function () {
        this.$router.push({name: 'ald'})
      },
      addLessonFromQR: function () {
        this.$router.push({name: 'alqr'})
      },
      clickLesson: function (id) {
        if (this.isExistId(id) >= 0) {
          this.$router.push({name: 'led', params: {id: id.toString()}})
        }
      },
      clickQR: function (id) {
        if (this.isExistId(id) >= 0) {
          this.$router.push({name: 'lqr', params: {id: id.toString()}})
        }
      },
      clickRemove (id) {
        if (this.isExistId(id) >= 0) {
          this.removeCheck = true
          this.removeLessonId = id
        }
      },
      removeOk () {
        this.removeCheck = false
        this.$store.dispatch('removeLesson', this.removeLessonId)
      },
      removeNo () {
        this.removeCheck = false
      }
    },
    computed: {
      lessonList: {
        get () {
          return this.$store.state.lessons.filter(lesson => lesson.id !== -1)
        }
      },
      removeLesson () {
        if (this.removeLessonId === -1) return undefined
        return this.$store.state.lessons.find(lesson => lesson.id === this.removeLessonId)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/sass/global";
  @import "../assets/sass/color";

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
      overflow-y: auto;
      overflow-x: hidden;
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
          word-break: break-all;
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
            word-break: break-all;
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
      background-color: $head-color-1;
      border-bottom: 2px solid $border-color-2;
    }

    .lesson-label{
      input{
        display: none;

        &:checked + .lesson-box{
          background-color: $hover-color-1;

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
          background-color: $row-color-1;
        }
      }
    }
  }
</style>
