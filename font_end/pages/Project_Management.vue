<template><div class="dashboard" style="background-color: #ffffff; padding: 10px 70px; border-radius: 0; margin-right: 30px;">
    <v-row no-gutters class="mt-4">
      <v-col class="text-left" style="margin-right: 16px">
        <h1 class="text-01">{{ greeting }}, Bee</h1>
        <p class="text-01">{{ currentDateTime }}</p>
      </v-col>

      <v-col class="text-left">
        <v-btn icon @click="handleIconClick" color="white">
          <router-link to="/project/createProject" style="color: #000000">
            <v-icon>mdi-plus</v-icon>
          </router-link>
        </v-btn>
      </v-col>

      <v-col class="text-right" style="margin-right: 16px">
        <v-btn class="work-item" color="#9747FF" @click="handleButtonClick" style="padding: 5">
          <p style="margin: 0; color: white">All Projects</p>
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
            <v-btn class="mx-1 project-button" @click="editProject(project)" >Edit </v-btn>
            <v-btn class="mx-4 project-button" @click="deleteProject(project)">Delete</v-btn>
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
      projects: [ {
          project_id: 1,
          project_name_TH: "Project A",
          project_name_ENG: "Project A",
          project_progress: 60,
          project_plan_start: "2024-01-01",
          project_plan_end: "2024-03-31",
          project_code: "PA",
          project_manager: "John Doe",
          formatted_project_code: "PROJ-001",
          formatted_project_manager: "JOHN DOE",
        },
        {
          project_id: 2,
          project_name_TH: "Project B",
          project_name_ENG: "Project B",
          project_progress: 80,
          project_plan_start: "2024-02-15",
          project_plan_end: "2024-04-30",
          project_code: "PB",
          project_manager: "Jane Smith",
          formatted_project_code: "PROJ-002",
          formatted_project_manager: "JANE SMITH",
        },
        {
          project_id: 3,
          project_name_TH: "Project C",
          project_name_ENG: "Project C",
          project_progress: 40,
          project_plan_start: "2024-03-01",
          project_plan_end: "2024-05-15",
          project_code: "PC",
          project_manager: "Bob Johnson",
          formatted_project_code: "PROJ-003",
          formatted_project_manager: "BOB JOHNSON",
        },], // Assuming you have projects data
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
.text-01 {
  color: black !important;
}

.project-manager {
  color: #3f51b5;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}

.project-code {
  text-transform: uppercase;
  font-weight: bold;
  color: #6c757d;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}


.tracking-work-card {
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(255, 253, 253, 0.1);
  transition: transform 0.3s ease-in-out;
  background-color: #9747FF;
}

.tracking-work-card:hover {
  transform: translateY(-5px);
}

.tracking-work-card h2 {
  color: #ffffff;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.work-item p {
  margin-bottom: 5px;
}

.work-item p:last-child {
  margin-bottom: 0;
}

.v-card-actions {
  padding: 10px;
  justify-content: space-between;
}

.project-button {
  color: #9747FF !important;
  background-color: #ffffff !important;
  font-weight: bold;
}
</style>
