<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>Edit User</h2>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="editedUser.user_firstname" label="First Name"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="editedUser.user_lastname" label="Last Name"></v-text-field>
        </v-col>
        <!-- Add other fields as needed for editing -->
      </v-row>
  
      <v-row>
        <v-col cols="12">
          <v-btn @click="saveChanges">Save Changes</v-btn>
          <v-btn @click="cancelEdit">Cancel</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        editedUser: { ...this.$route.params.user }, // Clone the user object from the route params
      };
    },
    methods: {
      saveChanges() {
        // Implement the logic to save changes to the user
        // You can use this.editedUser to access the edited user data
        console.log("Save changes:", this.editedUser);
  
        // After saving changes, navigate back to User Management
        this.$router.push("/User_Management");
      },
      cancelEdit() {
        // If the user cancels, navigate back to User Management without saving changes
        this.$router.push("/User_Management");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  