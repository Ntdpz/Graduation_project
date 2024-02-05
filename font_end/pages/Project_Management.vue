<template>
  <div class="dashboard">
    <v-row no-gutters class="mt-4">
      <v-col class="text-left" style="margin-right: 16px">
        <h1>{{ greeting }}, Bee</h1>
        <p>{{ currentDateTime }}</p>
      </v-col>

      <v-col class="text-left">
        <v-btn icon @click="handleIconClick" color="white">
          <router-link to="/project/createProject" style="color: white">
            <v-icon>mdi-plus</v-icon>
          </router-link>
        </v-btn>
      </v-col>

      <v-col class="text-right" style="margin-right: 16px">
        <v-btn class="work-item" @click="handleButtonClick" style="padding: 5">
          <p style="margin: 0">All Projects</p>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-card
        v-for="project in projects"
        :key="project.project_id"
        class="tracking-work-card mt-6 ml-10"
        @click="handleTrackingWorkClick(project)"
      >
        <v-card-title>
          <h2>{{ project.project_name_TH }}</h2>
        </v-card-title>
        <v-card-text>
          <div class="work-item">
            <p>{{ project.project_progress }}% Progress</p>
            <p>Planned Start: {{ project.project_plan_start }}</p>
            <p>Planned End: {{ project.project_plan_end }}</p>
          </div>

          <v-card-actions>
            <!-- Edit button -->
<v-btn class="mx-1" color="primary" @click="editProject(project)">
  Edit
</v-btn>
            <!-- Delete button -->
            <v-btn
  class="mx-4"
  color="primary"
  @click="deleteProject(project)"
>
  Delete
</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-row>
    <!-- Edit Project Form Dialog -->
    <v-dialog v-model="editDialog" max-width="600">
      <v-card>
        <v-card-title>Edit Project</v-card-title>
        <v-card-text>
          <!-- Form to edit project details -->
          <v-form @submit.prevent="saveEditedProject">
            <!-- Include form fields for editing project details -->
            <v-text-field v-model="editedProject.projectCode" label="Project Code"></v-text-field>
            <v-text-field v-model="editedProject.projectName" label="Project Name"></v-text-field>

            <!-- Add other form fields for editing project details -->

            <!-- Button to save changes -->
            <v-btn type="submit">Save Changes</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: "ProjectManagement",
  data() {
    return {
      greeting: "",
      currentDateTime: "",
      projects: [], // Assuming you have projects data
      editDialog: false,
      editedProject: {}, // Store edited project data here
    };
  },
  methods: {
    handleIconClick() {
      // Add your logic for icon click
    },
    handleButtonClick() {
      // Add your logic for button click
    },
    handleTrackingWorkClick(project) {
      // Add your logic for tracking work click using project data
      console.log("Clicked on project:", project);
    },
    handleEditClick(project) {
      // Navigate to the edit page for the selected project
      this.$router.push({
        name: "edit-project",
        params: { id: project.project_id },
      });
    },
    editProject(project) {
      this.editedProject = { ...project };
      this.editDialog = true;
    },

    async saveEditedProject() {
  try {
    // Log the edited project before updating
    console.log("Edited Project before update:", this.editedProject);

    const response = await this.$axios.put(`/api/projects/${this.editedProject.project_id}`, {
      project_name_TH: this.editedProject.project_name_TH,
      project_name_ENG: this.editedProject.project_name_ENG,
      project_progress: this.editedProject.project_progress,
      project_plan_start: this.editedProject.project_plan_start,
      project_plan_end: this.editedProject.project_plan_end,
      // Include other fields if needed
    });
    console.log('API response:', response.data);

    // Check if the server responds with a success status
    if (response.status === 200) {
      // Log the success message
      console.log("Project updated successfully");

      // Display Sweet Alert for successful project update
      Swal.fire('Success', 'Project updated successfully.', 'success');

      // After updating, close the edit dialog
      this.editDialog = false;

      // After closing the edit dialog, refresh the project data by calling the API GET again
      await this.fetchProjects(
        // Inside the fetchProjects method
    this.$set(this, 'projects', response.data)
      );
    } else {
      // Log unexpected API response status
      console.error("Unexpected API response status:", response.status);
      console.error("API response:", response.data);

      // Display Sweet Alert for unexpected response status
      Swal.fire('Error', 'An unexpected error occurred during the project update process.', 'error');
    }
  } catch (error) {
    // Handle any errors during the project update process
    console.error("Error updating project:", error);

    if (error.response) {
      // Log error status and response data
      console.error("Error status:", error.response.status);
      console.error("Error response data:", error.response.data);
    }

    // Display Sweet Alert for error during project update
    Swal.fire('Error', 'An error occurred during the project update process.', 'error');
  }
},

async deleteProject(project) {
  try {
    // Display a confirmation SweetAlert before proceeding with deletion
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirmResult.isConfirmed) {
      // User confirmed, proceed with deletion
      const response = await this.$axios.delete(`/api/projects/${project.project_id}`);

      if (response.status === 200) {
        console.log("Project deleted successfully");

        // Display Sweet Alert for successful project deletion
        await Swal.fire('Success', 'Project deleted successfully.', 'success');

        // Fetch updated project list
        await this.fetchProjects();
      } else {
        console.error("Unexpected API response status:", response.status);

        // Display Sweet Alert for unexpected error during project deletion
        await Swal.fire('Error', 'An error occurred during the project deletion process.', 'error');
      }
    }
  } catch (error) {
    console.error("Error deleting project:", error);

    if (error.response) {
      console.error("Error status:", error.response.status);
      console.error("Error response data:", error.response.data);
    }

    // Display Sweet Alert for error during project deletion
    await Swal.fire('Error', 'An error occurred during the project deletion process.', 'error');
  }
},
  async fetchProjects() {
  try {
    const response = await this.$axios.get("/api/projects");
    this.projects = response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
},
    updateDateTime() {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      };

      this.greeting = this.getGreeting(now);
      this.currentDateTime = now.toLocaleDateString("en-US", options);
    },
    getGreeting(date) {
      const hour = date.getHours();

      if (hour >= 0 && hour < 12) {
        return "Good Morning";
      } else if (hour >= 12 && hour < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    },
  },

  mounted() {
    this.updateDateTime();
    this.fetchProjects();
    setInterval(this.updateDateTime, 1000);
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
