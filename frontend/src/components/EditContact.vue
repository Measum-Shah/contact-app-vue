<template lang="html">
    <div>
        <div class="container main">
            <h1 class="heading">Edit Contact</h1>
            <div class="row">
                <div class="col-md-6">
                    <form  @submit.prevent="updateContact">
                        <div class="form-group">
                            <label class="label">Name</label>
                            <input type="text" class="form-control" placeholder="Enter Name" v-model="contact.name">
                        </div>
                        <div class="form-group">
                            <label class="label"> Email</label>
                            <input type="email" class="form-control" placeholder="Enter Email" v-model="contact.email">
                        </div>
                        <div class="form-group">
                            <label class="label">Phone</label>
                            <input type="text" class="form-control" placeholder="Enter Phone" v-model="contact.phone">
                        </div>
                        <div class="form-group">
                            <label class="label">Designation</label>
                            <input type="text" class="form-control" placeholder="Enter Designation" v-model="contact.designation">
                        </div>

                        <button type="submit" class="btn btn-dark btn-sm mt-2">Update</button>
                    </form>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter,  useRoute } from 'vue-router';
const toast = useToast();
const route = useRoute();
const router = useRouter();


const contact = ref({
    name : "", 
    email : "", 
    phone : "", 
    designation : "", 
});

const getContactById = async()=>{
    try {
        const apiURL = `http://localhost:8000/api/contacts/${route.params.id}`
        const response = await axios.get(apiURL);
        contact.value = response.data.contact
        console.log(contact.value)

    } catch (error) {
        console.log(error)
    }
}


const updateContact = async() => {
     if(!contact.value.name || !contact.value.email || !contact.value.phone || !contact.value.designation ){
        toast.error('All Fields are required');
    }
 
    try {
          const apiURL = `http://localhost:8000/api/contacts/${route.params.id}`
          const response = await axios.put(apiURL,contact.value)
          if(response.status == 200){
            toast.success("Contact updated successfully");
            router.push({name : 'ContactList'})
          };

    } catch (error) {
        console.log()
    }
}

onMounted(()=>{
    getContactById()
})

</script>
<style lang="css">
.main{
    margin-top: 3rem;
}

.form-group{
    margin-bottom: 1rem;
}
.label{
    font-size: medium;
    margin-left: 0.5rem;
}
.heading{
    text-align: center;
}
    
</style>