<template>
  <v-app id="inspire">
    <Drawer />
    <TopBar />
    <v-content class="mx-4 mb-4">
      <router-view> </router-view>
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import Drawer from '@/components/Drawer';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';

export default {
  name: 'App',
  components: {
    Drawer,
    TopBar,
    Footer
  },
  data: () => ({
    drawer: false
  })
};
</script>

<style lang="scss">
.router {
  text-decoration: none;
}
</style>
