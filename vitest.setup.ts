import { vi } from 'vitest';
import { ref, computed, reactive, onMounted, onUnmounted, watch } from 'vue';

// Nuxt auto-imports are not available outside the Nuxt runtime.
// Expose Vue primitives as globals so components can use them without imports.
vi.stubGlobal('ref', ref);
vi.stubGlobal('computed', computed);
vi.stubGlobal('reactive', reactive);
vi.stubGlobal('onMounted', onMounted);
vi.stubGlobal('onUnmounted', onUnmounted);
vi.stubGlobal('watch', watch);

// Stub useNuxtApp to provide a no-op $gsap
vi.stubGlobal('useNuxtApp', () => ({
  $gsap: { to: vi.fn() },
}));
