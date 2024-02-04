<template>
  <div class="dashboard">
    <v-row no-gutters class="mt-4">
      <v-col class="text-left" style="margin-right: 16px">
        <h1>{{ greeting }}, Bee</h1>
        <p>{{ currentDateTime }}</p>
      </v-col>

      <v-col class="text-left">
        <v-btn icon @click="handleIconClick">
          <router-link to="/project/createProject">
            <v-icon>mdi-plus</v-icon>
          </router-link>
        </v-btn>
      </v-col>

      <v-col class="text-right" style="margin-right: 16px">
        <v-btn class="work-item" @click="handleButtonClick">
          <p>All Projects</p>
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
        </v-card-text>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ProjectManagement",
  data() {
    return {
      greeting: "",
      currentDateTime: "",
      projects: [],
    };
  },
  methods: {
    handleIconClick() {
      // Add your logic for icon click
    },
    handleButtonClick() {
      // Add your logic for button click
    },
    async fetchProjects() {
      try {
        const response = await this.$axios.get("/api/projects"); // Adjust the endpoint accordingly
        this.projects = response.data;
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
    handleTrackingWorkClick(project) {
      // Add your logic for tracking work click using project data
      console.log("Clicked on project:", project);
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