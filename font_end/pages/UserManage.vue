<template>
    <v-container>
      <v-card>
        <v-card-title>
          <span class="headline">User Management</span>
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-card-title>
        <v-data-table :headers="headers" :items="users" :search="search">
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-card>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit User</span>
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
      };
    },
  
    methods: {
      editItem(item) {
        this.editedIndex = this.users.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },
  
      deleteItem(item) {
        const index = this.users.indexOf(item);
        confirm("Are you sure you want to delete this item?") &&
          this.users.splice(index, 1);
      },
  
      close() {
        this.dialog = false;
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
    },
  };
  </script>