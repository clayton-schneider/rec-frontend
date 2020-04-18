<template>
  <div class="home">
    <v-content>
      <v-row justify="center">
        <h1>Marketing</h1>
      </v-row>
      <v-row justify="center">
        <v-btn color="primary" :href="`${backendURL}auth/linkedin`"
          ><v-icon class="mr-4">mdi-linkedin</v-icon>Login with LinkedIn</v-btn
        >
      </v-row>
    </v-content>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    backendURL() {
      return this.$store.state.baseURL;
    },
  },
  methods: {
    login() {
      this.$store.dispatch('login');
    },
  },
};
</script>
