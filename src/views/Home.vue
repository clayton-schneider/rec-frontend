<template>
  <div class="home">
    <v-container>
      <v-row align="center" justify="center">
        <h1 class="mb-6 accent--text">Recommendable</h1>
      </v-row>
      <v-row justify="center">
        <v-btn color="blue" :href="`${backendURL}/auth/linkedin`"
          ><v-icon class="mr-4">mdi-linkedin</v-icon>Login with LinkedIn</v-btn
        >
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      backendURL: process.env.VUE_APP_API_URL,
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login');
    },
  },
};
</script>
