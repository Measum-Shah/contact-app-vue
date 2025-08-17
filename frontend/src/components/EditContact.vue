<template lang="html">
  <div class="container main my-4">
    <!-- =========================
      Heading
      Why: Clear page title
    ============================= -->
    <h1 class="heading mb-3">Add a New Contact</h1>

    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="saveContact" class="contact-form">
          <!-- Name -->
          <div class="form-group">
            <label class="label">Name</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Name"
              v-model="contact.name"
            />
          </div>

          <!-- Email -->
          <div class="form-group">
            <label class="label">Email</label>
            <input
              type="email"
              class="form-control"
              placeholder="Enter Email"
              v-model="contact.email"
            />
          </div>

          <!-- Phone -->
          <div class="form-group">
            <label class="label">Phone</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Phone"
              v-model="contact.phone"
            />
          </div>

          <!-- Designation -->
          <div class="form-group">
            <label class="label">Designation</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Designation"
              v-model="contact.designation"
            />
          </div>

          <!-- Submit button -->
          <button type="submit" class="btn btn-dark btn-sm mt-3 w-100 submit-btn">
            Add Contact
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

// ============================
// Reactive contact object
// ============================
const contact = ref({
  name: "",
  email: "",
  phone: "",
  designation: "",
});

// Toast notification
const toast = useToast();

// ============================
// Helper: Get JWT token header
// ============================
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

// ============================
// Submit handler
// ============================
const saveContact = async () => {
  // Form validation
  if (!contact.value.name || !contact.value.email || !contact.value.phone || !contact.value.designation) {
    toast.error('All fields are required');
    return;
  }

  try {
    const apiURL = 'http://localhost:8000/api/contacts';
    const response = await axios.post(apiURL, contact.value, { headers: getAuthHeader() });

    if (response.status === 200 || response.status === 201) {
      toast.success('Contact added successfully!');

      // Reset form
      contact.value = { name: "", email: "", phone: "", designation: "" };
    }
  } catch (error) {
    console.error(error);
    toast.error(`Failed to add contact: ${error.response?.data?.error || error.message}`);
  }
};
</script>

<style lang="css">
/* =========================
  Container
============================= */
.main {
  margin-top: 3rem;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

/* Headings */
.heading {
  text-align: center;
  font-weight: 600;
}

/* Form groups */
.form-group {
  margin-bottom: 1rem;
}

.label {
  font-size: medium;
  margin-bottom: 0.25rem;
  display: block;
}

/* Submit button */
.submit-btn {
  transition: all 0.2s;
}

.submit-btn:hover {
  background-color: #495057;
}
</style>
