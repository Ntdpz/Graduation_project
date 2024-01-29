<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="headline">User Management</span>
        <v-spacer />
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details />
        <v-btn color="primary" dark class="ml-2"
          @click="dialog = true, editedItem = { id: 0, name: '', email: '', role: '' }">Add User</v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="users" :search="search" show-select item-key="id" v-model="selectedUsers">
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ editedItem.id === 0 ? 'Add User' : 'Edit User' }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="editedItem.name" label="Name" />
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="editedItem.email" label="Email" />
                </v-col>
                <v-col cols="12">
                  <v-select v-model="editedItem.role" :items="roles" label="Role" />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="headline">Are you sure you want to delete these items?</v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
    <v-btn @click="goBack" class="my-4">Back</v-btn>
  </v-container>
</template>
  
<script>
export default {
  data() {
    return {
      dialog: false,
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: "",
        email: "",
        role: "",
      },
      defaultItem: {
        id: 0,
        name: "",
        email: "",
        role: "",
      },
      search: "",
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Role", value: "role" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      users: [
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          role: "Admin",
        },
        {
          id: 2,
          name: "Jane Doe",
          email: "jane.doe@example.com",
          role: "User",
        },
      ],
      roles: ["Admin", "User"],
      selectedUsers: [],
      dialogDelete: false,
    };
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        this.users.push(this.editedItem);
      }
      this.close();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    goBack() {
      // ใช้ router.back() เพื่อย้อนกลับไปหน้าที่แล้ว
      this.$router.back();
    }
  },
};
</script>