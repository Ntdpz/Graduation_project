<template>
    <div>
      <h1>User List</h1>
      <ul>
        <li v-for="user in userList" :key="user.user_id">
          {{ user.user_firstname }} {{ user.user_lastname }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userList: [],
      };
    },
    async asyncData({ $axios }) {
      try {
        const response = await $axios.get('/users');
        return { userList: response.data };
      } catch (error) {
        console.error('Error fetching user list:', error);
        return { userList: [] };
      }
    },
  };
  </script>
  
  <style>
  
  </style>
  