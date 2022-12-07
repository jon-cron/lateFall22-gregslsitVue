<template>
  <div class="card selectable p-1" @click="goTo">
    <img class="img-fluid" :src="house.imgUrl" alt="">
      <div class=""><h4> Beds: {{house.bedrooms}} </h4></div>
      <div class=""><h4> Baths: {{house.bathrooms}} </h4></div>
      <div class=""><h4> Levels: {{house.levels}} </h4></div>
      <button class="btn delete-btn"><h3><i class="text-danger mdi mdi-fire"></i></h3></button>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  props: {house: {type:Object, required: true}},
  setup(){
  return {

  }
  }
};
</script>


<style lang="scss" scoped>
img{
  height: 20vh
}
.card{
  position: relative;
  .delete-btn{
    position: absolute;
    top: 3px;
    right: 3px
  }
}
</style>