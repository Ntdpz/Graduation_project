<template>
  <div>
    <!-- Search bar -->
    <v-row>
      <v-col cols="9">
        <v-text-field
          v-model="searchTerm"
          label="Search by First Name"
          prepend-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="3" class="text-right">
        <v-btn color="primary" @click="addUser">+ Add User</v-btn>
      </v-col>
    </v-row>

    <v-spacer style="height: 25px"></v-spacer>

    <v-row>
      <!-- Loop through users and display cards -->
      <v-col
        v-for="(user, index) in filteredUsers"
        :key="index"
        cols="12"
        md="4"
      >
        <v-card class="mx-auto" max-width="400" @click="viewDetails(user)">
          <v-img
            class="align-end text-white"
            height="200"
            :src="user.user_pic"
            cover
          >
            <v-card-title
              >{{ user.user_firstname }} {{ user.user_lastname }}</v-card-title
            >
          </v-img>

          <v-card-subtitle class="pt-4">
            {{ user.user_position }}
          </v-card-subtitle>

          <v-card-text>
            <div>{{ user.user_firstname }} {{ user.user_lastname }}</div>
            <div>{{ user.user_department }}</div>
            <div>{{ user.user_email }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" @click="editUser(user)"> Edit </v-btn>
            <v-btn color="orange" @click="deleteUser(user)"> Delete </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  methods: {
    addUser() {
      this.$router.push('/User/createUser');
    },
    async viewDetails(user) {
      this.$router.push({ name: "user-detail", params: { id: user.user_id } });
    },
    async editUser(user) {
      // Implement edit user functionality as needed
    },
    async deleteUser(user) {
      // Implement delete user functionality as needed
    },
    searchUsers() {
      this.filteredUsers = this.users.filter(
        (user) =>
          user.user_firstname
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          user.user_lastname
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          user.user_id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.user_department
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    },
  },
  data() {
    return {
      users: [], // Array to store user data from API
      searchTerm: "", // The term entered in the search bar
      filteredUsers: [], // Array to store filtered users
    };
  },
  async mounted() {
    // Fetch user data from API and assign it to the 'users' array
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
