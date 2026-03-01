<script setup lang="ts">
import RecipeCard from '~/components/RecipeCard.vue';
import { useRecipes } from '~/composables/useRecipes';

const { getAllRecipes } = useRecipes();

const {
  data: recipesData,
  pending,
  error,
} = await useAsyncData('all-recipes', async () => {
  const { data, error } = await getAllRecipes();
  if (error) throw error;
  return data;
});
</script>

<template>
  <section class="py-20 container">
    <h2 class="text-3xl lg:text-5xl mb-2 font-serif">Discover, Create, Share</h2>
    <p class="text-lg lg:text-xl mb-8">Check out our most popular recipes!</p>
    <NuxtLink
      class="px-4 py-2 text-white self-start rounded-md text-lg cursor-pointer"
      to="/add-recipe"
      style="background: var(--accent)"
      >Add Recipe</NuxtLink
    >
    <div
      v-if="pending"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 mt-8 max-w-screen-xl mx-auto"
    >
      <div v-for="n in 8" :key="n" class="animate-pulse bg-white rounded shadow h-64"></div>
    </div>
    <div
      v-else-if="!error && recipesData && recipesData.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 mt-8 max-w-screen-xl mx-auto"
    >
      <RecipeCard v-for="recipe in recipesData" :recipe="recipe" :key="recipe.id" />
    </div>
    <div
      v-else-if="!error && recipesData && !recipesData.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 mt-8 max-w-screen-xl mx-auto"
    >
      <RecipeCard
        :recipe="{
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
          image:
            'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          rating: 5,
          reviewCount: 12,
          mealType: ['Breakfast'],
        }"
      />
    </div>
    <p v-else class="text-xl text-red-600">{{ error?.message ?? String(error) }}</p>
  </section>
</template>
