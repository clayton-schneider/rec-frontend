<template>
  <v-container class="fill-height">
    <v-row align="center">
      <v-col>
        <v-card color="secondary" class="mx-auto" width="700">
          <v-card-title>Add credits to account</v-card-title>
          <v-card-text>
            <v-form class="px-3 " ref="form">
              <v-row>
                <v-radio-group @change="updateIntent" v-model="credits" row>
                  <v-radio
                    color="accent"
                    v-for="option in options"
                    :key="option.amount"
                    :disabled="isDisabled"
                    :label="`${option.amount} Credits`"
                  ></v-radio>
                </v-radio-group>
              </v-row>
              <h3 class="subtitle-1 mb-5">
                Your total:
                <span class="accent--text">{{ options[credits].price }}</span>
              </h3>
              <div ref="card"></div>
            </v-form>
            <v-row justify="end">
              <v-btn
                @click.prevent="submit"
                small
                :disabled="isDisabled"
                :loading="isLoading"
                color="accent"
                text
                class="mt-3 mr-5"
                >Add Credits</v-btn
              >
            </v-row>
          </v-card-text>
        </v-card>
        <p class="red--text text-center" v-if="feedback">
          {{ feedback }} Please try again
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

let stripe = Stripe(process.env.VUE_APP_STRIPE),
  elements = stripe.elements(),
  card = undefined,
  style = {
    base: {
      color: '#03DAC6',
      iconColor: '#ffffff',
      '::placeholder': { color: '#ffffff' },
    },
  };

export default {
  data() {
    return {
      credits: 0,
      options: [
        { amount: 1, price: '$2.00' },
        { amount: 5, price: '$7.50' },
        { amount: 10, price: '$10.00' },
      ],
      paymentIntent: null,
      isDisabled: true,
      isLoading: false,
      feedback: null,
    };
  },
  async mounted() {
    await this.initStripe();
  },
  methods: {
    async submit() {
      await this.payWithCard(stripe, card, this.paymentIntent.clientSecret);
    },
    async updateIntent() {
      if (!this.paymentIntent) {
        this.credits = 0;
        return;
      }
      const { data } = await axios.put(
        `${this.$store.state.baseURL}payments/update-payment-intent/${this.paymentIntent.id}`,
        { newCredits: this.options[this.credits].amount },
        { withCredentials: true }
      );
      this.paymentIntent = data;
      console.log(this.paymentIntent);
    },
    async initStripe() {
      const { data } = await axios.post(
        `${this.$store.state.baseURL}payments/create-payment-intent`,
        { credits: this.options[this.credits].amount },
        { withCredentials: true }
      );
      this.paymentIntent = data;
      console.log(this.paymentIntent);
      if (!card) card = elements.create('card', { style });
      card.mount(this.$refs.card);

      card.on('change', e => {
        this.isDisabled = e.empty;
      });
    },
    async payWithCard(stripe, card, clientSecret) {
      this.isLoading = true;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });
      if (result.error) {
        this.feedback = result.error.message;
        this.isLoading = false;
      } else {
        this.feedback = null;
        await this.$store.dispatch('addCredits', {
          amount: this.paymentIntent.amount,
        });
        this.isLoading = false;
        this.$router.push('/dashboard');
      }
    },
  },
};
</script>
