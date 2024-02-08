<template>
  <div
    class="dashboard"
    style="
      background-color: #ffffff;
      padding: 10px 70px;
      border-radius: 0;
      margin-right: 30px;
    "
  >
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
        <v-btn
          class="work-item"
          color="#9747FF"
          @click="handleButtonClick"
          style="padding: 5px"
        >
          <p style="margin: 0; color: white">All Projects</p>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-card v-for="project in projects" :key="project.project_id" class="tracking-work-card mt-6 ml-10"
        @click="handleTrackingWorkClick(project)">
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
            <v-btn class="mx-1 project-button" @click="editProject(project)"
              >Edit
            </v-btn>
            <v-btn class="mx-4 project-button" @click="deleteProject(project)"
              >Delete</v-btn
            >
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
            <v-text-field
              v-model="editedProject.project_name_TH"
              label="Project Name (TH)"
            ></v-text-field>
            <v-text-field
              v-model="editedProject.project_name_ENG"
              label="Project Name (ENG)"
            ></v-text-field>
            <!-- Button to save changes -->
            <v-btn type="submit">Save Changes</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "ProjectManagement",
  data() {
    return {
      greeting: "",
      currentDateTime: "",
      editDialog: false,
      editedProject: { project_name_TH: "", project_name_ENG: "" },
      projects: [], // Added projects data array
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
      this.project_id = project.project_id; // กำหนดค่า project_id
      this.editDialog = true;
    },

    async saveEditedProject() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/projects/${this.editedProject.project_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.editedProject),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update project");
        }

        // Handle success
        console.log("Project updated successfully");

        // Show success message using SweetAlert2
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Project updated successfully",
        });

        // Redirect back to the previous page
        this.$router.go(); // Go back to the previous page
      } catch (error) {
        console.error("Error updating project:", error);
        // Handle error
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update project",
        });
      }
    },

    async deleteProject(project) {
      try {
        // Display a confirmation SweetAlert before proceeding with deletion
        const confirmResult = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        });

        if (confirmResult.isConfirmed) {
          // User confirmed, proceed with deletion
          const response = await this.$axios.delete(
            `/api/projects/${project.project_id}`
          );

          if (response.status === 200) {
            console.log("Project deleted successfully");

            // Display Sweet Alert for successful project deletion
            await Swal.fire(
              "Success",
              "Project deleted successfully.",
              "success"
            );

            // Fetch updated project list
            await this.fetchProjects();
          } else {
            console.error("Unexpected API response status:", response.status);

            // Display Sweet Alert for unexpected error during project deletion
            await Swal.fire(
              "Error",
              "An error occurred during the project deletion process.",
              "error"
            );
          }
        }
      } catch (error) {
        console.error("Error deleting project:", error);

        if (error.response) {
          console.error("Error status:", error.response.status);
          console.error("Error response data:", error.response.data);
        }

        // Display Sweet Alert for error during project deletion
        await Swal.fire(
          "Error",
          "An error occurred during the project deletion process.",
          "error"
        );
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
  background-color: #9747ff;
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
  color: #9747ff !important;
  background-color: #ffffff !important;
  font-weight: bold;
}
</style>
