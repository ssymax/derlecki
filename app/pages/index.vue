<template>
  <div class="home-page">
    <OrganismsHomeHero />
    <OrganismsHomeOpinions />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.home-page {
  margin-left: calc(100 / 1920 * -100vw);
  margin-right: calc(100 / 1920 * -100vw);
  margin-top: calc(50 / 1920 * -100vw);
  margin-bottom: calc(50 / 1920 * -100vw);

  @media (min-width: 1920px) {
    margin-left: -100px;
    margin-right: -100px;
    margin-top: -50px;
    margin-bottom: -50px;
  }
}
</style>
