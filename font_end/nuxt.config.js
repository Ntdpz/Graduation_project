// nuxt.config.js

import colors from 'vuetify/es5/util/colors';

export default {
  build: {
    transpile: ['@vuelidate/core'],
    // คำอธิบายอื่นๆที่คุณอาจต้องการเพิ่ม
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'user-detail', // ชื่อเส้นทาง
        path: '/users/:id',  // พาธเส้นทาง
        component: resolve(__dirname, 'pages/UserDetail.vue'), // ตำแหน่งของไฟล์ UserDetail.vue
      });
    },
  },
  head: {
    titleTemplate: '%s - user_management',
    title: 'user_management',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
  ],

  plugins: [
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
  ],

  axios: {
    baseURL: 'http://localhost:8080', // แก้ตาม URL ของ API ของคุณ
  },

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: 'http://localhost:8080', // แก้ตาม URL ของ API ของคุณ
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {
  }
};
