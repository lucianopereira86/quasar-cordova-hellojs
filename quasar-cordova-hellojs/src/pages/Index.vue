<template>
  <q-page class="flex flex-center">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg"> -->
    <q-btn @click="back()">Log out</q-btn>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'Index',
  methods: {
    back () {
      this.$router.replace('/')
    }
  }
}
</script>
