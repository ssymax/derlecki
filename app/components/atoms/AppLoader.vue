<template>
  <Transition name="loader">
    <div v-if="isLoading" class="app-loader">
      <div class="app-loader__content">
        <div class="app-loader__logo-wrapper">
          <img src="~/assets/logo.svg" alt="Logo" class="app-loader__logo" />
          <svg class="app-loader__circle" viewBox="0 0 100 100">
            <circle
              class="app-loader__circle-bg"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke-width="2"
            />
            <circle
              class="app-loader__circle-progress"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke-width="2"
              :style="{ strokeDashoffset: circleOffset }"
            />
          </svg>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const isLoading = ref(true);
const displayProgress = ref(0);

const { state } = useAppStore();

const circumference = 2 * Math.PI * 45;
const circleOffset = computed(
  () => circumference - (displayProgress.value / 100) * circumference,
);

let progressInterval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  // Animate progress from 0 to current state
  progressInterval = setInterval(() => {
    if (displayProgress.value < state.progress) {
      displayProgress.value = Math.min(state.progress, displayProgress.value + 5);
    }

    if (displayProgress.value >= 100) {
      if (progressInterval) clearInterval(progressInterval);
      setTimeout(() => {
        isLoading.value = false;
      }, 300);
    }
  }, 100);
});

onBeforeUnmount(() => {
  if (progressInterval) clearInterval(progressInterval);
});
</script>

<style scoped lang="scss">
.app-loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-loader__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.app-loader__logo-wrapper {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-loader__logo {
  width: 140px;
  height: auto;
  position: relative;
  z-index: 2;
  transform: translateY(-5px);
}

.app-loader__circle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.app-loader__circle-bg {
  stroke: rgba($primary-color, 0.1);
}

.app-loader__circle-progress {
  stroke: $primary-color;
  stroke-dasharray: 282.7433388230814;
  stroke-dashoffset: 282.7433388230814;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s ease;
}

.loader-enter-active,
.loader-leave-active {
  transition: opacity 0.5s ease;
}

.loader-enter-from,
.loader-leave-to {
  opacity: 0;
}
</style>
