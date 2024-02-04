<template>
<<<<<<< HEAD
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

        <v-btn icon @click="goBack">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>

        <v-btn icon @click="goForward">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>

        <!-- ใส่ router-link เพื่อให้คลิกที่ Progress Tracking นำไปยังหน้าหลัก -->
        <router-link to="/">
          <v-toolbar-title class="custom-title"
            >Progress Tracking</v-toolbar-title
          >
        </router-link>

        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn icon @click="confirmLogout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main style="min-height: calc(100vh - 64px)">
        <!-- 64px คือความสูงของ app bar -->
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
=======
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
>>>>>>> 2f91d89d57b7f94cea2827bb68e14ae25ef7390f
</template>

<script>
import Swal from "sweetalert2";
export default {
<<<<<<< HEAD
  data: () => ({
    items: [{ title: "Dashboard" }, { title: "All projects" }],
  }),
  methods: {
    async confirmLogout() {
      const confirmed = await Swal.fire({
        icon: "warning",
        title: "Logout",
        text: "คุณต้องการที่จะออกจากระบบหรือไม่?",
        showCancelButton: true,
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่",
      });

      if (confirmed.isConfirmed) {
        // ทำการลบข้อมูลผู้ใช้หรือทำตามขั้นตอนที่ต้องการในการ logout
        // ...

        // ทำการ redirect หน้าไปยังหน้า Login
        this.$router.push("/login");
      }
    },
    handleMenuItemClick(title) {
      // เพิ่มโค้ดที่คุณต้องการให้ทำเมื่อเลือกเมนู
      console.log(`Menu item clicked: ${title}`);
    },
    goBack() {
      this.$router.go(-1); // Go back one step in history
    },
    goForward() {
      this.$router.go(1); // Go forward one step in history
    },
  },
};
</script>
=======
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Admin page home',
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Admin page',
          to: '/home_page_admin'
        },
        {
          icon: 'mdi-account',
          title: 'Main test',
          to: '/navbar'
        },
         {
          icon: 'mdi-account',
          title: 'Main test2',
          to: '/UserManage'
        }
>>>>>>> 2f91d89d57b7f94cea2827bb68e14ae25ef7390f

      ]
    }
  }
}
</script>