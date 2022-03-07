<template>
  <charge-station-detail :is-edit="true" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ChargeStationDetail from './components/ChargeStationDetail.vue'  //  './components/ArticleDetail.vue'

@Component({
  name: 'EditChargeStation',
  components: {
    ChargeStationDetail
  }
})
export default class extends Vue {}
</script>
