import Vue from 'vue'
import Router from 'vue-router'

// components
import Home from '@/components/Home'

import Surveys from '@/components/survey/Surveys'
import ListSurveys from '@/components/survey/ListSurveys'
import CreateSurvey from '@/components/survey/CreateSurvey'
import EditSurvey from '@/components/survey/EditSurvey'
import EvaluateSurvey from '@/components/survey/EvaluateSurvey'

// let loggedIn = false
// function checkLoginState (to, from, next) {
//   if (loggedIn) next({name: 'Name'})
//   else next()
// }

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPos) {
    if (savedPos) return savedPos
    if (to.hash) return { selector: to.hash }
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      component: Home,
      name: 'Home'
    },
    {
      path: '/surveys',
      component: Surveys,
      children: [
        {
          path: '',
          component: ListSurveys,
          name: 'ListSurveys'
        },
        {
          path: 'create',
          component: CreateSurvey,
          name: 'CreateSurvey'
        },
        {
          path: ':id/edit',
          component: EditSurvey,
          name: 'EditSurvey'
        },
        {
          path: ':id/evaluate',
          component: EvaluateSurvey,
          name: 'EvaluateSurvey'
        }
      ]
    },
    { path: '*', redirect: { name: 'Home' } }
  ]
})

// before all navigations
// router.beforeEach((to, from, next) => {
  // if (loggedIn) next()
  // else next(false)
  // next()
  // next({ name: 'Post' })
// })

export default router
