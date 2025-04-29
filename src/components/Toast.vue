<template>
  <transition name="toast-pop">
    <div v-if="visibility" class="toast" :class="[type, {'shake-error': type === 'error'}]">
       <span class="toast-icon">
         <template v-if="type === 'success'">✓</template> <template v-else-if="type === 'error'">!</template> <template v-else>ℹ</template> </span>
       <span class="toast-message">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ToastCard",
  props: {
    message: String,
    type: { // 'success' or 'error'
      type: String,
      default: 'info', // Add a default
    },
    visibility: Boolean, // This prop controls visibility directly
  },
  // No data() needed for visibility anymore
  // mounted() hook remains commented out or removed
};
</script>

<style scoped>
.toast {
  position: fixed;
  /* Positioning: Top Center */
  top: 30px;
  left: 50%;
  transform: translateX(-50%);

  /* Appearance */
  display: flex;
  align-items: center;
  padding: 1.1rem 2rem; /* Slightly increased padding */
  border-radius: 10px; /* Slightly larger radius */
  /* Stronger, more defined shadow */
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  color: #ffffff;
  font-size: 1.25rem; /* Increased font size */
  font-weight: 700; /* Bolder text */
  line-height: 1.4;
  min-width: 300px; /* Increased min-width */
  max-width: 550px;
  z-index: 10000;
  pointer-events: none;
  text-align: left;
  /* Add a subtle border */
  border: 1px solid rgba(0, 0, 0, 0.1);
}

/* Icon Styling */
.toast-icon {
  margin-right: 15px; /* More space */
  font-size: 1.7em; /* Larger icon */
  line-height: 1;
  /* --- Fix: Force transparent background --- */
  background: transparent !important;
  color: #ffffff !important; /* Ensure icon is white */
}

/* Message Styling */
.toast-message {
  flex-grow: 1;
  /* --- Fix: Force transparent background --- */
  background: transparent !important;
  color: #ffffff !important; /* Ensure text is white */
}

/* Type Styles */
.toast.success {
  /* Slightly adjusted gradient */
  background: linear-gradient(135deg, #34d399, #10b981);
  border-color: #059669; /* Darker green border */
}

.toast.error {
  /* Slightly adjusted gradient */
  background: linear-gradient(135deg, #f87171, #dc2626);
  border-color: #b91c1c; /* Darker red border */
}

.toast.info {
   background: linear-gradient(135deg, #60a5fa, #2563eb);
   border-color: #1d4ed8; /* Darker blue border */
}


/* --- Animations --- */

.toast-pop-enter-active {
  /* Faster, more impactful entry */
  animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.toast-pop-leave-active {
  /* Faster exit */
  animation: pop-out 0.4s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;
}

@keyframes pop-in {
  0% {
    transform: translateX(-50%) translateY(-120px) scale(0.7);
    opacity: 0;
  }
  100% {
    transform: translateX(-50%) translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes pop-out {
  0% {
    transform: translateX(-50%) translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) translateY(-120px) scale(0.7);
    opacity: 0;
  }
}

/* Shake animation specifically for errors */
.shake-error {
  animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards,
             shake 0.6s cubic-bezier(.36,.07,.19,.97) 0.4s both; /* Start shake slightly earlier */
  transform: translateX(-50%);
}

@keyframes shake {
   /* More intense shake */
  10%, 90% { transform: translateX(-50%) translateX(-2px); }
  20%, 80% { transform: translateX(-50%) translateX(3px); }
  30%, 50%, 70% { transform: translateX(-50%) translateX(-5px); }
  40%, 60% { transform: translateX(-50%) translateX(5px); }
}

</style>