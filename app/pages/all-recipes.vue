<script setup lang='ts'>

import RecipeCard from '~/components/RecipeCard.vue';
import { ref, onMounted } from 'vue';

interface Recipe {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
    tags: string[];
    userId: number;
    image: string;
    rating: number;
    reviewCount: number;
    mealType: string[];
}

const recipes = ref<Recipe[]>([]);
const error = ref<string | null>(null);

onMounted(async () => {
    try {
        const res = await fetch('http://localhost:4000/api/recipes');
        if (!res.ok) throw new Error('Failed to fetch recipes');
        const data = await res.json();
        recipes.value = data;
    } catch (err: any) {
        error.value = err.message || 'Error fetching recipes';
    }
});
</script>

<template>
    <section class="py-20 container">
        <h2 class="text-3xl lg:text-5xl mb-2">Discover, Create, Share</h2>
        <p class="text-lg lg:text-xl mb-8">Check out our most popular recipes!</p>
        <NuxtLink class="px-4 py-2 text-white self-start bg-dodgeroll-gold rounded-md text-lg cursor-pointer"
            to="/add-recipe">Add Recipe</NuxtLink>
        <div v-if="!error && recipes" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 mt-8">
            <RecipeCard v-for="recipe in recipes" :recipe="recipe" :key="recipe.id" />
        </div>
        <p v-else class="text-xl">Oops, something went wrong. Please try again later.</p>
    </section>
</template>