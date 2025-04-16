<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';

const { user, fetchUser, logout } = useAuth()
const router = useRouter()

if (process.client && !user.value) {
    fetchUser()
}

const handleLogout = async () => {
    await logout()
    router.push('/login')
}
</script>

<template>
    <header class="py-4 border-b">
        <nav class="flex container items-center">
            <NuxtLink to="/" class="flex gap-1 items-center">
                <NuxtImg height="56px" src="/icon-green.png" alt="" />
                <span class="text-3xl font-bold">Nuxtcipes</span>
            </NuxtLink>
            <ul class="flex gap-6 ml-auto text-xl font-bold capitalize">
                <li>
                    <NuxtLink to="/">Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about">About</NuxtLink>
                </li>
                <li v-if="user">
                    <NuxtLink to="/my-recipes">My Recipes</NuxtLink>
                </li>
                <li v-if="user">
                    <button @click="handleLogout">Log Out</button>
                </li>
                <li v-else>
                    <NuxtLink to="/login">Login</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped></style>