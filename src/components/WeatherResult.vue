<template>
  <div class="wrapper">
    <div>
      <img :src="`http://openweathermap.org/img/w/${weather.icon}.png`" alt="icon" />
    </div>
    <div class="table-content">
      <table>
        <tbody>
          <tr>
            <td class="bold">Description:</td>
            <td>{{ weather.description }}</td>
          </tr>
          <tr>
            <td class="bold">Temp:</td>
            <td>{{ metrics.temp }}</td>
          </tr>
          <tr>
            <td class="bold">Humidity:</td>
            <td>{{ metrics.humidity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type PropType } from 'vue'
import type { Weather, Metrics } from '@/types/weather'

defineProps({
  weather: {
    type: Object as PropType<Weather>,
    required: true
  },
  metrics: {
    type: Object as PropType<Metrics>,
    required: true
  }
})
</script>
<style scoped>
.table-content {
  text-align: right;
}

td {
  border-bottom: 1px solid #333;
}
.wrapper {
  text-align: center;
}
.bold {
  font-weight: bolder;
}
</style>
