<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import { useRecipes } from '~/composables/useRecipes';

const route = useRoute();
const router = useRouter();
const { id } = route.params;

const recipe = ref<any | null>(null);
const error = ref<string | null>(null);

const { user, fetchUser } = useAuth();
const { getRecipeById, deleteRecipe } = useRecipes();

onMounted(async () => {
  await fetchUser();
  // Show sample recipe if id is 1 and no real recipe exists
  if (id === '1') {
    recipe.value = {
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
      userId: 1,
      image:
        'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 5,
      reviewCount: 12,
      mealType: ['Breakfast'],
    };
    error.value = null;
    return;
  }
  if (!id || Array.isArray(id)) {
    error.value = 'Recipe not found.';
    recipe.value = null;
    return;
  }
  const { data, error: fetchError } = await getRecipeById(Number(id));
  if (fetchError || !data) {
    error.value = 'Recipe not found.';
    recipe.value = null;
  } else {
    recipe.value = data;
    error.value = null;
  }
});

const handleDelete = async () => {
  if (!user.value || !recipe.value || user.value.id !== recipe.value.userId) {
    error.value = 'You are not authorized to delete this recipe.';
    return;
  }

  if (!confirm('Are you sure you want to delete this recipe?')) return;

  try {
    const { error: deleteError } = await deleteRecipe(recipe.value.id);

    if (deleteError) {
      throw deleteError;
    }

    router.push('/');
  } catch (err: any) {
    error.value = err.message || 'Failed to delete recipe';
  }
};
</script>

<template>
  <div class="container py-20 max-w-screen-lg mx-auto">
    <div v-if="error" class="text-red-600 text-xl mb-6">
      {{ error }}
    </div>

    <div v-if="recipe">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-5xl font-serif font-bold mb-4" style="color: var(--ink)">
          {{ recipe.name }}
        </h1>
        <div class="flex gap-4 text-xl text-gray-800 mb-6">
          <div class="flex items-center gap-2">
            <Icon name="i-mdi-clock-time-eight-outline" style="color: var(--accent)" />
            <span>{{ recipe.cookTimeMinutes }} mins</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon name="i-mdi-fire" style="color: var(--accent)" />
            <span>{{ recipe.caloriesPerServing }} kcal</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon name="i-mdi-star" style="color: var(--accent)" />
            <span>{{ recipe.rating }} ({{ recipe.reviewCount }})</span>
          </div>
        </div>
        <hr />
      </div>

      <!-- Image -->
      <NuxtImg
        :src="recipe.image"
        densities="x1"
        sizes="xs:100vw sm:100vw md:100vw lg:100vw"
        class="w-full max-h-[500px] object-cover rounded-md shadow mb-12"
        alt="Recipe Image"
      />

      <!-- Ingredients -->
      <div class="mb-12">
        <h2 class="text-3xl font-semibold mb-4">Ingredients</h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 text-lg">
          <li v-for="ingredient in recipe.ingredients" :key="ingredient">
            <label class="flex items-center gap-3">
              <input class="hidden peer" type="checkbox" />
              <div
                class="w-6 h-6 rounded-full border-2 border-dodgeroll-gold-500 flex items-center justify-center peer-checked:after:absolute peer-checked:after:w-4 peer-checked:after:h-4 peer-checked:after:bg-dodgeroll-gold-500 peer-checked:after:rounded-full"
              />
              <span class="peer-checked:line-through">{{ ingredient }}</span>
            </label>
          </li>
        </ul>
      </div>

      <!-- Instructions -->
      <div class="mb-16">
        <h2 class="text-3xl font-medium mb-4">Instructions</h2>
        <ul class="flex flex-col gap-4 text-lg">
          <li v-for="instruction in recipe.instructions" :key="instruction">
            <label class="flex items-center gap-3">
              <input class="hidden peer" type="checkbox" />
              <div
                class="w-6 h-6 rounded-full border-2 border-dodgeroll-gold-500 flex items-center justify-center peer-checked:after:absolute peer-checked:after:w-4 peer-checked:after:h-4 peer-checked:after:bg-dodgeroll-gold-500 peer-checked:after:rounded-full"
              />
              <span class="peer-checked:line-through">{{ instruction }}</span>
            </label>
          </li>
        </ul>
      </div>

      <!-- Back Button -->
      <BaseBtn :to="`/`" label="Back to Recipes" />

      <div v-if="user?.id === recipe.userId">
        <button @click="handleDelete">Delete Recipe</button>
        <NuxtLink
          v-if="user?.id === recipe.userId"
          :to="`/edit-recipe/${recipe.id}`"
          class="text-blue-500 underline"
        >
          Edit Recipe
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
