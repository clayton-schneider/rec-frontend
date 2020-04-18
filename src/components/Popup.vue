<template>
  <v-dialog max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn absolute right fab slot="activator" v-on="on"
        ><v-icon>mdi-plus</v-icon></v-btn
      >
    </template>
    <v-card>
      <v-card-title>Request a new Rec</v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            label="Name"
            :rules="inputRules"
            prepend-icon="mdi-account-arrow-right"
            v-model="authorName"
          ></v-text-field>
          <v-text-field
            label="Email"
            prepend-icon="mdi-email"
            v-model="authorEmail"
          ></v-text-field>
          <v-row justify="end"
            ><v-btn depressed @click="submit">Send Rec</v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      authorName: '',
      authorEmail: '',
      inputRules: [v => v.length > 0 || 'Please enter a name'],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('createRec', {
          authorEmail: this.authorEmail,
          authorName: this.authorName,
        });
      }
    },
  },
};
</script>
