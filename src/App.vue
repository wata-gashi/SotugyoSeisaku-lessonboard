<template>
  <div id="app">
    <header-s/>
    <router-view/>
    <footer-s/>
  </div>
</template>

<script>
  import HeaderS from './components/Header-S'
  import FooterS from './components/Footer-S'

  export default {
    components: {
      'header-s': HeaderS,
      'footer-s': FooterS
    },
    data () {
      return {
      }
    },
    methods: {
    },
    computed: {
      lessons: {
        get () {
          return this.$store.state.lessons
        },
        set (value) {
          this.$store.commit('setLessons', value)
        }
      },
      startZero: {
        get () {
          return this.$store.state.startZero
        },
        set (value) {
          this.$store.commit('setStartZero', value)
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
      maxLesson: {
        get () {
          return this.$store.state.maxLesson
        },
        set (value) {
          this.$store.commit('setMaxLesson', value)
        }
      }
    },
    created () {
      this.maxLesson = localStorage.getItem('maxLesson')
      if (this.maxLesson === null || !this.maxLesson) {
        this.maxLesson = -1
        return
      }

      this.maxLesson -= 0
      if (this.maxLesson < 0 || this.maxLesson > 8) {
        this.maxLesson = -1
        return
      }

      this.startZero = localStorage.getItem('startZero') === 'true'
      this.lessonBoard = JSON.parse(localStorage.getItem('lessonBoard'))
      if (!this.lessonBoard || this.lessonBoard.length < 1) {
        this.$store.commit('initLessonBoard')
      }
      this.lessons = JSON.parse(localStorage.getItem('lessons'))
      if (!this.lessons || this.lessons.length < 1) {
        this.$store.commit('initLessons')
      }
    }
  }
</script>

<style lang="scss">
  *{
    font-family: "Meiryo", fantasy;
    user-select: none;
    color: #195500;
  }
  body{
    margin: 0;
    background-color: #4c9336;
  }
  th{
    white-space: nowrap;
  }
  .dialog{
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(#222, .4);
    display: flex;
    justify-content: center;
    align-items: center;

    &-inner{
      width: 80%;
      height: 80%;
      max-width: 90%;
      max-height: 90%;
      background-color: white;
      padding: 10px;
    }

    &-title{
      font-size: 1.8em;
    }
  }
  .balloon-box{
    margin: 5px;
    padding: 10px;
    background-color: white;
    border-radius: 10px;
  }
  .right-box{
    display: flex;
    margin-left: auto;
  }
  .balloon-tab{
    display: flex;
    margin: 5px 5px 0;

    .tab-button{
      background-color: #ccc;
      padding: 7px 10px 17px;
      transition: background-color .3s;

      &:first-child{
        border-radius: 10px 0 0 0 / 10px 0 0 0;
      }

      &:last-child{
        border-radius: 0 10px 0 0 / 0 10px 0 0;
      }

      &:not(.tab-button-active){
        &:hover{
          background-color: #eee;
        }
        &:active{
          background-color: white;
        }
      }

      input{
        display: none;
      }
    }

    .tab-button-active{
      background-color: white;
    }

    & + .balloon-box{
      position: relative;
      margin-top: 0;
      top: -10px;
    }
  }

  .center-box{
    display: flex;
    justify-content: space-around;
  }

  .horizon-margin{
    margin: 20px 0 10px;
    border-top: 1px solid #cdcdcd
  }

  .message{
    &-warning{
      color: darkred;

    }
  }
</style>
