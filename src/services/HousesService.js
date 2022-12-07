import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class HousesService{
  async getHouses(){
  const res = await api.get("api/houses")
  AppState.houses = res.data
}
async getHouseById(id){
 const res = await api.get('api/houses/' + id)
 AppState.activeHouse = res.data
}
async createHouse(houseData){
  const res = await api.post('api/houses', houseData)
  AppState.houses.push(houseData)
}
async removeHouse(id){
  const res = await api.delete('api/houses/' + id)
  logger.log(res.data, 'removed')
}
async editHouse(houseData){
  const res = await api.put('api/houses/' + houseData.id, houseData)
  logger.log('edited', res.data)
}
}

export const housesService = new HousesService()