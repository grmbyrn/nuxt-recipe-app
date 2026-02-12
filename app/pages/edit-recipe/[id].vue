<script setup lang="ts">

const route = useRoute();
const router = useRouter();
const { user, fetchUser } = useAuth();
const id = route.params.id as string;

interface RawRecipeForm {
  name: string;
  prepTimeMinutes: number | null;
  cookTimeMinutes: number | null;
  servings: number | null;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number | null;
  image: string;
  rating: number | null;
  reviewCount: number | null;
  ingredients: string;
  instructions: string;
  tags: string;
  mealType: string;
}

const error = ref<string | null>(null);
const loading = ref(true);

const rawForm = ref<RawRecipeForm>({
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
  try {
    const res = await fetch('http://localhost:4000/api/recipes');
    if (!res.ok) throw new Error('Failed to fetch recipes');
    const data = await res.json();
    const found = data.find((r: any) => r.id === Number(id));
    if (!found) {
      error.value = 'Recipe not found';
      loading.value = false;
      return;
    }
    if (found.userId !== user.value?.id) {
      error.value = 'You are not authorized to edit this recipe.';
      loading.value = false;
      return;
    }
    // Populate form
    rawForm.value = {
      ...found,
      ingredients: (found.ingredients || []).join('\n'),
      instructions: (found.instructions || []).join('\n'),
      tags: (found.tags || []).join('\n'),
      mealType: (found.mealType || []).join('\n')
    };
    loading.value = false;
  } catch (err: any) {
    error.value = err.message || 'Error fetching recipe';
    loading.value = false;
  }
});

async function updateRecipe() {
  if (!user.value) {
    console.error('User not authenticated!');
    return;
  }

  const form = {
    ...rawForm.value,
    ingredients: rawForm.value.ingredients.split('\n').map((i: string) => i.trim()),
    instructions: rawForm.value.instructions.split('\n').map((i: string) => i.trim()),
    tags: rawForm.value.tags.split('\n').map((i: string) => i.trim()),
    mealType: rawForm.value.mealType.split('\n').map((i: string) => i.trim()),
  };

    try {
      const token = localStorage.getItem('jwt');
      const res = await fetch(`http://localhost:4000/api/recipes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to update recipe');
      router.push(`/recipes/${id}`);
    } catch (err: any) {
      error.value = err.message || 'Error updating recipe';
    }
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
