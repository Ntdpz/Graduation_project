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

      <!-- เพิ่มฟิลด์อื่น ๆ ตามต้องการ -->

      <button type="submit">Create User</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_firstname: '',
      user_lastname: '',
      user_id: '',
      user_position: '',
      user_department: '',
      // เพิ่มฟิลด์อื่น ๆ ตามต้องการ
    };
  },
  methods: {
    async createUser() {
      try {
        const response = await this.$axios.post('/api/users', {
          user_firstname: this.user_firstname,
          user_lastname: this.user_lastname,
          user_id: this.user_id,
          user_position: this.user_position,
          user_department: this.user_department,
          // ส่งฟิลด์อื่น ๆ ตามต้องการ
        });

        console.log(response.data);
        // ทำตามที่คุณต้องการหลังจากสร้างผู้ใช้สำเร็จ
      } catch (error) {
        console.error('Error creating user:', error);
        // ทำตามที่คุณต้องการเมื่อเกิดข้อผิดพลาด
      }
    },
  },
};
</script>