<template>
  <div class="write-rec">
    <v-container v-if="rec">
      <h1 class="title text-center my-8">Write letter of recommendation</h1>

      <v-card class="mx-auto mb-4" color="secondary" max-width="500">
        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field
              label="Name"
              color="accent"
              v-model="rec.authorName"
              prepend-icon="mdi-account"
            ></v-text-field>

            <v-file-input
              @change="readFile"
              v-model="file"
              v-show="false"
              id="file-input"
            ></v-file-input>

            <v-textarea
              color="accent"
              label="Recommnedation"
              v-model="rec.recommendation"
              prepend-icon="mdi-typewritter"
            >
            </v-textarea>

            <v-text-field
              color="accent"
              label="Signature"
              v-model="rec.signature"
              prepend-icon="mdi-pen-lock"
            ></v-text-field>
            <v-row justify="space-between">
              <v-btn outlined :loading="loading" @click="clickUpload"
                >Upload PDF</v-btn
              >
              <v-btn text color="accent" @click="submit">Submit Rec</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      file: null,
      loading: false,
      rec: null,
    };
  },
  async created() {
    const recId = this.$route.params.recId;
    const { data } = await axios.get(
      `${process.env.VUE_APP_API_URL}/recs/${recId}`
    );
    this.rec = data.data;
  },
  methods: {
    async submit() {
      await axios.put(`${process.env.VUE_APP_API_URL}/recs/${this.rec._id}`, {
        authorName: this.rec.authorName,
        recommendation: this.rec.recommendation,
        signature: this.rec.signature,
        submitted: true,
      });
      this.$router.push('/sent');
    },
    async readFile() {
      this.loading = true;
      let formData = new FormData();
      formData.append('file', this.file);
      const { data } = await axios.post(
        `${process.env.VUE_APP_API_URL}/recs/read-file`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      const recommendation = data.data;
      this.loading = false;
      this.rec.recommendation = recommendation;
    },
    clickUpload() {
      document.getElementById('file-input').click();
    },
  },
};
</script>
