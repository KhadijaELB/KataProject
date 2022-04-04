import axios from 'axios';

const Move_API_BASE_URL = "http://localhost:8080/api/v1";

class MoveService {
 getListMove(idGame){
   return axios.get(`${Move_API_BASE_URL}/getListMove/${idGame}`);
    }
createMove(move){
    return axios.post(`${Move_API_BASE_URL}/addMove`, move);
}

}

export default new MoveService()