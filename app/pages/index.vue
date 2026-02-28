<script setup lang="ts">
import { useRecipes } from '~/composables/useRecipes';
import { ref } from 'vue';

const search = ref('');
const { recipes, loading, error, fetchRecipes } = useRecipes();

const {
  data: initialRecipes,
  pending,
  error: asyncError,
} = await useAsyncData('recipes', async () => {
  await fetchRecipes(6);
  return recipes.value;
});

definePageMeta({
  title: 'Nuxtcipes | Discover, Create, Share',
  description:
    'A modern recipe platform for food lovers. Discover, create, and share your favorite dishes with a beautiful, responsive UI.',
  ogImage: '/nuxt-course-hero.png',
  twitterCard: 'summary',
});
</script>

<template>
  <main class="font-sans min-h-screen">
    <!-- Hero Section -->
    <section class="relative">
      <div class="container flex flex-col lg:flex-row items-center py-20 gap-10">
        <div class="flex-1 order-2 lg:order-1 text-left">
          <h1
            class="text-5xl lg:text-7xl font-serif font-extrabold mb-6 text-balance"
            style="color: var(--ink)"
          >
            Elevate Your Cooking<br />
            <span class="block" style="color: var(--accent)">Discover, Create, Share</span>
          </h1>
          <p class="text-xl lg:text-2xl mb-8 text-balance text-[#5c4a2e] font-sans">
            The modern home for food lovers. Find inspiration, share your creations, and master the
            kitchen.
          </p>
          <div class="flex gap-4 mb-6">
            <NuxtLink
              to="/all-recipes"
              class="px-6 py-3 text-white rounded-md text-lg font-semibold shadow transition"
              style="background: var(--accent)"
              >Browse Recipes</NuxtLink
            >
            <NuxtLink
              to="/add-recipe"
              class="px-6 py-3 rounded-md text-lg font-semibold shadow transition"
              style="color: var(--accent); border: 1px solid var(--accent)"
              >Add Recipe</NuxtLink
            >
          </div>
          <div class="max-w-md mx-auto lg:mx-0">
            <div class="glass-search rounded-md px-3 py-2">
              <input
                v-model="search"
                type="text"
                placeholder="Search recipes..."
                class="w-full bg-transparent outline-none font-sans text-lg text-[var(--ink)] placeholder:opacity-60"
              />
            </div>
          </div>
        </div>
        <div class="flex-1 order-1 lg:order-2 relative flex items-center justify-center">
          <div
            class="rounded-xl overflow-hidden p-1 hero-float image-frame"
            style="box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06); border-radius: 16px"
          >
            <NuxtImg
              src="/nuxt-course-hero.png"
              format="webp"
              densities="x1"
              alt="Food Hero"
              class="block w-full h-96 object-cover object-center"
            />
          </div>
          <div
            class="absolute inset-0 rounded-xl bg-gradient-to-t from-[var(--accent)]/50 via-transparent to-transparent pointer-events-none"
          ></div>
        </div>
      </div>
    </section>
    <!-- Recipes Section -->
    <section class="py-20 container">
      <h2 class="text-4xl lg:text-6xl font-serif font-bold mb-2 text-[#3d2c1a]">
        Featured Recipes
      </h2>
      <p class="text-lg lg:text-xl mb-8 text-[#5c4a2e] font-sans">
        Check out some of our newest recipes!
      </p>
      <!-- Skeleton Loader -->
      <div
        v-if="loading || pending"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-8"
      >
        <div
          v-for="n in 6"
          :key="n"
          class="animate-pulse bg-[#fbeee6] rounded-md shadow h-80 w-full flex flex-col"
        >
          <div class="h-48 bg-[#e2c9b0] rounded-t-md"></div>
          <div class="flex-1 px-4 py-6">
            <div class="h-6 bg-[#e2c9b0] rounded w-2/3 mb-2"></div>
            <div class="h-4 bg-[#e2c9b0] rounded w-1/2 mb-2"></div>
            <div class="h-4 bg-[#e2c9b0] rounded w-1/3"></div>
          </div>
        </div>
      </div>
      <!-- Recipes Grid -->
      <div
        v-else-if="!error && recipes.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-8 max-w-screen-xl mx-auto"
      >
        <RecipeCard v-for="recipe in recipes" :recipe="recipe" :key="recipe.id" />
      </div>
      <!-- Empty State -->
      <div
        v-else-if="!error && !recipes.length"
        class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-screen-xl mx-auto"
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
      <!-- Error State -->
      <p v-else class="text-xl text-red-600 font-sans mt-8">{{ error }}</p>
    </section>
  </main>
</template>

<style scoped>
/* Subtle float animation for hero image */
.hero-float {
  transform: translateZ(0);
  animation: float 6s ease-in-out infinite;
}
@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0);
  }
}

.glass-search {
  backdrop-filter: blur(6px);
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.04);
}
</style>
