<template>
  <v-app>
    <div class="user-container">
      <h1>Create User</h1>
      <CreateUserForm />
    </div>
  </v-app>
</template>

<script>
import CreateUserForm from "../../components/user/CreateUserForm.vue";

export default {
  components: {
    CreateUserForm,
  },
};
</script>

<style scoped>
/* สไตล์ตามที่คุณต้องการ */
</style>
