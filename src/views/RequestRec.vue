<template>
  <v-container class="fill-height">
    <v-row align="center">
      <v-card color="secondary" class="mx-auto" width="700">
        <v-card-title>Request a new Rec</v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field
              color="accent"
              label="Name"
              :rules="nameRules"
              prepend-icon="mdi-account-arrow-right"
              v-model="authorName"
            ></v-text-field>

            <v-text-field
              color="accent"
              label="Email"
              :rules="emailRules"
              prepend-icon="mdi-email"
              v-model="authorEmail"
            ></v-text-field>

            <v-switch
              v-model="customMessage"
              color="accent"
              label="Add custom message?"
            ></v-switch>

            <v-textarea
              prepend-icon="mdi-message"
              auto-grow
              color="accent"
              label="Message"
              v-model="message"
              v-show="customMessage"
            >
            </v-textarea>

            <v-row justify="end"
              ><v-btn text small color="accent" @click="submit">Request</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      customMessage: false,
      authorName: '',
      authorEmail: '',
      message: '',
      nameRules: [v => !!v || 'Name is required'],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('createRec', {
          authorEmail: this.authorEmail,
          authorName: this.authorName,
          message: this.message,
        });
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>
