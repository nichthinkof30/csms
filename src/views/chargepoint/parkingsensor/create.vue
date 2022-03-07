<template>
  <parking-sensor-detail :is-edit="false" />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ParkingSensorDetail from './components/ParkingSensorDetail.vue'

@Component({
  name: 'CreateParkingSensor',
  components: {
    ParkingSensorDetail
  }
})
export default class extends Vue {}
</script>
