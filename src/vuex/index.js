import Vue from 'vue'
import Vuex from 'vuex'
import {Lesson} from '../jsclass/lesson'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    startZero: false,
    lessons: [],
    maxLesson: 0,
    lessonBoard: [[]],
    visible: {},
    todayOnly: false
  },
  getters: {
  },
  mutations: {
    setStartZero (state, n) {
      state.startZero = n
    },
    setLessons (state, n) {
      state.lessons = n
      localStorage.setItem('lessons', JSON.stringify(state.lessons))
    },
    setMaxLesson (state, n) {
      state.maxLesson = n
    },
    setLessonBoard (state, n) {
      state.lessonBoard = n
      localStorage.setItem('lessonBoard', JSON.stringify(state.lessonBoard))
    },
    setLessonToBoard (state, args) {
      state.lessonBoard[args.day].splice(args.time, 1, args.lessonId)
      localStorage.setItem('lessonBoard', JSON.stringify(state.lessonBoard))
    },
    setVisible (state, n) {
      state.visible = n
      localStorage.setItem('visible', JSON.stringify(state.visible))
    },
    setTodayOnly (state, v) {
      state.todayOnly = v
      localStorage.setItem('todayOnly', v)
    },
    init ({commit}) {
      commit('initLessons')
      commit('initLessonBoard')
      commit('initVisible')
    },
    initLessons () {
      const array = new Array(20)
      for (let y = 0; y < array.length; y++) {
        array[y] = new Lesson()
      }
      this.commit('setLessons', array)
    },
    initLessonBoard (state) {
      if (state.maxLesson > 0 && state.maxLesson < 9) {
        const array = new Array(5)
        for (let y = 0; y < 5; y++) {
          array.splice(y, 1, new Array(state.maxLesson).fill(-1))
        }
        this.commit('setLessonBoard', array)
      }
    },
    initVisible (state) {
      this.commit('setVisible', {
        name: true,
        room: true,
        teacher: true,
        belongings: false
      })
    },
    loadStorage (state) {
      state.maxLesson = localStorage.getItem('maxLesson')
      if (state.maxLesson === null || !state.maxLesson) {
        state.maxLesson = -1
      }
      state.maxLesson -= 0
      if (state.maxLesson < 0 || state.maxLesson > 8) {
        state.maxLesson = -1
      }
      state.startZero = localStorage.getItem('startZero') === 'true'
      state.lessonBoard = JSON.parse(localStorage.getItem('lessonBoard'))
      if (!state.lessonBoard || state.lessonBoard.length < 1) {
        this.commit('initLessonBoard')
      }
      state.lessons = JSON.parse(localStorage.getItem('lessons'))
      if (!state.lessons || state.lessons.length < 1) {
        this.commit('initLessons')
      }
      state.visible = JSON.parse(localStorage.getItem('visible'))
      if (!state.visible || Object.keys(state.visible).length !== 4) {
        this.commit('initVisible')
      }
      state.todayOnly = localStorage.getItem('todayOnly') === 'true'
    },
    addLesson (state, lesson) {
      const index = state.lessons.findIndex(lesson => lesson.id === -1)
      if (index === -1) {
        console.log('max lesson')
        return
      }
      state.lessons.splice(index, 1, lesson)
      localStorage.setItem('lessons', JSON.stringify(state.lessons))
    },
    removeLesson (state, id) {
      const index = state.lessons.findIndex(lesson => lesson.id === id)
      if (index >= 0) {
        state.lessons.splice(index, 1, new Lesson())

        let boardId = 0
        for (let day = 0; day < 5; day++) {
          while ((boardId = state.lessonBoard[day]
            .findIndex(lessonId => lessonId === id)) !== -1) {
            state.lessonBoard[day].splice(boardId, 1, -1)
          }
        }
        localStorage.setItem('lessons', JSON.stringify(state.lessons))
        localStorage.setItem('lessonBoard', JSON.stringify(state.lessonBoard))
      }
    },
    updateLesson (state, lesson) {
      const index = state.lessons.findIndex(le => le.id === lesson.id)
      if (index >= 0) {
        state.lessons.splice(index, 1, lesson)
        localStorage.setItem('lessons', JSON.stringify(state.lessons))
      }
    },
    updateLessonBoard (state, args) {
      state.lessonBoard[args.day].splice(args.time, 1, args.id)
      localStorage.setItem('lessonBoard', JSON.stringify(state.lessonBoard))
    }
  },
  actions: {
    removeLesson ({commit}, id) {
      commit('removeLesson', id)
    }
  }
})

export default store
