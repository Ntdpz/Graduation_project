<template>
  <div class="create-project-container">
    <div class="create-project">
      <form @submit.prevent="handleSubmit">
        <h1>Create Project</h1>

        <div class="form-row">
          <label for="project-id" class="label">Project ID:</label>
          <input type="text" id="project-id" v-model="project_id" required />
        </div>

        <div class="form-row">
          <label for="project-name-th" class="label">Project Name (TH):</label>
          <input type="text" id="project-name-th" v-model="project_name_TH" required />
        </div>

        <div class="form-row">
          <label for="project-name-eng" class="label">Project Name (ENG):</label>
          <input type="text" id="project-name-eng" v-model="project_name_ENG" required />
        </div>

        <div class="form-row">
          <label for="project-progress" class="label">Project Progress:</label>
          <input type="number" id="project-progress" v-model="project_progress" required />
        </div>

        <div class="form-row">
          <label for="project-plan-start" class="label">Project Plan Start:</label>
          <input type="date" id="project-plan-start" v-model="project_plan_start" required />
        </div>

        <div class="form-row">
          <label for="project-plan-end" class="label">Project Plan End:</label>
          <input type="date" id="project-plan-end" v-model="project_plan_end" required />
        </div>

        <div class="buttons">
          <button type="submit" @click="handleSubmit" class="confirm-button">Confirm</button>
          <button type="button" @click="cancel" class="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
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
.create-project-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.create-project {
  width: 400px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}

.form-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.label {
  color: white;
  margin-bottom: 5px;
}

input {
  color: white;
  background-color: transparent;
  border: 1px solid white;
  padding: 8px;
  border-radius: 5px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.confirm-button,
.cancel-button {
  padding: 10px 20px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
}

.confirm-button {
  background-color: #00ff51;
}

.cancel-button {
  background-color: #f44336;
}
</style>
