<!-- createProject.vue -->
<template>
    <div class="create-project">
      <form @submit.prevent="handleSubmit">
        <h1>Create Project</h1>
  
        <div class="form-row">
          <label for="project-id">Project ID:</label>
          <input type="text" id="project-id" v-model="project_id" required />
        </div>
  
        <div class="form-row">
          <label for="project-name-th">Project Name (TH):</label>
          <input type="text" id="project-name-th" v-model="project_name_TH" required />
        </div>
  
        <div class="form-row">
          <label for="project-name-eng">Project Name (ENG):</label>
          <input type="text" id="project-name-eng" v-model="project_name_ENG" required />
        </div>
  
        <div class="form-row">
          <label for="project-progress">Project Progress:</label>
          <input type="number" id="project-progress" v-model="project_progress" required />
        </div>
  
        <div class="form-row">
          <label for="project-plan-start">Project Plan Start:</label>
          <input type="date" id="project-plan-start" v-model="project_plan_start" required />
        </div>
  
        <div class="form-row">
          <label for="project-plan-end">Project Plan End:</label>
          <input type="date" id="project-plan-end" v-model="project_plan_end" required />
        </div>
  
        <div class="buttons">
          <button type="submit">Confirm</button>
          <button type="button" @click="cancel" style="background-color: #f44336;">Cancel</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        project_id: '',
        project_name_TH: '',
        project_name_ENG: '',
        project_progress: 0,
        project_plan_start: '',
        project_plan_end: '',
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const projectData = {
            project_id: this.project_id,
            project_name_TH: this.project_name_TH,
            project_name_ENG: this.project_name_ENG,
            project_progress: this.project_progress,
            project_plan_start: this.project_plan_start,
            project_plan_end: this.project_plan_end,
          };
  
          // Assuming you have an Axios instance available in your project
          // If not, you can import Axios or use fetch API
          await this.$axios.post('/api/projects', projectData);
  
          console.log('Project created successfully');
          this.resetForm(); // Implement this method to reset the form
        } catch (error) {
          console.error('Error creating project:', error);
          // Handle errors or show a user-friendly message
        }
      },
      cancel() {
        console.log('Project creation canceled.');
        // Implement cancellation logic if needed
      },
      resetForm() {
        // Implement this method to reset the form fields
        this.project_id = '';
        this.project_name_TH = '';
        this.project_name_ENG = '';
        this.project_progress = 0;
        this.project_plan_start = '';
        this.project_plan_end = '';
      },
    },
  };
  </script>
  
  <style scoped>
  /* Your styling goes here */
  </style>
  