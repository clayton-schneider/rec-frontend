<template>
  <v-container class="fill-height">
    <v-row align="center">
      <p>{{ feedback }}</p>

      <v-card color="secondary" class="mx-auto" width="700">
        <v-card-title>Send recommendation to:</v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field
              label="Name"
              :rules="nameRules"
              color="accent"
              prepend-icon="mdi-account-arrow-right"
              v-model="toName"
            ></v-text-field>
            <v-text-field
              label="Email"
              color="accent"
              :rules="emailRules"
              prepend-icon="mdi-email"
              v-model="toEmail"
            ></v-text-field>
            <v-row justify="start"
              ><v-btn text color="accent" class="mx-auto" @click="submit"
                >Send Rec</v-btn
              >
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      toName: '',
      toEmail: '',
      feedback: null,
      nameRules: [v => !!v || 'Name is required'],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
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
            `${process.env.VUE_APP_API_URL}/recs/send/${this.$route.params.recId}`,
            {
              toName: this.toName,
              toEmail: this.toEmail,
            },
            {
              withCredentials: true,
            }
          );
          if (data.success) {
            this.$store.commit('SET_USER_DATA', data.data);
            this.$router.push('/sent');
          }
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
