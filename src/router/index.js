import Vue from 'vue'
import Router from 'vue-router'
import TopPage from '../pages/TopPage'
import LessonInfoDialog from '../pages/LessonInfoDialog'
import EditPage from '../pages/EditPage'
import LessonEditDialog from '../pages/LessonEditDialog'
import SettingPage from '../pages/SettingPage'
import AddLessonDialog from '../pages/AddLessonDialog'
import ListDisplaySettingDialog from '../pages/ListDisplaySettingDialog'
import LessonEdit from '../components/LessonEdit'
import LessonManager from '../components/LessonManager'

Vue.use(Router)

const routes = [
  {
    name: 'top',
    path: '/',
    component: TopPage,
    props: true,
    children: [
      {
        name: 'li',
        path: '/lesson-info/:id',
        components: {
          li: LessonInfoDialog
        },
        props: {
          li: true
        }
      }
    ]
  },
  {
    name: 'edit',
    path: '/edit',
    component: EditPage,
    props: true,
    children: [
      {
        name: 'lbe',
        path: '/edit/board',
        components: {
          lbe: LessonEdit
        }
      },
      {
        name: 'lm',
        path: '/edit/lesson',
        components: {
          lm: LessonManager
        },
        props: true,
        children: [
          {
            name: 'led',
            path: '/edit/lesson/:id',
            components: {
              led: LessonEditDialog
            },
            props: {
              led: true
            }
          },
          {
            name: 'ald',
            path: '/edit/lesson/add',
            components: {
              ald: AddLessonDialog
            },
            props: {
              ald: true
            }
          }
        ]
      }
    ]
  },
  {
    name: 'setting',
    path: '/setting',
    component: SettingPage,
    children: [
      {
        name: 'ldsd',
        path: '/setting/list-display',
        components: {
          ldsd: ListDisplaySettingDialog
        }
      }
    ]
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.ROOT_BASE,
  routes,
  linkActiveClass: 'active'
})

export default router
