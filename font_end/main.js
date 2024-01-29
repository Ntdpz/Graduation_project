// router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import EditUser from '@/pages/User/EditUser.vue';
import HomePageAdmin from './components/HomePageAdmin.vue';
import ManageUser from './components/ManageUser.vue';
import ManageProject from './components/ManageProject.vue';
import UserManage from './components/UserManage.vue';

Vue.use(VueRouter);

export const routes = [
  { path: '/', redirect: '/admin' },  // Redirect root to /admin
  { path: '/admin', component: HomePageAdmin },
  { path: '/manage_user', component: ManageUser },
  { path: '/manage_project', component: ManageProject },
  { path: '/UserManage', component: UserManage },
  { path: '/User/editUser/:id', name: 'edit-user', component: EditUser }
];

const router = new VueRouter({
  routes
});

export default router;
