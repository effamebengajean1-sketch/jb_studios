<template>
  <div class="min-h-screen bg-background text-on-background font-body-md">
    <header class="py-4 border-b border-outline-variant">
      <NuxtLink to="/" class="font-headline-md text-headline-md tracking-widest text-on-background px-gutter block">
        STUDIO
      </NuxtLink>
    </header>
    <main class="max-w-4xl mx-auto px-gutter py-12">
      <slot />
    </main>
    <footer class="text-center text-sm text-on-surface-variant py-8 border-t border-outline-variant">
      © {{ new Date().getFullYear() }} JB STUDIO CAMEROUN — Tous droits réservés
    </footer>
  </div>
</template>