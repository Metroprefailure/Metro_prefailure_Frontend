<template>
  <div class="card-container">
    <table class="sensor-table">
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>TP2</th>
          <th>TP3</th>
          <th>Oil Temp (°C)</th> <th>Motor Current (A)</th> </tr>
      </thead>
      <tbody :class="statusClass">
        <tr v-if="!sensorInfo || sensorInfo.length === 0">
            <td colspan="5">No sensor data available.</td>
        </tr>
         <tr v-else v-for="(sensor, index) in sensorInfo" :key="sensor.timestamp || index">
           <td>{{ sensor.timestamp }}</td>
           <td>{{ formatNumber(sensor.TP2) }}</td>
           <td>{{ formatNumber(sensor.TP3) }}</td>
           <td>{{ formatNumber(sensor.Oil_temperature) }}</td>
           <td>{{ formatNumber(sensor.Motor_current) }}</td>
         </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "SensorCard",
  props: {
    sensorInfo: {
      type: Array,
      required: true,
      default: () => [] // Provide default empty array
    },
    colorStatus: {
      type: String, // Should be 'error' or 'success'
      default: 'success' // Default to success state
    }
  },
  computed: {
    statusClass() {
      // Returns 'status-error' or 'status-success' based on the prop
      return this.colorStatus === 'error' ? 'status-error' : 'status-success';
    }
  },
  methods: {
      // Helper method for consistent number formatting
      formatNumber(value) {
          if (typeof value === 'number') {
              return value.toFixed(2);
          }
          // Return '--' or similar for non-numeric values if preferred
          return value === null || value === undefined ? '--' : value;
      }
  }
};
</script>

<style scoped>
.card-container {
  margin: 4rem auto; /* Increased top/bottom margin */
  padding: 0 2rem; /* Increased padding */
  max-width: 1100px; /* Increased max-width */
  width: 100%;
}

.sensor-table {
  width: 100%; /* Make table take full container width */
  border-collapse: collapse; /* Collapse borders for a cleaner look */
  /* Remove border-spacing if using collapsed borders */
  box-shadow: 0 6px 20px rgba(0, 70, 90, 0.08); /* Adjusted shadow */
  border-radius: 8px; /* Slightly less round */
  overflow: hidden; /* Keep this to clip background/borders to the radius */
  background-color: #ffffff; /* White background for the table */
  text-align: left; /* Default align left */
}

/* Table Header */
thead tr {
  background-color: #005f73; /* Primary color */
  color: #000000; /* White text */
}

th {
  padding: 18px 24px; /* Increased padding */
  font-weight: 600;
  text-align: left;
  letter-spacing: 0.5px;
  font-size: 1.1rem; /* Increased font size */
  border-bottom: 2px solid #004c5c;
}

/* Table Body */
tbody tr {
  background-color: #ffffff; /* Default row background */
  border-bottom: 1px solid #e8eef3; /* Lighter, softer border between rows */
  transition: background-color 0.2s ease; /* Smooth hover transition */
}

/* Zebra striping (Optional - uncomment if desired) */
/* tbody tr:nth-child(even) {
  background-color: #f8f9fa;
} */

tbody tr:hover {
  background-color: #f0f8ff; /* Light blue hover */
}

/* Last row no border */
tbody tr:last-child {
  border-bottom: none;
}

td {
  padding: 18px 24px; /* Increased padding */
  color: #334155;
  font-size: 1.1rem; /* Increased font size */
  text-align: center;
  vertical-align: middle;
}

/* Align first column (timestamp) left */
td:first-child {
    text-align: left;
    color: #556a85; /* Slightly different color for timestamp */
    font-family: monospace; /* Optional: Monospace font for timestamp */
}


/* --- Status Highlighting --- */

/* Default/Success State - subtle indicator */
tbody.status-success tr {
   /* No specific style needed, or maybe a subtle green left border */
   /* border-left: 4px solid transparent; */ /* Maintains spacing if error border exists */
}

/* Error Status - More prominent indicator */
tbody.status-error tr {
  /* Use a left border instead of full background */
  border-left: 4px solid #e74c3c; /* Red border */
  background-color: #fffafa; /* Very subtle pinkish background */
}

tbody.status-error td {
   /* Keep text dark for readability */
   color: #334155; /* Maintain good contrast */
   /* Optional: Slightly bolder text for error rows */
   /* font-weight: 500; */
}
/* Adjust hover for error rows */
tbody.status-error tr:hover {
  background-color: #ffeeee; /* Slightly darker pink on hover */
}

/* Empty state styling */
tbody tr td[colspan="5"] {
    text-align: center;
    color: #778ca3;
    padding: 40px; /* Increased padding */
    font-size: 1.2rem; /* Increased font size */
    font-style: italic;
    background-color: #f8f9fa !important;
    border: none;
}
/* Ensure hover doesn't apply to empty state */
tbody tr:hover td[colspan="5"] {
    background-color: #f8f9fa !important;
}


</style>