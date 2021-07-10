package com.example.backend.controllers;

import com.example.backend.entities.Student;
import com.example.backend.repositories.StudentRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }


    //Creates, saves, and returns dummy list of students for user to easily work on.
    @GetMapping("/createDummyList")
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

    private List<Student> iterableToList(Iterable<Student> iterable) {
        List<Student> result = new ArrayList<>();
        studentRepository.findAll().forEach(result::add);
        return result;
    }
}
