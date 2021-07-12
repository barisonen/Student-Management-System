import axios from 'axios';

export default class CityDistrictService {
    getCities() {
        return axios.get('http://localhost:8080/city-district/getCities');
    }

    getDistrictsOfACity(city) {
        return axios.post('http://localhost:8080/city-district/getDistricts', city);
    }
    async createDummyList() {
        await axios.get('http://localhost:8080/students/createDummyList');
    }

    async removeAll() {
        await axios.delete('http://localhost:8080/students/removeAll');
    }

    async loadCityAndDistricts() {
        await axios.get('http://localhost:8080/city-district/loadCityAndDistricts');
    }
}
