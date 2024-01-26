import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

// Import components
import HomePageAdmin from './components/HomePageAdmin.vue';
import ManageUser from './components/ManageUser.vue';
import ManageProject from './components/ManageProject.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/admin' },  // Redirect root to /admin
  { path: '/admin', component: HomePageAdmin },
  { path: '/manage_user', component: ManageUser },
  { path: '/manage_project', component: ManageProject }
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
