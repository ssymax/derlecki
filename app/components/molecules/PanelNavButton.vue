<template>
  <button
    :type="type"
    :class="['panel-nav-button', variantClass, { 'panel-nav-button--active': isActive }]"
    :aria-pressed="ariaPressed ?? isActive"
    @click="$emit('click', $event)"
  >
    <span v-if="icon" class="panel-nav-button__icon">
      <Icon :name="icon" size="24" />
    </span>
    <span v-else class="panel-nav-button__index">{{ indexLabel }}</span>
    <span class="panel-nav-button__divider" aria-hidden="true" />
    <span class="panel-nav-button__text">
      <span class="panel-nav-button__title">{{ title }}</span>
      <span v-if="subtitle" class="panel-nav-button__subtitle">{{ subtitle }}</span>
    </span>
    <span class="panel-nav-button__arrow" aria-hidden="true">{{ computedArrow }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';

const props = withDefaults(
  defineProps<{
    indexLabel: string;
    title: string;
    subtitle?: string;
    arrow?: string;
    icon?: string;
    isActive?: boolean;
    ariaPressed?: boolean;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'services' | 'methods';
  }>(),
  {
    subtitle: '',
    arrow: '',
    icon: '',
    isActive: false,
    type: 'button',
    variant: 'services',
  },
);

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const variant = computed(() => props.variant ?? 'services');
const computedArrow = computed(() => {
  if (props.arrow) return props.arrow;
  return variant.value === 'methods' ? '→' : '↓';
});

const type = computed(() => props.type);
const isActive = computed(() => props.isActive ?? false);
const ariaPressed = computed(() => props.ariaPressed);
const variantClass = computed(() => `panel-nav-button--${variant.value}`);
const { indexLabel, title, subtitle } = toRefs(props);
</script>

<style scoped lang="scss">
.panel-nav-button {
  display: grid;
  grid-template-columns: auto 1px 1fr auto;
  gap: 1.5rem;
  align-items: center;
  width: 100%;
  padding: 1.5rem;
  border: 1px solid rgba($primary-color, 0.2);
  border-radius: 1.5rem;
  background: #fff;
  color: #1f1f1f;
  text-align: left;
  transition: all 0.3s ease;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: rgba($primary-color, 0.5);
    box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.08);
  }

  &--active {
    background: $primary-color;
    color: #fff;
    border-color: $primary-color;
    box-shadow: 0 2rem 3.5rem rgba($primary-color, 0.25);

    .panel-nav-button__divider {
      background: rgba(255, 255, 255, 0.4);
    }

    .panel-nav-button__arrow {
      color: rgba(255, 255, 255, 0.9);
    }

    &.panel-nav-button--services .panel-nav-button__arrow {
      transform: translateY(0.4rem);
    }

    &.panel-nav-button--methods .panel-nav-button__arrow {
      transform: translateX(0.4rem);
    }
  }

  &--methods {
    padding: 1.75rem;

    &:hover {
      transform: translateX(6px);
    }
  }
}

.panel-nav-button__index {
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba($primary-color, 0.8);

  .panel-nav-button--active & {
    color: rgba(255, 255, 255, 0.9);
  }
}

.panel-nav-button__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba($primary-color, 0.8);
  transition: all 0.3s ease;

  .panel-nav-button:hover & {
    transform: scale(1.15) rotate(5deg);
  }

  .panel-nav-button--active & {
    color: rgba(255, 255, 255, 0.9);
  }
}

.panel-nav-button__divider {
  width: 1px;
  height: 100%;
  background: rgba($primary-color, 0.2);
}

.panel-nav-button__text {
  display: flex;
  flex-direction: column;
}

.panel-nav-button__title {
  font-weight: 600;
  font-size: 1.6rem;
  color: inherit;
}

.panel-nav-button--methods .panel-nav-button__title {
  font-size: 1.8rem;
}

.panel-nav-button__subtitle {
  font-size: 1.2rem;
  color: rgba(#000, 0.6);
}

.panel-nav-button__arrow {
  font-size: 2rem;
  color: rgba($primary-color, 0.4);
  transition:
    transform 0.3s ease,
    color 0.3s ease;
}
</style>
