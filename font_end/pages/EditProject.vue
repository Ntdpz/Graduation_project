<template>
    <div class="edit-project">
      <h1>Edit Project</h1>
  
      <form @submit.prevent="updateProject">
        <div class="form-row">
          <label for="project-code">Project Code:</label>
          <input type="text" id="project-code" v-model="projectCode" required>
        </div>
  
        <div class="form-row">
          <label for="project-name">Project Name:</label>
          <input type="text" id="project-name" v-model="projectName" required>
        </div>
  
        <!-- Add other form fields for editing project details -->
  
        <div class="buttons">
          <button type="submit">Update Project</button>
          <router-link :to="'/project-management'">
            <button type="button" style="background-color: #4caf50; color: #fff;">Cancel</button>
          </router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EditProject',
    data() {
      return {
        projectCode: '',
        projectName: '',
        // Add other data properties for editing project details
      };
    },
    methods: {
      async fetchProjectDetails() {
        try {
          const projectId = this.$route.params.id;
          const response = await this.$axios.get(`/api/projects/${projectId}`);
          const project = response.data;
  
          // Populate form fields with project details
          this.projectCode = project.project_id;
          this.projectName = project.project_name_TH;
  
          // Populate other form fields as needed
        } catch (error) {
          console.error('Error fetching project details:', error);
          // Handle errors or show a user-friendly message
        }
      },
  
      async updateProject() {
        try {
          // Validate form fields
          if (!this.projectCode || !this.projectName) {
            console.error('Please fill in all required fields.');
            return;
          }
  
          const projectId = this.$route.params.id;
          const updateData = {
            project_name_TH: this.projectName,
            // Add other fields as needed
          };
  
          await this.$axios.put(`/api/projects/${projectId}`, updateData);
  
          console.log('Project updated successfully');
  
          // Navigate back to the project list or perform other actions
          this.$router.push('/project-management');
        } catch (error) {
          console.error('Error updating project:', error);
          // Handle errors or show a user-friendly message
        }
      },
    },
    created() {
      this.fetchProjectDetails();
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  