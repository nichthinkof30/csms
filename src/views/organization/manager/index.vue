<template>
  <div>
    <h1>MANAGER listing</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Pagination from '@/components/Pagination/index.vue'

@Component({
  name: 'Manager',
  components: {
    Pagination
  },
  filters: {
  }
})


export default class extends Vue {
}

</script>
