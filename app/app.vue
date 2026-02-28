<script setup lang="ts">
// ...existing code...
</script>

<template>
  <div class="app-root">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Montserrat:wght@300;400;700&display=swap');

:root {
  --bg-paper: #fdfcfb;
  --ink: #1a1a1a;
  --accent: #d4a373;
  --card: #ffffff;
}

html,
body,
#app {
  height: 100%;
  background: linear-gradient(135deg, #fff8f3 0%, #fbeee6 50%, #f7e7d9 100%);
  color: var(--ink);
}

.app-root {
  font-family: 'Montserrat', Arial, sans-serif;
}

.font-serif {
  font-family: 'Playfair Display', serif;
}

/* Soft UI shadow */
.soft-card {
  box-shadow:
    0 6px 18px rgba(26, 26, 26, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  background: var(--card);
  border-radius: 12px;
}

/* Hero float and glass search shared utilities */
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

/* Image frame that blends with the site gradient: translucent with subtle border and shadow */
.image-frame {
  background: rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.45);
}
</style>
