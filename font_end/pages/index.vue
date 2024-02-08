<template>
  <v-row>
    <v-col class="text-center" mt="4">
      <!-- Manage User Button with router-link -->
      <router-link to="/User_Management">
        <v-btn class="button-spacing" color="primary" dark large elevation="2">
          <v-icon left>mdi-account-group</v-icon>
          Manage User
        </v-btn>
      </router-link>

      <!-- Manage Project Button with router-link -->
      <router-link to="/Project_Management">
        <v-btn class="button-spacing" color="teal" dark large elevation="2">
          <v-icon left>mdi-folder</v-icon>
          Manage Project
        </v-btn>
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
.button-spacing:hover {
  transform: translateY(-2px);
}

.button-spacing {
  margin-top: 40px;
  margin-right: 20px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.button-spacing:hover {
  transform: translateY(-2px);
}

.button-spacing {
  margin-top: 60px;
  /* หรือค่าที่คุณต้องการ */
  margin-right: 40px;
}</style>
