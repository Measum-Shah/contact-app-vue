<template lang="html">
  <div class="signup-page">
    <div class="container main">
      <h1 class="heading">Sign Up</h1>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form @submit.prevent="handleSignup" class="signup-form">
            <div class="form-group">
              <label class="label">Username</label>
              <input type="text" class="form-control" placeholder="Enter Username" v-model="user.username" />
            </div>
            <div class="form-group">
              <label class="label">Email</label>
              <input type="email" class="form-control" placeholder="Enter Email" v-model="user.email" />
            </div>
            <div class="form-group">
              <label class="label">Password</label>
              <input type="password" class="form-control" placeholder="Enter Password" v-model="user.password" />
            </div>

            <button type="submit" class="btn btn-dark btn-sm mt-2 w-100">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const user = ref({
  username: '',
  email: '',
  password: ''
});

const toast = useToast();
const router = useRouter();

const handleSignup = async () => {
  if (!user.value.username || !user.value.email || !user.value.password) {
    toast.error('All fields are required');
    return;
  }

  try {
    const apiURL = 'http://localhost:8000/api/auth/signup';
    const response = await axios.post(apiURL, user.value);
    if (response.status === 201) {
      toast.success('Signup successful! Please login.');
      router.push('/login');
    }
  } catch (error) {
    toast.error(`Signup failed: ${error.response?.data?.error || error.message}`);
  }
};
</script>

<style lang="css">
.signup-page {
  height: 100vh; /* Full viewport height */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center;     /* Center vertically */
  background-color: #f8f9fa; /* Optional: light background */
}

.main {
  width: 100%;
  max-width: 400px;       /* Limit form width */
  padding: 2rem;
  background-color: #fff; /* White form background */
  border-radius: 8px;     /* Rounded corners */
  box-shadow: 0 0 10px rgba(0,0,0,0.1); /* Soft shadow */
}

.form-group {
  margin-bottom: 1rem;
}

.label {
  font-size: medium;
  margin-left: 0.5rem;
}

.heading {
  text-align: center;
  margin-bottom: 1.5rem;
}

button.w-100 {
  width: 100%;
}
</style>
