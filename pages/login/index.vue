<template>
  <div>
    <section class="bg-[#191b1d] dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <div v-if="validation.message" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              {{ validation.message }}
            </div>
            <form @submit.prevent="login" class="space-y-4 md:space-y-6">
              <div class="mb-4">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" v-model="user.email" :class="{ 'border-red-500': validation.email }"
                       class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="name@arlchoose.id" required>
                <div v-if="validation.email" class="text-red-500 text-xs mt-1">{{ validation.email[0] }}</div>
              </div>
              <div class="mb-4">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" v-model="user.password" :class="{ 'border-red-500': validation.password }"
                       class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="••••••••" required>
                <div v-if="validation.password" class="text-red-500 text-xs mt-1">{{ validation.password[0] }}</div>
              </div>
              <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- Letakkan komponen toast di luar section -->
    <ToastSuccess ref="toastSuccess" />
  </div>
</template>


<script>
import ToastSuccess from '~/components/toastSuccess.vue';

export default {
  middleware: 'auth',

  components: {
    ToastSuccess
  },

  // Meta tag
  head() {
    return {
      title: 'Login',
    };
  },

  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      validation: [],
      headers: {
        image2: '',
        name: ''
      },
    };
  },

  async fetch() {
  try {
    const response = await this.$axios.get('/api/web/headers');
    if (response.status === 404) {
      console.error('Resource not found:', response);
      // Tindakan penanganan jika sumber daya tidak ditemukan
    } else {
      // Tanggapi respons normal
      this.headers.name = response.data.data[0].name;
      this.headers.image2 = response.data.data[0].image2;
    }
  } catch (error) {
    console.error('Error fetching headers:', error);
    // Tindakan penanganan jika permintaan gagal atau terjadi kesalahan lainnya
  }
},


  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.user.email,
            password: this.user.password,
          },
        });
        // Show success toast
        this.$refs.toastSuccess.showSuccessToast();

        // Delay redirect to admin dashboard
        setTimeout(() => {
          this.$router.push({
            name: '/admin/dashboard',
          });
        }, 1500); // Redirect after 1 seconds
      } catch (error) {
        // Handle validation errors
        this.validation = error.response.data;
      }
    },
  },
};
</script>

<style>
/* CSS tambahan dapat ditambahkan di sini jika diperlukan */
</style>
