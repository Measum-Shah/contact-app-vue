import {createRouter , createWebHistory } from "vue-router"
import ContactList from "./components/ContactList.vue";
import AddContact from "./components/AddContact.vue";
import EditContact from "./components/EditContact.vue";
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";

const routes = [
    {
        name : 'ContactList', 
        path : '/', 
        component : ContactList
        , meta: { requiresAuth: true } 

    },
      {
        name : 'AddContact', 
        path : '/create-contact', 
        component : AddContact
        , meta: { requiresAuth: true } 

    },
      {
        name : 'EditContact', 
        path : '/contact/:id', 
        component : EditContact
        , meta: { requiresAuth: true } 

    },
      {
        name : 'ContactList', 
        path : '/', 
        component : ContactList
        , meta: { requiresAuth: true } 

    },
     { path: '/login',
       component: Login },
  ,
     { path: '/signup',
        component: Signup}
];


const router = createRouter({
    history : createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) next('/login');
  else next();
});

export default router;