<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const { signUp } = useAuth()
const router = useRouter()

const handleSignUp = async () => {
    try {
        error.value = ''
        await signUp(email.value, password.value)
        router.push('/login')
    } catch (err: any) {
        error.value = err.message
    }
}
</script>

<template>
    <div class="max-w-md mx-auto p-6">
        <h1 class="text-2xl font-bold mb-4">Sign Up</h1>
        <form @submit.prevent="handleSignUp" class="grid gap-4">
            <input v-model="email" placeholder="Email" class="input" required />
            <input v-model="password" type="password" placeholder="Password" class="input" required />
            <button class="bg-green-500 text-white px-4 py-2 rounded" type="submit">Create Account</button>
        </form>
        <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
        <p>Already have an account? <NuxtLink to='/login'>Log in</NuxtLink>
        </p>
    </div>
</template>
