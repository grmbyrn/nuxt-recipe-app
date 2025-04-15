<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'
import { ref, onMounted } from 'vue'

import type { Database } from '~~/types/supabase'

type Recipe = Database['public']['Tables']['recipes']['Row']

// ✅ Use Nuxt's runtime config to access env variables
const config = useRuntimeConfig()

const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey)

const recipes = ref<Recipe[]>([])

async function getRecipes() {
  const { data, error } = await supabase.from('recipes').select()
  if (error) {
    console.error("Error fetching recipes:", error.message)
  } else {
    recipes.value = data
  }
}

onMounted(() => {
  getRecipes()
})
</script>

<template>
  <div class="font-Montserrat">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
