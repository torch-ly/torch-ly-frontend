
export default {
  mode: 'spa',

  env: {
    IMAGE_SERVER: process.env.IMAGE_SERVER,
  },

  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},

  pwa: {
    meta: {
      name: "torch.ly",
      nativeUI: true
    },
    manifest: {
      lang: 'de',
      name: "torch.ly",
      short_name: "torch.ly",
      background_color: "#eae2b7",
      start_url: "/",
      display: "standalone",
      theme_color: "#eae2b7"
    }
  },

  /*
  ** Global CSS
  */
  css: [
    "animate.css/animate.min.css",
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    'logic/stage/main.js',
    'plugins/backendComunication/backendComunication.js',
    'logic/hotkey.js'
  ],

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        },
      ]
    }]
  ],

  server: {
    host: '0.0.0.0',
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
