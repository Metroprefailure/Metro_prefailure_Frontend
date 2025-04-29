<template>
  <div :class="{ 'blur-background': backgroundColorBlur }" class="home-container">

    <h2 id="heading">Metro Pre-Failure Detection System</h2>

    <h4 class="description">
      Experience fewer unexpected delays with our intelligent prediction system. Using cutting-edge AI, we can anticipate potential metro failures a full day in advance. This foresight enables proactive maintenance and adjustments, working behind the scenes to ensure a smoother, more dependable travel experience for all passengers.
    </h4>

    <button
      class="monitor-button"
      :style="{ backgroundColor: isMonitoring ? '#e74c3c' : '#2ecc71' }"  
      @click="callTriggerSimulation"
    >
      {{ isMonitoring ? 'Stop Simulation' : 'Start Simulation' }}
    </button>

    <SensorCard
      v-if="sensorData != null"
      :sensorInfo="sensorData"
      :colorStatus="toastType"
      class="sensor-card-margin"
    />

  </div>

  <ToastCard
    v-if="showToast && sensorData != null"
    :message="toastMessage"
    :visibility="showToast"
    :type="toastType"
    :key="'toast-' + toastType + Date.now()"
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
      sensorData: null,         // Holds the data received from the API for the SensorCard
      toastMessage: null,       // Message content for the ToastCard
      showToast: false,         // Controls the visibility of the ToastCard
      isMonitoring: false,      // Tracks whether the monitoring simulation is active
      toastColorTracker: null,  // Stores the segment type from the API to determine toast color
      backgroundColorBlur: false // Controls the blur effect on the main container
    };
  },
  computed: {
    /**
     * Determines the type ('success' or 'error') for the ToastCard
     * based on the prediction outcome from the API.
     */
    toastType() {
      return this.toastColorTracker === "Pre-Failure" ? "error" : "success";
    }
  },
  methods: {
    /**
     * Toggles the monitoring state and fetches data from the API.
     * Manages the display of sensor data and toast notifications with delays.
     */
    async callTriggerSimulation() {
      // Toggle the monitoring state immediately for button text/color change
      this.isMonitoring = !this.isMonitoring;

      if (this.isMonitoring) {
        try {
          // Make the API call
          const response = await axios.get('/api');

          // Assuming response.data has the structure:
          // { data: {...}, prediction_message: "...", generated_segment_type: "..." }
          const apiData = response.data;

          // Validate received data structure (optional but recommended)
          if (!apiData || typeof apiData !== 'object' || !apiData.data || !apiData.prediction_message || !apiData.generated_segment_type) {
              console.error("Invalid API response structure:", apiData);
              // Handle invalid structure, maybe show an error toast
              this.isMonitoring = false; // Revert monitoring state
              // Optionally set an error message for a generic error toast
              // this.toastMessage = "Error fetching data. Invalid response.";
              // this.toastColorTracker = "ErrorState"; // Or some other indicator
              // this.showToast = true;
              // ... add timeout to hide error toast
              return; // Stop further processing
          }


          const sensorFilteredData = apiData.data;
          const toastMessage = apiData.prediction_message;
          const toastColorTracker = apiData.generated_segment_type;

          // Update component state with API data
          this.sensorData = sensorFilteredData;
          this.toastMessage = toastMessage;
          this.toastColorTracker = toastColorTracker;

          console.log("API Data Received. Toast Message:", toastMessage, "Type:", toastColorTracker);

          // Show the toast and blur background after a short delay (e.g., 2 seconds)
          setTimeout(() => {
            this.showToast = true;
            this.backgroundColorBlur = true;
          }, 2000); // 2-second delay before showing toast/blur

          // Hide the toast and remove blur after another delay (e.g., 1.5 seconds later)
          setTimeout(() => {
            this.backgroundColorBlur = false;
            this.showToast = false;
             // Optionally reset toast message/type if needed after hiding
            // this.toastMessage = null;
            // this.toastColorTracker = null;
          }, 3500); // 3.5 seconds total from the start (toast visible for 1.5s)

        } catch (error) {
          console.error("API call failed:", error);
          // Handle API error (e.g., show an error toast)
          this.isMonitoring = false; // Revert monitoring state on error
          this.sensorData = null; // Clear sensor data on error
          // Optionally set state for an error toast
          // this.toastMessage = "Failed to fetch monitoring data. Please try again.";
          // this.toastColorTracker = "ErrorState"; // Use a specific state or keep it null
          // this.showToast = true;
          // ... add timeout to hide error toast
        }
      } else {
        // If monitoring is stopped, clear the sensor data
        this.sensorData = null;
        // Ensure toast and blur are also cleared if stop button is clicked during the timeout phases
        this.showToast = false;
        this.backgroundColorBlur = false;
        console.log("Monitoring stopped by user.");
      }
    }
  }
}
</script>

<style scoped>
/* Scoped styles apply only to this component */

.home-container {
  padding: 20px; /* Add some padding around the content */
  text-align: center; /* Center align text elements */
  transition: filter 0.4s ease-in-out; /* Smooth transition for blur effect */
}

.blur-background {
  filter: blur(8px); /* Apply blur effect - adjust value as needed */
  /* Optional: slightly dim or color the background when blurred */
  /* background-color: rgba(200, 200, 255, 0.1); */
  pointer-events: none; /* Prevent interaction with blurred content */
  user-select: none; /* Prevent text selection when blurred */
}

#heading {
  color: #003366; /* Dark blue color for the main heading */
  margin-bottom: 15px; /* Space below the heading */
}

.description {
  font-size: 1.1em; /* Slightly larger font size */
  color: #555;    /* Dark gray color for better readability */
  max-width: 800px; /* Limit width for better readability on wide screens */
  margin: 0 auto 25px auto; /* Center align and add space below */
  line-height: 1.6; /* Improve line spacing */
}

.monitor-button {
  color: white; /* Text color is always white */
  padding: 12px 25px; /* Increase padding for a larger button */
  border-radius: 8px; /* Slightly more rounded corners */
  border: none;
  cursor: pointer;
  font-size: 1.1em; /* Slightly larger font size */
  transition: background-color 0.3s ease, transform 0.1s ease; /* Smooth transitions */
  margin-bottom: 30px; /* Space below the button */
}

.monitor-button:hover {
  filter: brightness(1.1); /* Slightly brighten button on hover */
}
.monitor-button:active {
    transform: scale(0.98); /* Slightly shrink button when clicked */
}

/* Specific background colors are handled by inline :style */
/* .monitor-button.start { background-color: #2ecc71; } */
/* .monitor-button.stop { background-color: #e74c3c; } */

.sensor-card-margin {
    margin-top: 20px; /* Add space above the sensor card */
}

</style>