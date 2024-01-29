<!-- layouts/default.vue -->

<template>
  <div>
    <v-app>
      <v-app-bar app class="custom-toolbar">
        <nav>
          <v-menu>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                @click="handleMenuItemClick(item.title)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </nav>

        <v-spacer class="custom-spacer"></v-spacer>

        <v-toolbar-title>Progress Tracking</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-app-bar>

      <v-main style="min-height: calc(100vh - 64px);"> <!-- 64px คือความสูงของ app bar -->
        <nuxt />
      </v-main>

      <v-footer app>
        <v-col>
          <v-row justify="center">
            <v-col>
              <p>&copy; Senior Project รักน้า 💖</p>
            </v-col>
          </v-row>
        </v-col>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [{ title: "Dashboard" }, { title: "All projects" }],
  }),
  methods: {
    handleMenuItemClick(title) {
      // เพิ่มโค้ดที่คุณต้องการให้ทำเมื่อเลือกเมนู
      console.log(`Menu item clicked: ${title}`);
    },
  },
};
</script>

<style>
/* Add your styling here */

body {
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
}

.custom-toolbar {
  display: flex;
  justify-content: space-between;
}

.custom-spacer {
  width: 20px; /* ปรับขนาดของ spacer ตามที่ต้องการ */
}
</style>
