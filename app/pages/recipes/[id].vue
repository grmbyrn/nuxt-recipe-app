<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useSupabase } from '~/composables/useSupabase';
import { useSeoMeta } from '#imports';
import { useAuth } from '~/composables/useAuth'

const route = useRoute();
const router = useRouter();
const { id } = route.params;

const recipe = ref<any | null>(null);
const error = ref<string | null>(null);

const supabase = useSupabase();
const { user, fetchUser } = useAuth()

onMounted(async () => {
    try {
        const { data, error: err } = await supabase
            .from('recipes')
            .select('*')
            .eq('id', id)
            .single();

        if (err) {
            error.value = `Error fetching recipe: ${err.message}`;
        } else {
            recipe.value = data;

            useSeoMeta({
                title: recipe.value?.name || 'Recipe',
                description: recipe.value?.description || 'Delicious recipe for you to try!',
                ogTitle: recipe.value?.name || 'Recipe',
                ogDescription: recipe.value?.description || 'Delicious recipe for you to try!',
                ogImage: recipe.value?.image || '/default-image.jpg',
                ogUrl: `https://yourdomain.com/recipes/${recipe.value?.id}`,
                twitterTitle: recipe.value?.name || 'Recipe',
                twitterDescription: recipe.value?.description || 'Delicious recipe for you to try!',
                twitterImage: recipe.value?.image || '/default-image.jpg',
                twitterCard: 'summary_large_image',
            });
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            error.value = `Unexpected error: ${err.message}`;
        } else {
            error.value = 'Unexpected error occurred';
        }
    }
});

const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this recipe?')) return

    const { error: deleteError } = await supabase
        .from('recipes')
        .delete()
        .eq('id', id)

    if (deleteError) {
        console.error('Error deleting recipe:', deleteError.message)
    } else {
        router.push('/')
    }
}
</script>

<template>
    <div class="container py-20 max-w-screen-lg mx-auto">
        <div v-if="error" class="text-red-600 text-xl mb-6">
            {{ error }}
        </div>

        <div v-if="recipe">
            <!-- Header -->
            <div class="mb-6">
                <h1 class="text-5xl font-bold mb-4">{{ recipe.name }}</h1>
                <div class="flex gap-4 text-xl text-gray-800 mb-6">
                    <div class="flex items-center gap-2">
                        <UIcon name="i-mdi-clock-time-eight-outline" class="text-dodgeroll-gold-500" />
                        <span>{{ recipe.cookTimeMinutes }} mins</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <UIcon name="i-mdi-fire" class="text-dodgeroll-gold-500" />
                        <span>{{ recipe.caloriesPerServing }} kcal</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <UIcon name="i-mdi-star" class="text-dodgeroll-gold-500" />
                        <span>{{ recipe.rating }} ({{ recipe.reviewCount }})</span>
                    </div>
                </div>
                <hr />
            </div>

            <!-- Image -->
            <NuxtImg :src="recipe.image" densities="x1" sizes="xs:100vw sm:100vw md:100vw lg:100vw"
                class="w-full max-h-[500px] object-cover rounded-md shadow mb-12" alt="Recipe Image" />

            <!-- Ingredients -->
            <div class="mb-12">
                <h2 class="text-3xl font-semibold mb-4">Ingredients</h2>
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 text-lg">
                    <li v-for="ingredient in recipe.ingredients" :key="ingredient">
                        <label class="flex items-center gap-3">
                            <input class="hidden peer" type="checkbox" />
                            <div
                                class="w-6 h-6 rounded-full border-2 border-dodgeroll-gold-500 flex items-center justify-center peer-checked:after:absolute peer-checked:after:w-4 peer-checked:after:h-4 peer-checked:after:bg-dodgeroll-gold-500 peer-checked:after:rounded-full" />
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
                                class="w-6 h-6 rounded-full border-2 border-dodgeroll-gold-500 flex items-center justify-center peer-checked:after:absolute peer-checked:after:w-4 peer-checked:after:h-4 peer-checked:after:bg-dodgeroll-gold-500 peer-checked:after:rounded-full" />
                            <span class="peer-checked:line-through">{{ instruction }}</span>
                        </label>
                    </li>
                </ul>
            </div>

            <!-- Back Button -->
            <BaseBtn :to="`/`" label="Back to Recipes" />

            <div v-if="user?.id === recipe.userId">
                <button @click="handleDelete">
                    Delete Recipe
                </button>
            </div>
        </div>
    </div>
</template>
