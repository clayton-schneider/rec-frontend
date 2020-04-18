<template>
  <div class="send-rec">
    <v-content>
      <h1>Send rec</h1>
      <p>{{ feedback }}</p>
      <v-row justify="center">
        <v-card outlined>
          <v-card-title>Send Rec</v-card-title>
          <v-card-text>
            <v-form class="px-3" ref="form">
              <v-text-field
                label="Name"
                :rules="inputRules"
                prepend-icon="mdi-account-arrow-right"
                v-model="toName"
              ></v-text-field>
              <v-text-field
                label="Email"
                prepend-icon="mdi-email"
                v-model="toEmail"
              ></v-text-field>
              <v-row justify="start"
                ><v-btn depressed class="mx-auto" @click="submit"
                  >Send Rec</v-btn
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
import axios from 'axios';

export default {
  data() {
    return {
      toName: '',
      toEmail: '',
      feedback: null,
      inputRules: [v => v.length > 0 || 'Please enter a name'],
    };
  },
  computed: {
    credits() {
      return this.$store.state.user.credits;
    },
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        if (this.credits > 0) {
          this.feedback = null;
          const { data } = await axios.post(
            `${this.$store.state.baseURL}recs/send/${this.$route.params.recId}`,
            {
              toName: this.toName,
              toEmail: this.toEmail,
            },
            {
              withCredentials: true,
            }
          );
          if (data.success) this.$router.push('/sent');
          this.feedback =
            'There was an error sending you email please try again';
        } else {
          this.feedback = 'Not enough credits';
        }
      }
    },
  },
};
</script>
