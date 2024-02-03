<template>
    <div class="dashboard">
        <v-row no-gutters class="mt-4">
            <v-col class="text-left" style="margin-right: 16px;">
                <h1>{{ greeting }}, Bee</h1>
                <p>{{ currentDateTime }}</p>
            </v-col>
            
            <v-col class="text-left">
                <v-btn icon @click="handleIconClick">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-col>
        
            <v-col class="text-right" style="margin-right: 16px;"> 
                <v-btn class="work-item" @click="handleButtonClick">
                    <p>All Projects</p>
                </v-btn>
            </v-col>
        </v-row>                        
    
        <div class="tracking-work-card mt-6 ml-10" onclick="handleTrackingWorkClick()" style="width: 300px; height: 150px;  border: 1px solid #ccc; padding: 10px; box-sizing: border-box; border-radius: 10px;">
            <h2>Tracking work:</h2>
            <div class="work-item">
                <p>10 Systems</p>
                <div class="progress-bar">
                    <div class="progress" style="width: 50%;"></div>
                </div>
            </div>
        </div>            
    </div>  
</template>
  
<script>
export default {
    name: 'Dashboard',
    data() {
        return {
            greeting: '',
            currentDateTime: ''
        };
    },
    methods: {
        handleIconClick() {
            // Add your logic for icon click
        },
        handleButtonClick() {
            // Add your logic for button click
        },
        handleTrackingWorkClick() {
            // Add your logic for tracking work click
        },
        updateDateTime() {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };

            this.greeting = this.getGreeting(now);
            this.currentDateTime = now.toLocaleDateString('en-US', options);
        },
        getGreeting(date) {
            const hour = date.getHours();

            if (hour >= 0 && hour < 12) {
                return 'Good Morning';
            } else if (hour >= 12 && hour < 18) {
                return 'Good Afternoon';
            } else {
                return 'Good Evening';
            }
        },
    },
    mounted() {
        // Initial update
        this.updateDateTime();

        // Update every second
        setInterval(this.updateDateTime, 1000);
    },
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

.dashboard {
    /* Add any additional styles specific to the dashboard component */
    /* For example, you can set a background color or define a max-width */
    max-width: 1200px;
    margin: 0 auto;
}
</style>
