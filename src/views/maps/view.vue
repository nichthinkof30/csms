<template>
  <div>
    <h1> Google Maps</h1>

    embed maps
    <!-- <iframe
      width="450"
      height="250"
      frameborder="0" style="border:0"
      src="https://www.google.com/maps/embed/v1/MAP_MODE?key=AIzaSyCL0RSk2kEqUA7I81aaTFpjLC-v8-Ai5xM" allowfullscreen>
    </iframe> -->

    <gmaps-map>
      <gmaps-marker :position="{ lat: -27, lng: 153 }" />
    </gmaps-map>

  </div>
</template>

<script lang="js">

import { gmapsMap, gmapsMarker } from 'x5-gmaps'
export default {
   components: { gmapsMap, gmapsMarker }
}
</script>