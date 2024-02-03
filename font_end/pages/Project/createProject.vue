<template>
    <div class="create-project">
        
        <form @submit.prevent="handleSubmit">
            <H1 style="color: black;">Create Project</H1>
            <div class="form-row">
                <label for="project-code">Project Code:</label>
                <input type="text" id="project-code" v-model="projectCode" required>
            </div>

            <div class="form-row">
                <label for="project-name">Project Name:</label>
                <input type="text" id="project-name" v-model="projectName" required>
            </div>

            <div class="form-row">
                <label for="personnel">Personnel:</label>
                <div class="personnel">
                    <div class="member" v-for="(member, index) in members" :key="index">
                    
                        <button @click="removeMember(index)" class="remove-member">-</button>
                    </div>
                    <button @click="addMember" class="add-member">+ Add personnel</button>
                </div>
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
    name: 'CreateProject',
    data() {
        return {
            projectCode: '',
            projectName: '',
            members: [{ name: '', position: 'PM' }],
        };
    },
    methods: {
        handleSubmit() {
            // Add your logic for creating a new project
            // For example, you can send the project data to your server
            console.log('Project Code:', this.projectCode);
            console.log('Project Name:', this.projectName);
            console.log('Members:', this.members);
        },
        addMember() {
            this.members.push({ name: '', position: 'PM' });
        },
        removeMember(index) {
            this.members.splice(index, 1);
        },
        cancel() {
            // Add your logic for canceling the project creation
            console.log('Project creation canceled.');
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 500;
}

.create-project {
    display: inline-block;
    text-align: left;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 0 50px;
    padding: 250px 50px;

}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.form-row {
    display: flex;
    align-items: center;
    gap: 10px;
}

label {
    font-weight: bold;
    color: #333;
}

input, select {
    flex-grow: 1;
    height: 35px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #333;
}

textarea {
    resize: none;
    height: 120px;
    padding-top: 10px;
    padding-bottom: 10px;
    color: #333;
}

.buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

button {
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
}

button:first-child {
    background-color: #00ff4c;
    color: #fff;
}

button:first-child:hover {
    background-color: #3e8e41;
}

button:last-child {
    background-color: #4caf50;
    color: #fff;
}

button:last-child:hover {
    background-color: #3e8e41;
}

.personnel {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.member {
    display: flex;
    align-items: center;
    gap: 5px;
}

.add-member {
    align-self: flex-end;
    margin-top: 10px;
}

.remove-member {
    height: 24px;
    padding: 0 5px;
    border-radius: 5px;
    background-color: #f44336;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
}

.remove-member:hover {
    background-color: #da190b;
}
</style>