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
import License from '../pages/License'
import LessonQRDialog from '../pages/LessonQRDialog'
import AddLessonQRDialog from '../pages/AddLessonQRDialog'

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
        path: 'lesson-info/:id',
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
    redirect: '/edit/board',
    component: EditPage,
    props: true,
    children: [
      {
        name: 'lbe',
        path: 'board',
        components: {
          lbe: LessonEdit
        }
      },
      {
        name: 'lm',
        path: 'lesson',
        components: {
          lm: LessonManager
        },
        props: true,
        children: [
          {
            name: 'ald',
            path: 'add',
            components: {
              ald: AddLessonDialog
            },
            props: {
              ald: true
            }
          },
          {
            name: 'alqr',
            path: 'add/qr',
            components: {
              alqr: AddLessonQRDialog
            },
            props: {
              alqr: true
            }
          },
          {
            name: 'led',
            path: ':id',
            components: {
              led: LessonEditDialog
            },
            props: {
              led: true
            }
          },
          {
            name: 'lqr',
            path: 'qr/:id',
            components: {
              lqr: LessonQRDialog
            },
            props: {
              lqr: true
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
        path: 'list-display',
        components: {
          ldsd: ListDisplaySettingDialog
        }
      },
      {
        name: 'license',
        path: 'license',
        components: {
          license: License
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
