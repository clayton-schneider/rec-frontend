<template>
  <div class="write-rec">
    <v-content v-if="rec">
      <h1>Letter of recommendation for: {{ rec._id }}</h1>

      <v-card class="mx-auto mb-4" outlined max-width="500">
        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field
              label="Name"
              v-model="rec.authorName"
              prepend-icon="mdi-account"
            ></v-text-field>
            <v-textarea
              label="Recommnedation"
              v-model="rec.recommendation"
              prepend-icon="mdi-typewritter"
            >
            </v-textarea>
            <v-text-field
              label="Signature"
              v-model="rec.signature"
              prepend-icon="mdi-pen-lock"
            ></v-text-field>
            <v-row justify="start"
              ><v-btn depressed class="mx-auto" @click="submit"
                >Submit Rec</v-btn
              >
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-content>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      rec: null,
    };
  },
  async created() {
    const recId = this.$route.params.recId;
    const { data } = await axios.get(
      `${this.$store.state.baseURL}recs/${recId}`
    );
    this.rec = data.data;
  },
  methods: {
    async submit() {
      await axios.put(`${this.$store.state.baseURL}recs/${this.rec._id}`, {
        authorName: this.rec.authorName,
        recommendation: this.rec.recommendation,
        signature: this.rec.signature,
        submitted: true,
      });
      this.$router.push('/sent');
    },
  },
};
</script>
