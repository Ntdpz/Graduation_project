<!-- pages/CreateUser.vue -->

<template>
  <div>
    <h1>Create User</h1>

    <form @submit.prevent="createUser" class="user-form">
      
      <label for="user_firstname">First Name:</label>
      <input v-model="user_firstname" type="text" required />

      <label for="user_lastname">Last Name:</label>
      <input v-model="user_lastname" type="text" required />

      <label for="user_id">User ID:</label>
      <input v-model="user_id" type="text" required />

      <label for="user_position">Position:</label>
      <select v-model="user_position" required>
        <option
          v-for="position in positions"
          :key="position.id"
          :value="position.name"
        >
          {{ position.name }}
        </option>
      </select>

      <label for="user_department">Department:</label>
      <input v-model="user_department" type="text" required />

      <label for="user_email">Email:</label>
      <input v-model="user_email" type="email" required />

      <label for="user_password">Password:</label>
      <input v-model="user_password" type="password" required />

      <label for="user_status">Status:</label>
      <select v-model="user_status" required>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <label for="user_role">Role:</label>
      <select v-model="user_role" required>
        <option value="Admin">Admin</option>
        <option value="User">User</option>
      </select>

      <label for="user_pic">Profile Picture:</label>
      <div>
        <input type="file" @change="handleFileChange" />
      </div>
      <!-- Add other form fields for user data -->

      <button type="submit">Create User</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_firstname: "",
      user_lastname: "",
      user_id: "",
      user_position: "",
      user_department: "",
      user_email: "",
      user_password: "",
      user_status: "Active",
      user_role: "User",
      user_pic: null,
      positions: [
        { id: 1, name: "Manager" },
        { id: 2, name: "Developer" },
        { id: 3, name: "Designer" },
        // Add other positions as needed
      ],
    };
  },
  methods: {
    async createUser() {
      try {
        const formData = new FormData();
        formData.append("user_pic", this.user_pic);

        const response = await this.$axios.post("/api/users", {
          Users: [
            {
              user_firstname: this.user_firstname,
              user_lastname: this.user_lastname,
              user_id: this.user_id,
              user_position: this.user_position,
              user_department: this.user_department,
              user_email: this.user_email,
              user_password: this.user_password,
              user_status: this.user_status,
              user_role: this.user_role,
              user_pic: this.user_pic,
            },
          ],
        });

        console.log("User created successfully:", response.data);
      } catch (error) {
        console.error("Error creating user:", error.response.data);
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          this.user_pic = reader.result; // เก็บ base64 encoded string ใน user_pic
        };

        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.user-form {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.label {
  display: block;
  margin-bottom: 5px;
}

.input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.file-upload {
  margin-bottom: 20px;
}

.submit-button {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>