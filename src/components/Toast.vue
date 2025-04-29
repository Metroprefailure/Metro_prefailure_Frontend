<template>
  <div style="display: flex; justify-content: center;">
    <div v-if="visible" class="toast" :class="type">
      {{ message }}
    </div>
    </div>
  </template>
  
  <script>
  export default {
    name : "ToastCard",
    props: {
      message: String,
      type: {
        type: String,
      },
      visibility:Boolean,
    },
    data() {
      return {
        visible: this.visibility,
      };
    },
    // mounted() {
    //   setTimeout(() => {
    //     this.visible = true;
    //   }, 4000); 
      
    //   setTimeout(() => {
    //     this.visible = false;
    //   }, 7000);     
    // }
  };
  </script>
  
  <style scoped>
  .toast {
     position: fixed;
    top: 40vh;
    left:2rem;
   /* right: -300px;
    background: #444; */
   
    color: #fff;
    padding: 12px 20px;
    border-radius: 6px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    animation: slide-in 0.5s forwards;
    z-index: 9999;
    min-width: 200px;
  }
  
  .toast.success {
    background: #4CAF50;
    height: 2rem;
    font-size: 1.5rem;
  }
  
  .toast.error {
    background: #f44336;
    height: 2rem;
    font-size: 1.5rem;
  }
  
  .toast.info {
    background: #2196F3;
  }
  
  @keyframes slide-in {
    to {
      /* right: 20px; */
      left:40vw;
    }
  }
  </style>