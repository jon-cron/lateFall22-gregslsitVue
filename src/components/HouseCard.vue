<template>
  <div class="card">
    <div class="selectable p-1" @click="goTo">
      <img class="img-fluid w-100" :src="house.imgUrl" alt="">
      <div class=""><h4> Beds: {{house.bedrooms}} </h4></div>
      <div class=""><h4> Baths: {{house.bathrooms}} </h4></div>
      <div class=""><h4> Levels: {{house.levels}} </h4></div>
    </div>
    <button @click="removeHouse(house.id)" class="btn btn-danger w-50"><h3><i class="text-danger mdi mdi-fire"></i></h3></button>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from "../utils/Logger.js";
import { routerKey, useRouter } from "vue-router";
import Pop from "../utils/Pop.js";
import { housesService } from "../services/HousesService.js";
export default {
  props: {house: {type:Object, required: true}},
  setup(props){
    const router = useRouter()
  return {
    goTo(){
      // logger.log('pushing')
      router.push({ name: 'HouseDetails', params: {id: props.house.id}})
    },
    async removeHouse(){
      try {
        await housesService.removeHouse(props.house.id)
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
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
   
  }
}
</style>