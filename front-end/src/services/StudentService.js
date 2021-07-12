import axios from 'axios';

export default class StudentService {
    getStudentList() {
        return axios.get('http://localhost:8080/students/getStudentList');
    }

    async createDummyList() {
        await axios.get('http://localhost:8080/students/createDummyList');
    }

    async removeAll() {
        await axios.delete('http://localhost:8080/students/removeAll');
    }

    addStudent(student) {
        console.log(student);
        axios.post('http://localhost:8080/students/addStudent', student);
    }
}
