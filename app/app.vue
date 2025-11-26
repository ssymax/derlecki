<template>
  <div>
    <AtomsAppLoader />
    <NuxtLayout v-if="isLoaded">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { state } = useAppStore();
const isLoaded = computed(() => state.isLoaded);
</script>
