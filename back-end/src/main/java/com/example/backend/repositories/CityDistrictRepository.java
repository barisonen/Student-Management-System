package com.example.backend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
/*
City - District Repository for mapping city and districts
 */
@Repository
public class CityDistrictRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /*
    Get Districts for a given city
     */
    public List<String> getDistricts(String city) {
        if(city == null)
            return null;

        String sql = "SELECT DISTRICT FROM CITY_DISTRICT WHERE lower(CITY) = '" + city.toLowerCase() + "'";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);
        //if no such city exists in the database, return null
        if(result.size() ==  0) {
            return null;
        }
        List<String> districts = new ArrayList<>();
        for(Map<String, Object> map : result) {
            districts.add((String) map.get("DISTRICT"));
        }
        return districts;
    }

    /*
    Get all cities in the database
     */
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
        return districts;
    }
    /*
    Loads dummy city-districts to database
     */
    public void loadCityAndDistricts() {
        //clear first to avoid duplicated rows since primary key is not set (for now)
        jdbcTemplate.queryForList("DELETE FROM CITY_DISTRICT");
        jdbcTemplate.queryForList("INSERT INTO CITY_DISTRICT " +
                "VALUES('ANKARA', 'CANKAYA'), " +
                "('ANKARA', 'YENIMAHALLE'), " +
                "('ISTANBUL', 'NISANTASI'), " +
                "('ISTANBUL', 'CIHANGIR') ");
    }
}
