<template>
  <div>
    <h1>User Profile</h1>
    <div>
      <p>User ID: {{ user.user_id }}</p>
      <p>Name: {{ user.name }}</p>
      <!-- Add more user details as needed -->
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    try {
      const response = await $axios.get(`/api/users/${params.user_id}`);
      return { user: response.data };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return { error: 'User profile not found' };
    }
  },
  data() {
    return {
      user: {}
    };
  }
};
</script>

<style scoped>
/* Your styles here */
</style>
