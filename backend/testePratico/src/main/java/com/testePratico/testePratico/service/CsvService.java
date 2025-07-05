package com.testePratico.testePratico.service;

import com.testePratico.testePratico.domain.entity.SchoolDependencyEntity;
import com.testePratico.testePratico.domain.entity.SchoolEntity;
import com.testePratico.testePratico.domain.entity.SchoolTypeEntity;
import com.testePratico.testePratico.repository.SchoolDependencyRepository;
import com.testePratico.testePratico.repository.SchoolRepository;
import com.testePratico.testePratico.repository.SchoolTypeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@Service
@Slf4j
public class CsvService {

    @Autowired
    private SchoolRepository schoolRepository;
    @Autowired
    private SchoolTypeRepository schoolTypeRepository;
    @Autowired
    private SchoolDependencyRepository schoolDependencyRepository;

    public String uploadCSV(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return "Empty file!";
        }

        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            String csvSeparator = ";";

            String[] headers = br.readLine().split(csvSeparator); //armazena o cabeçalho

            while ((line = br.readLine()) != null) {
                String[] data = line.split(csvSeparator);
                System.out.println("Colunas na linha: " + data.length + " | Conteúdo: " + Arrays.toString(data));

                Optional<SchoolTypeEntity> schoolTypeOpt = schoolTypeRepository.findByDescription(data[7].trim());
                SchoolTypeEntity schoolTypeEntity = schoolTypeOpt.orElseGet(() -> schoolTypeRepository.saveAndFlush(SchoolTypeEntity.builder().description(data[7].trim()).build()));


                SchoolEntity schoolEntity = SchoolEntity.builder()
                        .name(data[5].trim())
                        .schoolNetwork(data[0].trim())
                        .educationBoard(data[1].trim())
                        .city(data[2].trim())
                        .district(data[3].trim())
                        .code(data[4].trim())
                        .type(schoolTypeEntity)
                        .schoolStatus(data[8].trim())
                        .build();

                SchoolEntity newSchoolEntity = schoolRepository.saveAndFlush(schoolEntity);

                List<SchoolDependencyEntity>  schoolDependencyEntityList = new ArrayList<>();
                int totalColumns = data.length;
                int startIndex = 10;

                for (int i = startIndex; i < totalColumns; i++) {
                    String rawHeader = headers[i].trim();
                    String depName = capitalizeFirstLetter(rawHeader.replace("_", " "));
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

    private String capitalizeFirstLetter(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }
        input = input.toLowerCase();
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    }
}
