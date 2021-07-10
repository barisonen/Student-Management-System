package com.example.backend.controllers;

import com.example.backend.entities.Student;
import com.example.backend.repositories.StudentRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentRepository studentRepository;

    private ObjectMapper objectMapper;

    public StudentController(StudentRepository studentRepository, ObjectMapper objectMapper) {
        this.studentRepository = studentRepository;
        this.objectMapper = objectMapper;
    }


    //Creates, saves, and returns dummy list of students for user to easily work on.
    @GetMapping("createDummyList")
    public List<Student> createDummyList() {
        Student s1 = new Student("Baris", "Onen", "+1 234 567 89 00", "Ankara", "Cankaya", "Hardworking Student");
        Student s2 = new Student("Burhan", "Altintop", "+90 234 567 89 00", "Istanbul", "Nisantasi", "Economics Student");
        studentRepository.save(s1);
        studentRepository.save(s2);

        return iterableToList(studentRepository.findAll());
    }

    @GetMapping("getStudentList")
    public List<Student> getStudentList() {
        return iterableToList(studentRepository.findAll());
    }

    @PostMapping("addStudent")
    public HttpStatus addStudent(@RequestBody String st) {
        Student newStudent = new Student();
        try {
            newStudent = objectMapper.readValue(st, Student.class);
        } catch(JsonProcessingException e) {
            return HttpStatus.BAD_REQUEST;
        }
        studentRepository.save(newStudent);
        return HttpStatus.OK;
    }

    @DeleteMapping("removeStudent")
    public HttpStatus removeStudent(@RequestBody String sId) {
        Long id = null;
        try {
            id = Long.parseLong(sId);
        } catch(NumberFormatException e) {
            return HttpStatus.NOT_ACCEPTABLE;
        }
        if(studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return HttpStatus.OK;
        }
        else {
            return HttpStatus.NOT_FOUND;
        }
    }

    @PatchMapping("updateStudent")
    public HttpStatus updateStudent(@RequestBody String st) {
        Student theStudent = new Student();
        try {
            theStudent = objectMapper.readValue(st, Student.class);
        } catch(JsonProcessingException e) {
            return HttpStatus.BAD_REQUEST;
        }
        Long id = theStudent.getId();
        Student existingStudent = studentRepository.findById(id).orElse(null);
        if(existingStudent != null) {
            existingStudent.setName(theStudent.getName());
            existingStudent.setSurname(theStudent.getSurname());
            existingStudent.setCity(theStudent.getCity());
            existingStudent.setDistrict(theStudent.getDistrict());
            existingStudent.setDescription(theStudent.getDescription());
            studentRepository.save(existingStudent);
            return HttpStatus.OK;
        }
        else {
            return HttpStatus.BAD_REQUEST;
        }
    }

    private List<Student> iterableToList(Iterable<Student> iterable) {
        List<Student> result = new ArrayList<>();
        studentRepository.findAll().forEach(result::add);
        return result;
    }
}
