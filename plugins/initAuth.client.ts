export default defineNuxtPlugin(async (nuxtApp) => {
  const { fetchUser } = useAuth();
  try {
    await fetchUser();
  } catch (err: any) {
    // Log and continue initialization — avoid crashing app on auth fetch errors
    // Use Nuxt app logger when available, otherwise fall back to console
    if (
      nuxtApp &&
      typeof nuxtApp.$logger === 'object' &&
      typeof (nuxtApp as any).$logger.error === 'function'
    ) {
      (nuxtApp as any).$logger.error('initAuth plugin: fetchUser failed', err);
    } else {
      console.error('initAuth plugin: fetchUser failed', err);
    }
  }
});
