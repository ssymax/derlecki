<template>
  <div>
    <AtomsAppLoader />
    <div v-if="isLoaded">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
const { state } = useAppStore();
const isLoaded = computed(() => state.isLoaded);
</script>
