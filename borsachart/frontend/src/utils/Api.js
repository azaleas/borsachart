import axios from 'axios';
import Cookies from 'universal-cookie';

const API_STEM = '/api/v1';
const cookies = new Cookies();

class Api{

    fetchFirstData(){
        let URL = `${API_STEM}/charts/first_connect/`;
        return axios.get(URL)
            .then((response) => response.data)
            .catch((error) => {
                console.warn("Error in fetchFirstData", error);
            });
    }
    
    searchTicker(ticker){
        let URL = `${API_STEM}/charts/searchticker/`;
        return axios.post(
                URL, 
                {
                    ticker
                },
                {
                    headers: {
                        'X-CSRFToken': cookies.get('csrftoken'),
                    }
                }
            )
            .catch((error) => {
                if(error.response.status === 404){
                    return error.response.status;
                }
                console.warn(error);
            })
    }
}

export default new Api();