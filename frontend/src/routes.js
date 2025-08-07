import {createRouter , createWebHistory } from "vue-router"
import ContactList from "./components/ContactList.vue";
import AddContact from "./components/AddContact.vue";
import EditContact from "./components/EditContact.vue";

const routes = [
    {
        name : 'ContactList', 
        path : '/', 
        component : ContactList

    },
      {
        name : 'AddContact', 
        path : '/create-contact', 
        component : AddContact

    },
      {
        name : 'EditContact', 
        path : '/contact/:id', 
        component : EditContact

    },
      {
        name : 'ContactList', 
        path : '/', 
        component : ContactList

    },
];


const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router;