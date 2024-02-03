<!-- Login.vue -->

<template>
  <v-app>
    <div class="login-container">
      <h1>Login</h1>

      <v-form @submit.prevent="login" class="login-form">
        <v-text-field v-model="user_id" label="User ID" required></v-text-field>
        <v-text-field
          v-model="user_password"
          label="Password"
          type="password"
          required
        ></v-text-field>

        <v-btn type="submit" class="my-4">Login</v-btn>
      </v-form>

      <v-snackbar v-model="snackbar" :timeout="snackbarTimeout" color="error">
        {{ loginError }}
      </v-snackbar>
    </div>
  </v-app>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      user_id: "",
      user_password: "",
      snackbar: false,
      snackbarTimeout: 3000,
      loginError: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post("/api/login", {
          user_id: this.user_id,
          user_password: this.user_password,
        });

        const { message, user } = response.data;

        this.showSuccessSnackbar(message);

        // Redirect based on user_role
        if (user.user_role === "User") {
          this.$router.push("/project_management");
        } else if (user.user_role === "Admin") {
          this.$router.push("/");
        }

        // บันทึกข้อมูลผู้ใช้ใน localStorage
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Error during login:", error.response.data);
        this.showErrorSnackbar("Invalid user_id or password");
      }
    },

    showSuccessSnackbar(message) {
      this.snackbar = true;
      this.loginError = "";
    },

    showErrorSnackbar(message) {
      this.snackbar = true;
      this.loginError = message;
    },
  },
};
</script>

<style scoped>
.login-container {
  margin-left: 20px;
  /* Adjust as needed */
}

.login-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
