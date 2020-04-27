<template>
  <div class="dashboard">
    <v-container>
      <h1 class="title text-center my-8">Your recommendations</h1>
      <div v-if="user">
        <v-card
          color="secondary"
          class="mx-auto mb-4"
          max-width="500"
          v-for="rec in user.recs"
          :key="rec.id"
        >
          <v-card-title>Written by: {{ rec.authorName }}</v-card-title>
          <v-card-subtitle>{{ formatDate(rec.createdAt) }}</v-card-subtitle>
          <v-spacer> </v-spacer>
          <v-card-actions class="mt-6">
            <v-btn
              absolute
              bottom
              right
              text
              small
              color="accent"
              :to="{ name: 'SendRec', params: { recId: rec._id } }"
            >
              Send <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
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
  methods: {
    formatDate(date) {
      return date.slice(0, 10);
    },
  },
};
</script>
