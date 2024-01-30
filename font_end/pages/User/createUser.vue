<template>
  <v-app>
    <div>
      <h1>Create User</h1>

      <v-form @submit.prevent="createUser" class="user-form">
        <v-text-field v-model="user_firstname" label="First Name" required></v-text-field>
        <v-text-field v-model="user_lastname" label="Last Name" required></v-text-field>
        <v-text-field v-model="user_id" label="User ID" required></v-text-field>
        <v-select v-model="user_position" :items="positions.map((position) => position.name)" label="Position" required></v-select>
        <v-text-field v-model="user_department" label="Department" required></v-text-field>
        <v-text-field v-model="user_email" label="Email" type="email" required></v-text-field>
        <v-text-field v-model="user_password" label="Password" type="password" required></v-text-field>
        <v-select v-model="user_status" :items="['Active', 'Inactive']" label="Status" required></v-select>
        <v-select v-model="user_role" :items="['Admin', 'User']" label="Role" required></v-select>

        <label for="user_pic">Profile Picture:</label>
        <div>
          <input type="file" @change="handleFileChange" />
        </div>

        <v-btn type="submit" class="my-4">Create User</v-btn>
      </v-form>

      <v-snackbar v-model="snackbar" :timeout="snackbarTimeout" color="success">
        User created successfully!
      </v-snackbar>
    </div>
  </v-app>
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
      ],
      snackbar: false,
      snackbarTimeout: 3000,
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

        this.showSuccessSnackbar();

      } catch (error) {
        console.error("Error creating user:", error.response.data);
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          this.user_pic = reader.result;
        };

        reader.readAsDataURL(file);
      }
    },
    showSuccessSnackbar() {
      this.snackbar = true;
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
