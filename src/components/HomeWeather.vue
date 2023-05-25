<template>
  <div>
    <div class="search">
      <h1 class="green">Weather App</h1>
      <h3>Enter location:</h3>
      <input
        :disabled="isLoading"
        :value="userTextInput"
        @input="(event: Event ) => (userTextInput = (event.target as HTMLInputElement).value)"
      />
      <button :disabled="isLoading" @click="triggerSearch">Search</button>
    </div>
    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
    <div v-if="weather" class="table">
      <WeatherResult :weather="weather" :metrics="metrics" />
    </div>
  </div>
</template>

<script setup lang="ts">
import WeatherResult from './WeatherResult.vue'
import { ref } from 'vue'
import axios from 'axios'
import type { Metrics, Weather, WeatherResultType } from '@/types/weather'

const API_WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

const userTextInput = ref<string | null>(null)

const isLoading = ref<boolean>(false)
const errorMessage = ref<string>('')

const weather = ref<Weather>()
const metrics = ref<Metrics>()

const getSanitizedURL = () => {
  if (typeof userTextInput.value !== 'string') {
    throw new Error('wrong user input')
  }

  const sanitizedURL = new URL(API_WEATHER_BASE_URL)
  const allowedProtocols = ['http:', 'https:']

  if (!allowedProtocols.includes(sanitizedURL.protocol)) {
    throw new Error('can not query ressources')
  }

  sanitizedURL.searchParams.append('q', userTextInput.value)
  sanitizedURL.searchParams.append('units', 'metric')
  sanitizedURL.searchParams.append('APPID', 'b8de8503e7012ee121a886385eddf0c1')

  return sanitizedURL
}
const triggerSearch = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    const { href } = getSanitizedURL()
    const { data } = await axios.get<WeatherResultType>(href)
    weather.value = data.weather[0]
    metrics.value = data.main
  } catch (error) {
    errorMessage.value = error as string
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.search {
  padding: 1em;
  text-align: center;
}
.error {
  font-weight: bold;
  color: red;
  text-align: center;
}
.table {
  display: flex;
  margin: auto;
  justify-content: center;
  width: 70%;
}
</style>
