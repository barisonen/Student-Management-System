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

    async addStudent(student) {
        console.log(student)
        await axios.post('http://localhost:8080/students/addStudent', student).then(res => {
            console.log("Server returned with response: " + res.data);
        });
    }

    async editStudent(student) {
        await axios.patch('http://localhost:8080/students/updateStudent', student).then(res => {
            console.log("Server returned with response: " + res.data);
        });
    }

    async removeStudent(sId) {
        await axios.post('http://localhost:8080/students/removeStudent', sId).then(res => {
            console.log("Server returned with response: " + res.data);
        });
    }
}
