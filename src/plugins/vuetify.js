import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#323232',
        secondary: '#414141',
        accent: '#03DAC6',
        background: '#323232',
      },
    },
  },
});
