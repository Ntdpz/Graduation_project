<!-- User_Management.vue -->

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
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="align-end text-white"
            height="200"
            :src="user.user_pic"
            cover
            @click="viewDetails(user)"
          >
            <v-card-title @click="viewDetails(user)"
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

          <v-row class="mb-2">
            <v-col class="text-right" cols="12">
              <v-btn class="mx-2" color="orange" @click="editUser(user)"
                >Edit</v-btn
              >
              <v-btn class="mx-2" color="orange" @click="deleteUser(user)"
                >Delete</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- เพิ่มฟอร์มแก้ไขข้อมูล -->
    <v-dialog v-model="editDialog" max-width="600">
      <v-card>
        <v-card-title>Edit User</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveEditedUser">
            <v-text-field
              v-model="editedUser.user_firstname"
              label="First Name"
            ></v-text-field>
            <v-text-field
              v-model="editedUser.user_lastname"
              label="Last Name"
            ></v-text-field>
            <v-text-field
              v-model="editedUser.user_department"
              label="Department"
            ></v-text-field>
            <v-text-field
              v-model="editedUser.user_position"
              label="Position"
            ></v-text-field>
            <v-text-field
              v-model="editedUser.user_email"
              label="Email"
            ></v-text-field>
            <v-text-field
              v-model="editedUser.user_password"
              label="Password"
            ></v-text-field>
            <v-text-field
              v-model="editedUser.user_status"
              label="Status"
            ></v-text-field>
            <v-text-field
              v-model="editedUser.user_role"
              label="Role"
            ></v-text-field>
            <!-- เพิ่มฟิลด์อื่น ๆ ตามความต้องการS -->

            <v-btn type="submit">Save Changes</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    navigateBack() {
      this.$router.push("/User_Management");
    },
    addUser() {
      this.$router.push("/User/createUser");
    },
    async viewDetails(user) {
      this.$router.push({ name: "user-detail", params: { id: user.user_id } });
    },
    async editUser(user) {
      this.editedUser = { ...user };
      this.editDialog = true;
    },
    async deleteUser(user) {
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
    async refreshUsersData() {
      const response = await this.$axios.get("http://localhost:8080/api/users");
      this.users = response.data;

      this.searchUsers();
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
    saveEditedUser() {
      // ส่ง request ไปยัง API ด้วย method PUT
      this.$axios
        .put(
          `http://localhost:8080/api/users/${this.editedUser.user_id}`,
          this.editedUser
        )
        .then((response) => {
          console.log("User updated successfully:", response.data);

          // หลังจากอัปเดตข้อมูลเสร็จ ให้ปิด dialog แก้ไขข้อมูล
          this.editDialog = false;

          // หลังจากปิด dialog แก้ไขข้อมูล ให้ทำการ refresh ข้อมูล users โดยเรียก API GET ใหม่
          this.refreshUsersData();
        })
        .catch((error) => {
          console.error("Error updating user:", error.response.data);
        });
    },
  },
  data() {
    return {
      users: [],
      searchTerm: "",
      filteredUsers: [],
      editDialog: false,
      editedUser: {},
    };
  },
  async mounted() {
    const response = await this.$axios.get("http://localhost:8080/api/users");
    this.users = response.data;

    this.filteredUsers = this.users;
  },
  watch: {
    searchTerm: "searchUsers",
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
