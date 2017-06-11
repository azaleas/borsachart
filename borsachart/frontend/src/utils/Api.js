import axios from 'axios';

const API_STEM = '/api/v1';

class Api{

    fetchFirstData(){
        let URL = `${API_STEM}/charts/first_connect`;
        return axios.get(URL)
            .then((response) => response.data)
            .catch((error) => {
                console.warn("Error in fetchFirstData", error);
            });
    }

    postVote(quesitonId, choiceId){
        let URL = `${API_STEM}/polls/${quesitonId}/vote/`;
        let config = {};

        if(this.isLoggedIn()){
            config = {
                headers: {"Authorization": "Token " + this.token},
            };
        }

        return axios.post(
                URL, 
                {
                    "question": quesitonId,
                    "choice": choiceId,
                },
                config
            )
            .then((response) => {
                return response.data.data.question;
            })
            .catch((error) => {
                console.warn(error);
            })
    }
}

export default new Api();