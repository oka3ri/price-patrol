// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#053D44",
          secondary: "#F2F4F7",
          warning: "#F1841F",
        },
      },
    },
  },
  defaults: {
    VBtn: {
      color: "secondary",
    },
    VTextField: {
      color: "light-blue",
    },
    VSelect: {
      color: "light-blue",
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});
