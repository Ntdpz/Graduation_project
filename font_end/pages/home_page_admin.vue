<template>
  <v-row justify="center">
    <v-col cols="auto" class="my-4">
      <router-link to="/manage_user">
        <v-btn color=#ffff text expanded rounded>
          <v-icon left>mdi-account-multiple</v-icon>
          Manage User
        </v-btn>
      </router-link>
    </v-col>
    <v-col cols="auto" class="my-4">
      <router-link to="/manage_project">
        <v-btn color=#ffff text expanded rounded>
          <v-icon left>mdi-folder-multiple</v-icon>
          Manage Project
        </v-btn>
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
  /* Optional hover effects and text weight: */
  .v-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(0, 0, 0, 0.87);
  }
  .v-btn--text {
    font-weight: bold;
  }
</style>
