package com.example.backend;

import org.hibernate.HibernateException;
import org.springframework.beans.factory.BeanCreationException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackEndApplication {

	public static void main(String[] args) {
		try {
			SpringApplication.run(BackEndApplication.class, args);
		} catch(BeanCreationException | HibernateException e) {
			System.out.println("RUN DATABASE FIRST!");
			System.exit(0);
		}

	}
}
