<template>
  <v-app
    id="inspire"
    :style="{ background: $vuetify.theme.themes[theme].background }"
  >
    <SideBar v-if="isLoggedIn" />
    <v-content class="mx-4 my-4">
      <router-view> </router-view>
    </v-content>

    <Footer v-if="isLoggedIn" />
  </v-app>
</template>

<script>
import SideBar from '@/components/SideBar';
import Footer from '@/components/Footer';

export default {
  name: 'App',
  components: {
    SideBar,
    Footer,
  },
  data: () => ({
    drawer: false,
  }),
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light';
    },
    isLoggedIn() {
      return this.$store.state.user;
    },
  },
  created() {
    this.$store.dispatch('getUser');
  },
};
</script>

<style lang="scss">
.router {
  text-decoration: none;
}
</style>
