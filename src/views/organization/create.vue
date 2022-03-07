<template>
  <organization-detail :is-edit="false" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import OrganizationDetail from './components/OrganizationDetail.vue'

@Component({
  name: 'CreateOrganization',
  components: {
    OrganizationDetail
  }
})
export default class extends Vue {}
</script>
