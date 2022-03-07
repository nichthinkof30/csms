<template>
  <organization-detail :is-edit="true" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import OrganizationDetail from './components/OrganizationDetail.vue'

@Component({
  name: 'EditOrganization',
  components: {
    OrganizationDetail
  }
})
export default class extends Vue {}
</script>
