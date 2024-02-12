<template>
  <div class="project-detail">
    <h1>Project Detail</h1>
    <div>
      <h2>{{ project.project_name_ENG }}</h2>
      <p>Project ID: {{ project.project_id }}</p>
      <p>Progress: {{ project.project_progress }}%</p>
      <!-- Display other project details here -->

      <!-- Display system details -->
      <div v-if="systems.length > 0">
        <h3>Systems:</h3>
        <ul>
          <li v-for="system in systems" :key="system.system_id">
            <p>{{ system.system_name }}</p>
            <!-- Display other system details as needed -->
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No systems found for this project.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Import axios for making HTTP requests


export default {
  name: 'project-detail',
  data() {
    return {
      project: null,
      systems: [], // Store system details
    };
  },
  mounted() {
    // Fetch project details and system details when the component is mounted
    this.fetchProjectDetails();
  },
  methods: {
    async fetchProjectDetails() {
      try {
        // Use this.$route.params.id to access the project ID from the route
        const projectId = this.$route.params.id;

        // Fetch project details using projectId
        const projectResponse = await axios.get(`http://localhost:8080/api/projects/${projectId}`);
        this.project = projectResponse.data;

        // Fetch system details using projectId
        const systemsResponse = await axios.get(`http://localhost:8080/api/systems/${projectId}`);
        this.systems = systemsResponse.data;
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add styles as needed */
</style>
