<template>
  <v-app-bar app color="indigo" dark>
    <v-app-bar-nav-icon v-if="user" @click.stop="adjustDrawer" />
    <v-toolbar-title>Recs</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-subheader v-if="user">Credits: {{ user.credits }}</v-subheader>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    adjustDrawer() {
      this.$store.dispatch('adjustDrawer');
    },
  },
};
</script>
