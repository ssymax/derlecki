<template>
  <Transition name="app-nav-overlay">
    <div
      v-if="isVisible"
      class="app-nav-overlay"
      aria-hidden="true"
      @click="handleClose"
    />
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  isVisible: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const handleClose = () => {
  emit('close');
};
</script>

<style scoped lang="scss">
.app-nav-overlay {
  position: fixed;
  inset: 0;
  z-index: 10;
}

.app-nav-overlay-enter-active,
.app-nav-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.app-nav-overlay-enter-from,
.app-nav-overlay-leave-to {
  opacity: 0;
}

@include min-width-lg() {
  .app-nav-overlay {
    display: none;
  }
}
</style>
