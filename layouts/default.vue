<template>
  <div class="min-h-screen flex flex-col bg-background text-on-background font-body-md">
    <AppHeader />
    <main class="flex-1 pt-20">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>