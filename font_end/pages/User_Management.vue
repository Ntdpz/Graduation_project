<!-- User_Management.vue -->
<template>
  <div>
    <!-- Search bar -->
    <v-row>
      <v-col cols="">
        <v-text-field
          v-model="searchTerm"
          label="Search by First Name"
          prepend-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="2" class="text-right">
        <v-btn color="primary" class="my-4 mx-4" @click="addUser"
          >+ Add User</v-btn
        >
      </v-col>
    </v-row>

    <v-spacer style="height: 25px"></v-spacer>

    <v-row>
      <!-- Loop through users and display cards -->
      <v-col
        v-for="(user, index) in filteredUsers"
        :key="index"
        cols="12"
        md="4"
      >
        <v-card class="mx-auto" max-width="400">
          <v-img
            class="align-end text-white"
            height="200"
            :src="user.user_pic"
            cover
            @click="viewDetails(user)"
          >
            <v-card-title @click="viewDetails(user)"
              >{{ user.user_firstname }} {{ user.user_lastname }}</v-card-title
            >
          </v-img>

          <v-card-subtitle class="pt-4">
            {{ user.user_position }}
          </v-card-subtitle>

          <v-card-text>
            <div>{{ user.user_firstname }} {{ user.user_lastname }}</div>
            <div>{{ user.user_department }}</div>
            <div>{{ user.user_email }}</div>
          </v-card-text>

          <v-row class="mb-2">
            <v-col class="text-right" cols="12">
              <v-btn class="mx-1" color="primary" @click="editUser(user)"
                >Edit</v-btn
              >
              <v-btn class="mx-4" color="primary" @click="deleteUser(user)"
                >Delete</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- เพิ่มฟอร์มแก้ไขข้อมูล -->
    <v-dialog v-model="editDialog" max-width="600">
      <v-card>
        <v-card-title>Edit User</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveEditedUser">
            <v-text-field
              v-model="editedUser.user_firstname"
              label="First Name"
            ></v-text-field>
            <v-text-field
              v-model="editedUser.user_lastname"
              label="Last Name"
            ></v-text-field>
            <v-select
              v-model="editedUser.user_position"
              :items="positions.map((position) => position.name)"
              label="Position"
            ></v-select>
            <v-text-field
              v-model="editedUser.user_department"
              label="Department"
            ></v-text-field>
            <v-text-field
              v-model="editedUser.user_email"
              label="Email"
            ></v-text-field>
            <v-text-field
              v-model="editedUser.user_password"
              label="Password"
            ></v-text-field>
            <v-select
              v-model="editedUser.user_status"
              :items="statuses"
              label="Status"
            ></v-select>
            <v-select
              v-model="editedUser.user_role"
              :items="roles"
              label="Role"
            ></v-select>
            <label for="user_pic">Profile Picture:</label>
            <div>
              <input type="file" @change="handleImageChange" />
            </div>
            <v-btn type="submit">Save Changes</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete {{ userToDelete.user_firstname }}
          {{ userToDelete.user_lastname }}?
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="deleteConfirmed">Yes</v-btn>
          <v-btn color="error" @click="cancelDelete">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    navigateBack() {
      this.$router.push("/User_Management");
    },
    addUser() {
      this.$router.push("/User/createUser");
    },
    async viewDetails(user) {
      this.$router.push({ name: "user-detail", params: { id: user.user_id } });
    },
    editUser(user) {
      this.editedUser = { ...user };
      this.editDialog = true;
    },
    async getFileAsBase64(file) {
      return new Promise((resolve, reject) => {
        try {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = () => {
            resolve(reader.result);
          };

          reader.onerror = (error) => {
            reject(error);
          };
        } catch (error) {
          reject(error);
        }
      });
    },

    async handleImageChange(event) {
      const file = event.target.files[0];

      if (file) {
        try {
          const base64Image = await this.getFileAsBase64(file);
          this.image = file; // เพิ่มบรรทัดนี้เพื่อเก็บไฟล์ที่เลือกไว้ใน property ชื่อ image
          this.editedUser.user_pic = base64Image; // เพิ่มบรรทัดนี้เพื่อเซ็ตรูปภาพใน editedUser
        } catch (error) {
          console.error("Error reading or converting file:", error);
        }
      } else {
        // เพิ่ม else นี้เพื่อตั้งค่า user_pic เป็น null ในกรณีไม่มีไฟล์ถูกเลือก
        this.image = null; // เพิ่มบรรทัดนี้เพื่อเคลียร์ไฟล์ที่เลือกเมื่อไม่มีไฟล์ถูกเลือก
        this.editedUser.user_pic = null;
      }
    },

    async deleteUserAction(user) {
      try {
        const response = await this.$axios.delete(
          `http://localhost:8080/api/users/${user.user_id}`
        );
        console.log("User deleted successfully:", response.data);

        await this.refreshUsersData();

        this.navigateBack();
      } catch (error) {
        console.error("Error deleting user:", error.response.data);
      }
    },
    async saveEditedUser() {
      // ตรวจสอบว่า this.editedUser และ this.image มีโครงสร้างที่ถูกต้อง
      console.log(this.editedUser);
      console.log(this.image);

      // แปลงไฟล์รูปภาพให้อยู่ในรูปแบบ encoded base64 (หากใช้)
      const imageData = this.image
        ? await this.getFileAsBase64(this.image)
        : null;

      // ตรวจสอบว่ามีการเลือกรูปภาพหรือไม่
      if (imageData !== null) {
        // ส่ง request ไปยัง API ด้วย method PUT
        this.$axios
          .put(`http://localhost:8080/api/users/${this.editedUser.user_id}`, {
            ...this.editedUser,
            user_pic: imageData, // ใช้ข้อมูลรูปภาพที่แปลงแล้ว
          })
          .then((response) => {
            console.log("User updated successfully:", response.data);

            // หลังจากอัปเดตข้อมูลเสร็จ ให้ปิด dialog แก้ไขข้อมูล
            this.editDialog = false;

            // หลังจากปิด dialog แก้ไขข้อมูล ให้ทำการ refresh ข้อมูล users โดยเรียก API GET ใหม่
            this.refreshUsersData();
          })
          .catch((error) => {
            console.error("Error updating user:", error.response.data);
          });
      } else {
        // ถ้าไม่มีการเลือกรูปภาพใหม่ ให้แก้ไขข้อมูลปกติโดยไม่รวมภาพ
        this.$axios
          .put(`http://localhost:8080/api/users/${this.editedUser.user_id}`, {
            ...this.editedUser,
          })
          .then((response) => {
            console.log("User updated successfully:", response.data);

            // หลังจากอัปเดตข้อมูลเสร็จ ให้ปิด dialog แก้ไขข้อมูล
            this.editDialog = false;

            // หลังจากปิด dialog แก้ไขข้อมูล ให้ทำการ refresh ข้อมูล users โดยเรียก API GET ใหม่
            this.refreshUsersData();
          })
          .catch((error) => {
            console.error("Error updating user:", error.response.data);
          });
      }
    },

    async getFileAsBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },

    async refreshUsersData() {
      const response = await this.$axios.get("http://localhost:8080/api/users");
      this.users = response.data;

      this.searchUsers();
    },
    searchUsers() {
      this.filteredUsers = this.users.filter(
        (user) =>
          user.user_firstname
            .toLowerCase()
            .startsWith(this.searchTerm.toLowerCase()) ||
          user.user_lastname
            .toLowerCase()
            .startsWith(this.searchTerm.toLowerCase()) ||
          user.user_id
            .toLowerCase()
            .startsWith(this.searchTerm.toLowerCase()) ||
          user.user_department
            .toLowerCase()
            .startsWith(this.searchTerm.toLowerCase())
      );
    },

    async deleteUser(user) {
      this.userToDelete = user;
      this.deleteDialog = true;
    },

    deleteConfirmed() {
      this.deleteUserAction(this.userToDelete);
      this.deleteDialog = false;
    },

    cancelDelete() {
      this.deleteDialog = false;
    },
  },
  data() {
    return {
      positions: [
        { id: 1, name: "Manager" },
        { id: 2, name: "Developer" },
        { id: 3, name: "Designer" },
      ],
      statuses: ["Active", "Inactive"],
      roles: ["Admin", "User"],
      users: [],
      searchTerm: "",
      filteredUsers: [],
      editDialog: false,
      deleteDialog: false,
      editedUser: {},
      userToDelete: {},
      image: null,
    };
  },
  async mounted() {
    const response = await this.$axios.get("http://localhost:8080/api/users");
    this.users = response.data;

    this.filteredUsers = this.users;
  },
  watch: {
    searchTerm: "searchUsers",
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>