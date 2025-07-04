package com.testePratico.testePratico.service;

import com.testePratico.testePratico.entity.SchoolDependencyEntity;
import com.testePratico.testePratico.entity.SchoolEntity;
import com.testePratico.testePratico.repository.SchoolDependencyRepository;
import com.testePratico.testePratico.repository.SchoolRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;


@Service
@Slf4j
public class CsvService {

    @Autowired
    private SchoolRepository schoolRepository;

    @Autowired
    private SchoolDependencyRepository schoolDependencyRepository;

    public String uploadCSV(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return "Empty file!";
        }

        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            String csvSeparator = ",";

            String[] headers = br.readLine().split(csvSeparator); //armazena o cabeçalho

            while ((line = br.readLine()) != null) {
                String[] data = line.split(csvSeparator);

                SchoolEntity schoolEntity = SchoolEntity.builder()
                        .name(data[6].trim())
                        .schoolNetwork(data[1].trim())
                        .educationBoard(data[2].trim())
                        .city(data[3].trim())
                        .district(data[4].trim())
                        .code(data[5].trim())
                        .type(tryParseInt(data[7].trim()))
                        .typeDescription(data[8].trim())
                        .schoolStatus(tryParseInt(data[9].trim()))
                        .build();

                SchoolEntity newSchoolEntity = schoolRepository.saveAndFlush(schoolEntity);

                List<SchoolDependencyEntity>  schoolDependencyEntityList = new ArrayList<>();
                int totalColumns = data.length;
                int startIndex = totalColumns - 10;

                for (int i = startIndex; i < totalColumns; i++) {
                    String depName = headers[i].trim();
                    Integer quantity = tryParseInt(data[i]);

                    SchoolDependencyEntity dependencyEntity = SchoolDependencyEntity.builder()
                            .name(depName)
                            .quantity(quantity)
                            .school(newSchoolEntity)
                            .build();

                    schoolDependencyEntityList.add(dependencyEntity);
                }
                schoolDependencyRepository.saveAll(schoolDependencyEntityList);
            }

            return "Import completed successfully.";

        } catch (Exception e) {
            e.printStackTrace();
            return "An error occurred while processing the file: " + e.getMessage();
        }
    }

    public static Integer tryParseInt(String value) {
        if (value == null || value.trim().isEmpty()) {
            return null;
        }
        try {
            return Integer.parseInt(value.trim());
        } catch (NumberFormatException e) {
            log.warn("Invalid Integer value: " + value);
            return null;
        }
    }
}
