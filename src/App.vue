<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <div class="wrapper">
        <RouterLink to="/">EZStudy</RouterLink>
        <RouterLink to="/students">Students</RouterLink>
        <RouterLink to="/class">Class</RouterLink>        
    </div>
  </nav>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
}

 a.router-link-exact-active {
  color: #5286d4;
}
 a.router-link-exact-active:hover {
  background-color: transparent;
}


@media (min-width: 1024px) {
  nav {
    display: flex;
    padding-right: calc(var(--section-gap) / 2);
  }

  nav .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

}
</style>
