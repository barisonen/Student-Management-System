package com.example.backend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class CityDistrictRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<String> getDistricts(String city) {

        String sql = "SELECT DISTRICT FROM CITY_DISTRICT WHERE CITY = '" + city + "'";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);
        if(result.size() ==  0) {
            return null;
        }
        List<String> districts = new ArrayList<>();
        for(Map<String, Object> map : result) {
            districts.add((String) map.get("DISTRICT"));
        }
        System.out.println(districts);
        return districts;
    }

    public List<String> getCities() {
        String sql = "SELECT DISTINCT CITY FROM CITY_DISTRICT";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);
        if(result.size() ==  0) {
            return null;
        }
        List<String> districts = new ArrayList<>();
        for(Map<String, Object> map : result) {
            districts.add((String) map.get("CITY"));
        }
        System.out.println(districts);
        return districts;
    }
}
