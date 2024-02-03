<template>
  <v-row>
    <v-col class="text-center" mt="4">
      <!-- Manage User Button with router-link -->
      <router-link to="/User_Management">
        <v-btn class="button-spacing" color="primary" dark large mt="2"
          >Manage User</v-btn
        >
      </router-link>

      <!-- Manage Project Button with router-link -->
      <router-link to="/Project_Management">
        <v-btn class="button-spacing" color="teal" dark large mt="2" mb="4"
          >Manage Project</v-btn
        >
      </router-link>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HomePageAdmin",
};
</script>

<style scoped>
.button-spacing {
  margin-top: 60px; /* หรือค่าที่คุณต้องการ */
  margin-right: 40px;
}
</style>
