<template lang="html">
  <div v-if="showHeader">
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">{{ title }}</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" v-if="isAuthenticated">
              <router-link class="nav-link active" to="/">Home</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link class="nav-link" to="/create-contact">Create Contact</router-link>
            </li>
            <li class="nav-item" v-if="!isAuthenticated">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item" v-if="!isAuthenticated">
              <router-link class="nav-link" to="/signup">Sign Up</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
  title: { type: String, required: true }
});

const router = useRouter();
const route = useRoute();

// Check if user is logged in
const isAuthenticated = computed(() => !!localStorage.getItem('token'));

// Hide header on login/signup pages
const noHeaderRoutes = ['/login', '/signup'];
const showHeader = computed(() => !noHeaderRoutes.includes(route.path));

// Logout function
const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
</script>

<style scoped>
.navbar-nav .nav-item + .nav-item {
  margin-left: 1rem;
}
</style>
