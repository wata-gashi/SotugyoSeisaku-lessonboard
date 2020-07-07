import Vue from 'vue'
import Router from 'vue-router'
import TopPage from '../pages/TopPage'
import LessonInfoDialog from '../pages/LessonInfoDialog'
import EditPage from '../pages/EditPage'
import LessonEditDialog from '../pages/LessonEditDialog'
import SettingPage from '../pages/SettingPage'
import SelectLessonDialog from '../pages/SelectLessonDialog'
import AddLessonDialog from '../pages/AddLessonDialog'

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
        name: 'led',
        path: '/edit/lesson-edit/:id',
        components: {
          led: LessonEditDialog
        },
        props: {
          led: true
        }
      },
      {
        name: 'sld',
        path: '/edit/select/:day/:time',
        components: {
          sld: SelectLessonDialog
        },
        props: {
          sld: true
        }
      },
      {
        name: 'ald',
        path: '/edit/add',
        components: {
          ald: AddLessonDialog
        },
        props: {
          ald: true
        }
      }
    ]
  },
  {
    name: 'setting',
    path: '/setting',
    component: SettingPage
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.ROOT_BASE,
  routes,
  linkActiveClass: 'active'
})

export default router
