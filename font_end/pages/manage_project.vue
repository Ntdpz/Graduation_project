<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img src="v.png" alt="Logo" width="30" height="30" class="d-inline-block align-top" />
        Welcome
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="adminDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Admin
            </a>
            <div class="dropdown-menu" aria-labelledby="adminDropdown">
              <a class="dropdown-item" href="home_page_admin">Admin Management</a>
              <a class="dropdown-item" href="#">Home Page</a>
              <a class="dropdown-item" href="#">User Management</a>
            </div>
          </li>
        </ul>
      </div> <v-btn @click="goBack" class="my-2">Back</v-btn>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    goBack() {
      // ใช้ router.back() เพื่อย้อนกลับไปหน้าที่แล้ว
      this.$router.back();
    },
  },
}
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
  display: flex;
  align-items: center;
}

.navbar-brand img {
  margin-right: 10px;
}

.nav-link {
  color: #333;
  padding: 0 10px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #007bff;
}

.dropdown-item {
  padding: 5px 15px;
  transition: background-color 0.3s ease;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.dropdown-menu {
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

@media (max-width: 991px) {
  .navbar-brand {
    font-size: 1.2rem;
  }

  .nav-link {
    padding: 0 5px;
  }

  .dropdown-item {
    padding: 5px 10px;
  }
}
.navbar {
  background-color: lightblue;
}

.navbar.navbar-light a:hover {
  color: #0056b3;
}
</style>