import axios from 'axios';

const Game_API_BASE_URL = "http://localhost:8080/api/v1";

class GameService {
 getListGames(){
   return axios.get(`${Game_API_BASE_URL}/getListGame`);
    }
createGame(game){
    return axios.post(`${Game_API_BASE_URL}/createGame`, game);
}
updateStateGame(game, id) {
    return axios.put(`${Game_API_BASE_URL}/updateGame/${id}`, game);
  }

}

export default new GameService()