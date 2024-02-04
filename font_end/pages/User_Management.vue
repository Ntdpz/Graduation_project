<template>
  <div>
    <!-- Search bar -->
    <v-row>
      <v-col cols="">
        <!-- Input for searching users by first name -->
        <v-text-field v-model="searchTerm" label="Search" prepend-icon="mdi-magnify" single-line
          hide-details></v-text-field>
      </v-col>
      <v-col cols="2" class="text-right">
        <!-- Button to add a new user -->
        <v-btn color="primary" class="my-4 mx-4" @click="addUser">+ Add User</v-btn>
      </v-col>
    </v-row>

    <v-spacer style="height: 25px"></v-spacer>

    <v-row>
      <!-- Loop through users and display cards -->
      <v-col v-for="(user, index) in filteredUsers" :key="index" cols="12" md="4">
        <!-- User card -->
        <v-card class="mx-auto" max-width="400">
          <!-- User image -->
          <v-img class="align-end text-white" height="200" :src="user.user_pic" cover @click="viewDetails(user)">
            <v-card-title @click="viewDetails(user)">{{ user.user_firstname }} {{ user.user_lastname }}</v-card-title>
          </v-img>

          <!-- User position -->
          <v-card-subtitle class="pt-4">
            {{ user.user_position }}
          </v-card-subtitle>

          <!-- User details -->
          <v-card-text>
            <div>{{ user.user_firstname }} {{ user.user_lastname }}</div>
            <div>{{ user.user_department }}</div>
            <div>{{ user.user_email }}</div>
          </v-card-text>

          <!-- User actions -->
          <v-row class="mb-2">
            <v-col class="text-right" cols="12">
              <!-- Button to edit user -->
              <v-btn class="mx-1" color="primary" @click="editUser(user)">Edit</v-btn>
              <!-- Button to delete user -->
              <v-btn class="mx-4" color="primary" @click="deleteUser(user)">Delete</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Edit User Form Dialog -->
    <v-dialog v-model="editDialog" max-width="600">
      <v-card>
        <v-card-title>Edit User</v-card-title>
        <v-card-text>
          <!-- Form to edit user details -->
          <v-form @submit.prevent="saveEditedUser">
            <v-text-field v-model="editedUser.user_firstname" label="First Name"></v-text-field>
            <v-text-field v-model="editedUser.user_lastname" label="Last Name"></v-text-field>
            <v-select v-model="editedUser.user_position" :items="positions.map((position) => position.name)"
              label="Position"></v-select>
            <v-text-field v-model="editedUser.user_department" label="Department"></v-text-field>
            <v-text-field v-model="editedUser.user_email" label="Email"></v-text-field>
            <v-text-field v-model="editedUser.user_password" label="Password"></v-text-field>
            <v-select v-model="editedUser.user_status" :items="statuses" label="Status"></v-select>
            <v-select v-model="editedUser.user_role" :items="roles" label="Role"></v-select>
            <label for="user_pic">Profile Picture:</label>
            <div>
              <!-- Input for selecting a new profile picture -->
              <input type="file" @change="handleImageChange" />
            </div>
            <!-- Button to save changes -->
            <v-btn type="submit">Save Changes</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Confirm Deletion Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Confirm Deletion</v-card-title>
        <v-card-text>
          <!-- Confirmation message for user deletion -->
          Are you sure you want to delete {{ userToDelete.user_firstname }}
          {{ userToDelete.user_lastname }}?
        </v-card-text>
        <v-card-actions>
          <!-- Button to confirm deletion -->
          <v-btn color="primary" @click="deleteConfirmed">Yes</v-btn>
          <!-- Button to cancel deletion -->
          <v-btn color="error" @click="cancelDelete">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  methods: {
    // Navigate back to the User Management page
    navigateBack() {
      this.$router.push("/User_Management");
    },
    // Navigate to the 'Add User' page
    addUser() {
      this.$router.push("/User/createUser");
    },
    // View details of a specific user
    async viewDetails(user) {
      this.$router.push({ name: "user-detail", params: { id: user.user_id } });
    },
    // Edit user details
    editUser(user) {
      this.editedUser = { ...user };
      this.editDialog = true;
    },
    // Helper function to read a file and convert it to base64
    async getFileAsBase64(file) {
      return new Promise((resolve, reject) => {
        try {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = () => {
            resolve(reader.result);
          };

          reader.onerror = (error) => {
            reject(error);
          };
        } catch (error) {
          reject(error);
        }
      });
    },
    // Handle the change of the selected image file
    async handleImageChange(event) {
      const file = event.target.files[0];

      if (file) {
        try {
          const base64Image = await this.getFileAsBase64(file);
          this.image = file;
          this.editedUser.user_pic = base64Image;
        } catch (error) {
          console.error("Error reading or converting file:", error);
        }
      } else {
        // Set user_pic to null if no file is selected
        this.image = null;
        this.editedUser.user_pic = null;
      }
    },
    // Action to delete a user
    async deleteUserAction(user) {
      try {
        const response = await this.$axios.delete(
          `http://localhost:8080/api/users/${user.user_id}`
        );
        console.log("User deleted successfully:", response.data);

        await this.refreshUsersData();

        this.navigateBack();
      } catch (error) {
        console.error("Error deleting user:", error.response.data);
      }
    },
    // Save edited user details
    // Save edited user details
    async saveEditedUser() {
      try {
        // Check the structure of this.editedUser and this.image
        console.log(this.editedUser);
        console.log(this.image);

        // Convert the image file to base64 format (if applicable)
        const imageData = this.image
          ? await this.getFileAsBase64(this.image)
          : null;

        // Check if an image file is selected
        if (imageData !== null) {
          // Send a PUT request to the API to update the user with the new image
          await this.$axios.put(`http://localhost:8080/api/users/${this.editedUser.user_id}`, {
            ...this.editedUser,
            user_pic: imageData,
          });

        } else {
          // If no new image is selected, edit the user data without including the image
          await this.$axios.put(`http://localhost:8080/api/users/${this.editedUser.user_id}`, {
            ...this.editedUser,
          });
        }

        // Display Sweet Alert for successful user update
        Swal.fire('Success', 'User updated successfully.', 'success');

        // After updating, close the edit dialog
        this.editDialog = false;

        // After closing the edit dialog, refresh the user data by calling the API GET again
        await this.refreshUsersData();
      } catch (error) {
        // Handle any errors during the user update process
        console.error('Error updating user:', error.response.data);
        Swal.fire('Error', 'An error occurred during the user update process.', 'error');
      }
    },
    // Helper function to read a file and convert it to base64
    async getFileAsBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    // Refresh user data by calling the API GET
    async refreshUsersData() {
      const response = await this.$axios.get("http://localhost:8080/api/users");
      this.users = response.data;

      this.searchUsers();
    },
    // Filter users based on the search term
    searchUsers() {
      this.filteredUsers = this.users.filter(
        (user) =>
          user.user_position
            .toLowerCase()
            .startsWith(this.searchTerm.toLowerCase()) ||
          user.user_firstname
            .toLowerCase()
            .startsWith(this.searchTerm.toLowerCase()) ||
          user.user_lastname
            .toLowerCase()
            .startsWith(this.searchTerm.toLowerCase()) ||
          user.user_id
            .toLowerCase()
            .startsWith(this.searchTerm.toLowerCase()) ||
          user.user_department
            .toLowerCase()
            .startsWith(this.searchTerm.toLowerCase())
      );
    },
    // Action to initiate user deletion with Sweet Alert
    // Action to initiate user deletion
    async deleteUser(user) {
      try {
        // Display Sweet Alert for confirmation
        const result = await Swal.fire({
          title: 'Confirm Deletion',
          text: `Are you sure you want to delete ${user.user_firstname} ${user.user_lastname}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
          // If confirmed, proceed with the deletion
          await this.deleteUserAction(user);
          // Inform the user about the successful deletion
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
        } else {
          // If canceled, inform the user
          Swal.fire('Cancelled', 'Deletion was cancelled', 'info');
        }
      } catch (error) {
        // Handle any errors during the deletion process
        console.error('Error initiating user deletion:', error);
        Swal.fire('Error', 'An error occurred while initiating user deletion.', 'error');
      }
    },
    async deleteConfirmed() {
      try {
        // Display Sweet Alert for confirmation
        const result = await Swal.fire({
          title: 'Confirm Deletion',
          text: `Are you sure you want to delete ${this.userToDelete.user_firstname} ${this.userToDelete.user_lastname}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
          // If confirmed, proceed with the deletion
          await this.deleteUserAction(this.userToDelete);
          // Inform the user about the successful deletion
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
        } else {
          // If canceled, inform the user
          Swal.fire('Cancelled', 'Deletion was cancelled', 'info');
        }
      } catch (error) {
        // Handle any errors during the deletion process
        console.error('Error deleting user:', error);
        Swal.fire('Error', 'An error occurred during the deletion process.', 'error');
      } finally {
        // Close the delete dialog
        this.deleteDialog = false;
      }
    },
    // Action to cancel user deletion
    cancelDelete() {
      this.deleteDialog = false;
    },
  },
  data() {
    return {
      positions: [
        { id: 1, name: "Manager" },
        { id: 2, name: "Developer" },
        { id: 3, name: "Designer" },
      ],
      statuses: ["Active", "Inactive"],
      roles: ["Admin", "User"],
      users: [],
      searchTerm: "",
      filteredUsers: [],
      editDialog: false,
      deleteDialog: false,
      editedUser: {},
      userToDelete: {},
      image: null,
    };
  },
  async mounted() {
    // Fetch user data from the API on component mount
    const response = await this.$axios.get("http://localhost:8080/api/users");
    this.users = response.data;

    // Initialize filteredUsers with all users on mount
    this.filteredUsers = this.users;
  },
  watch: {
    searchTerm: "searchUsers", // Watch for changes in searchTerm and trigger searchUsers
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
