<template>
  <div class="dashboard">
    <v-content>
      <h1>Your recommendations</h1>
      <div v-if="user">
        <v-card
          class="mx-auto mb-4"
          max-width="500"
          v-for="rec in user.recs"
          :key="rec.id"
        >
          <v-card-title>Written by: {{ rec.authorName }}</v-card-title>
          <v-card-subtitle>{{ rec.createdAt.trim(0, 10) }}</v-card-subtitle>
          <v-spacer> </v-spacer>
          <v-card-actions>
            <v-row justify="end">
              <router-link
                class="router"
                :to="{ name: 'SendRec', params: { recId: rec._id } }"
              >
                <v-icon class="mr-4 mb-1">mdi-arrow-right</v-icon>
              </router-link>
            </v-row>
          </v-card-actions>
        </v-card>
      </div>
      <Popup />
    </v-content>
  </div>
</template>

<script>
import Popup from '@/components/Popup';

export default {
  components: {
    Popup,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    getUser() {
      this.$store.dispatch('getUser');
    },
  },
  created() {
    this.getUser();
  },
};
</script>
