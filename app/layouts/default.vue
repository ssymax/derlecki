<template>
  <div class="layout-default">
    <OrganismsAppNavBar />
    <main class="layout-default__content">
      <slot />
    </main>
    <OrganismsAppFooter />
    <AtomsAppScrollToTop />
  </div>
</template>

<style lang="scss">
.layout-default__content {
  @include padding-style;
}
</style>
