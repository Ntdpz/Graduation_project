<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12 custom-card"
    max-width="60%"
    style="
      width: 100vw;
      height: 100vh;
      max-height: 70vh;
      display: flex;
      align-items: center;
    "
  >
    <div class="aspect-ratio-container">
      <div class="centered-content">
        <img
          v-if="user.user_pic"
          :src="user.user_pic"
          alt="User Image"
          class="aspect-ratio-content"
        />
      </div>
    </div>

    <div class="user-details">
      <!-- ไม่ต้อง import คอมโพเนนต์ที่ไม่มีอยู่จริง -->
      <v-card-title @click="goBack"
        >Name: {{ user.user_firstname }} {{ user.user_lastname }}</v-card-title
      >
      <v-card-subtitle>
        <span class="me-1">Position: {{ user.user_position }}</span>
      </v-card-subtitle>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <!-- Add additional details here as needed -->
        </v-row>

        <div class="my-4 text-subtitle-1">
          Department: {{ user.user_department }}
        </div>

        <div>{{ user.user_email }}</div>
      </v-card-text>

      <v-divider class="mx-4 mb-1"></v-divider>

      <v-card-title>Other Information</v-card-title>

      <div class="px-4">
        <v-row>
          <v-col cols="12" md="6">
            <strong>User ID:</strong> {{ user.user_id }}
          </v-col>
          <v-col cols="12" md="6">
            <strong>Password:</strong> {{ user.user_password }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <strong>Status:</strong> {{ user.user_status }}
          </v-col>
          <v-col cols="12" md="6">
            <strong>Role:</strong> {{ user.user_role }}
          </v-col>
        </v-row>
        <!-- เพิ่มข้อมูลเพิ่มเติมตามความต้องการ -->
      </div>

      <v-card-actions>
        <!-- Add any additional actions or buttons as needed -->
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
// ไม่ต้อง import คอมโพเนนต์ที่ไม่มีอยู่จริง

export default {
  data() {
    return {
      loading: true,
      user: {}, // Object to store user data from API
    };
  },
  async mounted() {
    const userId = this.$route.params.id; // Get user_id from route params
    // Fetch user data from API based on user_id
    const response = await this.$axios.get(
      `http://localhost:8080/api/users/${userId}`
    );
    this.user = response.data;
    this.loading = false;
  },
  methods: {
    goBack() {
      this.$router.go(-1); // ไปหน้าที่แล้ว
    },
  },
};
</script>

<style scoped>
.custom-card {
  width: 60%;
  margin: auto;
}

.aspect-ratio-container {
  position: relative;
  width: 50%;
  padding-bottom: 50%;
  overflow: hidden;
}

.aspect-ratio-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  flex: 1;
  padding: 16px;
}
</style>
