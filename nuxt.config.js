module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico"
    }],
    link: [{
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Exo+2&display=swap"
    }],

    script: [{
      src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#FCC631"
  },
  /*
   ** Global CSS
   */
  css: [
    "element-ui/lib/theme-chalk/index.css",
    "fullcalendar/dist/fullcalendar.min.css",
    "@fullcalendar/core/main.min.css",
    "@fullcalendar/daygrid/main.min.css",
    "@fullcalendar/timegrid/main.min.css",
    "@fullcalendar/bootstrap/main.min.css",
    "@/style/main.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: "~/plugins/calendar.js",
      ssr: false
    },
    "@/plugins/element-ui"
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "nuxt-fontawesome"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
