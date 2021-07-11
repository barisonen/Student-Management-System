package com.example.backend.controllers;

import com.example.backend.repositories.CityDistrictRepository;
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

    @GetMapping("/getDistricts")
    public List<String> getDistricts(@RequestBody String city) {
        return cityDistrictRepository.getDistricts(city);
    }

    @GetMapping("/getCities")
    public List<String> getCities() {
        return cityDistrictRepository.getCities();
    }
}
