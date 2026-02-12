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
            <div v-if="!error && recipes" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 mt-8">
                <RecipeCard v-for="recipe in recipes" :recipe="recipe" :key="recipe.id" />
            </div>
            <p v-else class="text-xl">Oops, something went wrong. Please try again later.</p>
        </section>
    </main>
</template>