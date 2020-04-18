<template>
  <div class="add-credits">
    <v-content>
      <h1>Add credits</h1>
      <v-row justify="center">
        <v-card>
          <v-card-title>Add Credits</v-card-title>
          <v-card-text>
            <v-form class="px-3" ref="form">
              <v-row justify="start"
                ><v-btn depressed class="mx-auto" @click="submit"
                  >Add Credit</v-btn
                >
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-row>
    </v-content>
  </div>
</template>

<script>
export default {
  methods: {
    submit() {
      this.$store.dispatch('addCredits');
    },
  },
};
</script>
