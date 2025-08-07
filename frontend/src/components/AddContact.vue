<template lang="html">
    <div>
        <div class="container main">
            <h1 class="heading">Add a New Contact</h1>
            <div class="row">
                <div class="col-md-6">
                    <form  @submit.prevent="saveContact">
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

                        <button type="submit" class="btn btn-dark btn-sm mt-2">Submit</button>
                    </form>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const contact = ref({
    name : "", 
    email : "", 
    phone : "", 
    designation : "", 
});

const toast = useToast();


const saveContact= async()=>{
    if(!contact.value.name || !contact.value.email || !contact.value.phone || !contact.value.designation ){
        toast.error('All Fields are required');
    }

    try {
        const apiURL = 'http://localhost:8000/api/contacts';
        const response = await axios.post(apiURL, contact.value);
        if(response.status==200){
            toast.success('Contact added successfully!');
            contact.value.name = '';
            contact.value.email = '';
            contact.value.phone = '';
            contact.value.designation = '' ;
        }
    } catch (error) {
        toast.error(`Failed to add contact due to:
    ${error}`);
    }
}

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