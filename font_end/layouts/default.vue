<!-- layouts/default.vue -->

<template>
  <div>
    <header>
      <h1>Nuxt.js User Management</h1>
      <nav>
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/CRUD_User/createUser">Create User</nuxt-link>
      </nav>
    </header>

    <main>
      <nuxt />
    </main>

    <footer>
      <p>&copy; 2024 Your Company</p>
    </footer>
  </div>
</template>

<style>
  /* Add your styling here */

  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
  }

  header {
    background-color: #333;
    color: #fff;
    padding: 10px;
    text-align: center;
  }

  nav {
    margin-top: 10px;
  }

  nav a {
    color: #fff;
    margin-right: 15px;
    text-decoration: none;
  }

  main {
    margin: 20px;
  }

  footer {
    background-color: #333;
    color: #fff;
    padding: 10px;
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
