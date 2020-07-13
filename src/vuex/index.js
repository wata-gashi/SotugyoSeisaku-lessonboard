import Vue from 'vue'
import Vuex from 'vuex'
import {Lesson} from '../jsclass/lesson'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    startZero: false,
    lessons: [],
    maxLesson: 0,
    lessonBoard: [[]]
  },
  getters: {
  },
  mutations: {
    setStartZero (state, n) {
      state.startZero = n
    },
    setLessons (state, n) {
      state.lessons = n
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
    initLessons (state) {
      state.lessons = new Array(20)
      for (let y = 0; y < state.lessons.length; y++) {
        state.lessons[y] = new Lesson()
      }
      localStorage.setItem('lessons', JSON.stringify(state.lessons))
    },
    initLessonBoard (state) {
      state.lessonBoard = new Array(5)
      for (let y = 0; y < 5; y++) {
        state.lessonBoard.splice(y, 1, new Array(state.maxLesson).fill(-1))
      }
      localStorage.setItem('lessonBoard', JSON.stringify(state.lessonBoard))
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
