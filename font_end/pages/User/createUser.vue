<!-- pages/CreateUser.vue -->

<template>
  <v-app>
    <div>
      <!-- เริ่มส่วนของฟอร์ม -->
      <h1>Create User</h1>

      <!-- ฟอร์ม -->
      <v-form @submit.prevent="createUser" class="user-form">
        <!-- ช่องกรอกข้อมูล -->
        <v-text-field
          v-model="user_firstname"
          label="First Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="user_lastname"
          label="Last Name"
          required
        ></v-text-field>

        <v-text-field v-model="user_id" label="User ID" required></v-text-field>

        <v-select
          v-model="user_position"
          :items="positions.map((position) => position.name)"
          label="Position"
          required
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
        ></v-text-field>

        <v-text-field
          v-model="user_password"
          label="Password"
          type="password"
          required
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

        <!-- แนบไฟล์รูป -->
        <label for="user_pic">Profile Picture:</label>
        <div>
          <input type="file" @change="handleFileChange" />
        </div>

        <!-- ปุ่ม submit -->
        <v-btn type="submit">Create User</v-btn>
      </v-form>
      <!-- สิ้นสุดฟอร์ม -->
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      // ตัวแปรที่ใช้ในฟอร์ม
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
      // รายชื่อตำแหน่งงาน
      positions: [
        { id: 1, name: "Manager" },
        { id: 2, name: "Developer" },
        { id: 3, name: "Designer" },
        // เพิ่มตำแหน่งงานเพิ่มเติมตามต้องการ
      ],
    };
  },
  methods: {
    // ส่วนของการสร้างผู้ใช้
    async createUser() {
      try {
        // สร้าง FormData เพื่อส่งไฟล์รูปภาพ
        const formData = new FormData();
        formData.append("user_pic", this.user_pic);

        // ส่งข้อมูลผู้ใช้ไปยัง API
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
    // ส่วนของการเลือกไฟล์รูปภาพ
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
