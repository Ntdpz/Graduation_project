<template>
    <div>
      <h1>Manage Project</h1>
      <!-- เพิ่มเนื้อหาหน้า Manage Project ตามต้องการ -->
  
      <!-- Back Button using router.back() -->
      <v-btn @click="goBack">Back</v-btn>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ManageProject',
    methods: {
      goBack() {
        // ใช้ router.back() เพื่อย้อนกลับไปหน้าที่แล้ว
        this.$router.back();
      }
    }
  }
  </script>
  
  <style scoped>
  /* เพิ่มสไตล์ CSS ตามต้องการ */
  </style>
  