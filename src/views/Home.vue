<template>
  <div class="home">
    <v-content>
      <v-row justify="center">
        <h1 class="mr-5">Welcome</h1>
        <v-btn color="primary" :href="`${backendURL}/auth/linkedin`"
          ><v-icon class="mr-4">mdi-linkedin</v-icon>Login with LinkedIn</v-btn
        >
      </v-row>
      <v-row justify="center" class="mt-4">
        <h3>
          This app was designed to securely store letters of recommnedations
        </h3>
      </v-row>
      <v-card class="mx-auto mt-6" max-width="800">
        <v-list subheader three-line>
          <v-subheader>How to use</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >To log in you need a LinkedIn account</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >Press the plus button to request a letter of
                recommendation</v-list-item-title
              >
              <v-list-item-subtitle
                >An email will be sent to the email you provided with a link to
                fill out the recommendation</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >Once the recommendation has been submitted your dashboard will
                display it</v-list-item-title
              >
              <v-list-item-subtitle
                >You may need to refresh</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >To securely send this (to an employer) press the arrow on the
                recommendation and fill out the credentials</v-list-item-title
              >
              <v-list-item-subtitle
                >Sending a recommnedation costs one credit</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >You can add more credits from the menu</v-list-item-title
              >
              <v-list-item-subtitle
                >More credits will eventually cost money</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-content>
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
