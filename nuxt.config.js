export default {

  // Target Deployment
  target: 'server',

  // SSR
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
        lang: 'en'
    },
    meta: [{
            charset: 'utf-8'
        },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        },
        {
            hid: 'description',
            name: 'description',
            content: ''
        }
    ],
    link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'
        }
    ],
},
css: [
    '@/assets/css/main.css'
],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios','@nuxtjs/auth-next','vue-sweetalert2/nuxt', '@nuxtjs/vuetify', 'nuxt-multiselect',
  ],

  auth: {
    strategies: {
        local: {
            token: {
                property: 'token',
                required: true,
                type: 'Bearer'
            },
            user: {
                property: 'user',
                // autoFetch: true
            },
            endpoints: {
                login: {
                    url: '/api/admin/login',
                    method: 'post'
                },
                logout: {
                    url: '/api/admin/logout',
                    method: 'post'
                },
                user: {
                    url: '/api/admin/user',
                    method: 'get'
                }
            }
        }
    },
    redirect: {
        login: '/login',
        logout: '/login',
        callback: '/login',
        home: '/admin/dashboard'
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://localhost:8000',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
},
pageTransition: {
    name: 'page',
    mode: 'out-in'
}
}
