import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store/index';
import axios from 'axios';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/request',
    name: 'Request',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/RequestRec.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/rec/:recId',
    name: 'SendRec',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/SendRec.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/sent',
    name: 'Sent',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Sent.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/add-credits',
    name: 'AddCredits',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AddCredits.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/recommend/:recId',
    name: 'WriteRec',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/WriteRec.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = store.state.user;
    if (user) {
      next();
    } else {
      try {
        user = await axios.get(`${store.state.baseURL}auth/me`, {
          withCredentials: true,
        });
        next();
      } catch (err) {
        next({ name: 'Home' });
      }
    }
  } else {
    next();
  }
});

export default router;
