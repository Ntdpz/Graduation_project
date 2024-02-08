<template>
  <div class="create-project-container">
    <div class="create-project">
      <form @submit.prevent="handleSubmit">
        <h1>Create Project</h1>

        <div class="form-row">
          <label for="project-id" class="label">Project ID:</label>
          <input type="text" id="project-id" v-model="project_id" required :style="{
            color: 'black',
            backgroundColor: formSubmitted ? 'gray' : 'transparent',
          }" />
        </div>

        <div class="form-row">
          <label for="project-name-th" class="label">Project Name (TH):</label>
          <input type="text" id="project-name-th" v-model="project_name_TH" required :style="{
            color: 'black',
            backgroundColor: formSubmitted ? 'gray' : 'transparent',
          }" />
        </div>

        <div class="form-row">
          <label for="project-name-eng" class="label">Project Name (ENG):</label>
          <input type="text" id="project-name-eng" v-model="project_name_ENG" required :style="{
            color: 'black',
            backgroundColor: formSubmitted ? 'gray' : 'transparent',
          }" />
        </div>

        <div class="buttons">
          <button type="submit" @click="handleConfirm" class="confirm-button">
            Confirm
          </button>
          <button type="button" @click="handleCancel" class="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      project_id: "",
      project_name_TH: "",
      project_name_ENG: "",
      project_progress: 0,
      project_plan_start: "",
      project_plan_end: "",
      formSubmitted: false,
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

        await this.$axios.post("/api/projects", projectData);

        console.log("Project created successfully");
        this.resetForm();
        this.formSubmitted = true;
      } catch (error) {
        console.error("Error creating project:", error);
      }
    },
    async handleConfirm() {
      try {
        const result = await Swal.fire({
          title: "Confirm Project Creation",
          text: "Are you sure you want to create this project?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#00ff51",
          cancelButtonColor: "#f44336",
          confirmButtonText: "Yes, create it!",
        });

        if (result.isConfirmed) {
          await this.handleSubmit();
          this.$router.push({ name: "Project_Management" });
        }
      } catch (error) {
        console.error("Error showing confirmation:", error);
      }
    },
    handleCancel() {
      Swal.fire({
        title: "Project Creation Canceled",
        icon: "info",
        confirmButtonColor: "#00ff51",
      }).then(() => {
        this.$router.push({ name: "Project_Management" });
      });
    },
    resetForm() {
      this.project_id = "";
      this.project_name_TH = "";
      this.project_name_ENG = "";
      this.project_progress = 0;
      this.project_plan_start = "";
      this.project_plan_end = "";
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
  color: black;
  margin-bottom: 5px;
}

input {
  color: black;
  background-color: transparent;
  border: 1px solid black;
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
