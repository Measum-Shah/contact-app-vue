<template lang="html">
  <div class="container my-4">

    <!-- Header / Summary -->
    <div class="mb-4 text-center">
      <h2>My Contacts</h2>
      <p>Total Contacts: <strong>{{ contacts.length }}</strong></p>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="loader-container d-flex justify-content-center align-items-center">
      <ClipLoader :loading="loading" color="#000" size="50px" />
    </div>

    <!-- Action bar: Search + Add button -->
    <div class="d-flex justify-content-between align-items-center mb-3 flex-column flex-md-row gap-2">
      <input
        type="text"
        class="form-control w-md-50"
        placeholder="Search contacts by name..."
        v-model="searchQuery"
      />
      <router-link class="btn btn-success btn-sm" to="/create-contact">
        Add New Contact
      </router-link>
    </div>

    <!-- Contacts table -->
    <div class="table-responsive">
      <table class="table table-hover table-striped text-nowrap align-middle">
        <thead class="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact No#</th>
            <th>Designation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in filteredContacts" :key="contact._id">
            <td>{{ contact.name }}</td>
            <td>{{ contact.email }}</td>
            <td>{{ contact.phone }}</td>
            <td>{{ contact.designation }}</td>
            <td class="d-flex flex-column flex-md-row gap-1">
              <router-link
                :to="{ name: 'EditContact', params: { id: contact._id } }"
                class="btn btn-primary btn-sm"
              >
                Edit
              </router-link>
              <button class="btn btn-danger btn-sm" @click="deleteContact(contact._id)">
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="!filteredContacts.length && !loading">
            <td colspan="5" class="text-center text-muted">No contacts found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import { useToast } from 'vue-toastification';

// ============================
// Reactive variables
// ============================
const contacts = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const toast = useToast();
const apiURL = 'https://contact-app-vue.onrender.com/api/contacts';

// ============================
// Helper: Get JWT token for Authorization header
// ============================
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

// ============================
// Fetch contacts for the logged-in user
// ============================
const getContacts = async () => {
  loading.value = true;
  try {
    const response = await axios.get(apiURL, { headers: getAuthHeader() });
    contacts.value = response.data.contacts;
  } catch (error) {
    console.error(error);
    toast.error('Failed to load contacts. Make sure you are logged in.');
  } finally {
    loading.value = false;
  }
};

// ============================
// Delete a contact
// ============================
const deleteContact = async (id) => {
  try {
    if (confirm('Are you sure you want to delete this contact?')) {
      const response = await axios.delete(`${apiURL}/${id}`, { headers: getAuthHeader() });
      if (response.status === 200) {
        toast.success('Contact deleted successfully');
        getContacts(); // Refresh list after deletion
      }
    }
  } catch (err) {
    console.error(err);
    toast.error('Failed to delete contact');
  }
};

// ============================
// Computed property for live search
// ============================
const filteredContacts = computed(() =>
  contacts.value.filter(c =>
    c.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

// ============================
// Load contacts on component mount
// ============================
onMounted(() => {
  getContacts();
});
</script>

<style>
/* =========================
  Buttons & table styling
============================= */
.btn {
  width: 100%;
}
@media (min-width: 768px) {
  .btn {
    width: 5rem;
  }
}
.loader-container {
  min-height: 200px;
}
.w-md-50 {
  width: 100%;
}
@media (min-width: 768px) {
  .w-md-50 {
    width: 50%;
  }
}
</style>
