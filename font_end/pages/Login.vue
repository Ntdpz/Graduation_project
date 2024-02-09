<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login" class="login-form">
      <label for="user_id" class="label">User ID:</label>
      <input type="text" id="user_id" v-model="user_id" class="input" />
      <label for="user_password" class="label">Password:</label>
      <input
        type="password"
        id="user_password"
        v-model="user_password"
        class="input"
      />
      <button type="submit" class="button">Login</button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      user_id: "",
      user_password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post(
          "http://localhost:8080/api/login",
          {
            user_id: this.user_id,
            user_password: this.user_password,
          }
        );
        if (response.status === 200) {
          // บันทึก token ลงใน Vuex store
          const token = response.data.token;
          this.$store.commit("setToken", token); // เรียกใช้ mutation เพื่อเก็บ token

          // บันทึกข้อมูลผู้ใช้ใน localStorage เป็นเวลา 24 ชั่วโมง
          localStorage.setItem("user", JSON.stringify(response.data.user));
          
          // SweetAlert เมื่อ Login สำเร็จ
          Swal.fire({
            title: "Success",
            text: "Login successful!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            // หลังจากกดปุ่ม OK ให้ไปที่หน้า "/"
            this.$router.push("/");
          });
        } else {
          // หากมีข้อผิดพลาดในการ Login
          Swal.fire({
            title: "Error",
            text: "Login failed. Please check your credentials.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        // หากมีข้อผิดพลาดในการเชื่อมต่อกับ API
        console.error("Error during login:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred during login.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
}

.label {
  margin-bottom: 5px;
  color: black; /* เปลี่ยนสีตัวหนังสือเป็นสีดำ */
}

.input {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}
</style>
