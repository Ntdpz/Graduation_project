<template>
    <v-app>
      <div class="user-container">
  
        <v-form @submit.prevent="createUser" class="user-form">
          <v-text-field
            v-model="user_firstname"
            label="First Name"
            required
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            v-model="user_lastname"
            label="Last Name"
            required
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            v-model="user_id"
            label="User ID"
            required
            :rules="[rules.required]"
          ></v-text-field>
          <v-select
            v-model="user_position"
            :items="positions.map((position) => position.name)"
            label="Position"
            required
            :rules="[rules.required]"
          ></v-select>
          <v-text-field
            v-model="user_department"
            label="Department"
            required
          ></v-text-field>
          <v-text-field
            v-model="user_email"
            label="Email"
            type="email"
            required
            :rules="[rules.email]"
          ></v-text-field>
          <v-text-field
            v-model="user_password"
            label="Password"
            type="password"
            required
            :rules="[rules.required]"
          ></v-text-field>
          <v-select
            v-model="user_status"
            :items="['Active', 'Inactive']"
            label="Status"
            required
          ></v-select>
          <v-select
            v-model="user_role"
            :items="['Admin', 'User']"
            label="Role"
            required
          ></v-select>
  
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
  import Swal from "sweetalert2";
  
  export default {
    data() {
      return {
        rules: {
          required: (value) => !!value || "This field is required",
          email: (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
        },
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
          // ตรวจสอบว่ามีข้อมูลทุกช่องหรือไม่
          if (
            !this.user_firstname ||
            !this.user_lastname ||
            !this.user_id ||
            !this.user_position ||
            !this.user_department ||
            !this.user_email ||
            !this.user_password
          ) {
            // แสดง SweetAlert2 แจ้งเตือนถ้าข้อมูลไม่ครบ
            await Swal.fire({
              icon: "warning",
              title: "Oops...",
              text: "Please provide complete information for each field.",
            });
            return; // ออกจากเมธอดเพื่อไม่ทำต่อ
          }
  
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
  
          // แสดง SweetAlert2 ถ้าสำเร็จ
          await Swal.fire({
            icon: "success",
            title: "Success",
            text: "User created successfully!",
          });
  
          // นำกลับไปที่หน้า User_Management
          this.$router.push("/User_Management");
        } catch (error) {
          console.error("Error creating user:", error.response.data);
  
          // แสดง SweetAlert2 ถ้าไม่สำเร็จ
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: "User creation failed. Please try again.",
          });
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
  .user-container {
    margin-left: 20px;
    /* ปรับค่าตามที่คุณต้องการ */
  }
  
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
  