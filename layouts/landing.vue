<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  middleware: "check-auth"
};
</script>

<style>
/* @import url('~/assets/bootstrap-4.3.1-dist/css/bootstrap.min.css');  */
</style>
