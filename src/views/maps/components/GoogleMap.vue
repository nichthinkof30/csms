<template>
  <div>
    <div>
      <h2>Search and add a pin</h2>
    </div>
    <br>
    <br>
    <br>

    <gmaps-map>
      <gmaps-marker :position="{ lat: -27, lng: 153 }" />
    </gmaps-map>

  </div>
</template>


<script>
export default {
   components: { gmapsMap, gmapsMarker }
}
</script>