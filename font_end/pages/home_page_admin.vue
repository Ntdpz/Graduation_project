<template>
  <v-row>
    <v-col class="text-center">

      <!-- Manage User Button with router-link -->
      <router-link to="/manage_user">
        <v-btn class="button-spacing">Manage User</v-btn>
      </router-link>

      <!-- Manage Project Button with router-link -->
      <router-link to="/manage_project">
        <v-btn>Manage Project</v-btn>
      </router-link>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HomePageAdmin'
}
</script>

<style scoped>
  .button-spacing {
    margin-right: 16px; /* หรือค่าที่คุณต้องการ */
  }
</style>
