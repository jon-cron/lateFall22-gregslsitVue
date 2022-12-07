<template>
  <div v-if="house" class="container">
    <div v-if="(editMode == false)" class="row bg-light p-2">
      <div class="col-5">
        <img class="detail-img img-fluid" :src="house.imgUrl" alt="">
      </div>
      <div class="col-5">
        <div class="">
          <h1>Price: {{house.price}}</h1>
          <h2>Beds: {{house.bedrooms}}</h2>
          <h2>Baths: {{house.bathrooms}}</h2>
          <h2>Levels: {{house.levels}}</h2>
          <h3>Description:</h3>
          <h6>{{house.description}}</h6>
          <button @click="(editMode = true)" class="btn btn-success"><i class="mdi mdi-pencil"></i></button>
        </div>
      </div>
    </div>
    <div v-else>
      <HouseForm :houseData="house" @houseEdited="(editMode = false)"/>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { housesService } from "../services/HousesService.js";
import { useRoute } from "vue-router";

export default {
  setup(){
    const editMode = ref(false)
    const route = useRoute()
    async function getHouseById(){
      try {
        await housesService.getHouseById(route.params.id)
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
    onMounted(()=> {
      getHouseById()
    })
  return {
    editMode,
    house: computed(()=> AppState.activeHouse),
    async editHouse(){
      editMode.value = false
    }
  }
  }
};
</script>


<style lang="scss" scoped>
.detail-img{
  height: 33vh;
  object-fit: cover;
}
</style>