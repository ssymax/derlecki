<template>
  <button
    class="app-nav-toggle"
    :class="{ 'app-nav-toggle--open': isOpen }"
    type="button"
    :aria-expanded="isOpen"
    :aria-label="toggleAriaLabel"
    aria-controls="main-navigation"
    @click="handleToggle"
  >
    <span />
    <span />
    <span />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle'): void;
}>();

const toggleAriaLabel = computed(() => (props.isOpen ? 'Zamknij menu' : 'Otwórz menu'));

const handleToggle = () => {
  emit('toggle');
};
</script>

<style scoped lang="scss">
.app-nav-toggle {
  position: relative;
  width: 3.6rem;
  height: 3.6rem;
  border: none;
  background: none;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  z-index: 20;

  @include max-width-lg() {
    display: inline-flex;
  }

  &:hover {
    background-color: rgba(0, 68, 171, 0.1);
  }

  span {
    position: absolute;
    width: 2.4rem;
    height: 0.2rem;
    background-color: #222;
    border-radius: 1rem;
    transition:
      transform 0.3s ease,
      width 0.3s ease,
      top 0.3s ease,
      opacity 0.3s ease;
  }

  span:nth-child(1) {
    top: 1.1rem;
  }

  span:nth-child(2) {
    top: 1.7rem;
  }

  span:nth-child(3) {
    top: 2.3rem;
  }
}

.app-nav-toggle--open {
  span:nth-child(1) {
    top: 1.7rem;
    transform: rotate(45deg);
  }

  span:nth-child(2) {
    opacity: 0;
    transform: translateX(1.2rem);
  }

  span:nth-child(3) {
    top: 1.7rem;
    transform: rotate(-45deg);
  }
}

.app-nav-toggle {
  @include max-width-md() {
    width: 3.2rem;
    height: 3.2rem;

    span {
      width: 2rem;
    }

    span:nth-child(1) {
      top: 0.9rem;
    }

    span:nth-child(2) {
      top: 1.5rem;
    }

    span:nth-child(3) {
      top: 2.1rem;
    }
  }
}

@include max-width-md() {
  .app-nav-toggle--open {
    span:nth-child(1) {
      top: 1.5rem;
    }

    span:nth-child(2) {
      transform: translateX(1rem);
    }

    span:nth-child(3) {
      top: 1.5rem;
    }
  }
}

@include min-width-lg() {
  .app-nav-toggle {
    display: none;
  }
}
</style>
