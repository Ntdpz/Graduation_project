<template>
  <v-app class="app-background">
    <v-container class="login-container">
      <v-card class="login-card" outlined tile>
        <v-card-title class="headline" style="color: black;">Login</v-card-title>

        <v-card-text>
          <v-form @submit.prevent="login" class="login-form">
            <v-text-field 
              v-model="user_id" 
              label="User ID" 
              outlined
              required
              color="black"
              input-color="black"
              :style="{ backgroundColor: isUserIdFocused ? 'white' : 'white' }"
              @focus="isUserIdFocused = true"
              @blur="isUserIdFocused = false"
            ></v-text-field>

            <v-text-field
              v-model="user_password"
              label="Password"
              type="password"
              outlined
              required
              color="black"
              input-color="black"
              :style="{ backgroundColor: isUserPasswordFocused ? 'white' : 'white' }"
              @focus="isUserPasswordFocused = true"
              @blur="isUserPasswordFocused = false"
            ></v-text-field>

            <v-row justify="center">
              <v-col cols="12" md="6">
                <v-btn type="submit" class="my-4" color="primary" width="100%">Login</v-btn>
              </v-col>
            </v-row>
          </v-form>
          
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="forgotPassword">Forgot Password?</v-btn>
        </v-card-actions>
      </v-card>

      <v-snackbar v-model="snackbar" :timeout="snackbarTimeout" color="error">
        {{ loginError }}
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      user_id: "",
      user_password: "",
      isUserIdFocused: false,
      isUserPasswordFocused: false,
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
    forgotPassword() {
      Swal.fire({
        title: "Forgot Password",
        text: "Please contact your administrator to reset your password.",
        icon: "info",
        confirmButtonText: "OK",
      });
    },
  },
};
</script>

<style scoped>
.app-background {
  background-color: #f0f0f0; /* Change to your desired background color */
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  max-width: 400px;
  width: 100%;
  border-radius: 10px; /* Adjust the corner radius as needed */
  background-color: white; /* Change to your desired card background color */
}

.login-form {
  margin-bottom: 24px;
}

/* Optional: You can remove if not needed */
::v-deep .v-text-field .v-label {
  color: black !important;
}

::v-deep .v-text-field .v-input__control .v-input__slot input {
  color: black;
}

.custom-label-color {
  color: black !important;
}

</style>
