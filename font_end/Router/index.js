// main.js
// router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import EditUser from '@/pages/User/EditUser.vue';
import HomePageAdmin from './components/HomePageAdmin.vue';
import ManageUser from './components/ManageUser.vue';
import ManageProject from './components/ManageProject.vue';
import UserManage from './components/UserManage.vue';
import CreateProject from './pages/Project/createProject.vue';
import EditProject from '@/pages/Project/EditProject.vue';  // Import your EditProject component
import ProjectManagement from '@/pages/Project/ProjectManagement.vue';  // Import your ProjectManagement component
Vue.use(VueRouter);

export const routes = [
  { path: '/', redirect: '/admin' },  // Redirect root to /admin
  { path: '/admin', component: HomePageAdmin },
  { path: '/manage_user', component: ManageUser },
  { path: '/manage_project', component: ManageProject },
  { path: '/UserManage', component: UserManage },
  { path: '/User/editUser/:id', name: 'edit-user', component: EditUser },
  { path: '/project/createProject', component: CreateProject },
  { path: '/project/editProject/:id', name: 'edit-project', component: EditProject },  // Add this route
  { path: '/project-management', name: 'project-management', component: ProjectManagement },  // Add a name to the route         
];

const router = new VueRouter({
  routes
});

export default router;
