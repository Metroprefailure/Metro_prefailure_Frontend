<template>
  <div class="table-container">
    <table class="sensor-table">
      <thead>
        <tr
          v-if="sensorInfo && sensorInfo.length > 0"
          :class="{ 'error-state-header': colorStatus === 'error' }"
          class="table-header-row"
        >
          <th>Timestamp</th>
          <th>TP2</th>
          <th>TP3</th>
          <th>Oil Temp (°C)</th>
          <th>Motor Current (A)</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(sensor, index) in sensorInfo"
          :key="sensor.id || `sensor-${index}`"
          :class="{ 'error-state-row': colorStatus === 'error' }"
          class="table-data-row"
        >
          <td>{{ formatTimestamp(sensor.timestamp) }}</td>
          <td>{{ sensor.TP2.toFixed(2) }}</td>
          <td>{{ sensor.TP3.toFixed(2) }}</td>
          <td>{{ sensor.Oil_temperature.toFixed(2) }}</td>
          <td>{{ sensor.Motor_current.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "SensorCard",
  props: {
    /**
     * Array of sensor data objects to display in the table.
     * Expected format: [{ id?, timestamp, TP2, TP3, Oil_temperature, Motor_current }, ...]
     */
    sensorInfo: {
      type: Array,
      required: true,
      default: () => [] // Provide default empty array to prevent errors if prop is not passed
    },
    /**
     * Status string ('success', 'error', etc.) used to conditionally apply styling.
     * Determines if the rows/header should have error-specific styles.
     */
    colorStatus: {
      type: String,
      default: 'success' // Default status is 'success'
    }
  },
  methods: {
    /**
     * Formats a timestamp string (e.g., ISO 8601) into a more readable, localized date and time string.
     * Handles potential errors during date parsing.
     * @param {string} timestamp - The timestamp string to format.
     * @returns {string} - The formatted date/time string or the original timestamp on error.
     */
    formatTimestamp(timestamp) {
      // Return 'N/A' or similar if the timestamp is missing
      if (!timestamp) return 'N/A';
      try {
        // Create a Date object from the timestamp string
        const date = new Date(timestamp);
        // Check if the created date object is valid
        if (isNaN(date.getTime())) {
            // If parsing failed, return the original string
            console.warn(`Invalid timestamp format received: ${timestamp}`);
            return timestamp;
        }
        // Use Intl.DateTimeFormat for better locale support and options (alternative)
        // return new Intl.DateTimeFormat(undefined, {
        //   dateStyle: 'medium', // e.g., Apr 29, 2025
        //   timeStyle: 'medium'  // e.g., 11:30:00 PM
        // }).format(date);

        // Use toLocaleString for a common default format based on browser locale
        return date.toLocaleString(undefined, { // Let browser decide locale
          year: 'numeric',
          month: 'short', // e.g., Apr
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit', // Ensure two digits (e.g., 05)
          second: '2-digit',
          hour12: true // Use AM/PM format
        });
      } catch (e) {
        // Log error and return original timestamp if formatting fails
        console.error("Error formatting timestamp:", timestamp, e);
        return timestamp;
      }
    }
  }
};
</script>

<style scoped>
/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

.table-container {
  font-family: 'Poppins', sans-serif;
  max-width: 950px; /* Increased max width slightly */
  margin: 2.5rem auto 0 auto; /* Center the container with top margin */
  overflow-x: auto; /* Enable horizontal scroll on smaller screens if table overflows */
  background-color: #ffffff; /* White background for the table area */
  border-radius: 12px; /* Rounded corners for the container */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.09); /* Enhanced shadow */
  border: 1px solid #e2e8f0; /* Subtle border */
}

.sensor-table {
  width: 100%; /* Table fills its container */
  border-collapse: collapse; /* Remove gaps between cells */
  /* border-radius: 12px; */ /* Radius applied to container now */
  /* overflow: hidden; */ /* Clipping handled by container */
}

/* Styling for both header (th) and data (td) cells */
th, td {
  padding: 16px 20px; /* Increased padding */
  text-align: left; /* Left-align text */
  border-bottom: 1px solid #f1f5f9; /* Very light border between rows */
  font-size: 0.98em; /* Base font size */
  white-space: nowrap; /* Prevent text wrapping */
  color: #334155; /* Default text color */
}

/* Header row specific styles */
.table-header-row {
  background-color: #f8fafc; /* Very light grey background */
  font-weight: 600; /* Bolder header text */
  color: #1e293b; /* Darker header text color */
  font-size: 1em; /* Slightly larger header font */
  height: 3.5rem; /* Header row height */
  transition: background-color 0.3s ease;
  position: sticky; /* Make header sticky */
  top: 0; /* Stick to the top of the container */
  z-index: 10; /* Ensure header stays above scrolling content */
}

/* Data row specific styles */
.table-data-row {
  height: 3.2rem; /* Data row height */
  transition: background-color 0.2s ease;
  color: #475569; /* Data text color */
}

/* Hover effect for data rows */
.table-data-row:hover {
  background-color: #f1f5f9; /* Light blue/grey hover */
}

/* Remove bottom border from the very last data row for cleaner look */
tbody tr:last-child td {
  border-bottom: none;
}

/* --- Error State Styling --- */

/* Header row when in error state */
.error-state-header {
  background-color: #fef2f2; /* Lighter red background */
  color: #b91c1c; /* Dark red text */
}
.error-state-header th {
    color: #b91c1c; /* Ensure text color overrides default */
}


/* Data cell text color when in error state */
.error-state-row td {
  color: #dc2626; /* Red text color */
  font-weight: 500; /* Slightly bolder text in error rows */
}

/* Data row background when in error state */
.error-state-row {
  background-color: #fffafa; /* Very light, almost pink background */
}
.error-state-row:hover {
  background-color: #fee2e2; /* Slightly darker red on hover */
}

</style>
