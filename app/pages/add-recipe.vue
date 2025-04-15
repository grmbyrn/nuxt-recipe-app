<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import { createClient } from '@supabase/supabase-js';
import { ref } from 'vue'
import type { Database } from '~~/types/supabase';
import { useRouter } from 'vue-router';
import RecipeCard from '~/components/RecipeCard.vue';

type RecipeInsert = Database['public']['Tables']['recipes']['Insert']

const config = useRuntimeConfig()
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey)
const router = useRouter()
const { user } = useAuth()

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

async function submitRecipe() {
    if (!user.value) {
        console.error('User is not logged in!')
        return
    }

    const form = {
        ...rawForm.value,
        ingredients: rawForm.value.ingredients.split('\n').map(ingredient => ingredient.trim()),
        instructions: rawForm.value.instructions.split('\n').map(instruction => instruction.trim()),
        tags: rawForm.value.tags.split('\n').map(tag => tag.trim()),
        mealType: rawForm.value.mealType.split('\n').map(type => type.trim()),
        userId: user.value.id
    };

    const { error } = await supabase.from('recipes').insert([form]);

    if (error) {
        console.error('Error adding recipe:', error.message);
        return;
    }

    router.push('/')
}
</script>


<template>
    <div class="p-6 max-w-3xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">Add a New Recipe</h1>
        <form @submit.prevent="submitRecipe" class="grid gap-4">

            <input v-model="rawForm.name" placeholder="Name" class="input" required />

            <!-- Ingredients -->
            <div>
                <label class="block font-semibold mb-1">Ingredients (one per line)</label>
                <textarea v-model="rawForm.ingredients" placeholder="e.g. Flour, Sugar, Eggs" class="input" required
                    rows="5"></textarea>
            </div>

            <!-- Instructions -->
            <div>
                <label class="block font-semibold mb-1">Instructions (one per line)</label>
                <textarea v-model="rawForm.instructions" placeholder="e.g. Mix, Bake, Serve" class="input" required
                    rows="5"></textarea>
            </div>

            <input type="number" v-model="rawForm.prepTimeMinutes" placeholder="Prep Time (mins)" class="input"
                required />
            <input type="number" v-model="rawForm.cookTimeMinutes" placeholder="Cook Time (mins)" class="input"
                required />
            <input type="number" v-model="rawForm.servings" placeholder="Servings" class="input" required />

            <input v-model="rawForm.difficulty" placeholder="Difficulty" class="input" required />
            <input v-model="rawForm.cuisine" placeholder="Cuisine" class="input" required />
            <input type="number" v-model="rawForm.caloriesPerServing" placeholder="Calories per Serving" class="input"
                required />

            <!-- Tags -->
            <div>
                <label class="block font-semibold mb-1">Tags (one per line)</label>
                <textarea v-model="rawForm.tags" placeholder="e.g. Vegan, Gluten-Free" class="input" required
                    rows="5"></textarea>
            </div>

            <input v-model="rawForm.image" placeholder="Image URL" class="input" required />

            <input type="number" step="0.1" v-model="rawForm.rating" placeholder="Rating" class="input" required />
            <input type="number" v-model="rawForm.reviewCount" placeholder="Review Count" class="input" required />

            <!-- Meal Type -->
            <div>
                <label class="block font-semibold mb-1">Meal Type (one per line)</label>
                <textarea v-model="rawForm.mealType" placeholder="e.g. Breakfast, Dessert" class="input" required
                    rows="5"></textarea>
            </div>

            <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-opacity-80">
                Add Recipe
            </button>
        </form>
    </div>
</template>

<style scoped>
.input {
    @apply w-full border border-gray-300 rounded p-2;
}

.textarea {
    @apply border border-gray-300 rounded p-2 h-24;
}
</style>