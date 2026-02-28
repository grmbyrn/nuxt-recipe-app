<script setup lang="ts">
definePageMeta({
  middleware: 'auth-redirect',
});

import { useRecipes } from '~/composables/useRecipes';

const { user, fetchUser } = useAuth();
const { getMyRecipes } = useRecipes();

const {
  data: recipesData,
  pending,
  error,
} = await useAsyncData(
  'my-recipes',
  async () => {
    // run client-side only so auth is available
    await fetchUser();
    if (!user.value) return [];
    const { data, error } = await getMyRecipes(user.value.id);
    if (error) throw error;
    return data;
  },
  { server: false }
);
</script>

<template>
  <section class="py-20 container">
    <h2 class="text-3xl lg:text-5xl mb-2 font-serif">Your Recipes</h2>
    <p class="text-lg lg:text-xl mb-8">All recipes you’ve created</p>

    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
      <div v-for="n in 6" :key="n" class="animate-pulse bg-white rounded shadow h-64"></div>
    </div>

    <div
      v-else-if="!error && recipesData && recipesData.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8"
    >
      <RecipeCard v-for="recipe in recipesData" :recipe="recipe" :key="recipe.id" />
    </div>

    <p v-else-if="!error && recipesData && !recipesData.length" class="text-xl">
      You haven’t created any recipes yet.
    </p>
    <p v-else class="text-xl text-red-600">{{ error }}</p>
  </section>
</template>
