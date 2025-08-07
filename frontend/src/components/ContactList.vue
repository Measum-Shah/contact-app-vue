<template lang="html">
    <div class="container">
    <div v-if="loading" class="loader-container">
  <ClipLoader :loading="loading" color="#000" size="50px" />
</div>

        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact No#</th>
                    <th>Designation</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="contact in contacts" :key="contact.id" class="table-secondary">
                    <td>{{ contact.name }} </td>
                    <td>{{ contact.email }} </td>
                    <td>{{ contact.phone }} </td>
                    <td>{{ contact.designation }} </td>
                    <td >
                        <router-link to="/contact/" class="mx-1 btn btn-primary btn-sm mr-4" >Edit</router-link>
                        <button class="mx-1 btn btn-danger btn-sm ">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
import axios from 'axios';    
import { onMounted } from 'vue';
import { ref } from 'vue';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'; 


const contacts = ref([])
const loading = ref(true)

const apiURL = 'http://localhost:8000/api/contacts'
const getContacts =  async() =>{
    try {
        const response = await axios.get(apiURL);
        contacts.value = response.data.contacts;
        // console.log(contacts.value)
    } catch (error) {
        console.log(error)
    } finally{
        loading.value = false;
    }
}

onMounted(()=>{
    // console.log("component mounted")
    getContacts()
})
</script>
<style >
.btn{
    width: 5rem;
}
</style>
 