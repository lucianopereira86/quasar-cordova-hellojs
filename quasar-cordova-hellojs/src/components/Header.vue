<template>
  <q-toolbar class="bg-primary text-white" v-if="$route.meta.showHeader">
    <q-btn flat round dense icon="arrow_back" @click="$router.go(-1)" v-if="$route.meta.showBack" />
    <q-toolbar-title>{{$route.name}}</q-toolbar-title>
  </q-toolbar>
</template>
