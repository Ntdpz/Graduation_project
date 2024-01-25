<template>
  <div>
    <h1>Create User</h1>
    <form @submit.prevent="createUser">
      <label for="user_firstname">First Name:</label>
      <input v-model="user_firstname" type="text" required />

      <label for="user_lastname">Last Name:</label>
      <input v-model="user_lastname" type="text" required />

      <label for="user_id">User ID:</label>
      <input v-model="user_id" type="text" required />

      <label for="user_position">Position:</label>
      <input v-model="user_position" type="text" required />

      <label for="user_department">Department:</label>
      <input v-model="user_department" type="text" />

      <label for="user_email">Email:</label>
      <input v-model="user_email" type="email" required />

      <label for="user_password">Password:</label>
      <input v-model="user_password" type="password" required />

      <label for="user_status">Status:</label>
      <input v-model="user_status" type="text" required />

      <label for="user_role">Role:</label>
      <input v-model="user_role" type="text" required />

      <label for="user_pic">Profile Picture:</label>
      <input type="file" @change="handleFileChange" accept="image/*" />

      <!-- เพิ่มฟิลด์อื่น ๆ ตามต้องการ -->

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
      user_status: "",
      user_role: "",
      user_pic: null, // เก็บไฟล์รูปภาพที่เลือก
      // เพิ่มฟิลด์อื่น ๆ ตามต้องการ
    };
  },
  methods: {
    async createUser() {
      try {
        const formData = new FormData();
        formData.append("user_firstname", this.user_firstname);
        formData.append("user_lastname", this.user_lastname);
        formData.append("user_id", this.user_id);
        formData.append("user_position", this.user_position);
        formData.append("user_department", this.user_department);
        formData.append("user_email", this.user_email);
        formData.append("user_password", this.user_password);
        formData.append("user_status", this.user_status);
        formData.append("user_role", this.user_role);
        formData.append("user_pic", this.user_pic); // เพิ่มไฟล์รูปภาพ

        const response = await this.$axios.post("/api/users", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response.data);
        // ทำตามที่คุณต้องการหลังจากสร้างผู้ใช้สำเร็จ
      } catch (error) {
        console.error("Error creating user:", error);
        // ทำตามที่คุณต้องการเมื่อเกิดข้อผิดพลาด
      }
    },
    handleFileChange(event) {
      this.user_pic = event.target.files[0];
    },
  },
};
</script>
