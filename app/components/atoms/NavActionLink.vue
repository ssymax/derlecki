<template>
  <a
    :href="link.href"
    class="app-nav-action"
    :aria-label="link.ariaLabel"
    :target="link.newTab ? '_blank' : undefined"
    :rel="link.newTab ? 'noreferrer noopener' : undefined"
    @click="handleClick"
  >
    <Icon :name="link.icon" size="20" />
    <span class="app-nav-action__label">{{ link.text }}</span>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  link: ContactLink;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const handleClick = () => {
  emit('click');
};
</script>

<style scoped lang="scss">
.app-nav-action {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  color: $primary-color;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;

  &:hover {
    background-color: rgba(0, 68, 171, 0.1);
  }

  @include max-width-lg() {
    color: #fff;
    width: 100%;
    justify-content: center;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}

.app-nav-action__label {
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;

  @include max-width-lg() {
    color: #fff;
  }
}
</style>
