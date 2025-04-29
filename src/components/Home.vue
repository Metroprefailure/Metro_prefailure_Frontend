<template>
  <div class="home-container" :class="{ 'blur-background': backgroundColorBlur }">
    <div class="content-wrapper">
      <h1 class="title">Metro Pre Failure Detection System</h1>

      <p class="description">
        Experience fewer unexpected delays with our intelligent prediction system. Using cutting-edge AI, we can anticipate potential metro failures a full day in advance. This foresight enables proactive maintenance and adjustments, working behind the scenes to ensure a smoother, more dependable travel experience for all passengers.
      </p>

      <button
        class="monitor-button"
        :class="{ 'monitoring': isMonitoring }"
        @click="callTriggeSimulation">
        {{ isMonitoring ? 'Stop Simulation' : 'Start Simulation' }}
      </button>

      <transition name="fade">
        <SensorCard
          v-if="sensorData != null"
          :sensorInfo="sensorData"
          :colorStatus="toastType"
          class="sensor-card-instance"
        />
      </transition>
    </div>
  </div>

   <ToastCard
      v-if="showToast && sensorData != null"
      :message="toastMessage"
      :visibility="showToast"
      :type="toastType"
      :key="resultKey + toastType + Date.now()"
      :stackIndex="3"
   />
</template>

<script>
import SensorCard from './Card.vue';
import axios from 'axios';
import ToastCard from './Toast.vue';

export default {
  name: 'HomePage',
  components: {
    SensorCard,
    ToastCard
  },
  data() {
    return {
      sensorData: null,
      toastMessage: null,
      showToast: false,
      isMonitoring: false,
      toastColorTracker: null,
      backgroundColorBlur: false,
      resultKey: 0
    };
  },
  computed: {
    toastType() {
      return this.toastColorTracker === "Pre-Failure" ? "error" : "success";
    },
  },
  methods: {
    async callTriggeSimulation() {
      // --- DEBUGGING LINE ---
      console.log('callTriggeSimulation method started!');
      // --- END DEBUGGING LINE ---

      try {
        const response = await axios.get('/api');
         // --- DEBUGGING LINE ---
        console.log('API Response received:', response);
        // --- END DEBUGGING LINE ---

        const responseData = response?.data;
        const sensorUnFilterdData = responseData ? [responseData] : [];

        if (sensorUnFilterdData.length > 0) {
            const firstResult = sensorUnFilterdData[0];
            const sensorFilteredData = firstResult?.data;
            const toastMessage = firstResult?.prediction_message;
            const toastColorTracker = firstResult?.generated_segment_type;

            this.toastMessage = toastMessage ?? 'Status updated.';
            this.toastColorTracker = toastColorTracker;
            this.resultKey++;

            // Toggle monitoring state AFTER data is processed
            this.isMonitoring = !this.isMonitoring;
             // --- DEBUGGING LINE ---
            console.log('isMonitoring toggled to:', this.isMonitoring);
            // --- END DEBUGGING LINE ---


            if (this.isMonitoring) {
              this.sensorData = sensorFilteredData;
              setTimeout(() => {
                this.showToast = true;
                this.backgroundColorBlur = true;
                console.log('Showing toast and blur'); // Debug log
              }, 1000);

              setTimeout(() => {
                this.backgroundColorBlur = false;
                this.showToast = false;
                 console.log('Hiding toast and blur'); // Debug log
              }, 4500);
            } else {
              this.sensorData = null;
              this.showToast = false;
              this.backgroundColorBlur = false;
               console.log('Stopped monitoring, cleared data/toast/blur'); // Debug log
            }
        } else {
             console.error("API response did not contain expected data structure.");
             this.toastMessage = 'Failed to fetch data.';
             this.toastType = 'error';
             this.showToast = true;
             setTimeout(() => { this.showToast = false; }, 3000);
        }

      } catch (error) {
        console.error("API call failed:", error);
        this.toastMessage = 'Monitoring service unavailable.';
        this.toastType = 'error';
        this.showToast = true;
        this.isMonitoring = false;
        this.sensorData = null;
        this.backgroundColorBlur = false;
         setTimeout(() => { this.showToast = false; }, 3000);
      }
    },
  }
}
</script>

<style scoped>
/* Removed :root variables, using direct values */

/* Basic reset and font */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Apply fade-in animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.home-container {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  padding: 4rem 2rem; /* Increased padding */
  background-color: transparent;
  text-align: center;
  transition: filter 0.5s ease-in-out;
  animation: fadeIn 0.8s ease-out;
}

.content-wrapper {
  max-width: 900px; /* Increased max-width */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem; /* Added padding */
}

.blur-background {
  filter: blur(8px);
}

.title {
  color: #005f73;
  margin-bottom: 1.5rem; /* Increased margin */
  font-size: 2.8rem; /* Increased font size */
  font-weight: 600;
}

.description {
  /* color: var(--text-color-secondary); */
  color: #555555; /* Direct value: Medium Grey */
  line-height: 1.6;
  /* Increased bottom margin and font size */
  margin-bottom: 1.5rem;
  font-size: 2.8rem;
  font-weight: 600;
}

.description {
  color: #555555;
  line-height: 1.6;
  margin-bottom: 3rem; /* Increased margin */
  /* max-width: 650px; */
  font-size: 1.3rem; /* Increased font size */
  padding: 0 1rem; /* Added padding */
}

.monitor-button {
  background-color: #2ecc71;
  color: white;
  padding: 14px 30px; /* Increased padding */
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 1.2rem; /* Increased font size */
  font-weight: 500;
  display: inline-block;
  visibility: visible;
  opacity: 1;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 95, 115, 0.1);
  margin-bottom: 3rem; /* Increased margin */
}

.monitor-button.monitoring {
  /* background-color: var(--accent-color-stop); */
  background-color: #e74c3c; /* Direct value: Red */
}

.monitor-button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 4px 10px rgba(0, 95, 115, 0.1); /* Direct shadow color */
}

.monitor-button:active {
  transform: translateY(0px) scale(1);
  box-shadow: 0 2px 5px rgba(0, 95, 115, 0.1); /* Direct shadow color */
}

.sensor-card-instance {
  width: 100%;
  max-width: 900px; /* Increased max-width */
  margin-top: 3rem; /* Increased margin */
}

/* Fade transition for the SensorCard */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>