<!-- pages/ReadUser.vue -->
<template>
  <div>
    <h1 class="page-title">User List</h1>

    <v-row>
      <v-col v-for="user in users" :key="user.user_id" cols="12" md="4">
        <v-card @click="showUserDetails(user)">
          <v-img
            v-if="user.user_pic"
            :src="user.user_pic"
            alt="Profile Picture"
            class="user-pic"
          ></v-img>
          <v-card-title class="user-info">
            <strong>{{ user.user_firstname }} {{ user.user_lastname }}</strong>
          </v-card-title>
          <v-card-subtitle class="user-info">
            <p>User ID: {{ user.user_id }}</p>
            <p>Email: {{ user.user_email }}</p>
          </v-card-subtitle>

          <v-card-actions>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-on="on" v-bind="attrs" @click="editUser(user)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Edit</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-on="on" v-bind="attrs" @click="deleteUser(user)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await this.$axios.get("/api/users");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error.response.data);
      }
    },
    showUserDetails(user) {
      // ให้ใช้ router.push เพื่อ navigate ไปยังหน้า update-user
      this.$router.push({ name: "UpdateUser", params: { id: user.user_id } });
    },
    editUser(user) {
      // ในที่นี้คุณสามารถทำการแก้ไข user ได้ตามที่ต้องการ
      console.log("Edit user:", user);
    },
    deleteUser(user) {
      // Implement delete logic here
      console.log("Delete user:", user);
    },
  },
};
</script>
  
  <style scoped>
.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.user-pic {
  max-height: 200px;
  object-fit: cover;
}

.user-info {
  padding: 16px;
}

/* เพิ่มสไตล์เมื่อ hover ที่ card */
.v-card:hover {
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
  