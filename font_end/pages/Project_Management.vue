<template>
    <div class="dashboard">
        <v-row no-gutters>
            <v-col>
                <h1>Morning, Bee</h1>
                <p>Monday, 07 October 2566</p>
            </v-col>
    
            <v-col class="text-right">
                <v-btn class="work-item" @click="handleButtonClick">
                    <p>All Projects</p>
                </v-btn>
            </v-col>
        </v-row>
    
        <div class="tracking-work-card mt-6 ml-10" @click="handleTrackingWorkClick">
            <h2>Tracking work:</h2>
            <div class="work-item">
                <p>10 Systems</p>
                <div class="progress-bar">
                    <div class="progress" :style="{ width: '50%' }"></div>
                </div>
            </div>
        </div>
    </div>
    
    
    
    
</template>
  
<script>
export default {
    name: 'Dashboard',
};
</script>
  
<style scoped>

h1 {
    margin-bottom: 10px;
}

p {
    margin: 0;
}

.tracking-work {
    display: flex;
    justify-content: space-between;
}

.work-item {
    width: 45%;
}

.progress-bar {
    background-color: #e0e0e0;
    height: 10px;
    border-radius: 5px;
    overflow: hidden;
}

.progress {
    background-color: #4caf50;
    height: 100%;
}
</style>