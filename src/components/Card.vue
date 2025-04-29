<template>

  <table class="center" style="width: 50%;   box-shadow: 1px 1px 6px #2c3e50; border-radius: 1rem;">
    <tr style="height: 2.5rem; " v-if="sensors!=null" :class="colorChecker=='error'?'colorProducer':'null'">
      <td> Timestamp</td>
      <td>TP2</td>
      <td>TP3 </td>
      <td> Oil_temperature </td>
      <td>Motor_current</td>
    </tr>
    <tr  :class="colorChecker=='error'?'colorProducer':'null'"  v-for="sensor in sensors" :key="sensor.id" style="height: 2.5rem;">
      <td> {{ sensor.timestamp }}</td>
      <td>{{ sensor.TP2.toFixed(2) }}</td>
      <td>  {{ sensor.TP3.toFixed(2) }}</td>
      <td> {{ sensor.Oil_temperature.toFixed(2)}}</td>
      <td> {{ sensor.Motor_current.toFixed(2) }}</td>
    </tr>
  </table>
  
    
  </template>
  
  <script>
  export default {
    name : "SensorCard",
    props :{
    sensorInfo: {
      type: Array,
      required:true,
    },
    colorStatus:{
      type:String,
    }
  },
   computed : {
      sensors (){
        return this.sensorInfo
      },

      colorChecker(){
        return this.colorStatus
      }
    },
  
    methods: {

    }
  };
  </script>
  
  <style scoped>
 .card-body {
    padding: .5rem;
    display: flex;
    /* border : 2px solid red; */
    border-radius: 10px;
    justify-content: space-around;
    margin: 2rem ;
    background-color: white;
    box-shadow: 3px 4px 6px #2c3e50;
    
    
  }


  .card-item {
    margin: 0.5rem;
    width: 18rem;
    /* border: 2px solid red; */
    background-color: white;
    box-shadow: 3px 4px 6px #2c3e50;
    border-radius: 10px;
    
  }
  
  .card-item p {
    font-size: 16px;
    margin: 5px 0;
    background-color: transparent;
  }
  
  .card-item span {
    font-weight: bold;
  }


  @keyframes flash {
  0% {
     background-color: inherit;
     }
  50% { 
    background-color: var(--flash-color);  
   } 
  100% { 
    background-color: inherit;
   }
}

.flash {
  animation: flash 5s infinite;
}

.blue { 
  color: black;
  background-color: var(--flash-color);
}


.orange { 
  color: black;
  background-color: var(--flash-color);

}
.yellow { 
  color: black;
  background-color: var(--flash-color);
}
.grey { 
  color: black;
  background-color: var(--flash-color);
}
.default {
  color: black;
  background-color: var(--flash-color);
  }

  .center {
  margin-left: auto;
  margin-right: auto;
  margin-top:2.5rem;
  padding: auto;
}


table {
  border-collapse: collapse;
}

td {
  border-bottom: 0.1px solid #506e8b;
}


tr:first-child td:first-child {
  border-top-left-radius: 1rem;
}
tr:first-child td:last-child {
  border-top-right-radius: 1rem;
}


tr:last-child td:first-child {
  border-bottom-left-radius: 1rem;
}
tr:last-child td:last-child {
  border-bottom-right-radius: 1rem;
}

tr:last-child td {
  border-bottom: none !important;
}

.colorProducer td {
  color:red
}

  </style>
  