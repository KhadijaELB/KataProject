import axios from 'axios';

const PLAYER_API_BASE_URL = "http://localhost:8080/api/v1";

class PlayerService {
 createPlayer(player){
    return axios.post(`${PLAYER_API_BASE_URL}/addPlayer`, player);
    }
 getPlayerById(id){
    return axios.get(`${PLAYER_API_BASE_URL}/getPlayer/${id}`);
 }

}

export default new PlayerService()