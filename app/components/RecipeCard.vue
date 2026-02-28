<script setup lang="ts">
import type { Recipe } from '../../types/recipe';
import { computed } from 'vue';

const props = defineProps<{ recipe: Recipe; featured?: boolean }>();
const totalTime = computed(
  () => (props.recipe?.prepTimeMinutes ?? 0) + (props.recipe?.cookTimeMinutes ?? 0)
);
</script>

<template>
  <article
    :aria-label="`Recipe: ${props.recipe.name}`"
    :class="[
      'soft-card overflow-hidden',
      props.featured ? 'lg:col-span-2 lg:row-span-2' : '',
      'transform transition hover:-translate-y-1',
    ]"
  >
    <div class="relative image-frame">
      <NuxtImg
        :src="props.recipe.image"
        alt=""
        class="w-full h-48 object-cover"
        sizes="xs:100vw sm:50vw lg:400px"
        format="webp"
        densities="x1"
      />
      <div
        class="absolute top-3 left-3 bg-[var(--accent)] text-white px-3 py-1 rounded-full text-sm font-semibold"
      >
        {{ totalTime }} min
      </div>
      <div
        class="absolute top-3 right-3 bg-white/80 text-[var(--ink)] px-2 py-1 rounded-full text-xs font-medium"
      >
        {{ props.recipe.difficulty }}
      </div>
    </div>
    <div class="flex flex-col py-6 px-4 flex-1">
      <h3 class="text-lg lg:text-xl font-serif font-semibold mb-2">{{ props.recipe.name }}</h3>
      <p class="text-sm text-gray-600 mb-4 line-clamp-2">
        {{ (props.recipe.ingredients || []).slice(0, 3).join(', ') }}
      </p>
      <div class="mt-auto flex items-center justify-between gap-4">
        <div class="flex items-center gap-3 text-sm text-[var(--ink)]">
          <Icon name="mdi:fire" style="color: var(--accent)" />
          <span>{{ props.recipe.caloriesPerServing }} cal</span>
          <Icon name="mdi:star" style="color: var(--accent)" />
          <span>{{ props.recipe.rating }} ({{ props.recipe.reviewCount }})</span>
        </div>
        <BaseBtn :to="`/recipes/${props.recipe.id}`" label="View" aria-label="View recipe" />
      </div>
    </div>
  </article>
</template>
