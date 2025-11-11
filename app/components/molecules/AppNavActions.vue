<template>
  <div class="app-nav-actions" aria-label="Kontakt">
    <AtomsAppNavActionLink
      v-for="link in links"
      :key="link.href"
      :link="link"
      @click="handleSelect"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  links: ContactLink[];
}>();

const emit = defineEmits<{
  (e: 'select'): void;
}>();

const handleSelect = () => {
  emit('select');
};
</script>

<style scoped lang="scss">
.app-nav-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  min-width: 20rem;

  @include max-width-lg() {
    width: 100%;
    background-color: $primary-color;
    padding: 1.6rem;
    border-radius: 1.6rem;
    gap: 1.2rem;
    align-items: center;
    text-align: center;
  }

  @include min-width-lg() {
    margin-left: auto;
  }
}
</style>
