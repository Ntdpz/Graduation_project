import { createRouter, createWebHistory } from 'vue-router';
import HomePageAdmin from './components/HomePageAdmin.vue';
import ManageUser from './components/ManageUser.vue';
import ManageProject from './components/ManageProject.vue';
import UserManage from './components/UserManage.vue';
import EditUser from '@/pages/User/EditUser.vue';
import CreateProject from './pages/Project/createProject.vue';
import EditProject from '@/pages/Project/EditProject.vue';
import ProjectManagement from '@/pages/Project/ProjectManagement.vue';
import ProjectDetail from '@/components/ProjectDetails.vue'; // Import the ProjectDetail component

// Define routes
const routes = [
  { path: '/', redirect: '/admin' },
  { path: '/admin', component: HomePageAdmin },
  { path: '/manage_user', component: ManageUser },
  { path: '/manage_project', component: ManageProject },
  { path: '/UserManage', component: UserManage },
  { path: '/User/editUser/:id', name: 'edit-user', component: EditUser },
  { path: '/project/createProject', component: CreateProject },
  { path: '/project/editProject/:id', name: 'edit-project', component: EditProject },
  { path: '/project-management', name: 'project-management', component: ProjectManagement },
  { path: '/project/:id', name: 'project-detail', component: ProjectDetail }, // Define the route for ProjectDetail
];

// Create router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


// Export router
export default router;