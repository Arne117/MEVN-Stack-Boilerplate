import Vue from 'vue'
import Router from 'vue-router'

// components
import Posts from '@/components/Posts'
import Addpost from '@/components/AddPost'
import Editpost from '@/components/EditPost'
import Home from '@/components/Home'

import VuexComponent from '@/components/vuex/Index'

import Hue from '@/components/hue/Hue'
import Rooms from '@/components/hue/Rooms'
import Room from '@/components/hue/Room'
import Lights from '@/components/hue/Lights'

let loggedIn = false
function checkLoginState (to, from, next) {
  if (loggedIn) next({name: 'Name'})
  else next()
}

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
      path: '/vuex',
      component: VuexComponent,
      name: 'VuexComponent'
    },
    {
      path: '/hue',
      component: Hue,
      name: 'Hue',
      children: [
        {
          path: 'rooms',
          component: Rooms,
          name: 'Rooms',
          children: [
            {
              path: ':id',
              component: Room,
              name: 'Room',
              props: true
            }
          ]
        },
        {
          path: 'lights',
          component: Lights,
          name: 'Lights'
        }
      ]
    },
    {
      path: '/:id/edit',
      component: Editpost,
      name: 'Editpost',
      props: true
    },
    {
      path: '/add',
      component: Addpost,
      name: 'Addpost'
    },
    {
      path: '/post',
      name: 'Posts',
      component: Posts,
      children: [
        // {
        //   path: 'add',
        //   component: Addpost,
        //   name: 'Addpost'
        // },
        // {
        //   path: ':id/edit',
        //   component: Editpost,
        //   name: 'Editpost',
        //   props: true
        // }
      ],
      beforeEnter: checkLoginState
    },
    { path: '*', redirect: { name: 'Home' } }
  ]
})

// before all navigations
router.beforeEach((to, from, next) => {
  if (loggedIn) next()
  // else next(false)
  next()
  // next({ name: 'Post' })
})

export default router
