<template>
  <q-dialog v-model="show">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{title}}</div>
      </q-card-section>

      <q-card-section>{{msg}}</q-card-section>

      <q-card-actions align="right">
        <div v-if="callback">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Confirm" color="primary" @click="callback()" />
        </div>
        <div v-else>
          <q-btn flat label="Ok" v-close-popup />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      msg: '',
      callback: null,
      show: false
    }
  },
  methods: {
    open (title, msg, callback) {
      this.title = title
      this.msg = msg
      this.callback = callback
      this.show = true
    }
  }
}
</script>

<style>
</style>
