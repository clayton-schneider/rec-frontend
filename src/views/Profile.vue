<template>
  <div class="profile">
    <v-container>
      <h1 class="title">{{ user.name }}</h1>
      <h2 class="subtitle-2">Credits: {{ user.credits }}</h2>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>
