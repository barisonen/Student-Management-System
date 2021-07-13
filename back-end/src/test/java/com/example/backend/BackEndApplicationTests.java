package com.example.backend;

import com.example.backend.entities.Student;
import com.example.backend.repositories.CityDistrictRepository;
import com.example.backend.repositories.StudentRepository;
import org.hibernate.annotations.NaturalId;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest
class BackEndApplicationTests {

	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private CityDistrictRepository cityDistrictRepository;


	@Test
	void contextLoads() {
	}
/*
	@Test
	void testCrudRepository() {

		//create and save dummy list
		Student s1 = new Student("Baris", "Onen", "(222) 333 1111", "Ankara", "Cankaya", "Hardworking Student");
		Student s2 = new Student("Burhan", "Altintop", "(123) 456 7890", "Istanbul", "Nisantasi", "Economics Student");
		studentRepository.save(s1);
		System.out.println(s1.toString() + " loaded");
		studentRepository.save(s2);
		System.out.println(s2.toString() + " loaded");

		//get the dummy list
		System.out.println("Student List: " + studentRepository.findAll());

		//remove the dummy list
		studentRepository.deleteAll();
		System.out.println("List cleared");
		System.out.println("Student List: " + studentRepository.findAll());
	}
*/
	@Test
	void testJdbcRepository() {
		cityDistrictRepository.loadCityAndDistricts();
		System.out.println("City and districts loaded");
		System.out.println("Cities: " + cityDistrictRepository.getCities());
		System.out.println("Districts of Ankara: " + cityDistrictRepository.getDistricts("ANKArA"));
		System.out.println("Districts of Istanbul: " + cityDistrictRepository.getDistricts("ISTANBUL"));
	}
}
