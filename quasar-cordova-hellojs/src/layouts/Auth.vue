<template>
  <q-layout view="lHh Lpr lFf">
    <Header />
    <q-page-container>
      <MyDialog ref="MyDialog" />
      <router-view :openDialog="openDialog" />
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from '../components/Header'
import MyDialog from '../components/MyDialog'
export default {
  name: 'Auth',
  components: {
    Header,
    MyDialog
  },
  mounted () {
  },
  methods: {
    openDialog (title, msg, callback) {
      this.$refs.MyDialog.open(title, msg, callback)
    }
  }
}
</script>
<style>
</style>
