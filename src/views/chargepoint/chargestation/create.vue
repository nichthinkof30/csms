<template>
  <charge-station-detail :is-edit="false" />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ChargeStationDetail from './components/ChargeStationDetail.vue'

  @Component({
    name: 'CreateChargeStation',
    components: {
      ChargeStationDetail
    }
  })
export default class extends Vue {}
</script>
