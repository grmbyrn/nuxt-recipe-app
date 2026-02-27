<script setup lang='ts'>

import RecipeCard from '~/components/RecipeCard.vue'
import { useRecipes } from '~/composables/useRecipes'

const recipes = ref<any[]>([])
const error = ref<string | null>(null)

const { getAllRecipes } = useRecipes()

onMounted(async () => {
    const { data, error: fetchError } = await getAllRecipes()
    if (fetchError) {
        error.value = fetchError.message
    } else {
        recipes.value = data
    }
})
</script>

<template>
    <section class="py-20 container">
        <h2 class="text-3xl lg:text-5xl mb-2">Discover, Create, Share</h2>
        <p class="text-lg lg:text-xl mb-8">Check out our most popular recipes!</p>
        <NuxtLink class="px-4 py-2 text-white self-start bg-dodgeroll-gold rounded-md text-lg cursor-pointer"
            to="/add-recipe">Add Recipe</NuxtLink>
        <div v-if="!error && recipes.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 mt-8 max-w-screen-xl mx-auto">
            <RecipeCard v-for="recipe in recipes" :recipe="recipe" :key="recipe.id" />
        </div>
        <div v-if="!error && !recipes.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 mt-8 max-w-screen-xl mx-auto mt-8">
            <RecipeCard :recipe="{
                id: 1,
                name: 'Sample Pancakes',
                ingredients: ['Flour', 'Eggs', 'Milk', 'Sugar', 'Butter'],
                instructions: ['Mix ingredients', 'Heat pan', 'Pour batter', 'Flip pancakes', 'Serve'],
                prepTimeMinutes: 10,
                cookTimeMinutes: 15,
                servings: 4,
                difficulty: 'Easy',
                cuisine: 'American',
                caloriesPerServing: 250,
                tags: ['breakfast', 'sweet'],
                userId: 'sample-user',
                image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                rating: 5,
                reviewCount: 12,
                mealType: ['Breakfast']
            }" />
        </div>
        <p v-else class="text-xl text-red-600">{{ error }}</p>
    </section>
</template>