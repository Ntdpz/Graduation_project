<template>
  <div>
    <!-- Summary Section -->
    <v-row style="margin-top: 20px;">
      <v-col class="text-center" mt="4">
        <h2 style="color: black;">Welcome to the Admin Home Page</h2>
        <p style="color: black;">This page allows you to manage users and projects within the system. Use the buttons.
          below to go to the various management sections.</p>
      </v-col>
    </v-row>

    <!-- Button Section -->
    <v-row style="margin-top: 20px;">
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

        <!-- Manage Project Button with router-link -->
        <router-link to="">
          <v-btn class="button-spacing" color="#f1b24b" dark large elevation="2">
            <v-icon left>mdi-refresh</v-icon>
            This function will come in the future
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
  </div>
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
  margin-top: 20px; /* ปรับเป็น 20px เพื่อให้ขึ้นด้านบน */
  margin-right: 40px;
}
</style>
