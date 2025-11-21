<template>
  <div>
    <section class="pricing">
      <MoleculesSectionIntroPanel
        title="Cennik"
        intro="Poznaj cennik moich usług fizjoterapeutycznych"
      />
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.pricing {
  min-height: 100vh;
  max-width: 140rem;
  margin: 0 auto;
  padding: clamp(3rem, 5vw, 6rem) 2.4rem 0;

  @media (max-width: 768px) {
    padding: clamp(3rem, 5vw, 6rem) 1.6rem 0;
  }
}
</style>
