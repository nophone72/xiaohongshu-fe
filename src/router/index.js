import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/note/:id',
    name: 'Note',
    component: () => import(/* webpackChunkName: "note" */ '../views/Note.vue'),
  },
  {
    path: '/user/:id',
    redirect: '/user/:id/note',
    name: 'User',
    component: () => import(/* webpackChunkName: "note" */ '../views/User/User.vue'),
    children: [
      {
        name: 'note',
        path: 'note',
        component: () => import('../views/User/UserCollectAndNote.vue'),
      },

      {
        name: 'collect',
        path: 'collect',
        component: () => import('../views/User/UserCollectAndNote.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
