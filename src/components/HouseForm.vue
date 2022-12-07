<template>
  <form @submit.prevent="handleHouseSubmit()" class="row justify-content-evenly">
    <div class="mb-3 col-2">
      <label for="" class="form-label">Beds</label>
      <input type="number" class="form-control" v-model="editable.bedrooms" name="" id="" aria-describedby="helpId"
        placeholder="">
      <small id="helpId" class="form-text text-muted">{{ editable.bedrooms }}</small>
    </div>
    <div class="mb-3 col-2">
      <label for="" class="form-label">Baths</label>
      <input type="number" class="form-control" v-model="editable.bathrooms" name="" id="" aria-describedby="helpId"
        placeholder="">
      <small id="helpId" class="form-text text-muted">{{ editable.bathrooms }}</small>
    </div>
    <div class="mb-3 col-2">
      <label for="" class="form-label">Year</label>
      <input type="number" class="form-control" v-model="editable.year" name="" id="" aria-describedby="helpId"
        placeholder="">
      <small id="helpId" class="form-text text-muted"></small>
    </div>
    <div class="mb-3 col-2">
      <label for="" class="form-label">Levels</label>
      <input type="number" class="form-control" v-model="editable.levels" name="" id="" aria-describedby="helpId"
        placeholder="">
      <small id="helpId" class="form-text text-muted"></small>
    </div>
    <div class="mb-3 col-2">
      <label for="" class="form-label">Price</label>
      <input type="number" class="form-control" v-model="editable.price" name="" id="" aria-describedby="helpId"
        placeholder="">
      <small id="helpId" class="form-text text-muted"></small>
    </div>
    <div class="mb-3 col-12">
      <label for="" class="form-label">ImgUrl</label>
      <input type="url" class="form-control" v-model="editable.imgUrl" name="" id="" aria-describedby="helpId"
        placeholder="">
      <img :src="editable.imgUrl" class="img-fluid" alt="">
    </div>
    <div class="mb-3 col-12">
      <label for="" class="form-label">Description</label>
      <textarea name="" id="" class="form-control" v-model="editable.description" rows="3"></textarea>
      <small id="helpId" class="form-text text-muted">Help text</small>
    </div>
    <div class="mb-3 col-4">
      <button class="btn  w-100 rounded-pill selectable text-danger darken-20" type="button"
        @click="editable = {}">Cancel</button>
    </div>
    <div class="mb-3 col-4">
      <!-- NOTE uncomment and put a v-else in the save button to toggle the correct button -->
      <button v-if="!houseData.id" class="btn btn-primary w-100 rounded-pill">Create</button>
      <button v-else class="btn btn-success w-100 rounded-pill">Save</button>
    </div>
  </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { housesService } from "../services/HousesService.js";
export default {
  props: {houseData: { type: Object, default: {}}},
  setup(props, {emit}){
    onMounted(()=> {
      editable.value = props.houseData
    })
    const editable = ref({})
    async function createHouse(){
      try {
        await housesService.createHouse(editable.value)
        editable.value = {}
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
    async function editHouse(){
      try {
        await housesService.editHouse(editable.value)
        emit('houseEdited')
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }
  return {
    editable,
    async handleHouseSubmit(){
      if(props.houseData.id){
        await editHouse()
      } else{
        await createHouse()
      }
    }
  }
  }
};
</script>


<style lang="scss" scoped>

</style>