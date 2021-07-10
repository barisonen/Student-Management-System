import axios from 'axios';

export default class StudentService {
    getStudentList() {
        return axios.get('http://localhost:8080/students/getStudentList');
    }

    createDummyList() {
        return axios.get('http://localhost:8080/students/createDummyList');
    }

    removeAll() {
        return axios.delete('http://localhost:8080/students/removeAll');
    }
}
