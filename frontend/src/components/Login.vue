<template lang="html">
  <div class="login-page">
    <div class="container main t">
      <!-- =========================
        Heading & Subtitle
        Why: Better guidance for user
      ============================= -->
      <h1 class="heading">Login</h1>
      <p class="subheading text-center mb-4">Enter your credentials to access your dashboard</p>

      <div class="row justify-content-center">
        <div class="col-md-6">
          <form @submit.prevent="handleLogin" class="login-form">
            <!-- =========================
              Email Field
            ============================= -->
            <div class="form-group">
              <label class="label">Email</label>
              <input
                type="email"
                class="form-control"
                placeholder="Enter Email"
                v-model="credentials.email"
              />
            </div>

            <!-- =========================
              Password Field
            ============================= -->
            <div class="form-group">
              <label class="label">Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Enter Password"
                v-model="credentials.password"
              />
            </div>

            <!-- =========================
              Login Button
              Enhanced with hover effect
            ============================= -->
            <button type="submit" class="btn btn-dark btn-sm mt-3 w-100 login-btn">
              Login
            </button>

            <!-- =========================
              Signup link
              Why: Allows user to navigate to signup page
            ============================= -->
            <p class="text-center mt-3">
              Don't have an account?
              <router-link to="/signup" class="signup-link">Sign Up</router-link>
            </p>
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

const credentials = ref({
  email: '',
  password: ''
});

const toast = useToast();
const router = useRouter();

const handleLogin = async () => {
  if (!credentials.value.email || !credentials.value.password) {
    toast.error('All fields are required');
    return;
  }

  try {
    const apiURL = 'https://contact-app-vue.onrender.com/api/auth/login';
    const response = await axios.post(apiURL, credentials.value);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful!');
      router.push('/');
    }
  } catch (error) {
    toast.error(`Login failed: ${error.response?.data?.error || error.message}`);
  }
};
</script>

<style lang="css">
/* =========================
  Page Container
============================= */
.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef); /* subtle gradient */
}

/* =========================
  Card style form
============================= */
.main {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.main:hover {
  transform: translateY(-2px); /* subtle lift effect */
}

/* =========================
  Headings
============================= */
.heading {
  text-align: center;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.subheading {
  color: #6c757d;
  font-size: 0.95rem;
}

/* =========================
  Form fields
============================= */
.form-group {
  margin-bottom: 1rem;
}

.label {
  font-size: medium;
  margin-bottom: 0.25rem;
  display: block;
}

/* =========================
  Login button
============================= */
button.login-btn {
  background: #343a40;
  border: none;
  transition: all 0.2s;
}

button.login-btn:hover {
  background: #495057;
}

/* =========================
  Signup link styling
============================= */
.signup-link {
  color: #0d6efd;
  text-decoration: underline;
  transition: color 0.2s;
}

.signup-link:hover {
  color: #0a58ca;
}
</style>
