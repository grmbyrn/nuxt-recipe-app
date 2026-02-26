<script setup lang="ts">


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

import { useSupabase } from '~/composables/useSupabase';

onMounted(async () => {
    const supabase = useSupabase();
    const { data, error: fetchError } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);
    if (fetchError) {
        error.value = fetchError.message;
    } else {
        recipes.value = data || [];
    }
});

useSeoMeta({
    title: "Nuxtcipes",
    description: "Recipes for you to cook!",
    ogTitle: "Nuxtcipes",
    ogDescription: "Recipes for you to cook!",
    ogImage: "/nuxt-course-hero.png",
    ogUrl: `http:localhost:3001`,
    twitterTitle: "Nuxtcipes",
    twitterDescription: "Recipes for you to cook!",
    twitterImage: "/nuxt-course-hero.png",
    twitterCard: "summary",
});
</script>

<template>
    <main>
        <section class="bg-[#f1f1f1]">
            <div class="container flex flex-col lg:flex-row items-center py-20 gap-10">
                <div class="flex-1 order-2 lg:order-1 text-center lg:text-left">
                    <h1 class="text-4xl lg:text-6xl font-extrabold mb-6 text-balance">
                        Master the Kitchen with Ease: Unleash Your Inner Chef Today!
                    </h1>
                    <p class="text-xl lg:text-2xl mb-8 text-balance">
                        Discover recipes helping you to find the easiest way to cook.
                    </p>
                    <NuxtLink to="/all-recipes"
                        class="px-4 py-2 text-white self-start bg-dodgeroll-gold rounded-md text-lg cursor-pointer">
                        Browse Recipes
                    </NuxtLink>
                </div>
                <div class="flex-1 order-1 lg:order-2">
                    <NuxtImg sizes="xs:100vw sm:667px" src="/nuxt-course-hero.png" format="webp" densities="x1"
                        alt="" />
                </div>
            </div>
        </section>
        <section class="py-20 container">
            <h2 class="text-3xl lg:text-5xl mb-2">Discover, Create, Share</h2>
            <p class="text-lg lg:text-xl mb-8">Check out some of our newest recipes!</p>
            <NuxtLink class="px-4 py-2 text-white self-start bg-dodgeroll-gold rounded-md text-lg cursor-pointer"
                to="/add-recipe">Add Recipe</NuxtLink>
            <div v-if="!error && recipes.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 mt-8 border border-red-500">
                <RecipeCard v-for="recipe in recipes" :recipe="recipe" :key="recipe.id" />
            </div>
            <div v-else-if="!error && !recipes.length" class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 mt-8 max-w-screen-xl mx-auto">
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
                    userId: 1,
                    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    rating: 5,
                    reviewCount: 12,
                    mealType: ['Breakfast']
                }" />
            </div>
            <p v-else class="text-xl text-red-600">{{ error }}</p>
        </section>
    </main>
</template>