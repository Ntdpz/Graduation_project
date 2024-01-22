<template>
  <div>
    <h1>User Management</h1>

    <!-- เพิ่มปุ่มสำหรับไปยังหน้า createUser.vue -->
    <nuxt-link to="/CRUD_User/createUser">Go to Create User</nuxt-link>
    <nuxt-link to="/CRUD_User/users">Go to Show User</nuxt-link>

    <!-- หรือใช้ HTML <a> tag -->
    <!-- <a href="/CRUD_User/createUser">Go to Create User</a> -->
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
