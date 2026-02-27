<script setup lang="ts">
definePageMeta({
    middleware: 'auth-redirect'
})

import { useRecipes } from '~/composables/useRecipes'

const { user, fetchUser } = useAuth()
const { getMyRecipes } = useRecipes()
const recipes = ref<any[]>([])
const error = ref<string | null>(null)

const fetchUserRecipes = async () => {
    if (!user.value) {
        console.error('User is not logged in!')
        return
    }
    try {
        const { data, error: fetchError } = await getMyRecipes(user.value.id)

        if (fetchError) throw fetchError

        recipes.value = data
    } catch (err: any) {
        error.value = err.message || 'Error fetching user recipes'
    }
};

onMounted(async () => {
    if (user.value) {
        await fetchUserRecipes();
    }
});

</script>

<template>
    <section class="py-20 container">
        <h2 class="text-3xl lg:text-5xl mb-2">Your Recipes</h2>
        <p class="text-lg lg:text-xl mb-8">All recipes you’ve created</p>

        <div v-if="!error && recipes.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            <RecipeCard v-for="recipe in recipes" :recipe="recipe" :key="recipe.id" />
        </div>

        <p v-else-if="!error && !recipes.length" class="text-xl">You haven’t created any recipes yet.</p>
        <p v-else class="text-xl text-red-600">{{ error }}</p>
    </section>
</template>
