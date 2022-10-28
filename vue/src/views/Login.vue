<template>
    <div>
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <router-link class="text-blue-500" :to="{ name : 'Register'}" >register for free</router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <input type="hidden" name="remember" value="true">
        <p v-if="error" class="py-3 px-2 bg-red-500 rounded-md text-white flex justify-between items-center">
          {{ error }}
          <span @click="error = ''" class="rounded-full py-1 px-1 hover:bg-gray-500 cursor-pointer" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </p>
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input v-model="user.email" id="email-address" name="email" type="email" autocomplete="email" required class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input v-model="user.password" id="password" name="password" type="password" autocomplete="current-password" required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password">
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input v-model="user.remember" id="remember" name="remember" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
            <label for="remember" class="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>
        </div>

        <div>
          <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <!-- Heroicon name: mini/lock-closed -->
              <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
              </svg>
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import store from '../store'
export default {
  setup(){

    const router = useRouter()
    const error = ref('')
    const user = {
      email : '',
      password : '',
      remember : false
    }

    const login = () => {
      store.dispatch('login', user)
        .then(() => {
          router.push({ name : 'Dashboard'})
        })
        .catch(err => {
          error.value = err.response.data.error
        })

    }

    return { user, login, error }
  }
}
</script>
