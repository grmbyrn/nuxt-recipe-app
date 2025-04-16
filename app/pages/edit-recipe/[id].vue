<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '~/composables/useAuth';
import type { Database } from '~~/types/supabase';

type Recipe = Database['public']['Tables']['recipes']['Row']

const config = useRuntimeConfig();
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey);
const route = useRoute();
const router = useRouter();
const { user, fetchUser } = useAuth();
const id = route.params.id as string;

const error = ref<string | null>(null);
const loading = ref(true);

const rawForm = ref({
  name: '',
  prepTimeMinutes: null,
  cookTimeMinutes: null,
  servings: null,
  difficulty: '',
  cuisine: '',
  caloriesPerServing: null,
  image: '',
  rating: null,
  reviewCount: null,
  ingredients: '',
  instructions: '',
  tags: '',
  mealType: ''
});

onMounted(async () => {
  await fetchUser();

  const { data, error: fetchError } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError) {
    error.value = `Error fetching recipe: ${fetchError.message}`;
    loading.value = false;
    return;
  }

  if (data.userId !== user.value?.id) {
    error.value = 'You are not authorized to edit this recipe.';
    loading.value = false;
    return;
  }

  // Populate form
  rawForm.value = {
    ...data,
    ingredients: (data.ingredients || []).join('\n'),
    instructions: (data.instructions || []).join('\n'),
    tags: (data.tags || []).join('\n'),
    mealType: (data.mealType || []).join('\n')
  };

  loading.value = false;
});

async function updateRecipe() {
  if (!user.value) {
    console.error('User not authenticated!');
    return;
  }

  const form = {
    ...rawForm.value,
    ingredients: rawForm.value.ingredients.split('\n').map(i => i.trim()),
    instructions: rawForm.value.instructions.split('\n').map(i => i.trim()),
    tags: rawForm.value.tags.split('\n').map(i => i.trim()),
    mealType: rawForm.value.mealType.split('\n').map(i => i.trim()),
  };

  const { error: updateError } = await supabase
    .from('recipes')
    .update(form)
    .eq('id', id);

  if (updateError) {
    console.error('Error updating recipe:', updateError.message);
    error.value = updateError.message;
    return;
  }

  router.push(`/recipes/${id}`);
}
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Edit Recipe</h1>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>
    <form v-else @submit.prevent="updateRecipe" class="grid gap-4">
      <input v-model="rawForm.name" placeholder="Name" class="input" required />

      <div>
        <label class="block font-semibold mb-1">Ingredients (one per line)</label>
        <textarea v-model="rawForm.ingredients" class="input" rows="5" required></textarea>
      </div>

      <div>
        <label class="block font-semibold mb-1">Instructions (one per line)</label>
        <textarea v-model="rawForm.instructions" class="input" rows="5" required></textarea>
      </div>

      <input type="number" v-model="rawForm.prepTimeMinutes" placeholder="Prep Time (mins)" class="input" required />
      <input type="number" v-model="rawForm.cookTimeMinutes" placeholder="Cook Time (mins)" class="input" required />
      <input type="number" v-model="rawForm.servings" placeholder="Servings" class="input" required />
      <input v-model="rawForm.difficulty" placeholder="Difficulty" class="input" required />
      <input v-model="rawForm.cuisine" placeholder="Cuisine" class="input" required />
      <input type="number" v-model="rawForm.caloriesPerServing" placeholder="Calories per Serving" class="input" required />

      <div>
        <label class="block font-semibold mb-1">Tags (one per line)</label>
        <textarea v-model="rawForm.tags" class="input" rows="5" required></textarea>
      </div>

      <input v-model="rawForm.image" placeholder="Image URL" class="input" required />

      <div>
        <label class="block font-semibold mb-1">Meal Type (one per line)</label>
        <textarea v-model="rawForm.mealType" class="input" rows="5" required></textarea>
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-opacity-80">
        Update Recipe
      </button>
    </form>
  </div>
</template>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded p-2;
}
</style>
