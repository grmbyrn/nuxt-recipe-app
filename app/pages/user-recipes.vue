<script setup lang="ts">
import { onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'
import { useAuth } from '~/composables/useAuth'
import RecipeCard from '~/components/RecipeCard.vue'
import type { Database } from '~~/types/supabase'

type Recipe = Database['public']['Tables']['recipes']['Row']

const config = useRuntimeConfig()
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey)

const { user, fetchUser } = useAuth()

const recipes = ref<Recipe[]>([])
const error = ref<string | null>(null)

const fetchUserRecipes = async () => {
    if (!user.value) {
        console.error('User is not logged in!')
        return
    }

    const { data, error: err } = await supabase
        .from('recipes')
        .select('*')
        .eq('userId', user.value.id)
        .order('created_at', { ascending: false })

    if (err) {
        console.error('Error fetching user recipes:', err.message)
        error.value = err.message
    } else {
        recipes.value = data
    }

    console.log('User recipes:', data)
}

onMounted(async () => {
    // 👇 Ensure we fetch the user first on client side
    await fetchUser()

    // 👇 Now safely fetch recipes
    await fetchUserRecipes()
})
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
