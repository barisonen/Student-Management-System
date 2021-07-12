package com.example.backend.controllers;

import com.example.backend.repositories.CityDistrictRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/city-district")
public class CityDistrictController {
    private final CityDistrictRepository cityDistrictRepository;

    public CityDistrictController(CityDistrictRepository cityDistrictRepository) {
        this.cityDistrictRepository = cityDistrictRepository;
    }

    @PostMapping("/getDistricts")
    public List<String> getDistricts(@RequestBody String city) {
        city = city.substring(0, city.length()-1);
        return cityDistrictRepository.getDistricts(city);
    }

    @GetMapping("/getCities")
    public List<String> getCities() {
        return cityDistrictRepository.getCities();
    }

    @GetMapping("loadCityAndDistricts")
    public void loadCityAndDistricts() {
        cityDistrictRepository.loadCityAndDistricts();
    }
}
