import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/index';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    user: null,
    isLoggedIn: false,
  },
  mutations: {
    adjustDrawer: state => (state.drawer = !state.drawer),
    login: state => {
      state.isLoggedIn = true;
      router.push('/dashboard');
    },
    LOGOUT: state => {
      state.drawer = false;
      state.user = null;
      router.push('/');
    },
    SET_USER_DATA: (state, userData) => {
      state.user = userData;
    },
    ADD_CREDITS: (state, user) => {
      state.user = user;
    },
    EMAIL_SENT: state => router.push('/sent'),
  },
  actions: {
    adjustDrawer: context => context.commit('adjustDrawer'),
    getUser: async ({ commit, state }) => {
      if (state.user) return;
      const { data } = await axios.get(
        `${process.env.VUE_APP_API_URL}/auth/me`,
        {
          withCredentials: true,
        }
      );
      commit('SET_USER_DATA', data.data);
    },
    logout: async ({ commit, state }) => {
      await axios.get(`${process.env.VUE_APP_API_URL}/auth/logout`, {
        withCredentials: true,
      });
      commit('LOGOUT');
    },
    addCredits: async ({ commit, state }, amount) => {
      const { data } = await axios.post(
        `${process.env.VUE_APP_API_URL}/user/add-credits`,
        amount,
        {
          withCredentials: true,
        }
      );

      const user = data.data;
      commit('ADD_CREDITS', user);
    },
    createRec: async ({ commit, state }, recData) => {
      const { data } = await axios.post(
        `${process.env.VUE_APP_API_URL}/recs`,
        recData,
        {
          withCredentials: true,
        }
      );
      commit('EMAIL_SENT');
    },
  },
  modules: {},
});
