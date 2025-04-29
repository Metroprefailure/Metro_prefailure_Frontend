<template>
  <div  :class="{ 'blur-background': backgroundColorBlur }">
<h2 id="heading">Metro Failure Monitoring</h2>

<h4 style="font-size: large;"> Experience fewer unexpected delays with our intelligent prediction system. Using cutting-edge Al, we can anticipate potential metro failures a full day in advance. This foresight enables proactive maintenance and adjustments, working behind the scenes to ensure a smoother, 
  more dependable travel experience for all passengers.</h4>



<button  
  :style="{ backgroundColor: isMonitoring ? 'red' : '#2ecc71', color: 'white' }"
  @click="callTriggeSimulation">
  {{ isMonitoring ? 'Stop Monitoring' : 'Start Monitoring' }}
</button>
<SensorCard   v-if="sensorData!=null"  :sensorInfo="sensorData" :colorStatus="toastType"/>

</div>
<ToastCard  v-if="showToast && sensorData!=null" :message= "toastMessage" :visibility="showToast"  :type="toastType" :key="resultKey + toastType + Date.now()" :stackIndex=3 />

</template>

<script>

import SensorCard from './Card.vue';
import axios from 'axios';
import ToastCard from './Toast.vue';

export default{
  name : 'HomePage',
  components:{
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
      backgroundColorBlur:false,
    };
  },
  computed :{ 
  toastType() {
  if (this.toastColorTracker === "Pre-Failure") {
    return "error";
  } else  {
    return "success";
  }
 }, 

  

 
},
    

  methods:{
    async callTriggeSimulation(){
      try {
          let response = await axios.get('/api/generate_and_predict');
          let sensorUnFilterdData = [response.data]; 
          console.log(sensorUnFilterdData)
          let sensorFilteredData=sensorUnFilterdData.at(0).data;
          let toastMessage=sensorUnFilterdData.at(0).prediction_message;
          let toastColorTracker=sensorUnFilterdData.at(0).generated_segment_type

          this.toastMessage=toastMessage;
          this.toastColorTracker=toastColorTracker;
          
          // this.showToast = true; 
          this.isMonitoring = !this.isMonitoring;

          if(this.isMonitoring){
            this.sensorData=sensorFilteredData;
            setTimeout(() => {
             this.showToast=true;
             this.backgroundColorBlur=true
           }, 2000); 
      
            setTimeout(() => {
             this.backgroundColorBlur = false;
             this.showToast=false;
             }, 3500); 
          }else{
            this.sensorData=null;
            
          }

 
          console.log("Toast Message :", toastMessage);
        } catch (error) {
          console.error("API call failed:", error);
        }
    },


  }
}
</script>

<style scoped="local">

.content-wrapper {
  transition: filter 0.3s ease;
}

.blur-background {
  filter: blur(1.5rem);
  background-color: rgba(0, 0, 255, 0.1); /* light transparent blue */
  transition: filter 0.3s ease;

}
#heading {
    color: #003366;
}
button {
  background-color: #28a745;  /* Green for success */
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #218838;  /* Darker green on hover */
}

</style>